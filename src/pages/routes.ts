// Define all application routes in one place
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    ONBOARDING: '/onboarding',
    PROFILE: '/profile',
} as const;

// Type for route values
export type RouteValue = typeof ROUTES[keyof typeof ROUTES];
