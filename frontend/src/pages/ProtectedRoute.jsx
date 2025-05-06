import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";

export default function ProtectedRoute({ Component, ...rest }) {
  const isAuthenticated = useSelector((state) => state.user.userProfile);
  const loadingStatus = useSelector((state) => state.user.accountLoading);
  if (loadingStatus) return <Loader />;

  return (
    <>
      {isAuthenticated ? (
        <Component {...rest} />
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
}
