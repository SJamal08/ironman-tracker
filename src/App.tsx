import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './logic/redux/store';
import { useAppDispatch } from './logic/redux/hooks';
import { fetchCurrentUser } from './logic/redux/userSlice';
import Router from './pages/Router';
import './App.css';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Component to fetch current user on mount
const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch current user on app load
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return <Router />;
};

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
