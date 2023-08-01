import axios from "axios";
import React, { useEffect, useState } from "react";
import pokeColor from "./CardColor";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { storePokemon } from "../Redux/pokemonDetail";
import { Link } from "react-router-dom";
import { allData } from "../Redux/AllPokemon";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { removeBookmark, storeBookmark } from "../Redux/Bookmark";

function PokemonCard({ pokemon }) {
  const storeAllData = useSelector((state) => state.AllpokemonDetail.data);
  const [data, setData] = useState();
  const [booked, setBooked] = useState(false);

  const bookmark = useSelector((state) => state.bookmark.data);
  const dispatch = useDispatch();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    callPokemon();
    let isAvailable = bookmark.find((e) => pokemon.name === e.name);
    if (isAvailable) {
      setBooked(true);
    } else {
      setBooked(false);
    }
  }, [pokemon, bookmark]);

  const bookMark = () => {
    //pokemonDetails

    if (!booked) {
      dispatch(storeBookmark(pokemon));
      setBooked(true);
    } else {
      dispatch(removeBookmark(pokemon));
      setBooked(false);
    }
  };

  const callPokemon = async () => {
    try {
      let data = await axios.get(pokemon.url);
      setData(data.data);
      if (storeAllData.length < 20) {
        dispatch(allData(data.data));
      }
    } catch (e) {
      console.log(e, "error");
    }
  };

  const Dispatch = useDispatch();

  const detailPokemon = () => {
    Dispatch(storePokemon(data));
  };
  return (
    <>
      <div className="gridContainer" onClick={detailPokemon}>
        <div className="grid2">
          {data && (
            <div
              className="pokeType"
              style={{ backgroundColor: pokeColor[pokemon.name] }}
            >
              <img
                className="pokeImage"
                src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.id}.svg`}
                alt="pokemon"
              />

              <Grid container>
                <Grid item sx={{ display: "flex" }} xs={6}>
                  <div className="pokeName">{pokemon.name}</div>
                  {!booked ? (
                    <FavoriteBorderOutlinedIcon
                      className="save"
                      onClick={bookMark}
                      sx={{
                        color: "white",
                        marginTop: "0.7em",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <FavoriteOutlinedIcon
                      onClick={bookMark}
                      sx={{
                        color: "white",
                        marginTop: "0.7em",
                        cursor: "pointer",
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={6}>
                  <div className="pokeOwned">
                    <div>
                      # <span>{data.order}</span>
                    </div>
                  </div>
                </Grid>
              </Grid>

              <Link to="/pokemon-detail">
                <div className="pokeTypes">
                  {data.types.map((type, i) => {
                    return (
                      <div className="pokeSkill" key={i}>
                        {type.type.name}
                      </div>
                    );
                  })}
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PokemonCard;
