import React from 'react'
import { Detail, Pokemon, PokemonDetail } from '../interface'
import PokemonItem from './PokemonItem'
import "./pokemon.css"
interface Props {
    pokemons:PokemonDetail[];
    viewDetail:Detail;
    setViewDetail:React.Dispatch<React.SetStateAction<Detail>>;
}
const PokemonCollection:React.FC<Props>= (props) => {
    const {pokemons,viewDetail,setViewDetail} = props;
    const handleClickPokemon = (data:number)=>{
        console.log(data)
       if(!viewDetail.isOpen){
        setViewDetail({
            id:data,isOpen:true 
        })
       }
    }
  return (
    <>
        <section className={viewDetail.isOpen? "collection-container-active":"collection-container"}>
        {viewDetail.isOpen ? (<div className="overlay"></div>):<div></div>}
        {
            pokemons.map((poke=>{
                return (
                    <div
                    onClick={()=>handleClickPokemon(poke.id)}
                    >
                        <PokemonItem
                        key={poke.id}
                        name={poke.name}
                        image={poke.sprites.front_default}
                        id={poke.id}
                        abilities ={poke.abilities}
                        viewDetail={viewDetail}
                        setViewDetail={setViewDetail}
                        />
                    </div>
                )
            }))
        }
        </section></>
  )
}

export default PokemonCollection