"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LRUCacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LRUCacheService = void 0;
const common_1 = require("@nestjs/common");
let LRUCacheService = LRUCacheService_1 = class LRUCacheService {
    constructor() {
        this.logger = new common_1.Logger(LRUCacheService_1.name);
        this.cache = new Map();
        this.maxSize = 1000;
        this.defaultTTL = 300000;
    }
    set(key, value, ttl = this.defaultTTL) {
        const now = Date.now();
        const expiry = now + ttl;
        if (this.cache.has(key)) {
            const entry = this.cache.get(key);
            entry.value = value;
            entry.expiry = expiry;
            entry.accessCount++;
            entry.lastAccess = now;
            return;
        }
        if (this.cache.size >= this.maxSize) {
            this.evictLRU();
        }
        this.cache.set(key, {
            value,
            expiry,
            accessCount: 1,
            lastAccess: now
        });
        this.logger.debug(`Cache set: ${key}, size: ${this.cache.size}/${this.maxSize}`);
    }
    get(key) {
        const entry = this.cache.get(key);
        if (!entry) {
            this.logger.debug(`Cache miss: ${key}`);
            return null;
        }
        const now = Date.now();
        if (now > entry.expiry) {
            this.cache.delete(key);
            this.logger.debug(`Cache expired: ${key}`);
            return null;
        }
        entry.accessCount++;
        entry.lastAccess = now;
        this.logger.debug(`Cache hit: ${key}, access count: ${entry.accessCount}`);
        return entry.value;
    }
    has(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return false;
        const now = Date.now();
        if (now > entry.expiry) {
            this.cache.delete(key);
            return false;
        }
        return true;
    }
    delete(key) {
        const deleted = this.cache.delete(key);
        if (deleted) {
            this.logger.debug(`Cache deleted: ${key}`);
        }
        return deleted;
    }
    clear() {
        this.cache.clear();
        this.logger.debug('Cache cleared');
    }
    getStats() {
        const now = Date.now();
        let oldest = null;
        let newest = null;
        for (const [key, entry] of this.cache.entries()) {
            if (now <= entry.expiry) {
                if (oldest === null || entry.lastAccess < oldest) {
                    oldest = entry.lastAccess;
                }
                if (newest === null || entry.lastAccess > newest) {
                    newest = entry.lastAccess;
                }
            }
        }
        return {
            size: this.cache.size,
            maxSize: this.maxSize,
            usage: (this.cache.size / this.maxSize) * 100,
            oldestEntry: oldest,
            newestEntry: newest
        };
    }
    evictLRU() {
        let lruKey = null;
        let oldestAccess = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (entry.lastAccess < oldestAccess) {
                oldestAccess = entry.lastAccess;
                lruKey = key;
            }
        }
        if (lruKey) {
            this.cache.delete(lruKey);
            this.logger.debug(`Cache evicted LRU: ${lruKey}`);
        }
    }
    cleanup() {
        const now = Date.now();
        let cleanedCount = 0;
        for (const [key, entry] of this.cache.entries()) {
            if (now > entry.expiry) {
                this.cache.delete(key);
                cleanedCount++;
            }
        }
        if (cleanedCount > 0) {
            this.logger.debug(`Cache cleanup: removed ${cleanedCount} expired entries`);
        }
        while (this.cache.size > this.maxSize) {
            this.evictLRU();
        }
    }
    getMemoryUsage() {
        const entryCount = this.cache.size;
        let totalSize = 0;
        for (const [key, entry] of this.cache.entries()) {
            const keySize = Buffer.byteLength(key, 'utf8');
            const valueSize = JSON.stringify(entry.value).length;
            const metadataSize = 32;
            totalSize += keySize + valueSize + metadataSize;
        }
        return {
            approximateSizeMB: totalSize / (1024 * 1024),
            entryCount,
            averageEntrySizeBytes: entryCount > 0 ? totalSize / entryCount : 0
        };
    }
    onModuleDestroy() {
        this.logger.debug('LRUCacheService destroyed');
    }
};
exports.LRUCacheService = LRUCacheService;
exports.LRUCacheService = LRUCacheService = LRUCacheService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LRUCacheService);
//# sourceMappingURL=lru-cache.service.js.map