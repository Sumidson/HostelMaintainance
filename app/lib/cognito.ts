import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "eu-north-1_mOzkWZbBi",
      userPoolClientId: "2hds26kjido6aiq60a7fcp7abc",
    },
  },
});