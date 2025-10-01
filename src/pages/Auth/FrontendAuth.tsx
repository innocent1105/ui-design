import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Localbase from "localbase";

const db = new Localbase("precisionDB");

const useSystemAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const users = await db.collection("user").get();

        if (!users || users.length === 0) {
          console.warn("No user logged in. Redirecting to login...");
          navigate("/login");
        } else {
        
          localStorage.setItem("user_id", users[0].user_id);
        }

        return users;
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/login");
      }
    };

    checkAuth();
  }, []);
};

export default useSystemAuth;
