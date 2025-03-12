import { NavLink, useNavigate } from "react-router-dom";
import s from "./ProductCard.module.scss";

export const ProductCard = ({ data, topHeader, categoryProduct, type }) => {
  const navigate = useNavigate();

  const handleProductClick = (endpoint, slug) => {
    navigate(`/${endpoint}/${slug}`);
  };

  return (
    <>
      {data?.map((item) => {
        return (
          <figure
            onClick={() =>
              topHeader
                ? handleProductClick("category", item?.slug)
                : handleProductClick("product", item?.slug)
            }
            className={`${s.cardStyling} ${s[type]}`}
            key={item?.id}
          >
            {topHeader ? (
              <figcaption className={s.topStyling}>
                <NavLink>
                  <p>{item?.name}</p>
                </NavLink>
              </figcaption>
            ) : null}
            <img src={item?.image || item?.category_image} />
            {!topHeader ? (
              <figcaption className={s.captionStyling}>
                {!categoryProduct ? (
                  <p>{item?.name}</p>
                ) : (
                  <p>Pris: {item?.price} kr</p>
                )}
              </figcaption>
            ) : null}
            {categoryProduct ? (
              <div>
                <h3>{item?.name}</h3>
                <p>{item?.description?.slice(0, 32)}...</p>
              </div>
            ) : null}
          </figure>
        );
      })}
    </>
  );
};
