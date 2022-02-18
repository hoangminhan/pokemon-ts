import React, { useEffect, useState } from "react";
import { Detail } from "../interface";
import "./pokemon.css";

interface Props {
  viewDetail: Detail;
  setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
  name: string;
  id: number;
  image: string;
  abilities:
    | {
        name: string;
        ability: string;
      }[]
    | undefined;
}

const PokemonItem: React.FC<Props> = (props) => {
  const { name, id, image, abilities, viewDetail, setViewDetail } = props;
  console.log("abilities", abilities);
  const [selected, setSelected] = useState(false);
  console.log("viewDetail", viewDetail);
  useEffect(() => {
    setSelected(id === viewDetail?.id);
  }, [viewDetail]);
  const handleCloseDetail = ()=>{
      setViewDetail({
          id:0,isOpen:false
      })
  }
  return (
    <div>
      {selected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <div className="detail-close"
            onClick={handleCloseDetail}
            >X</div>
            <div className="detail-info">
              <img src={image} alt="" className="detail-img" />
              <p className="detail-name">{name}</p>
              <div className="detail-skill">
              <p className="detail-ability">
              Abilities:
              {abilities?.map((item: any) => {
                return <div>{item.ability.name}</div>;
              })}
            </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name">{name}</p>
          <img src={image} alt="" className="pokemon-image" />
          
        </section>
      )}
      
    </div>
  );
};

export default PokemonItem;
