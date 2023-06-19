import { ExecutionContext } from '@nestjs/common';
declare const AdminAccessGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AdminAccessGuard extends AdminAccessGuard_base {
    getRequest(context: ExecutionContext): any;
}
export {};
