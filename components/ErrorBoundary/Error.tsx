import React from "react";

interface IProps {
  statusCode: number;
  errorMessage: string;
}

const Error: React.FC<IProps> = ({ statusCode = 404, errorMessage }) => {
  return (
    <div>
      <span>statusCode: {statusCode}</span>
      <span>errorMessage: {JSON.stringify(errorMessage, null, 2)}</span>
    </div>
  );
};

export default Error;
