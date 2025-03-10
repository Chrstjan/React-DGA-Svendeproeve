import { NavLink, useNavigate } from "react-router-dom";
import s from "./ProductCard.module.scss";

export const ProductCard = ({
  data,
  topHeader,
  categoryProduct,
  productDetails,
}) => {
  const navigate = useNavigate();

  const handleCategoryClick = (slug) => {
    navigate(`/category/${slug}`);
  };

  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
  };

  return (
    <>
      {data?.map((item) => {
        return (
          <figure
            onClick={() =>
              topHeader
                ? handleCategoryClick(item?.slug)
                : handleProductClick(item?.slug)
            }
            className={s.cardStyling}
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
                {!productDetails || !categoryProduct ? (
                  <p>{item?.name}</p>
                ) : (
                  <p>Pris: {item?.price} kr</p>
                )}
              </figcaption>
            ) : null}
            {categoryProduct || productDetails ? (
              <div>
                <h3>{item?.name}</h3>
                <p>{item?.description}</p>
                {productDetails ? <h3>Pris: {item?.price} kr</h3> : null}
              </div>
            ) : null}
          </figure>
        );
      })}
    </>
  );
};
