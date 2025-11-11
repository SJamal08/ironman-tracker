import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../logic/redux/hooks';
import { updateUserProfile } from '../logic/redux/userSlice';
import { OnboardingData } from '../logic/model/User';
import { ROUTES } from './routes';
import OnboardingStep1 from '../components/onboarding/OnboardingStep1';
import OnboardingStep2 from '../components/onboarding/OnboardingStep2';
import OnboardingStep3 from '../components/onboarding/OnboardingStep3';
import OnboardingStep4 from '../components/onboarding/OnboardingStep4';

const OnboardingPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Partial<OnboardingData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);

    const totalSteps = 4;

    const handleNext = (stepData: Partial<OnboardingData>) => {
        setFormData((prev) => ({ ...prev, ...stepData }));
        
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleFinalSubmit = async (stepData: Partial<OnboardingData>) => {
        const completeData = { ...formData, ...stepData };
        setIsSubmitting(true);

        try {
            if (!user?.id) {
                throw new Error('User not authenticated');
            }

            // Update user profile in Firestore via repository/controller
            await dispatch(updateUserProfile({ 
                userId: user.id, 
                data: completeData 
            })).unwrap();
            
            console.log('Onboarding completed successfully');
            
            // Navigate to home page
            navigate(ROUTES.HOME);
        } catch (error) {
            console.error('Error saving onboarding data:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <OnboardingStep1
                        data={formData}
                        onNext={handleNext}
                    />
                );
            case 2:
                return (
                    <OnboardingStep2
                        data={formData}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                    />
                );
            case 3:
                return (
                    <OnboardingStep3
                        data={formData}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                    />
                );
            case 4:
                return (
                    <OnboardingStep4
                        data={formData}
                        onSubmit={handleFinalSubmit}
                        onPrevious={handlePrevious}
                        isSubmitting={isSubmitting}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                            Step {currentStep} of {totalSteps}
                        </span>
                        <span className="text-sm text-gray-500">
                            {Math.round((currentStep / totalSteps) * 100)}% Complete
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Step Content */}
                {renderStep()}
            </div>
        </div>
    );
};

export default OnboardingPage;
