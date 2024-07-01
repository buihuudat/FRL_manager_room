import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getData } from "../../utils/storage";
import LoadingGlobal from "../common/LoadingGlobal";
import { getUserService } from "../../services/userService";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import Header from "../Header";
import SideBar from "../SideBar";
import { Box } from "@mui/material";
import DrawerHeader from "../common/DrawerHeader";
import ToggleActions from "../common/ToggleActions";

const AppLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = getData("token");
  const userId = getData("userId");

  useEffect(() => {
    if (!token || !userId) {
      return navigate("/login");
    }

    getUserService(userId).then((data) => {
      dispatch(setUser(data));
      setIsLoading(false);
    });
  }, [token, userId, navigate]);

  return isLoading ? (
    <LoadingGlobal />
  ) : (
    <Box sx={{ display: "flex" }}>
      <Header />
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
        <ToggleActions />
      </Box>
    </Box>
  );
};

export default AppLayout;
