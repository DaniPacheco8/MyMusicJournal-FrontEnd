import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useAuth } from '../../hooks/useAuth';
  import { loginUser } from '../../api/authService';
  import { isValidEmail, isValidPassword } from '../../utils/validators';
  import { useToast } from '../../hooks/useToast';
  import styles from '../../styles/components/Auth.module.scss';

  export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login, setAuthError } = useAuth();
    const { error: showError, success } = useToast();
    const navigate = useNavigate();

    const validateForm = () => {
      const newErrors = {};

      if (!email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!isValidEmail(email)) {
        newErrors.email = 'Invalid email format';
      }

      if (!password) {
        newErrors.password = 'Password is required';
      } else if (!isValidPassword(password)) {
        newErrors.password = 'Password must be between 6 and 100 characters';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        showError('Please fix the errors in the form');
        return;
      }

      setIsLoading(true);
      setAuthError(null);

      try {
        const response = await loginUser(email, password);
        login(
          { id: response.id, email: response.email },
          response.token
        );
        success('Logged in successfully');
        navigate('/dashboard');
      } catch (error) {
        const errorMessage = error.message || 'Login failed. Please try again.';
        setAuthError(errorMessage);
        showError(errorMessage);
        setErrors({ submit: errorMessage });
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <h1>Sign In</h1>
            <p>Welcome back to MyMusicJournal</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.authForm}>
            {/* Email Field */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateForm()}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="your@email.com"
                disabled={isLoading}
                aria-label="Email address"
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <span id="email-error" className={styles.errorMessage}>
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => validateForm()}
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                  placeholder="••••••••"
                  disabled={isLoading}
                  aria-label="Password"
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.togglePassword}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && (
                <span id="password-error" className={styles.errorMessage}>
                  {errors.password}
                </span>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className={styles.submitError} role="alert">
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Register Link */}
          <p className={styles.authFooter}>
            Do not have an account?{' '}
            <a href="/register" className={styles.link}>
              Register here
            </a>
          </p>
        </div>
      </div>
    );
  };