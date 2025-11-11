import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { RegisterPayload } from '../logic/model/User';
import { useAppDispatch, useAppSelector } from '../logic/redux/hooks';
import { registerUser } from '../logic/redux/userSlice';
import { ROUTES } from './routes';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterPayload>();

    const onSubmit = async (data: RegisterPayload) => {
        try {
            await dispatch(registerUser(data)).unwrap();
            // Redirect to onboarding after successful registration
            navigate(ROUTES.ONBOARDING);
        } catch (err) {
            // Error is already stored in Redux state
            console.error('Registration failed:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-6 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <div className="text-5xl mb-4">🏋️</div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Start tracking your training today
                    </p>
                </div>
                <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    {error && (
                        <div className="rounded-lg bg-red-50 p-4">
                            <div className="text-sm text-red-800">
                                {error}
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                id="firstname"
                                type="text"
                                autoComplete="given-name"
                                className={`appearance-none relative block w-full px-4 py-3 border ${
                                    errors.firstname ? 'border-red-300' : 'border-gray-300'
                                } placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base`}
                                placeholder="John"
                                {...register('firstname', {
                                    required: 'First name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'First name must be at least 2 characters',
                                    },
                                })}
                            />
                            {errors.firstname && (
                                <p className="mt-2 text-sm text-red-600">{errors.firstname.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                id="lastname"
                                type="text"
                                autoComplete="family-name"
                                className={`appearance-none relative block w-full px-4 py-3 border ${
                                    errors.lastname ? 'border-red-300' : 'border-gray-300'
                                } placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base`}
                                placeholder="Doe"
                                {...register('lastname', {
                                    required: 'Last name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Last name must be at least 2 characters',
                                    },
                                })}
                            />
                            {errors.lastname && (
                                <p className="mt-2 text-sm text-red-600">{errors.lastname.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                className={`appearance-none relative block w-full px-4 py-3 border ${
                                    errors.email ? 'border-red-300' : 'border-gray-300'
                                } placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base`}
                                placeholder="john.doe@example.com"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                className={`appearance-none relative block w-full px-4 py-3 border ${
                                    errors.password ? 'border-red-300' : 'border-gray-300'
                                } placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base`}
                                placeholder="••••••••"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Creating account...' : 'Sign up'}
                        </button>
                    </div>

                    <div className="text-center pt-2">
                        <Link
                            to={ROUTES.LOGIN}
                            className="font-medium text-indigo-600 hover:text-indigo-500 text-sm"
                        >
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
