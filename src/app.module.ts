import { Module } from '@nestjs/common';
import { ConfigModule } from './auth/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { PaymentsModule } from './payments/payments.module';
import { HealthModule } from './health/health.module';
import { ResilienceModule } from './common/resilience/resilience.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    OrganizationsModule,
    ProjectsModule,
    TasksModule,
    PaymentsModule,
    HealthModule,
    ResilienceModule,
  ],
})
export class AppModule {}