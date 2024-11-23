import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCheckUser } from "./authSlice";
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

function Protected({ children }) {
  const location = useLocation();
  const user = useSelector(selectCheckUser);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const checkInterval = setInterval(() => {
        if (user) {
          clearInterval(checkInterval);
          setIsLoading(false);
        }
        // console.log("checked")
      }, 100); 

      const timeout = setTimeout(() => {
        clearInterval(checkInterval);
        setIsLoading(false);
      }, 500); 

      return () => {
        clearInterval(checkInterval);
        clearTimeout(timeout);
      };
    };

    fetchUser();
  }, [user]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" state={{ redirect: location.pathname }} />;
  }
}

export default Protected;
