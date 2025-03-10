import { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const ProtectedLayout = () => {
    const { user } = useContext(UserContext);
    const [isNavHidden, setIsNavHidden] = useState(true);

  if (!user?.access_token) {
    return <Navigate to="/" redirect />;
  }

  return (
    <>
        <Outlet />
    </>
  )
}