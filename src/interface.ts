export interface Pokemon {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
}
export interface Detail {
  id: number;
  isOpen: boolean;
}
export interface PokemonDetail extends Pokemon {
    abilities? :{
        ability:string;
        name:string
    }[]
}
