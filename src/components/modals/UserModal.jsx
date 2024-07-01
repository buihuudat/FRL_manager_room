import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserModal } from "../../redux/slices/modalSlice";
import { convertDateToISO, uploadImage } from "../../utils";
import { LoadingButton } from "@mui/lab";
import {
  createUserService,
  updateUserService,
} from "../../services/userService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

const UserModal = () => {
  const { type, open, data } = useSelector((state) => state.modal.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);

  useEffect(() => {
    if (type === "edit" && data) setUserData(data);
  }, [type, data]);

  const handleClose = () => {
    setUserData(null);
    dispatch(
      setUserModal({
        type: null,
        open: false,
        data: null,
      })
    );
  };

  const handleChangeData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      // const dataUpdate = userData;
      // await uploadImage(imageSelected).then(
      //   (res) => res && (dataUpdate.avatar = res)
      // );
      if (type === "edit") {
        await updateUserService(userData).then((data) => data && handleClose());
      } else {
        await createUserService(userData).then((data) => data && handleClose());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSelected(file);
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUserData((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign={"center"}
        >
          {type === "edit" ? `Edit User` : "Create User"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3,
            mt: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {userData?.avatar && (
              <Avatar
                src={userData?.avatar}
                sx={{ width: 100, height: 100, objectFit: "cover" }}
              />
            )}
            <input type="file" onChange={handleImageChange} />
          </Box>

          {type === "edit" && (
            <TextField
              label="Mã người dùng"
              name="id"
              defaultValue={data?.id}
              disabled
            />
          )}
          <TextField
            label="Tên người dùng"
            name="name"
            required
            value={userData?.name}
            onChange={handleChangeData}
          />
          <TextField
            label="Số điện thoại"
            name="phone"
            value={userData?.phone}
            onChange={handleChangeData}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={userData?.email}
            onChange={handleChangeData}
            required
          />
          {type === "add" && (
            <TextField
              label="Mật khẩu"
              name="password"
              type="password"
              defaultValue={data?.id}
              required
            />
          )}
          <TextField
            label="Ngày sinh"
            type="date"
            name="birthday"
            value={
              type === "edit"
                ? convertDateToISO(userData?.birthday)
                : userData?.birthday
            }
            onChange={handleChangeData}
            required
          />
          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Gender"
              name="gender"
              required
              value={userData?.gender}
              onChange={handleChangeData}
            >
              <MenuItem value={true}>Male</MenuItem>
              <MenuItem value={false}>Female</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel>Chức vụ</InputLabel>
            <Select
              label="Chức vụ"
              name="role"
              required
              value={userData?.role}
              onChange={handleChangeData}
            >
              <MenuItem value={"ADMIN"}>admin</MenuItem>
              <MenuItem value={"USER"}>user</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", mt: 3, justifyContent: "center", gap: 3 }}>
          <Button color="warning" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            color="success"
            variant="contained"
            onClick={handleSubmit}
            loading={isLoading}
          >
            {type === "edit" ? "Update" : "Create"}
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(UserModal);
