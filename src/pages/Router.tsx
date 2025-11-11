import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';
import OnboardingPage from './OnboardingPage';
import ProfilePage from './ProfilePage';
import ProtectedRoute from '../components/ProtectedRoute';
import { ROUTES } from './routes';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

                {/* Protected routes */}
                <Route
                    path={ROUTES.ONBOARDING}
                    element={
                        <ProtectedRoute>
                            <OnboardingPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={ROUTES.HOME}
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={ROUTES.PROFILE}
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

                {/* Redirect unknown routes to home */}
                <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
