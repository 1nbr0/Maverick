import React, { useState } from "react";
import RegisterForms from "../../components/loginForms/RegisterForms";
import LoginForms from "../../components/loginForms/LoginForm";

const LoginView = () => {
  const [data, setData] = useState(false);

  const childToParent = (childData) => {
    setData(childData);
  };

  return (
    <>
      <div className="bg-login">
        <div className="flex h-full flex-col justify-center items-center gap-4 p-6">
          {data === true ? (
            <RegisterForms childToParent={childToParent} />
          ) : (
            <LoginForms childToParent={childToParent} />
          )}
        </div>
      </div>
    </>
  );
};

export default LoginView;
