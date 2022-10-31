import { Suspense } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const CroppedText = dynamic(
  () => import("../src").then((module) => module.CroppedText),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <div>
      <Head>
        <title>React Cropped Text</title>
        <meta name="description" content="react-cropped-text component" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={`Loading...`}>
        {/* <div style={{ width: "300px" }}> */}
        <div>
          <CroppedText className="cropped-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </CroppedText>
        </div>
      </Suspense>
    </div>
  );
}
