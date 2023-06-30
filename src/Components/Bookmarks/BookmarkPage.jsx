import PokemonCard from "../PokemonCard";
import Loader from "../Loader/Loader";
import "../../App.scss";
import { useSelector } from "react-redux";

function Bookmarks() {
  const pokemonData = useSelector(state => state.bookmark.data)

  return (
    <div className="App">
     
      <div className="title">
        <div className="txt">Bookmarks</div>
    
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
