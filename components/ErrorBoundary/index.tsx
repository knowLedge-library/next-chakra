import type { ErrorInfo, FC, ReactNode } from "react";

import { Component, createContext, useContext } from "react";

export interface ErrorBoundaryState {
  error: Error | null;
}
export interface ErrorFallbackProps {
  error: Error;
  onReset: () => void;
}

export const ErrorBoundaryContext = createContext<ErrorFallbackProps | null>(
  null
);

export function useError(): ErrorFallbackProps | null {
  const errorBoundaryContext = useContext(ErrorBoundaryContext);
  if (errorBoundaryContext !== null) {
    console.error(
      "`useError` must be nested inside an `ErrorBoundaryProvider`."
    );
    return null;
  }

  return errorBoundaryContext;
}

export interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback: FC<ErrorFallbackProps> | JSX.Element;
  onError?: (error: Error, info: ErrorInfo) => void;
  onReset?: () => void;
}

const initialState = { error: null };

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.onReset = this.onReset.bind(this);

    this.state = initialState;
  }

  public static getDerivedStateFromError(
    error: Error
  ): Partial<ErrorBoundaryState> {
    return { error };
  }

  public override componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info);
  }

  onReset(): void {
    this.props.onReset?.();
    this.setState(initialState);
  }

  public override render() {
    const { error } = this.state;

    if (error !== null) {
      const { fallback: Fallback } = this.props;

      const contextValue = { error, onReset: this.onReset };

      return (
        <ErrorBoundaryContext.Provider value={contextValue}>
          {typeof Fallback === "function" ? (
            <Fallback {...contextValue} />
          ) : (
            Fallback
          )}
        </ErrorBoundaryContext.Provider>
      );
    }

    return <>{this.props.children}</>;
  }
}
