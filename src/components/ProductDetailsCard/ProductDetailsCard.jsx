import { useEffect } from "react";
import s from "./ProductDetailsCard.module.scss";

export const ProductDetailsCard = ({ data }) => {
  return (
    <figure className={s.detailStyling}>
      <img src={data?.image} />
      <figcaption>
        <h2>{data?.name}</h2>
        <p>{data?.description}</p>
        <footer>
          <h4>Pris: {data?.price} kr</h4>
        </footer>
      </figcaption>
    </figure>
  );
};
