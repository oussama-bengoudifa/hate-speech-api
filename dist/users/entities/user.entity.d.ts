export declare class User {
    id: number;
    email: string;
    username: string;
    password: string;
    code: string;
    isActive: boolean;
    otpCode: string;
    otpCodeExpireDate: Date;
    optMaxTentative: number;
}
