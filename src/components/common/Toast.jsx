import { useToast } from '../../hooks/useToast';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import styles from '../../styles/components/Toast.module.scss';

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return <CheckCircle size={20} />;
    case 'error':
      return <AlertCircle size={20} />;
    case 'warning':
      return <AlertTriangle size={20} />;
    case 'info':
    default:
      return <Info size={20} />;
  }
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
          role="alert"
          aria-live="polite"
        >
          <div className={styles.icon}>
            {getIcon(toast.type)}
          </div>

          <div className={styles.message}>
            {toast.message}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className={styles.closeBtn}
            aria-label="Fechar notificação"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};
