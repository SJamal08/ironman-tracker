import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../logic/redux/hooks';
import { updateUserProfile } from '../logic/redux/userSlice';
import { OnboardingData } from '../logic/model/User';
import Layout from '../components/Layout';

const ProfilePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user, loading, error } = useAppSelector((state) => state.user);
    const [successMessage, setSuccessMessage] = useState('');
    const [activeTab, setActiveTab] = useState<'basic' | 'sports' | 'goals' | 'preferences'>('basic');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<Partial<OnboardingData>>({
        defaultValues: {
            firstname: user?.firstname || '',
            lastname: user?.lastname || '',
            birthDate: user?.birthDate || '',
            gender: user?.gender || 'male',
            height: user?.height || 0,
            weight: user?.weight || 0,
            experienceLevel: user?.experienceLevel || 'beginner',
            mainSport: user?.mainSport || 'running',
            trainingFrequency: user?.trainingFrequency || 0,
            weeklyGoalHours: user?.weeklyGoalHours || 0,
            preferredDays: user?.preferredDays || [],
            restingHeartRate: user?.restingHeartRate || 0,
            maxHeartRate: user?.maxHeartRate || 0,
            runPace: user?.runPace || 0,
            ftp: user?.ftp || 0,
            swimPace: user?.swimPace || 0,
            strengthLevel: user?.strengthLevel || 'moderate',
            goalType: user?.goalType || 'performance',
            goalTitle: user?.goalTitle || '',
            goalDate: user?.goalDate || '',
            goalTimeTarget: user?.goalTimeTarget || '',
            goalWeightTarget: user?.goalWeightTarget || 0,
            goalDescription: user?.goalDescription || '',
            timezone: user?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
            notificationsEnabled: user?.notificationsEnabled ?? true,
            injuries: user?.injuries || [],
            deviceLinked: user?.deviceLinked ?? false,
            coachMode: user?.coachMode ?? false,
            language: user?.language || 'en',
            unitSystem: user?.unitSystem || 'metric',
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                firstname: user.firstname,
                lastname: user.lastname,
                birthDate: user.birthDate || '',
                gender: user.gender || 'male',
                height: user.height || 0,
                weight: user.weight || 0,
                experienceLevel: user.experienceLevel || 'beginner',
                mainSport: user.mainSport || 'running',
                trainingFrequency: user.trainingFrequency || 0,
                weeklyGoalHours: user.weeklyGoalHours || 0,
                preferredDays: user.preferredDays || [],
                restingHeartRate: user.restingHeartRate || 0,
                maxHeartRate: user.maxHeartRate || 0,
                runPace: user.runPace || 0,
                ftp: user.ftp || 0,
                swimPace: user.swimPace || 0,
                strengthLevel: user.strengthLevel || 'moderate',
                goalType: user.goalType || 'performance',
                goalTitle: user.goalTitle || '',
                goalDate: user.goalDate || '',
                goalTimeTarget: user.goalTimeTarget || '',
                goalWeightTarget: user.goalWeightTarget || 0,
                goalDescription: user.goalDescription || '',
                timezone: user.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
                notificationsEnabled: user.notificationsEnabled ?? true,
                injuries: user.injuries || [],
                deviceLinked: user.deviceLinked ?? false,
                coachMode: user.coachMode ?? false,
                language: user.language || 'en',
                unitSystem: user.unitSystem || 'metric',
            });
        }
    }, [user, reset]);

    const onSubmit = async (data: Partial<OnboardingData>) => {
        try {
            if (!user?.id) return;

            await dispatch(updateUserProfile({
                userId: user.id,
                data,
            })).unwrap();

            setSuccessMessage('Profile updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            console.error('Failed to update profile:', err);
        }
    };

    const mainSport = watch('mainSport');
    const goalType = watch('goalType');

    return (
        <Layout>
            <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                    <p className="mt-2 text-gray-600">Manage your personal information and preferences</p>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8 overflow-x-auto">
                        {[
                            { id: 'basic', label: 'Basic Info', icon: '👤' },
                            { id: 'sports', label: 'Sports Profile', icon: '🏃' },
                            { id: 'goals', label: 'Goals', icon: '🎯' },
                            { id: 'preferences', label: 'Preferences', icon: '⚙️' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === tab.id
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Success Message */}
                    {successMessage && (
                        <div className="rounded-lg bg-green-50 p-4">
                            <div className="text-sm text-green-800">{successMessage}</div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="rounded-lg bg-red-50 p-4">
                            <div className="text-sm text-red-800">{error}</div>
                        </div>
                    )}

                    {/* Basic Info Tab */}
                    {activeTab === 'basic' && (
                        <div className="bg-white shadow rounded-lg p-6 space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        {...register('firstname', { required: 'First name is required', minLength: { value: 2, message: 'Must be at least 2 characters' } })}
                                    />
                                    {errors.firstname && <p className="mt-1 text-sm text-red-600">{errors.firstname.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        {...register('lastname', { required: 'Last name is required', minLength: { value: 2, message: 'Must be at least 2 characters' } })}
                                    />
                                    {errors.lastname && <p className="mt-1 text-sm text-red-600">{errors.lastname.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Birth Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        {...register('birthDate', { required: 'Birth date is required' })}
                                    />
                                    {errors.birthDate && <p className="mt-1 text-sm text-red-600">{errors.birthDate.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Gender <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        {...register('gender', { required: 'Gender is required' })}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Height (cm) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        {...register('height', { required: 'Height is required', min: { value: 100, message: 'Height must be at least 100cm' }, max: { value: 250, message: 'Height must be less than 250cm' } })}
                                    />
                                    {errors.height && <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Weight (kg) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        {...register('weight', { required: 'Weight is required', min: { value: 30, message: 'Weight must be at least 30kg' }, max: { value: 300, message: 'Weight must be less than 300kg' } })}
                                    />
                                    {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Experience Level <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        {...register('experienceLevel', { required: 'Experience level is required' })}
                                    >
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Main Sport <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        {...register('mainSport', { required: 'Main sport is required' })}
                                    >
                                        <option value="running">🏃 Running</option>
                                        <option value="cycling">🚴 Cycling</option>
                                        <option value="swimming">🏊 Swimming</option>
                                        <option value="triathlon">🏊🚴🏃 Triathlon</option>
                                        <option value="fitness">💪 Fitness</option>
                                        <option value="other">🎯 Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Sports Profile Tab */}
                    {activeTab === 'sports' && (
                        <div className="bg-white shadow rounded-lg p-6 space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900">Sports Profile</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Training Frequency (days/week) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        {...register('trainingFrequency', { required: 'Training frequency is required', min: { value: 1, message: 'Must be at least 1' }, max: { value: 7, message: 'Cannot exceed 7 days' } })}
                                    />
                                    {errors.trainingFrequency && <p className="mt-1 text-sm text-red-600">{errors.trainingFrequency.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Weekly Goal Hours <span className="text-gray-500">(optional)</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        {...register('weeklyGoalHours', { min: { value: 1, message: 'Must be at least 1' } })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Resting Heart Rate (bpm) <span className="text-gray-500">(optional)</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        {...register('restingHeartRate', { min: { value: 30, message: 'Must be at least 30' }, max: { value: 100, message: 'Must be less than 100' } })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Max Heart Rate (bpm) <span className="text-gray-500">(optional)</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        {...register('maxHeartRate', { min: { value: 100, message: 'Must be at least 100' }, max: { value: 220, message: 'Must be less than 220' } })}
                                    />
                                </div>

                                {/* Conditional Sport-specific fields */}
                                {(mainSport === 'running' || mainSport === 'triathlon') && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Run Pace (sec/km) <span className="text-gray-500">(optional)</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            {...register('runPace')}
                                        />
                                    </div>
                                )}

                                {(mainSport === 'cycling' || mainSport === 'triathlon') && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            FTP (watts) <span className="text-gray-500">(optional)</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            {...register('ftp')}
                                        />
                                    </div>
                                )}

                                {(mainSport === 'swimming' || mainSport === 'triathlon') && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Swim Pace (sec/100m) <span className="text-gray-500">(optional)</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            {...register('swimPace')}
                                        />
                                    </div>
                                )}

                                {mainSport === 'fitness' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Strength Level <span className="text-gray-500">(optional)</span>
                                        </label>
                                        <select
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            {...register('strengthLevel')}
                                        >
                                            <option value="light">Light</option>
                                            <option value="moderate">Moderate</option>
                                            <option value="heavy">Heavy</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Goals Tab */}
                    {activeTab === 'goals' && (
                        <div className="bg-white shadow rounded-lg p-6 space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900">Goals & Targets</h2>
                            
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Goal Type <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            {...register('goalType', { required: 'Goal type is required' })}
                                        >
                                            <option value="competition">🏆 Competition</option>
                                            <option value="weight_loss">⚖️ Weight Loss</option>
                                            <option value="performance">📈 Performance</option>
                                            <option value="wellness">💚 Wellness</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Goal Title <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            {...register('goalTitle', { required: 'Goal title is required' })}
                                        />
                                        {errors.goalTitle && <p className="mt-1 text-sm text-red-600">{errors.goalTitle.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Target Date <span className="text-gray-500">(optional)</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            {...register('goalDate')}
                                        />
                                    </div>

                                    {goalType === 'competition' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Time Target (HH:MM:SS) <span className="text-gray-500">(optional)</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="02:30:00"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                {...register('goalTimeTarget')}
                                            />
                                        </div>
                                    )}

                                    {goalType === 'weight_loss' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Target Weight (kg) <span className="text-gray-500">(optional)</span>
                                            </label>
                                            <input
                                                type="number"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                {...register('goalWeightTarget')}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Goal Description <span className="text-gray-500">(optional)</span>
                                    </label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                        {...register('goalDescription')}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Preferences Tab */}
                    {activeTab === 'preferences' && (
                        <div className="bg-white shadow rounded-lg p-6 space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900">Preferences & Settings</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Language <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        {...register('language', { required: 'Language is required' })}
                                    >
                                        <option value="en">🇬🇧 English</option>
                                        <option value="fr">🇫🇷 Français</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Unit System <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        {...register('unitSystem', { required: 'Unit system is required' })}
                                    >
                                        <option value="metric">Metric (km, kg)</option>
                                        <option value="imperial">Imperial (mi, lb)</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Timezone <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-lg text-gray-600"
                                        {...register('timezone')}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Current Injuries <span className="text-gray-500">(optional)</span>
                                    </label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                        placeholder="List any current injuries or physical limitations..."
                                        {...register('injuries')}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Notifications Enabled</label>
                                        <p className="text-xs text-gray-500">Receive training reminders and updates</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        {...register('notificationsEnabled')}
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Device Linked</label>
                                        <p className="text-xs text-gray-500">Connect wearables or fitness trackers</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        {...register('deviceLinked')}
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Coach Mode</label>
                                        <p className="text-xs text-gray-500">Get AI-powered training recommendations</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        {...register('coachMode')}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default ProfilePage;
