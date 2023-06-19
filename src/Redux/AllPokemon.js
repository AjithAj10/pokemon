import { createSlice } from "@reduxjs/toolkit";

const AllPokemon = new createSlice({
  name: "AllPokemon",
  initialState: { data: [] },
  reducers: {
    allData: (state, action) => {
     
      state.data.push(action.payload);
    },
  },
});

export const { allData } = AllPokemon.actions;
export default AllPokemon.reducer;