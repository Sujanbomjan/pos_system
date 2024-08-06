import SignInForm from "./sign-in-form";
import AuthWrapperThree from "@/app/shared/auth-layout/auth-wrapper-three";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Sign In"),
};

export default function SignIn() {
  return (
    <AuthWrapperThree title={<></>} isSignIn isSocialLoginActive={true}>
      <SignInForm />
    </AuthWrapperThree>
  );
}
