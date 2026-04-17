import { useUser } from "@clerk/react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();

  // wait until Clerk loads
  if (!isLoaded) {
    return <div className="text-white p-10">Loading...</div>;
  }

  // block access if not logged in
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}