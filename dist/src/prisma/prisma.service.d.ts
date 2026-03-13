import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { MockDatabaseService } from '../common/mocks/mock-database.service';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    private isMockMode;
    private mockDatabase;
    constructor(mockDatabase: MockDatabaseService);
    onModuleInit(): Promise<void>;
    getIsMockMode(): boolean;
}
