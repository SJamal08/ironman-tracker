import { User, RegisterPayload, LoginPayload, OnboardingData } from "../model/User";
import { IUserRepo } from "../repository/IUserRepository";


export class UserController {

    private userRepo: IUserRepo;

    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async register(payload: RegisterPayload): Promise<User> {
        return await this.userRepo.register(payload);
    }

    async login(payload: LoginPayload): Promise<User> {
        return await this.userRepo.login(payload);
    }

    async logout(): Promise<void> {
        return await this.userRepo.logout();
    }

    async getCurrentUser(): Promise<User | null> {
        return await this.userRepo.getCurrentUser();
    }

    async updateUserProfile(userId: string, data: Partial<OnboardingData>): Promise<void> {
        return await this.userRepo.updateUserProfile(userId, data);
    }
}