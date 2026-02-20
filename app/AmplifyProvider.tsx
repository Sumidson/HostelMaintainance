"use client";

import { useEffect } from "react";
import { Amplify } from "aws-amplify";
import { Toaster } from "react-hot-toast";

export default function AmplifyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: "eu-north-1_mOzkWZbBi",
          userPoolClientId: "2hds26kjido6aiq60a7fcp7abc",
        },
      },
    });
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      {children}
    </>
  );
}
