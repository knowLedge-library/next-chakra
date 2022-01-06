import { NextPageContext } from "next";
import React, { ErrorInfo } from "react";

import { notify } from "lib/bugsnag";

import Error from "./Error";

interface IState {
  hasError: boolean;
}
interface IProps {
  statusCode?: number;
  error: Error;
  info: ErrorInfo;
  clearError: () => void;
}

class ErrorPage extends React.Component<IProps, IState> {
  public static async getInitialProps(context: NextPageContext) {
    if (context.err) {
      notify(JSON.stringify(context.err));
    }

    return { statusCode: 404 };
  }

  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.log(error, "err");

    return { hasError: true };
  }

  public render() {
    const { error, statusCode } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return "has some error";
    }

    if (!error && !statusCode) return <></>;

    return (
      <Error
        statusCode={statusCode}
        errorMessage={error ? error.message : ""}
      />
    );
  }
}

export default ErrorPage;
