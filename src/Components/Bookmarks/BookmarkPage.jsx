import { useEffect, useState } from "react";
import PokemonCard from "../PokemonCard";
import Loader from "../Loader/Loader";
import "../../App.scss";
import Alert from "@mui/material/Alert";

function Bookmarks() {
  const [pokemonData, setPokemonData] = useState([]);
  const [apiData, setapiData] = useState([]);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(false);
  const bookmark = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    getPokemon();
    let bookmarkData = apiData.filter((poke) => bookmark.includes(poke.name));

    setPokemonData(bookmarkData);
  }, []);

  const getPokemon = async () => {
    //api call
    let response = new Promise((resolve, reject) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/`)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });

    let data = await response.then((data) => data.results);
    setapiData(data);
  };

  const searchFn = () => {
    let data = pokemonData.find((p) => p.name === search);
    if (!data) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
      return;
    }
    setPokemonData([data]);
  };

  return (
    <div className="App">
      {alert && (
        <Alert className="alert" variant="filled" severity="error">
          Pokemon not found
        </Alert>
      )}
      <div className="title">
        <div className="txt">Pokedex</div>
        <div className="search">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search.."
          />
          <button className="button" onClick={searchFn}>
            Search
          </button>
        </div>
      </div>
      {pokemonData ? (
        <div className="Container">
          {pokemonData.map((pokemon, index) => {
            return <PokemonCard key={index} pokemon={pokemon} />;
          })}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Bookmarks;
