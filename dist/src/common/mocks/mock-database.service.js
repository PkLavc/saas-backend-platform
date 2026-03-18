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
var MockDatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockDatabaseService = void 0;
const common_1 = require("@nestjs/common");
let MockDatabaseService = MockDatabaseService_1 = class MockDatabaseService {
    constructor() {
        this.logger = new common_1.Logger(MockDatabaseService_1.name);
        this.isAvailable = false;
        this.dataStore = new Map();
        this.counters = new Map();
        this.logger.warn('Database not available - using mock database service');
        this.isAvailable = false;
        this.initializeMockData();
    }
    initializeMockData() {
        this.dataStore.set('users', [
            {
                id: 1,
                email: 'admin@example.com',
                name: 'Admin User',
                role: 'ADMIN',
                createdAt: new Date(),
                updatedAt: new Date(),
                organizationId: 1
            }
        ]);
        this.dataStore.set('organizations', [
            {
                id: 1,
                name: 'Test Organization',
                domain: 'test.com',
                plan: 'FREE',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
        this.counters.set('users', 1);
        this.counters.set('organizations', 1);
    }
    async connect() {
        this.logger.warn('Mock Database: Connection attempted but database is not available');
        this.isAvailable = false;
    }
    async findMany(model, where) {
        if (!this.isAvailable) {
            this.logger.warn(`Mock Database: FIND_MANY operation failed for ${model} - Database unavailable`);
            return [];
        }
        const data = this.dataStore.get(model) || [];
        if (!where) {
            return [...data];
        }
        return data.filter(item => {
            return Object.keys(where).every(key => {
                if (typeof where[key] === 'object' && where[key].contains) {
                    return item[key]?.includes(where[key].contains);
                }
                return item[key] === where[key];
            });
        });
    }
    async findUnique(model, where) {
        if (!this.isAvailable) {
            this.logger.warn(`Mock Database: FIND_UNIQUE operation failed for ${model} - Database unavailable`);
            return null;
        }
        const data = this.dataStore.get(model) || [];
        const key = Object.keys(where)[0];
        const value = where[key];
        return data.find(item => item[key] === value) || null;
    }
    async create(model, data) {
        if (!this.isAvailable) {
            this.logger.warn(`Mock Database: CREATE operation failed for ${model} - Database unavailable`);
            throw new Error('Database connection failed');
        }
        const id = this.getNextId(model);
        const newItem = {
            id,
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const currentData = this.dataStore.get(model) || [];
        currentData.push(newItem);
        this.dataStore.set(model, currentData);
        this.logger.debug(`Mock Database: Created ${model} with id ${id}`);
        return newItem;
    }
    async update(model, where, data) {
        if (!this.isAvailable) {
            this.logger.warn(`Mock Database: UPDATE operation failed for ${model} - Database unavailable`);
            throw new Error('Database connection failed');
        }
        const key = Object.keys(where)[0];
        const value = where[key];
        const currentData = this.dataStore.get(model) || [];
        const index = currentData.findIndex(item => item[key] === value);
        if (index === -1) {
            throw new Error(`${model} not found`);
        }
        currentData[index] = {
            ...currentData[index],
            ...data,
            updatedAt: new Date()
        };
        this.logger.debug(`Mock Database: Updated ${model} with ${key}=${value}`);
        return currentData[index];
    }
    async delete(model, where) {
        if (!this.isAvailable) {
            this.logger.warn(`Mock Database: DELETE operation failed for ${model} - Database unavailable`);
            throw new Error('Database connection failed');
        }
        const key = Object.keys(where)[0];
        const value = where[key];
        const currentData = this.dataStore.get(model) || [];
        const index = currentData.findIndex(item => item[key] === value);
        if (index === -1) {
            throw new Error(`${model} not found`);
        }
        const deletedItem = currentData.splice(index, 1)[0];
        this.logger.debug(`Mock Database: Deleted ${model} with ${key}=${value}`);
        return deletedItem;
    }
    async count(model, where) {
        if (!this.isAvailable) {
            this.logger.warn(`Mock Database: COUNT operation failed for ${model} - Database unavailable`);
            return 0;
        }
        const data = this.dataStore.get(model) || [];
        if (!where) {
            return data.length;
        }
        return data.filter(item => {
            return Object.keys(where).every(key => {
                if (typeof where[key] === 'object' && where[key].contains) {
                    return item[key]?.includes(where[key].contains);
                }
                return item[key] === where[key];
            });
        }).length;
    }
    getNextId(model) {
        const currentId = this.counters.get(model) || 0;
        const nextId = currentId + 1;
        this.counters.set(model, nextId);
        return nextId;
    }
    getAvailability() {
        return this.isAvailable;
    }
    async $transaction(fn) {
        if (!this.isAvailable) {
            this.logger.warn('Mock Database: Transaction failed - Database unavailable');
            throw new Error('Database connection failed');
        }
        const tx = {
            findMany: this.findMany.bind(this),
            findUnique: this.findUnique.bind(this),
            create: this.create.bind(this),
            update: this.update.bind(this),
            delete: this.delete.bind(this),
            count: this.count.bind(this)
        };
        return await fn(tx);
    }
    async findManyWithFallback(model, where) {
        try {
            return await this.findMany(model, where);
        }
        catch (error) {
            this.logger.error(`Mock Database: Fallback for FIND_MANY ${model}: ${error.message}`);
            return [];
        }
    }
    async createWithFallback(model, data) {
        try {
            return await this.create(model, data);
        }
        catch (error) {
            this.logger.error(`Mock Database: Fallback for CREATE ${model}: ${error.message}`);
            return null;
        }
    }
};
exports.MockDatabaseService = MockDatabaseService;
exports.MockDatabaseService = MockDatabaseService = MockDatabaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MockDatabaseService);
//# sourceMappingURL=mock-database.service.js.map