import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const organizationId = request.params.organizationId || request.body.organizationId;
    
    if (organizationId && organizationId !== user.organizationId) {
      throw new ForbiddenException('Access denied: Organization mismatch');
    }

    // Inject organizationId into request for use in services
    request.organizationId = user.organizationId;
    
    return next.handle();
  }
}