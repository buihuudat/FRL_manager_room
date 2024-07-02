import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { toggleToggleActions } from "../../redux/slices/appSlice";
import {
  setBookingModal,
  setLocationModal,
  setRoomModal,
  setUserModal,
} from "../../redux/slices/modalSlice";
import { useLocation } from "react-router-dom";
import { useCallback } from "react";

const actions = [
  // { icon: <EditIcon color="warning" />, name: "Edit" },
  // { icon: <DeleteIcon color="error" />, name: "Delete" },
  // { icon: <AddIcon color="success" />, name: "Add" },
];

export default function ToggleActions() {
  const { toggleActions } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleOpen = () => dispatch(toggleToggleActions({ open: true }));
  const handleClose = () =>
    dispatch(toggleToggleActions({ open: false, data: null, type: null }));

  const handleOpenModal = useCallback(() => {
    switch (pathname) {
      case "/users":
        dispatch(setUserModal({ open: true, type: "add", data: null }));
        break;
      case "/rooms":
        dispatch(setRoomModal({ open: true, type: "add", data: null }));
        break;
      case "/locations":
        dispatch(setLocationModal({ open: true, type: "add", data: null }));
        break;
      case "/booking":
        dispatch(setBookingModal({ open: true, type: "add", data: null }));
        break;
      default:
        console.error("Invalid path");
        break;
    }
  }, [pathname, dispatch]);

  return (
    <SpeedDial
      ariaLabel="SpeedDial tooltip example"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={toggleActions.open}
      hidden={["/booking", "/"].includes(pathname)}
      onClick={handleOpenModal}
    >
      {/* {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
        />
      ))} */}
    </SpeedDial>
  );
}
