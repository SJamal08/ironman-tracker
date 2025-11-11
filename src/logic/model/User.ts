export type Gender = 'male' | 'female' | 'other';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type MainSport = 'running' | 'cycling' | 'swimming' | 'triathlon' | 'fitness' | 'other';
export type GoalType = 'competition' | 'weight_loss' | 'performance' | 'wellness';
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type UnitSystem = 'metric' | 'imperial';
export type Language = 'fr' | 'en';
export type StrengthLevel = 'light' | 'moderate' | 'heavy';

export interface User {
    // Core fields (Always mandatory)
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    
    // Basic Profile (Step 1) - All mandatory for onboarding
    birthDate?: string; // Mandatory for onboarding
    gender?: Gender; // Mandatory for onboarding
    height?: number; // Mandatory for onboarding (cm)
    weight?: number; // Mandatory for onboarding (kg)
    experienceLevel?: ExperienceLevel; // Mandatory for onboarding
    mainSport?: MainSport; // Mandatory for onboarding
    
    // Sports Profile (Step 2) - Mandatory fields
    trainingFrequency?: number; // Mandatory for onboarding (days/week)
    weeklyGoalHours?: number; // Optional
    preferredDays?: DayOfWeek[]; // Optional
    restingHeartRate?: number; // Optional (bpm)
    maxHeartRate?: number; // Optional (bpm)
    
    // Sport-specific fields (Optional, conditional on mainSport)
    runPace?: number; // Optional - sec/km (for running/triathlon)
    ftp?: number; // Optional - watts (for cycling/triathlon)
    swimPace?: number; // Optional - sec/100m (for swimming/triathlon)
    strengthLevel?: StrengthLevel; // Optional (for fitness)
    preferredSports?: string[]; // Optional
    
    // Goal (Step 3) - Core goal fields mandatory
    goalType?: GoalType; // Mandatory for onboarding
    goalTitle?: string; // Mandatory for onboarding
    goalDate?: string; // Optional
    goalTimeTarget?: string; // Optional (conditional on goalType=competition)
    goalWeightTarget?: number; // Optional (conditional on goalType=weight_loss)
    goalDescription?: string; // Optional
    
    // Preferences (Step 4) - Some mandatory
    timezone?: string; // Mandatory (auto-detected)
    notificationsEnabled?: boolean; // Mandatory (default true)
    injuries?: string[]; // Optional
    deviceLinked?: boolean; // Optional (default false)
    coachMode?: boolean; // Optional (default false)
    language?: Language; // Mandatory (default 'en')
    unitSystem?: UnitSystem; // Mandatory (default 'metric')
    
    // Metadata
    createdAt?: string;
    updatedAt?: string;
    onboardingCompleted?: boolean;
}

export interface RegisterPayload {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface OnboardingStep1 {
    firstname: string;
    lastname: string;
    birthDate: string;
    gender: Gender;
    height: number;
    weight: number;
    experienceLevel: ExperienceLevel;
    mainSport: MainSport;
}

export interface OnboardingStep2 {
    trainingFrequency: number;
    weeklyGoalHours: number;
    preferredDays: DayOfWeek[];
    restingHeartRate: number;
    maxHeartRate: number;
    runPace?: number;
    ftp?: number;
    swimPace?: number;
    strengthLevel?: StrengthLevel;
    preferredSports?: string[];
}

export interface OnboardingStep3 {
    goalType: GoalType;
    goalTitle: string;
    goalDate: string;
    goalTimeTarget?: string;
    goalWeightTarget?: number;
    goalDescription: string;
}

export interface OnboardingStep4 {
    timezone: string;
    notificationsEnabled: boolean;
    injuries: string[];
    deviceLinked: boolean;
    coachMode: boolean;
    language: Language;
    unitSystem: UnitSystem;
}

export type OnboardingData = OnboardingStep1 & OnboardingStep2 & OnboardingStep3 & OnboardingStep4;