import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCheckUser } from "./authSlice";
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

function ProtectedAdmin({ children }) {
  const location = useLocation();
  const user = useSelector(selectCheckUser);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (user && user.role === "admin") {
        const checkInterval = setInterval(() => {
          if (user && user.role === "admin") {
            clearInterval(checkInterval);
            setIsLoading(false);
          }
        }, 50); 

        const timeout = setTimeout(() => {
          clearInterval(checkInterval);
          setIsLoading(false);
        }, 500); 

        return () => {
          clearInterval(checkInterval);
          clearTimeout(timeout);
        };
      } else {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (user && user.role === "admin") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default ProtectedAdmin;
