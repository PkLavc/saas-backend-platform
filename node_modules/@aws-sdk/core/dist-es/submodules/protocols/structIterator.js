import { NormalizedSchema } from "@smithy/core/schema";
export function* serializingStructIterator(ns, sourceObject) {
    if (ns.isUnitSchema()) {
        return;
    }
    const struct = ns.getSchema();
    for (let i = 0; i < struct[4].length; ++i) {
        const key = struct[4][i];
        const memberSchema = struct[5][i];
        const memberNs = new NormalizedSchema([memberSchema, 0], key);
        if (!(key in sourceObject) && !memberNs.isIdempotencyToken()) {
            continue;
        }
        yield [key, memberNs];
    }
}
export function* deserializingStructIterator(ns, sourceObject, nameTrait) {
    if (ns.isUnitSchema()) {
        return;
    }
    const struct = ns.getSchema();
    let keysRemaining = Object.keys(sourceObject).filter((k) => k !== "__type").length;
    for (let i = 0; i < struct[4].length; ++i) {
        if (keysRemaining === 0) {
            break;
        }
        const key = struct[4][i];
        const memberSchema = struct[5][i];
        const memberNs = new NormalizedSchema([memberSchema, 0], key);
        let serializationKey = key;
        if (nameTrait) {
            serializationKey = memberNs.getMergedTraits()[nameTrait] ?? key;
        }
        if (!(serializationKey in sourceObject)) {
            continue;
        }
        yield [key, memberNs];
        keysRemaining -= 1;
    }
}
