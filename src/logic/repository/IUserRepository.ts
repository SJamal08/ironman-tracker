import { User, RegisterPayload, LoginPayload, OnboardingData } from "../model/User";

export interface IUserRepo {
    register(payload: RegisterPayload): Promise<User>;
    login(payload: LoginPayload): Promise<User>;
    logout(): Promise<void>;
    getCurrentUser(): Promise<User | null>;
    updateUserProfile(userId: string, data: Partial<OnboardingData>): Promise<void>;
}