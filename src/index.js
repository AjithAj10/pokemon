import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import detailReducer from "./Redux/pokemonDetail";
import allDetailReducer from "./Redux/AllPokemon";
import typeReducer from "./Redux/typeFilter";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPage from "./Components/DetailPage/DetailPage";
import Bookmark from "./Components/Bookmarks/BookmarkPage";

const store = new configureStore({
  reducer: {
    detail: detailReducer,
    AllpokemonDetail: allDetailReducer,
    type : typeReducer,
  },
});
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/pokemon-detail" element={<DetailPage />} />
          <Route path="/bookmarks" element={<Bookmark />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
