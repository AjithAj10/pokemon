import { createSlice } from "@reduxjs/toolkit";

const Bookmarks = new createSlice({
  name: "bookmarks",
  initialState: { data: ['bulbasaur'] },
  reducers: {
    storeBookmark: (state, action) => {
       state.data.push(action.payload);
    },
  },
});

export const { storeBookmark } = Bookmarks.actions;
export default Bookmarks.reducer;
