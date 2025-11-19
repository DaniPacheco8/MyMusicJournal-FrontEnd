import Router from './application/Router';
  import { ToastProvider } from './context/ToastContext';
  import { ErrorBoundary } from './components/common/ErrorBoundary';
  import { ToastContainer } from './components/common/Toast';
  import './App.scss';

  function App() {
    return (
      <ErrorBoundary>
        <ToastProvider>
          <div className="app">
            <Router />
          </div>
          <ToastContainer />
        </ToastProvider>
      </ErrorBoundary>
    );
  }

  export default App;