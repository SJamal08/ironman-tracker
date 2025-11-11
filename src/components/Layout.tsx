import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../logic/redux/hooks';
import { logoutUser } from '../logic/redux/userSlice';
import { ROUTES } from '../pages/routes';

interface LayoutProps {
    children: React.ReactNode;
}

interface NavItem {
    name: string;
    path: string;
    icon: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { user } = useAppSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        setSidebarOpen(false);
    };

    const navItems: NavItem[] = [
        { name: 'Dashboard', path: ROUTES.HOME, icon: '🏠' },
        { name: 'Profile', path: ROUTES.PROFILE, icon: '👤' },
        // Add more navigation items here as you build features
    ];

    const isActiveRoute = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Hamburger Button */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm lg:hidden">
                <div className="flex items-center justify-between px-4 py-3">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {sidebarOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">Ironman Tracker</h1>
                    <div className="w-10"></div> {/* Spacer for centering */}
                </div>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo - Hidden on mobile (shown in top bar) */}
                    <div className="hidden lg:flex items-center justify-center h-16 border-b border-gray-200">
                        <h1 className="text-xl font-bold text-indigo-600">Ironman Tracker</h1>
                    </div>

                    {/* User Info */}
                    <div className="p-4 border-b border-gray-200 mt-14 lg:mt-0">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                                {user?.firstname?.charAt(0)}{user?.lastname?.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {user?.firstname} {user?.lastname}
                                </p>
                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                            isActiveRoute(item.path)
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-200">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium"
                        >
                            <span className="text-xl">🚪</span>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Spacer for mobile top bar */}
                <div className="h-14 lg:hidden"></div>
                
                {/* Page Content */}
                <main className="min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
