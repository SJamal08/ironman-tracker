import React from 'react';
import Layout from '../components/Layout';

const HomePage: React.FC = () => {
    return (
        <Layout>
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Dashboard</h2>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span className="text-3xl">🏃</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Total Runs</p>
                                    <p className="text-2xl font-semibold text-gray-900">0</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span className="text-3xl">🚴</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Total Rides</p>
                                    <p className="text-2xl font-semibold text-gray-900">0</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span className="text-3xl">🏊</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Total Swims</p>
                                    <p className="text-2xl font-semibold text-gray-900">0</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Welcome Message */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Welcome to Ironman Tracker! 🎉
                        </h3>
                        <p className="text-gray-600">
                            Start tracking your triathlon training and progress. Monitor your runs, bike rides, and swims all in one place.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
