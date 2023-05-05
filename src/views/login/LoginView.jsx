import React from "react";
import LoginForms from "../../components/loginForms/LoginForms";

const LoginView = () => {
  return (
    <>
      <div className="bg-login">
        <div className="flex h-full flex-col justify-center items-center gap-4 p-6">
          <LoginForms />
        </div>
      </div>
    </>
  );
};

export default LoginView;
