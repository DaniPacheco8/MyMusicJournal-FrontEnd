import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Router from '../application/Router';

// Mock da API
vi.mock('../api/journalService', () => ({
  getJournalEntries: vi.fn(() => Promise.resolve([])),
  deleteJournalEntry: vi.fn(() => Promise.resolve({})),
}));

vi.mock('../api/concertService', () => ({
  getConcertsForMap: vi.fn(() => Promise.resolve([])),
}));

const renderApp = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Navigation Flow Integration Tests', () => {
  beforeEach(() => {
    // Clear localStorage antes de cada teste
    localStorage.clear();
  });

  it('should render landing page with Sign In and Register buttons when not authenticated', () => {
    renderApp();

    const signInButtons = screen.getAllByText('Sign In');
    const registerButtons = screen.getAllByText('Register');
    expect(signInButtons.length).toBeGreaterThan(0);
    expect(registerButtons.length).toBeGreaterThan(0);
  });

  it('should display Sign In link on landing page', () => {
    renderApp();

    const signInLink = screen.getByText('Sign In').closest('a');
    expect(signInLink).toHaveAttribute('href', '/login');
  });

  it('should display Register link on landing page', () => {
    renderApp();

    const registerLink = screen.getByText('Register').closest('a');
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  it('should show Features section on landing page', () => {
    renderApp();

    // Features section tem um heading com "Features"
    const featuresSectionExists =
      document.querySelector('[id="features"]') !== null;
    expect(featuresSectionExists).toBe(true);
  });

  it('should show How It Works section on landing page', () => {
    renderApp();

    // How It Works section tem um heading com id "how-it-works"
    const howItWorksSectionExists =
      document.querySelector('[id="how-it-works"]') !== null;
    expect(howItWorksSectionExists).toBe(true);
  });

  it('should protect dashboard route when not authenticated', async () => {
    window.history.pushState({}, 'Dashboard', '/dashboard');

    renderApp();

    // Quando não autenticado, deve redirecionar para home
    // Portanto, não deve mostrar conteúdo do dashboard
    await waitFor(() => {
      expect(screen.queryByText('Loading concerts...')).not.toBeInTheDocument();
    });
  });

  it('should protect map route when not authenticated', async () => {
    window.history.pushState({}, 'Map', '/map');

    renderApp();

    // Quando não autenticado, deve redirecionar
    await waitFor(() => {
      expect(screen.queryByText('My Concert Map')).not.toBeInTheDocument();
    });
  });

  it('should render navbar on all pages', () => {
    renderApp();

    const navbar = document.querySelector('nav');
    expect(navbar).toBeInTheDocument();
  });

  it('should have correct link structure in navigation', () => {
    renderApp();

    // Verifica que os links existem e apontam para os lugares certos
    const signInLink = screen.getByText('Sign In').closest('a');
    const registerLink = screen.getByText('Register').closest('a');

    expect(signInLink?.href).toContain('/login');
    expect(registerLink?.href).toContain('/register');
  });

  it('should render footer on landing page', () => {
    renderApp();

    const footer = document.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  it('should handle invalid routes by redirecting to home', () => {
    window.history.pushState({}, 'Invalid', '/invalid-route');

    renderApp();

    // Deve redirecionar para home, então navbar deve estar visível
    const navbars = screen.getAllByText('MyMusicJournal');
    expect(navbars.length).toBeGreaterThan(0);
  });
});
