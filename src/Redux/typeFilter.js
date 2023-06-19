import { createSlice } from "@reduxjs/toolkit";

const type = new createSlice({
  name: "pokemon-type",
  initialState: { data: '' },
  reducers: {
    storeType: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { storeType } = type.actions;
export default type.reducer;
