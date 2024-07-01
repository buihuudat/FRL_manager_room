import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoomModal } from "../../redux/slices/modalSlice";
import { LoadingButton } from "@mui/lab";
import {
  createRoomService,
  updateRoomService,
} from "../../services/roomService";
import { getsLocationService } from "../../services/locationService";

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

const RoomModal = () => {
  const { type, open, data } = useSelector((state) => state.modal.room);
  const dispatch = useDispatch();
  const [roomData, setRoomData] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (type === "edit" && data) setRoomData(data);
    getsLocationService().then((data) => setLocations(data));
  }, [type, data]);

  const handleClose = () => {
    setRoomData(null);
    dispatch(
      setRoomModal({
        type: null,
        open: false,
        data: null,
      })
    );
  };

  const handleChangeData = (e) => {
    setRoomData({
      ...roomData,
      [e.target.name]: ["tenPhong", "moTa"].includes(e.target.name)
        ? e.target.value
        : +e.target.value,
    });
  };

  const handleChangeSwitch = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      if (type === "edit") {
        await updateRoomService(roomData).then((data) => data && handleClose());
      } else {
        await createRoomService(roomData).then((data) => data && handleClose());
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
      setRoomData((prev) => ({
        ...prev,
        hinhAnh: reader.result,
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
          {type === "edit" ? `Edit Room` : "Create Room"}
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
            {roomData?.hinhAnh && (
              <Avatar
                src={roomData?.hinhAnh}
                sx={{ width: 100, height: 100, objectFit: "cover" }}
              />
            )}
            <input type="file" onChange={handleImageChange} />
          </Box>

          {type === "edit" && (
            <TextField
              label="Mã phòng"
              name="id"
              defaultValue={data?.id}
              disabled
            />
          )}
          <TextField
            label="Tên phòng"
            name="tenPhong"
            required
            value={roomData?.tenPhong}
            onChange={handleChangeData}
          />
          <TextField
            label="Mô tả"
            name="moTa"
            required
            value={roomData?.moTa}
            onChange={handleChangeData}
          />
          <TextField
            label="Số khách"
            name="khach"
            required
            type="number"
            value={roomData?.khach}
            onChange={handleChangeData}
          />
          <TextField
            label="Số phòng ngủ"
            name="phongNgu"
            required
            type="number"
            value={roomData?.phongNgu}
            onChange={handleChangeData}
          />
          <TextField
            label="Số giường"
            name="giuong"
            required
            type="number"
            value={roomData?.giuong}
            onChange={handleChangeData}
          />
          <TextField
            label="Số phòng tắm"
            name="phongTam"
            required
            type="number"
            value={roomData?.phongTam}
            onChange={handleChangeData}
          />
          <TextField
            label="Giá phòng"
            name="giaTien"
            required
            type="number"
            value={roomData?.giaTien}
            onChange={handleChangeData}
          />

          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel>Vị trí</InputLabel>
            <Select
              label="Vị trí"
              name="maViTri"
              required
              defaultValue={roomData?.maViTri}
              value={roomData?.maViTri}
              onChange={handleChangeData}
              renderValue={(e) => {
                const item = locations[e - 1];
                return (
                  <Box
                    key={item?.id}
                    value={item?.id}
                    className="flex flex-row gap-2 items-center"
                  >
                    <Avatar src={item?.hinhAnh} variant="square" />
                    <Typography>{item?.tenViTri}</Typography>
                  </Box>
                );
              }}
            >
              {locations?.map((item) => {
                return (
                  <MenuItem
                    key={item?.id}
                    value={item?.id}
                    className="flex flex-row gap-2"
                  >
                    <Avatar src={item?.hinhAnh} variant="square" />
                    <Typography>{item?.tenViTri}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={roomData?.mayGiat}
                name="mayGiat"
                onChange={handleChangeSwitch}
              />
            }
            label="Máy giặt"
          />
          <FormControlLabel
            control={
              <Switch
                checked={roomData?.banLa}
                name="banLa"
                onChange={handleChangeSwitch}
              />
            }
            label="Bàn Là"
          />
          <FormControlLabel
            control={
              <Switch
                checked={roomData?.banUi}
                name="banUi"
                onChange={handleChangeSwitch}
              />
            }
            label="Bàn Ui"
          />
          <FormControlLabel
            control={
              <Switch
                checked={roomData?.tivi}
                name="tivi"
                onChange={handleChangeSwitch}
              />
            }
            label="Tivi"
          />
          <FormControlLabel
            control={
              <Switch
                checked={roomData?.dieuHoa}
                name="dieuHoa"
                onChange={handleChangeSwitch}
              />
            }
            label="Điều hòa"
          />
          <FormControlLabel
            control={
              <Switch
                checked={roomData?.wifi}
                name="wifi"
                onChange={handleChangeSwitch}
              />
            }
            label="Wifi"
          />
          <FormControlLabel
            control={
              <Switch
                checked={roomData?.bep}
                name="bep"
                onChange={handleChangeSwitch}
              />
            }
            label="Bếp"
          />
          <FormControlLabel
            control={
              <Switch
                checked={roomData?.doXe}
                name="doXe"
                onChange={handleChangeSwitch}
              />
            }
            label="Đỗ xe"
          />
          <FormControlLabel
            control={
              <Switch
                checked={roomData?.hoBoi}
                name="hoBoi"
                onChange={handleChangeSwitch}
              />
            }
            label="Hồ bơi"
          />
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

export default memo(RoomModal);
