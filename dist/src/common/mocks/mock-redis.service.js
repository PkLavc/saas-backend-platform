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
var MockRedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockRedisService = void 0;
const common_1 = require("@nestjs/common");
let MockRedisService = MockRedisService_1 = class MockRedisService {
    constructor() {
        this.logger = new common_1.Logger(MockRedisService_1.name);
        this.store = new Map();
        this.isAvailable = false;
        this.logger.warn('Redis not available - using mock Redis service');
        this.isAvailable = false;
    }
    async connect() {
        this.logger.warn('Mock Redis: Connection attempted but Redis is not available');
        this.isAvailable = false;
    }
    async set(key, value, ttl) {
        if (!this.isAvailable) {
            this.logger.warn(`Mock Redis: SET operation skipped for ${key} - Redis unavailable`);
            return;
        }
        const entry = { value, expiry: ttl ? Date.now() + ttl : undefined };
        this.store.set(key, entry);
        this.logger.debug(`Mock Redis: Set ${key} = ${JSON.stringify(value)}`);
    }
    async get(key) {
        if (!this.isAvailable) {
            this.logger.warn(`Mock Redis: GET operation failed for ${key} - Redis unavailable`);
            return null;
        }
        const entry = this.store.get(key);
        if (!entry) {
            this.logger.debug(`Mock Redis: Key ${key} not found`);
            return null;
        }
        if (entry.expiry && Date.now() > entry.expiry) {
            this.store.delete(key);
            this.logger.debug(`Mock Redis: Key ${key} expired`);
            return null;
        }
        this.logger.debug(`Mock Redis: Got ${key} = ${JSON.stringify(entry.value)}`);
        return entry.value;
    }
    async del(key) {
        if (!this.isAvailable) {
            this.logger.warn(`Mock Redis: DEL operation skipped for ${key} - Redis unavailable`);
            return;
        }
        this.store.delete(key);
        this.logger.debug(`Mock Redis: Deleted ${key}`);
    }
    async exists(key) {
        if (!this.isAvailable) {
            this.logger.warn(`Mock Redis: EXISTS operation failed for ${key} - Redis unavailable`);
            return false;
        }
        const entry = this.store.get(key);
        if (!entry)
            return false;
        if (entry.expiry && Date.now() > entry.expiry) {
            this.store.delete(key);
            return false;
        }
        return true;
    }
    async flushall() {
        if (!this.isAvailable) {
            this.logger.warn('Mock Redis: FLUSHALL operation skipped - Redis unavailable');
            return;
        }
        this.store.clear();
        this.logger.debug('Mock Redis: All keys cleared');
    }
    async ping() {
        if (!this.isAvailable) {
            this.logger.warn('Mock Redis: PING failed - Redis unavailable');
            throw new Error('Redis connection failed');
        }
        return 'PONG';
    }
    getAvailability() {
        return this.isAvailable;
    }
    async setWithFallback(key, value, ttl) {
        try {
            await this.set(key, value, ttl);
        }
        catch (error) {
            this.logger.error(`Mock Redis: Fallback for SET ${key}: ${error.message}`);
        }
    }
    async getWithFallback(key) {
        try {
            return await this.get(key);
        }
        catch (error) {
            this.logger.error(`Mock Redis: Fallback for GET ${key}: ${error.message}`);
            return null;
        }
    }
};
exports.MockRedisService = MockRedisService;
exports.MockRedisService = MockRedisService = MockRedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MockRedisService);
//# sourceMappingURL=mock-redis.service.js.map