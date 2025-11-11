import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { OnboardingData, GoalType } from '../../logic/model/User';

interface OnboardingStep3Props {
    data: Partial<OnboardingData>;
    onNext: (data: Partial<OnboardingData>) => void;
    onPrevious: () => void;
}

const OnboardingStep3: React.FC<OnboardingStep3Props> = ({ data, onNext, onPrevious }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Partial<OnboardingData>>({
        defaultValues: data,
    });

    const goalType = useWatch({ control, name: 'goalType' });

    const onSubmit = (formData: Partial<OnboardingData>) => {
        onNext(formData);
    };

    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Your Goal
                </h2>
                <p className="text-gray-600">
                    What are you training for?
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Goal Type */}
                <div>
                    <label htmlFor="goalType" className="block text-sm font-medium text-gray-700 mb-1">
                        Goal Type *
                    </label>
                    <select
                        id="goalType"
                        className={`w-full px-4 py-3 border ${
                            errors.goalType ? 'border-red-300' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        {...register('goalType', { required: 'Goal type is required' })}
                    >
                        <option value="">Select goal type</option>
                        <option value="competition">🏆 Competition</option>
                        <option value="weight_loss">⚖️ Weight Loss</option>
                        <option value="performance">📈 Performance</option>
                        <option value="wellness">🧘 Wellness</option>
                    </select>
                    {errors.goalType && (
                        <p className="mt-1 text-sm text-red-600">{errors.goalType.message}</p>
                    )}
                </div>

                {/* Goal Title */}
                <div>
                    <label htmlFor="goalTitle" className="block text-sm font-medium text-gray-700 mb-1">
                        Goal Title *
                    </label>
                    <input
                        id="goalTitle"
                        type="text"
                        className={`w-full px-4 py-3 border ${
                            errors.goalTitle ? 'border-red-300' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        placeholder="e.g., Ironman Nice 2025"
                        {...register('goalTitle', { required: 'Goal title is required' })}
                    />
                    {errors.goalTitle && (
                        <p className="mt-1 text-sm text-red-600">{errors.goalTitle.message}</p>
                    )}
                </div>

                {/* Goal Date */}
                <div>
                    <label htmlFor="goalDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Target Date *
                    </label>
                    <input
                        id="goalDate"
                        type="date"
                        className={`w-full px-4 py-3 border ${
                            errors.goalDate ? 'border-red-300' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        {...register('goalDate', { required: 'Goal date is required' })}
                    />
                    {errors.goalDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.goalDate.message}</p>
                    )}
                </div>

                {/* Conditional Fields Based on Goal Type */}
                {goalType === 'competition' && (
                    <div>
                        <label htmlFor="goalTimeTarget" className="block text-sm font-medium text-gray-700 mb-1">
                            Time Target (HH:MM:SS)
                        </label>
                        <input
                            id="goalTimeTarget"
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="11:00:00"
                            {...register('goalTimeTarget', {
                                pattern: {
                                    value: /^([0-9]{1,2}):([0-5][0-9]):([0-5][0-9])$/,
                                    message: 'Format must be HH:MM:SS',
                                },
                            })}
                        />
                        {errors.goalTimeTarget && (
                            <p className="mt-1 text-sm text-red-600">{errors.goalTimeTarget.message}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">Your target finishing time</p>
                    </div>
                )}

                {goalType === 'weight_loss' && (
                    <div>
                        <label htmlFor="goalWeightTarget" className="block text-sm font-medium text-gray-700 mb-1">
                            Target Weight (kg)
                        </label>
                        <input
                            id="goalWeightTarget"
                            type="number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="70"
                            {...register('goalWeightTarget', {
                                min: { value: 30, message: 'Must be at least 30 kg' },
                                max: { value: 300, message: 'Must be less than 300 kg' },
                            })}
                        />
                        {errors.goalWeightTarget && (
                            <p className="mt-1 text-sm text-red-600">{errors.goalWeightTarget.message}</p>
                        )}
                    </div>
                )}

                {/* Goal Description */}
                <div>
                    <label htmlFor="goalDescription" className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                    </label>
                    <textarea
                        id="goalDescription"
                        rows={4}
                        className={`w-full px-4 py-3 border ${
                            errors.goalDescription ? 'border-red-300' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none`}
                        placeholder="Describe your goal and what you want to achieve..."
                        {...register('goalDescription', {
                            required: 'Description is required',
                            minLength: { value: 10, message: 'Description must be at least 10 characters' },
                        })}
                    />
                    {errors.goalDescription && (
                        <p className="mt-1 text-sm text-red-600">{errors.goalDescription.message}</p>
                    )}
                </div>

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

export default OnboardingStep3;
