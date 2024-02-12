import { useAuth } from "hooks/auth_hook";
import LoginForm from "pages/loginForm";
import { FC } from "react";

const RequireAuth: FC<{ children: React.ReactElement }> = ({ children }) => {
  const { loggedIn, login } = useAuth();
  if (!loggedIn) {
    return <LoginForm login={login} />
  }
  return children;
};

const withAuth = (WrappedComponent: React.FC) => {
    const WithAuthVal: React.FC = () => {
        return(
          <RequireAuth>
            <WrappedComponent/>
          </RequireAuth>
        ) 
    };
  return WithAuthVal
};


export default withAuth;
