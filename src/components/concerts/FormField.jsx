import styles from './FormField.module.scss';

  export const FormField = ({
    id,
    label,
    type = 'text',
    value,
    onChange,
    onBlur,
    error,
    placeholder,
    disabled = false,
    required = false,
    maxLength,
    rows,
    children,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
  }) => {
    const isTextarea = type === 'textarea';
    const isSelect = type === 'select';
    let Component;

    if (isTextarea) {
      Component = 'textarea';
    } else if (isSelect) {
      Component = 'select';
    } else {
      Component = 'input';
    }

    return (
      <div className={styles.formGroup}>
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
        <Component
          id={id}
          type={!isTextarea && !isSelect ? type : undefined}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          placeholder={isSelect ? undefined : placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength && !isSelect ? maxLength : undefined}
          aria-label={ariaLabel || label}
          aria-describedby={error ? `${id}-error` : ariaDescribedBy}
        >
          {isSelect && children}
        </Component>
        {error && (
          <span id={`${id}-error`} className={styles.errorMessage}>
            {error}
          </span>
        )}
      </div>
    );
  };
