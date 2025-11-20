import { Component } from 'react';
import styles from '../../styles/components/ErrorBoundary.module.scss';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Error boundary caught an error - display UI to user
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>Oops! Algo deu errado</h1>

            <p className={styles.message}>
              Desculpe, ocorreu um erro inesperado. Por favor, tente recarregar
              a página.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <details className={styles.details}>
                <summary>Detalhes do erro (desenvolvimento)</summary>
                <pre className={styles.errorStack}>
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}

            <button onClick={this.resetError} className={styles.button}>
              Tentar novamente
            </button>

            <a href="/" className={styles.link}>
              Voltar para home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
