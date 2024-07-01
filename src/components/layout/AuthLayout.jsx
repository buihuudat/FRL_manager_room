import { Outlet, useNavigate } from "react-router-dom";
import { getData } from "../../utils/storage";
import { useEffect, useState } from "react";
import LoadingGlobal from "../common/LoadingGlobal";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { getUserService } from "../../services/userService";

const AuthLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const token = getData("token");
  const userId = getData("userId");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && userId) {
      getUserService(userId).then((data) => dispatch(setUser(data)));
      return navigate("/");
    }
    setIsLoading(false);
  }, [token, userId, navigate]);

  return isLoading ? <LoadingGlobal /> : <Outlet />;
};

export default AuthLayout;
