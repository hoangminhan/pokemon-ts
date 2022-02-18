import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokemonCollection from "./component/PokemonCollection";
import { Detail, Pokemon } from "./interface";

interface Pokemons {
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [viewDetail, setViewDetail] = useState<Detail>({
    id: 0,
    isOpen: false,
  });
  useEffect(() => {
    const getPokemons = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      console.log("res", res.data.next);
      setNextUrl(res.data.next);
      res.data.results.forEach(async (poke: Pokemons) => {
        const newPoke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${poke.name}`
        );
        setPokemons((poke) => [...poke, newPoke.data]);
      });
      setLoading(false);
    };
    getPokemons();
  }, []);
  const handleLoadMore = async () => {
    setLoading(true);
    const res = await axios.get(nextUrl);
    res.data.results.forEach(async (data: Pokemons) => {
      setNextUrl(res.data.next);
      const newPokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${data.name}`
      );
      setPokemons((poke) => [...poke, newPokemon.data]);
    });
    setLoading(false);
  };
  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Hello</header>
        <section>
          <PokemonCollection
            pokemons={pokemons}
            viewDetail={viewDetail}
            setViewDetail={setViewDetail}
          />
        </section>
        <section>
          <button className="btn" onClick={handleLoadMore}>
            {loading ? "Loading" : "Load more"}
          </button>
        </section>
      </div>
    </div>
  );
};

export default App;
