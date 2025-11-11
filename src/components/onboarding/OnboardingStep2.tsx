import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { OnboardingData, DayOfWeek } from '../../logic/model/User';

interface OnboardingStep2Props {
    data: Partial<OnboardingData>;
    onNext: (data: Partial<OnboardingData>) => void;
    onPrevious: () => void;
}

const days: { value: DayOfWeek; label: string }[] = [
    { value: 'monday', label: 'Mon' },
    { value: 'tuesday', label: 'Tue' },
    { value: 'wednesday', label: 'Wed' },
    { value: 'thursday', label: 'Thu' },
    { value: 'friday', label: 'Fri' },
    { value: 'saturday', label: 'Sat' },
    { value: 'sunday', label: 'Sun' },
];

const OnboardingStep2: React.FC<OnboardingStep2Props> = ({ data, onNext, onPrevious }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Partial<OnboardingData>>({
        defaultValues: {
            ...data,
            preferredDays: data.preferredDays || [],
        },
    });

    const mainSport = data.mainSport;
    const showRunPace = mainSport === 'running' || mainSport === 'triathlon';
    const showFtp = mainSport === 'cycling' || mainSport === 'triathlon';
    const showSwimPace = mainSport === 'swimming' || mainSport === 'triathlon';
    const showStrength = mainSport === 'fitness';

    const onSubmit = (formData: Partial<OnboardingData>) => {
        onNext(formData);
    };

    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Sports Profile
                </h2>
                <p className="text-gray-600">
                    Tell us about your training habits and performance metrics
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Training Frequency & Weekly Goal Hours */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="trainingFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                            Training Frequency (sessions/week) *
                        </label>
                        <input
                            id="trainingFrequency"
                            type="number"
                            className={`w-full px-4 py-3 border ${
                                errors.trainingFrequency ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            placeholder="5"
                            {...register('trainingFrequency', {
                                required: 'Training frequency is required',
                                min: { value: 1, message: 'Must be at least 1' },
                                max: { value: 14, message: 'Must be less than 15' },
                            })}
                        />
                        {errors.trainingFrequency && (
                            <p className="mt-1 text-sm text-red-600">{errors.trainingFrequency.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="weeklyGoalHours" className="block text-sm font-medium text-gray-700 mb-1">
                            Weekly Goal (hours) *
                        </label>
                        <input
                            id="weeklyGoalHours"
                            type="number"
                            className={`w-full px-4 py-3 border ${
                                errors.weeklyGoalHours ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            placeholder="10"
                            {...register('weeklyGoalHours', {
                                required: 'Weekly goal is required',
                                min: { value: 1, message: 'Must be at least 1' },
                                max: { value: 40, message: 'Must be less than 41' },
                            })}
                        />
                        {errors.weeklyGoalHours && (
                            <p className="mt-1 text-sm text-red-600">{errors.weeklyGoalHours.message}</p>
                        )}
                    </div>
                </div>

                {/* Preferred Days */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Training Days *
                    </label>
                    <Controller
                        name="preferredDays"
                        control={control}
                        rules={{ required: 'Select at least one day' }}
                        render={({ field }) => (
                            <div className="flex flex-wrap gap-2">
                                {days.map((day) => {
                                    const isSelected = field.value?.includes(day.value);
                                    return (
                                        <button
                                            key={day.value}
                                            type="button"
                                            onClick={() => {
                                                const currentDays = field.value || [];
                                                if (isSelected) {
                                                    field.onChange(currentDays.filter((d) => d !== day.value));
                                                } else {
                                                    field.onChange([...currentDays, day.value]);
                                                }
                                            }}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                isSelected
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {day.label}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    />
                    {errors.preferredDays && (
                        <p className="mt-1 text-sm text-red-600">{errors.preferredDays.message}</p>
                    )}
                </div>

                {/* Heart Rate */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="restingHeartRate" className="block text-sm font-medium text-gray-700 mb-1">
                            Resting Heart Rate (bpm) *
                        </label>
                        <input
                            id="restingHeartRate"
                            type="number"
                            className={`w-full px-4 py-3 border ${
                                errors.restingHeartRate ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            placeholder="50"
                            {...register('restingHeartRate', {
                                required: 'Resting heart rate is required',
                                min: { value: 30, message: 'Must be at least 30' },
                                max: { value: 100, message: 'Must be less than 101' },
                            })}
                        />
                        {errors.restingHeartRate && (
                            <p className="mt-1 text-sm text-red-600">{errors.restingHeartRate.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="maxHeartRate" className="block text-sm font-medium text-gray-700 mb-1">
                            Max Heart Rate (bpm) *
                        </label>
                        <input
                            id="maxHeartRate"
                            type="number"
                            className={`w-full px-4 py-3 border ${
                                errors.maxHeartRate ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            placeholder="180"
                            {...register('maxHeartRate', {
                                required: 'Max heart rate is required',
                                min: { value: 100, message: 'Must be at least 100' },
                                max: { value: 220, message: 'Must be less than 221' },
                            })}
                        />
                        {errors.maxHeartRate && (
                            <p className="mt-1 text-sm text-red-600">{errors.maxHeartRate.message}</p>
                        )}
                    </div>
                </div>

                {/* Conditional Sport-Specific Fields */}
                {showRunPace && (
                    <div>
                        <label htmlFor="runPace" className="block text-sm font-medium text-gray-700 mb-1">
                            Run Pace (sec/km)
                        </label>
                        <input
                            id="runPace"
                            type="number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="270"
                            {...register('runPace', {
                                min: { value: 180, message: 'Must be at least 180 sec/km' },
                                max: { value: 600, message: 'Must be less than 600 sec/km' },
                            })}
                        />
                        <p className="mt-1 text-xs text-gray-500">Average pace per kilometer in seconds</p>
                    </div>
                )}

                {showFtp && (
                    <div>
                        <label htmlFor="ftp" className="block text-sm font-medium text-gray-700 mb-1">
                            FTP (watts)
                        </label>
                        <input
                            id="ftp"
                            type="number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="250"
                            {...register('ftp', {
                                min: { value: 50, message: 'Must be at least 50 watts' },
                                max: { value: 500, message: 'Must be less than 500 watts' },
                            })}
                        />
                        <p className="mt-1 text-xs text-gray-500">Functional Threshold Power</p>
                    </div>
                )}

                {showSwimPace && (
                    <div>
                        <label htmlFor="swimPace" className="block text-sm font-medium text-gray-700 mb-1">
                            Swim Pace (sec/100m)
                        </label>
                        <input
                            id="swimPace"
                            type="number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="95"
                            {...register('swimPace', {
                                min: { value: 60, message: 'Must be at least 60 sec/100m' },
                                max: { value: 300, message: 'Must be less than 300 sec/100m' },
                            })}
                        />
                        <p className="mt-1 text-xs text-gray-500">Average pace per 100 meters</p>
                    </div>
                )}

                {showStrength && (
                    <div>
                        <label htmlFor="strengthLevel" className="block text-sm font-medium text-gray-700 mb-1">
                            Strength Level
                        </label>
                        <select
                            id="strengthLevel"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            {...register('strengthLevel')}
                        >
                            <option value="">Select level</option>
                            <option value="light">Light</option>
                            <option value="moderate">Moderate</option>
                            <option value="heavy">Heavy</option>
                        </select>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onPrevious}
                        className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
                    >
                        ← Previous
                    </button>
                    <button
                        type="submit"
                        className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                    >
                        Next Step →
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OnboardingStep2;
