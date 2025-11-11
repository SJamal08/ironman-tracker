import React from 'react';
import { useForm } from 'react-hook-form';
import { OnboardingData, Gender, ExperienceLevel, MainSport } from '../../logic/model/User';

interface OnboardingStep1Props {
    data: Partial<OnboardingData>;
    onNext: (data: Partial<OnboardingData>) => void;
}

const OnboardingStep1: React.FC<OnboardingStep1Props> = ({ data, onNext }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Partial<OnboardingData>>({
        defaultValues: data,
    });

    const onSubmit = (formData: Partial<OnboardingData>) => {
        onNext(formData);
    };

    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Basic Profile
                </h2>
                <p className="text-gray-600">
                    Let's start with some basic information about you
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name *
                        </label>
                        <input
                            id="firstname"
                            type="text"
                            className={`w-full px-4 py-3 border ${
                                errors.firstname ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            placeholder="John"
                            {...register('firstname', { required: 'First name is required' })}
                        />
                        {errors.firstname && (
                            <p className="mt-1 text-sm text-red-600">{errors.firstname.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name *
                        </label>
                        <input
                            id="lastname"
                            type="text"
                            className={`w-full px-4 py-3 border ${
                                errors.lastname ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            placeholder="Doe"
                            {...register('lastname', { required: 'Last name is required' })}
                        />
                        {errors.lastname && (
                            <p className="mt-1 text-sm text-red-600">{errors.lastname.message}</p>
                        )}
                    </div>
                </div>

                {/* Birth Date & Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Birth Date *
                        </label>
                        <input
                            id="birthDate"
                            type="date"
                            className={`w-full px-4 py-3 border ${
                                errors.birthDate ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            {...register('birthDate', { required: 'Birth date is required' })}
                        />
                        {errors.birthDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.birthDate.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                            Gender *
                        </label>
                        <select
                            id="gender"
                            className={`w-full px-4 py-3 border ${
                                errors.gender ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            {...register('gender', { required: 'Gender is required' })}
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && (
                            <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
                        )}
                    </div>
                </div>

                {/* Height & Weight */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                            Height (cm) *
                        </label>
                        <input
                            id="height"
                            type="number"
                            className={`w-full px-4 py-3 border ${
                                errors.height ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            placeholder="180"
                            {...register('height', {
                                required: 'Height is required',
                                min: { value: 100, message: 'Height must be at least 100 cm' },
                                max: { value: 250, message: 'Height must be less than 250 cm' },
                            })}
                        />
                        {errors.height && (
                            <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                            Weight (kg) *
                        </label>
                        <input
                            id="weight"
                            type="number"
                            className={`w-full px-4 py-3 border ${
                                errors.weight ? 'border-red-300' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            placeholder="72"
                            {...register('weight', {
                                required: 'Weight is required',
                                min: { value: 30, message: 'Weight must be at least 30 kg' },
                                max: { value: 300, message: 'Weight must be less than 300 kg' },
                            })}
                        />
                        {errors.weight && (
                            <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
                        )}
                    </div>
                </div>

                {/* Experience Level */}
                <div>
                    <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
                        Experience Level *
                    </label>
                    <select
                        id="experienceLevel"
                        className={`w-full px-4 py-3 border ${
                            errors.experienceLevel ? 'border-red-300' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        {...register('experienceLevel', { required: 'Experience level is required' })}
                    >
                        <option value="">Select experience level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                    {errors.experienceLevel && (
                        <p className="mt-1 text-sm text-red-600">{errors.experienceLevel.message}</p>
                    )}
                </div>

                {/* Main Sport */}
                <div>
                    <label htmlFor="mainSport" className="block text-sm font-medium text-gray-700 mb-1">
                        Main Sport *
                    </label>
                    <select
                        id="mainSport"
                        className={`w-full px-4 py-3 border ${
                            errors.mainSport ? 'border-red-300' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        {...register('mainSport', { required: 'Main sport is required' })}
                    >
                        <option value="">Select main sport</option>
                        <option value="running">🏃 Running</option>
                        <option value="cycling">🚴 Cycling</option>
                        <option value="swimming">🏊 Swimming</option>
                        <option value="triathlon">🏊🚴🏃 Triathlon</option>
                        <option value="fitness">💪 Fitness</option>
                        <option value="other">🎯 Other</option>
                    </select>
                    {errors.mainSport && (
                        <p className="mt-1 text-sm text-red-600">{errors.mainSport.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Next Step →
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OnboardingStep1;
