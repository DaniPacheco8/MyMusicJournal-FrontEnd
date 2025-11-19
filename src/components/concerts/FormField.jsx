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

  const commonProps = {
    id,
    value,
    onChange,
    onBlur,
    className: `${styles.input} ${error ? styles.inputError : ''}`,
    disabled,
    'aria-label': ariaLabel || label,
    'aria-describedby': error ? `${id}-error` : ariaDescribedBy,
  };

  let inputElement;

  if (isTextarea) {
    inputElement = (
      <textarea
        {...commonProps}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
      />
    );
  } else if (isSelect) {
    inputElement = (
      <select {...commonProps} placeholder={undefined}>
        {children}
      </select>
    );
  } else {
    inputElement = (
      <input
        {...commonProps}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    );
  }

  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      {inputElement}
      {error && (
        <span id={`${id}-error`} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
};
