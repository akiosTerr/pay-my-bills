import { useAuthCtx } from "Contexts";
import { useAuth } from "hooks/auth_hook";
import LoginForm from "pages/loginForm";
import { FC } from "react";
import { Navigate } from "react-router-dom";


const RequireAuth: FC<{ children: React.ReactElement }> = ({ children }) => {
  const authCtx = useAuthCtx()
  console.log(authCtx)
  if (authCtx && authCtx.isLoggedIn) {
    return children;
  } 
  if(authCtx && !authCtx.isLoggedIn) {
    return <LoginForm login={authCtx.login} />;
  } else {
    return <></>
  }
};

const withAuth = (WrappedComponent: React.FC) => {
  const WithAuthVal = () => {
    return (
      <RequireAuth>
        <WrappedComponent />
      </RequireAuth>
    );
  };
  return WithAuthVal;
};

export default withAuth;
