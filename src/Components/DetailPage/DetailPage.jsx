import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import "./detailPage.scss";
import pokeColor from "../CardColor";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Grid } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import axios from "axios";

function DetailPage() {
  const pokemonDetails = useSelector((state) => state.detail.data);

  const [species, setSpecies] = useState();
  const [booked, setBooked] = useState(false);

  localStorage.setItem("data", JSON.stringify([]));
  let bookmarks = JSON.parse(localStorage.getItem("data"));

  const speciesFn = async () => {
    try {
      let species = await axios.get(pokemonDetails?.species?.url);
      setSpecies(species);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    speciesFn();
    if (bookmarks.includes(pokemonDetails.name)) {
      setBooked(true);
    }
  }, []);

  const bookMark = () => {
    setBooked(true);
    //pokemonDetails

    //bookmarks
    localStorage.setItem(
      "data",
      JSON.stringify([...bookmarks, pokemonDetails.name])
    );

    const bookmark3 = JSON.parse(localStorage.getItem('data'));

    console.log(bookmark3);
  };

  return (
    <>
      <div
        className="detail-container"
        style={{ backgroundColor: pokeColor[pokemonDetails.name] }}
      >
        <div className="top-container">
          <div className="contents">
            <div className="header">
              <div className="title">{pokemonDetails.name}</div>
              {!booked ? (
                <FavoriteBorderOutlinedIcon
                  className="save"
                  sx={{ cursor: "pointer" }}
                  onClick={bookMark}
                />
              ) : (
                <FavoriteOutlinedIcon
                  className="save"
                  sx={{ cursor: "pointer" }}
                  onClick={bookMark}
                />
              )}
            </div>
            <Grid item xs={6}>
              <div className="pokeOwned">
                <div>
                  <span className="pokeId">#0{pokemonDetails.order}</span>
                </div>
              </div>
            </Grid>
            <div className="features">
              {pokemonDetails?.types?.map((type, i) => {
                return (
                  <div className="pokeSkill" key={i}>
                    {type.type.name}
                  </div>
                );
              })}
            </div>
            <div className="img">
              <img
                className="pokeImage"
                src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonDetails.id}.svg`}
                alt="pokemon"
              />
            </div>
          </div>
        </div>
        <div className="bottom-container">
          <div className="nav">
            <div className="item">About</div>
          </div>
          <div className="main-content">
            <div className="title-sec">
              <div className="sec">
                <div className="head">Species</div>
                <div className="body">{pokemonDetails?.species?.name}</div>
              </div>
              <div className="sec">
                <div className="head">Height</div>
                <div className="body">{pokemonDetails?.height}</div>
              </div>
              <div className="sec">
                <div className="head">Weight</div>
                <div className="body">{pokemonDetails?.weight}</div>
              </div>
              <div className="sec">
                <div className="head">Abilities</div>
                <div className="body">
                  {pokemonDetails?.abilities?.map((ab) => {
                    return (
                      <span>
                        {ab.ability.name}
                        {", "}
                      </span>
                    );
                  })}
                </div>
              </div>
              {species && (
                <>
                  <div className="sub-title">Breeding </div>

                  <div className="sec">
                    <div className="head">gender</div>
                    <div className="body">
                      <MaleIcon sx={{ color: "indigo" }} />
                      {species.data.base_happiness}{" "}
                      <FemaleIcon sx={{ color: "violet" }} />
                      {species.data.capture_rate}
                    </div>
                  </div>
                  <div className="sec">
                    <div className="head">Egg Groups</div>
                    <div className="body">
                      {species.data.egg_groups.map((egg) => {
                        return (
                          <span>
                            {egg.name}
                            {", "}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="sec">
                    <div className="head">Egg Cycle</div>
                    <div className="body">
                      {pokemonDetails?.types[0].type.name}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailPage;
