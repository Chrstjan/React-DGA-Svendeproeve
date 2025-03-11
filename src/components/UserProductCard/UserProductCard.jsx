import { useContext, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { UserContext } from "../../context/UserContext";
import s from "./UserProductCard.module.scss";
import { useNavigate } from "react-router-dom";

export const UserProductCard = () => {
  const { data, isLoading, error } = useFetch("http://localhost:4242/products");
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data) {
      let allProducts = [...data?.data];
      let userProducts = allProducts.filter((item) => {
        return item?.user_id == user?.user?.id;
      });
      console.log(userProducts);
      setProducts(userProducts);
    }
  }, [data]);

  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
  };

  const handleRemoveProduct = async (id) => {
    const res = await fetch(`http://localhost:4242/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    });

    if (!res.ok) {
      console.error("Error in deleting product");
    }

    const deletedData = await res.json();
    console.log(deletedData);

    if (deletedData?.message == "Product deleted succesfully") {
      let allProducts = [...products];
      let filteredProduts = allProducts.filter((item) => {
        return item?.id !== id;
      });
      console.log(filteredProduts);
      setProducts(filteredProduts);
    }
  };

  return (
    <>
      {products && products.length > 0 ? (
        products.map((item) => {
          return (
            <div key={item?.id}>
              <figure className={s.cardStyling}>
                <figcaption>
                  <span className={s.barStyling}>
                    <h3>{item?.name}</h3>
                    <h3>Pris: {item?.price} kr</h3>
                  </span>
                  <p>{item?.description}</p>
                </figcaption>
                <img src={item?.image} alt={item?.name} />
              </figure>
              <span className={s.footerContainer}>
                <p onClick={() => handleProductClick(item?.slug)}>
                  Gå til annonce
                </p>
                <p
                  onClick={() => handleRemoveProduct(item?.id)}
                  className={s.removeStyling}
                >
                  Fjern annonce
                </p>
              </span>
            </div>
          );
        })
      ) : (
        <h2>Ingen annoncer fundet</h2>
      )}
    </>
  );
};
