import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useAuth } from '../../hooks/useAuth';
  import { registerUser } from '../../api/authService';
  import {
    isValidEmail,
    isValidPassword,
    passwordsMatch,
  } from '../../utils/validators';
  import { useToast } from '../../hooks/useToast';
  import styles from '../../styles/components/Auth.module.scss';

  export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const { register, setAuthError } = useAuth();
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

      if (!passwordConfirmation) {
        newErrors.passwordConfirmation = 'Password confirmation is required';
      } else if (!passwordsMatch(password, passwordConfirmation)) {
        newErrors.passwordConfirmation = 'Passwords do not match';
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
        const response = await registerUser(email, password, passwordConfirmation);
        register(
          { id: response.id, email: response.email },
          response.token || ''
        );
        success('Account created successfully');
        navigate('/dashboard');
      } catch (error) {
        const errorMessage = error.message || 'Registration failed. Please try again.';
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
            <h1>Create Account</h1>
            <p>Join MyMusicJournal today</p>
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

            {/* Password Confirmation Field */}
            <div className={styles.formGroup}>
              <label htmlFor="passwordConfirmation" className={styles.label}>
                Confirm Password
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  id="passwordConfirmation"
                  type={showPasswordConfirmation ? 'text' : 'password'}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  onBlur={() => validateForm()}
                  className={`${styles.input} ${errors.passwordConfirmation ? styles.inputError : ''}`}
                  placeholder="••••••••"
                  disabled={isLoading}
                  aria-label="Confirm password"
                  aria-describedby={errors.passwordConfirmation ? 'passwordConfirmation-error' :
  undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                  className={styles.togglePassword}
                  aria-label={showPasswordConfirmation ? 'Hide password' : 'Show password'}
                >
                  {showPasswordConfirmation ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.passwordConfirmation && (
                <span id="passwordConfirmation-error" className={styles.errorMessage}>
                  {errors.passwordConfirmation}
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
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <p className={styles.authFooter}>
            Already have an account?{' '}
            <a href="/login" className={styles.link}>
              Sign in here
            </a>
          </p>
        </div>
      </div>
    );
  };
