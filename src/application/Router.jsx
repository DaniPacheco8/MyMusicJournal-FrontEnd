import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Landing } from '../pages/Landing';
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import { ConcertsDashboard } from '../components/concerts/ConcertsDashboard';
import { ConcertFormModal } from '../components/concerts/ConcertFormModal';
import { Map } from '../pages/Map';
import { ProtectedRoute } from '../components/common/ProtectedRoute';

export const Router = () => {
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleAddConcert = () => {
    setSelectedEntry(null);
    setIsModalOpen(true);
  };

  const handleEditConcert = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  const handleModalSuccess = () => {
    handleCloseModal();
    // Trigger a refresh of the dashboard
    window.dispatchEvent(new Event('concert-updated'));
  };

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ConcertsDashboard
                onAddConcert={handleAddConcert}
                onEditConcert={handleEditConcert}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <Map />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Concert Form Modal */}
      <ConcertFormModal
        isOpen={isModalOpen}
        entry={selectedEntry}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
      />
    </>
  );
};

export default Router;
