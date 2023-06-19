import { UsersService } from 'src/users/users.service';
type JwtPayload = {
    sub: number;
};
declare const AdminStrategy_base: new (...args: any[]) => any;
export declare class AdminStrategy extends AdminStrategy_base {
    private userService;
    constructor(userService: UsersService);
    validate(payload: JwtPayload): Promise<false | {
        userId: number;
    }>;
}
export {};
