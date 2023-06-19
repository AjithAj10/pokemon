import { useEffect, useState } from "react";
import PokemonCard from "./Components/PokemonCard";
import Loader from "./Components/Loader/Loader";
import "./App.scss";
import Alert from "@mui/material/Alert";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useSelector } from "react-redux";

function App() {
  const [pokemonData, setPokemonData] = useState();
  const [pokemonApiData, setPokemonApiData] = useState();
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(false);
  const type = useSelector((state) => state.type.data);
  const allData = useSelector((state) => state.AllpokemonDetail.data);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getPokemon();
  }, []);

  
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let value = allData.filter((el) => el.types[0].type.name === type) 
    if (type === "All") {
      setPokemonData(pokemonApiData);
      return;
    }
    if (type) {
      value = value.map((e) => e.name);

      let data = pokemonApiData.filter((p) => value.includes(p.name));
      setPokemonData(data);
    }
    return;
  }, [type]);

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
    setPokemonData(data);

    setPokemonApiData(data);
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
      <Sidebar />
      <div className="title">
        {alert && (
          <Alert className="alert" variant="filled" severity="error">
            Pokemon not found
          </Alert>
        )}
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

export default App;
