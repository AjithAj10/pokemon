import { createSlice } from "@reduxjs/toolkit";

const Bookmarks = new createSlice({
  name: "bookmarks",
  initialState: { data: [] },
  reducers: {
    storeBookmark: (state, action) => {
      state.data.push(action.payload);
    },
    removeBookmark: (state, action) => {
      let filteredData = state.data.filter(
        (el) => el.name !== action.payload.name
      );

      state.data = filteredData;
    },
  },
});

export const { storeBookmark,removeBookmark } = Bookmarks.actions;
export default Bookmarks.reducer;
