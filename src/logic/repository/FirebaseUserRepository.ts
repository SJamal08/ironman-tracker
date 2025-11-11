import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { User, RegisterPayload, LoginPayload, OnboardingData } from '../model/User';
import { IUserRepo } from './IUserRepository';

export class FirebaseUserRepository implements IUserRepo {
    
    async register(payload: RegisterPayload): Promise<User> {
        try {
            console.log('Starting registration process...');
            
            // Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                payload.email,
                payload.password
            );

            const firebaseUser = userCredential.user;
            console.log('User created in Firebase Auth:', firebaseUser.uid);

            const user: User = {
                id: firebaseUser.uid,
                email: payload.email,
                firstname: payload.firstname,
                lastname: payload.lastname,
            };

            console.log('Attempting to write to Firestore...');
            console.log('User data to write:', {
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                createdAt: new Date().toISOString(),
            });
            
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            await setDoc(userDocRef, {
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                createdAt: new Date().toISOString(),
            });

            console.log('User successfully added to Firestore');
            return user;
        } catch (error: any) {
            console.error('Registration error:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            console.error('Full error object:', error);
            
            // If user was created in Auth but not in Firestore, we should handle it
            if (error.code === 'permission-denied') {
                throw new Error('Permission denied. Please check Firestore security rules.');
            }
            
            throw new Error(error.message || 'Failed to register user');
        }
    }

    async login(payload: LoginPayload): Promise<User> {
        try {
            // Sign in with Firebase Auth
            const userCredential = await signInWithEmailAndPassword(
                auth,
                payload.email,
                payload.password
            );

            const firebaseUser = userCredential.user;

            // Get user data from Firestore
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

            if (!userDoc.exists()) {
                throw new Error('User data not found');
            }

            const userData = userDoc.data();

            return {
                id: firebaseUser.uid,
                email: userData.email,
                firstname: userData.firstname,
                lastname: userData.lastname,
            };
        } catch (error: any) {
            throw new Error(error.message || 'Failed to login');
        }
    }

    async logout(): Promise<void> {
        try {
            await signOut(auth);
        } catch (error: any) {
            throw new Error(error.message || 'Failed to logout');
        }
    }

    async getCurrentUser(): Promise<User | null> {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(
                auth,
                async (firebaseUser: FirebaseUser | null) => {
                    unsubscribe();
                    
                    if (!firebaseUser) {
                        resolve(null);
                        return;
                    }

                    try {
                        // Get user data from Firestore
                        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

                        if (!userDoc.exists()) {
                            resolve(null);
                            return;
                        }

                        const userData = userDoc.data();

                        resolve({
                            id: firebaseUser.uid,
                            email: userData.email,
                            firstname: userData.firstname,
                            lastname: userData.lastname,
                        });
                    } catch (error) {
                        reject(error);
                    }
                },
                reject
            );
        });
    }

    async updateUserProfile(userId: string, data: Partial<OnboardingData>): Promise<void> {
        try {
            console.log('Updating user profile with onboarding data...');
            const userDocRef = doc(db, 'users', userId);
            
            // Process the data to ensure proper types for Firestore
            const processedData: Record<string, any> = {};
            
            // Copy all fields from data
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    processedData[key] = value;
                }
            });
            
            // Ensure injuries is an array (even if empty)
            if (!processedData.injuries || !Array.isArray(processedData.injuries)) {
                processedData.injuries = [];
            }
            
            await updateDoc(userDocRef, {
                ...processedData,
                onboardingCompleted: true,
                updatedAt: new Date().toISOString(),
            });

            console.log('User profile successfully updated');
        } catch (error: any) {
            console.error('Error updating user profile:', error);
            throw new Error(error.message || 'Failed to update user profile');
        }
    }
}
