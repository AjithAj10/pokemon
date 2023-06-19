import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../../Redux/typeFilter";

export default function MenuBar({ data, title }) {

  const dispatch = useDispatch();
const type = useSelector(state => state.type.data)
  const handleChange = (event) => {
    dispatch(storeType(event.target.value));
  };
  
  const types = ["All","grass","fire","bug","water","normal"];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="type"
          onChange={handleChange}
        >
          {types &&
            types.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
        </Select>
      </FormControl>
    </Box>
  );
}
