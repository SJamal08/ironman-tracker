import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, RegisterPayload, LoginPayload, OnboardingData } from '../model/User';
import { UserController } from '../controller/UserController';
import { FirebaseUserRepository } from '../repository/FirebaseUserRepository';

// Initialize controller with Firebase repository
const userRepository = new FirebaseUserRepository();
const userController = new UserController(userRepository);

// Define the state interface
interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

// Initial state
const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

// Async thunks
export const registerUser = createAsyncThunk(
    'user/register',
    async (payload: RegisterPayload, { rejectWithValue }) => {
        try {
            const user = await userController.register(payload);
            return user;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to register');
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (payload: LoginPayload, { rejectWithValue }) => {
        try {
            const user = await userController.login(payload);
            return user;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to login');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            await userController.logout();
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to logout');
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    'user/fetchCurrent',
    async (_, { rejectWithValue }) => {
        try {
            const user = await userController.getCurrentUser();
            return user;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch user');
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'user/updateProfile',
    async ({ userId, data }: { userId: string; data: Partial<OnboardingData> }, { rejectWithValue }) => {
        try {
            await userController.updateUserProfile(userId, data);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update profile');
        }
    }
);

// Slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        // Register
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Login
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Logout
        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        });
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Fetch current user
        builder.addCase(fetchCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User | null>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = action.payload !== null;
            state.error = null;
        });
        builder.addCase(fetchCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.isAuthenticated = false;
        });

        // Update user profile
        builder.addCase(updateUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            // Merge the updated data into the user object
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
            state.error = null;
        });
        builder.addCase(updateUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { clearError, clearUser } = userSlice.actions;
export default userSlice.reducer;
