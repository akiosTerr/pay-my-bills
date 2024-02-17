import { useAuthCtx } from "Contexts";
import LoginForm from "pages/loginForm";
import { FC } from "react";


const RequireAuth: FC<{ children: React.ReactElement }> = ({ children }) => {
  const authCtx = useAuthCtx()
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
