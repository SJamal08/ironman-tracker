import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { OnboardingData } from '../../logic/model/User';

interface OnboardingStep4Props {
    data: Partial<OnboardingData>;
    onSubmit: (data: Partial<OnboardingData>) => void;
    onPrevious: () => void;
    isSubmitting: boolean;
}

const OnboardingStep4: React.FC<OnboardingStep4Props> = ({ data, onSubmit, onPrevious, isSubmitting }) => {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<Partial<OnboardingData>>({
        defaultValues: {
            ...data,
            timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
            notificationsEnabled: data.notificationsEnabled ?? true,
            deviceLinked: data.deviceLinked ?? false,
            coachMode: data.coachMode ?? false,
            language: data.language || 'en',
            unitSystem: data.unitSystem || 'metric',
            injuries: data.injuries || [],
        },
    });

    useEffect(() => {
        // Auto-detect timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setValue('timezone', timezone);
    }, [setValue]);

    const onSubmitForm = (formData: Partial<OnboardingData>) => {
        // Convert injuries from textarea string to array
        const processedData = { ...formData };
        if (typeof processedData.injuries === 'string') {
            const injuriesText = processedData.injuries as unknown as string;
            processedData.injuries = injuriesText ? injuriesText.split(',').map(i => i.trim()).filter(Boolean) : [];
        }
        
        onSubmit(processedData);
    };

    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Preferences
                </h2>
                <p className="text-gray-600">
                    Final settings to personalize your experience
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-5">
                {/* Language & Unit System */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                            Language *
                        </label>
                        <select
                            id="language"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            {...register('language', { required: 'Language is required' })}
                        >
                            <option value="en">🇬🇧 English</option>
                            <option value="fr">🇫🇷 Français</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="unitSystem" className="block text-sm font-medium text-gray-700 mb-1">
                            Unit System *
                        </label>
                        <select
                            id="unitSystem"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            {...register('unitSystem', { required: 'Unit system is required' })}
                        >
                            <option value="metric">Metric (km, kg)</option>
                            <option value="imperial">Imperial (mi, lb)</option>
                        </select>
                    </div>
                </div>

                {/* Timezone (auto-detected) */}
                <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                        Timezone (auto-detected)
                    </label>
                    <input
                        id="timezone"
                        type="text"
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-lg text-gray-600"
                        {...register('timezone')}
                    />
                </div>

                {/* Notifications Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                        <label htmlFor="notificationsEnabled" className="text-sm font-medium text-gray-700">
                            Enable Notifications
                        </label>
                        <p className="text-xs text-gray-500">Receive training reminders and updates</p>
                    </div>
                    <Controller
                        name="notificationsEnabled"
                        control={control}
                        render={({ field }) => (
                            <button
                                type="button"
                                onClick={() => field.onChange(!field.value)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    field.value ? 'bg-indigo-600' : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        field.value ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        )}
                    />
                </div>

                {/* Device Linked Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                        <label htmlFor="deviceLinked" className="text-sm font-medium text-gray-700">
                            Device Linked
                        </label>
                        <p className="text-xs text-gray-500">Connect wearables or fitness trackers</p>
                    </div>
                    <Controller
                        name="deviceLinked"
                        control={control}
                        render={({ field }) => (
                            <button
                                type="button"
                                onClick={() => field.onChange(!field.value)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    field.value ? 'bg-indigo-600' : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        field.value ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        )}
                    />
                </div>

                {/* Coach Mode Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                        <label htmlFor="coachMode" className="text-sm font-medium text-gray-700">
                            Coach Mode
                        </label>
                        <p className="text-xs text-gray-500">Get AI-powered training recommendations</p>
                    </div>
                    <Controller
                        name="coachMode"
                        control={control}
                        render={({ field }) => (
                            <button
                                type="button"
                                onClick={() => field.onChange(!field.value)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    field.value ? 'bg-indigo-600' : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        field.value ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        )}
                    />
                </div>

                {/* Injuries (optional) */}
                <div>
                    <label htmlFor="injuries" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Injuries (optional)
                    </label>
                    <textarea
                        id="injuries"
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                        placeholder="List any current injuries or physical limitations..."
                        {...register('injuries')}
                    />
                    <p className="mt-1 text-xs text-gray-500">This helps us provide safer training recommendations</p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onPrevious}
                        disabled={isSubmitting}
                        className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                        ← Previous
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Saving...' : 'Complete Setup ✓'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OnboardingStep4;
