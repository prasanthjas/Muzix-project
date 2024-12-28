import { useContext } from "react";
import { AuthContext, useAuth } from "./AuthContext";
import Login from "./Login";
import ProtectedLoginModel from "./PortectedLoginModel";

export default function ProtectedRoute({ children }) {
  const { isLogin } = useAuth();
  console.log(isLogin);
  if (!isLogin) {
    // If the user is not logged in, show the LoginModal
    return <ProtectedLoginModel/>;
  }

  // If the user is logged in, render the children
  return children;
}
