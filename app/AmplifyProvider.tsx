"use client";

import { useEffect } from "react";
import { Amplify } from "aws-amplify";

export default function AmplifyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: "us-east-1_lqGkKslXa",
          userPoolClientId: "7rvjne60os0cb12j6q11jdg4v4",
        },
      },
    });
  }, []);

  return <>{children}</>;
}
