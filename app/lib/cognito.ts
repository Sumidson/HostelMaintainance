import { Amplify } from "aws-amplify";

export function configureAmplify() {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: "us-east-1_lqGkKslXa",
        userPoolClientId: "7rvjne60os0cb12j6q11jdg4v4",
      },
    },
  });
}
