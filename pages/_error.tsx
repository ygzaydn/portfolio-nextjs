import React from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import { useRouter } from "next/router";

type ErrorProps = {
  statusCode?: number;
};

const ErrorPage: React.FC<ErrorProps> & { getInitialProps?: any } = ({
  statusCode,
}) => {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>{statusCode ? `${statusCode} - Error` : "Error"}</title>
      </Head>

      <main className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl text-center p-8">
          <h1 className="text-5xl font-bold mb-4">{statusCode ?? "Error"}</h1>
          <p className="text-lg text-slate-300 mb-6">
            An unexpected error occurred.
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => router.push("/")}
            >
              Go to Homepage
            </button>
            <button
              className="px-4 py-2 bg-slate-700 text-white rounded-md"
              onClick={() => router.push("/blog")}
            >
              View Blog
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

ErrorPage.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
