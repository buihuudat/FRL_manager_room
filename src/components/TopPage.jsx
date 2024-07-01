import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Title from "./common/Title";
import SearchIcon from "@mui/icons-material/Search";
import { memo, useState } from "react";

const TopPage = ({
  title,
  searchQuery,
  setSearchQuery,
  options,
  setOptions,
}) => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="flex flex-row pb-3 justify-between">
      <Title title={title} />
      <div className="flex flex-row gap-2">
        {options?.length ? (
          <FormControl sx={{ width: 200 }} size="small">
            <InputLabel id="demo-simple-select-label">Vị trí</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selected}
              label="Vị trí"
              onChange={(e) => {
                setSelected(e.target.value);
                setOptions(e.target.value);
              }}
            >
              {options?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item?.tenViTri}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : null}
        <TextField
          size="small"
          placeholder={`Enter search ${title.split(" ")[0]} ...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default memo(TopPage);
