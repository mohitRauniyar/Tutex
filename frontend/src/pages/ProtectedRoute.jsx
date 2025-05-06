import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom";

export default function ProtectedRoute ({Component,...rest}){
  const isAuthenticated = useSelector((state) => state.user.userProfile);
  console.log(isAuthenticated);
  return (
    <>
      {isAuthenticated ? (
        <Component {...rest}/>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
};
