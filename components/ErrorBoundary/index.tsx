import { NextPageContext } from "next";
import React from "react";

import { notify } from "lib/bugsnag";

import Error from "./Error";

interface IProps {
  error: any;
  statusCode: number;
}

class ErrorPage extends React.Component<IProps> {
  public static async getInitialProps(context: NextPageContext) {
    if (context.err) {
      notify(JSON.stringify(context.err));
    }

    return { statusCode: 404 };
  }

  public render() {
    const { error, statusCode } = this.props;

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
