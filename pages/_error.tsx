import { NextPageContext, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

interface ErrorProps {
  statusCode?: number;
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <>
      <Image
        src="https://rickandmortyapi.com/api/character/avatar/234.jpeg"
        alt="a dead morty..."
      />

      <p>
        {statusCode
          ? `An error ${statusCode} occurred on 【server】`
          : "An error occurred on 【client】"}
      </p>

      <Link href="/">
        <a>Go back home</a>
      </Link>
    </>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
