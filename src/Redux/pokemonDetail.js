import { createSlice } from "@reduxjs/toolkit";

const pokemonDetails = new createSlice({
  name: "pokemon-detail",
  initialState: { data: {} },
  reducers: {
    storePokemon: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { storePokemon } = pokemonDetails.actions;
export default pokemonDetails.reducer;
