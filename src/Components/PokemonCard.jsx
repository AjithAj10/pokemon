import axios from "axios";
import React, { useEffect, useState } from "react";
import pokeColor from "./CardColor";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { storePokemon } from "../Redux/pokemonDetail";
import { Link } from "react-router-dom";
import { allData } from "../Redux/AllPokemon";

function PokemonCard({ pokemon }) {
  const storeAllData = useSelector((state) => state.AllpokemonDetail.data);
  const [data, setData] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    callPokemon();
  }, [pokemon]);

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
        <Link to="./pokemon-detail">
          <div className="grid2">
            {data && (
              <div
                className="pokeType"
                style={{ backgroundColor: pokeColor[pokemon.name] }}
              >
                <img
                  className="pokeImage"
                  src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.id}.svg`}
                />

                <Grid container>
                  <Grid item xs={6}>
                    <div className="pokeName">{pokemon.name}</div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="pokeOwned">
                      <div>
                        # <span>{data.order}</span>
                      </div>
                    </div>
                  </Grid>
                </Grid>

                <div className="pokeTypes">
                  {data.types.map((type, i) => {
                    return (
                      <div className="pokeSkill" key={i}>
                        {type.type.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Link>
      </div>
    </>
  );
}

export default PokemonCard;
