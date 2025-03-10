import { useParams } from "react-router-dom";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { CategoriesList } from "../components/CategoriesList/CategoriesList";
import { useFetch } from "../hooks/useFetch";
import { ProductCard } from "../components/ProductCard/ProductCard";

export const ProductDetailsPage = () => {
  const { productSlug } = useParams();
  const { data, isLoading, error } = useFetch(
    `http://localhost:4242/products/${productSlug}`
  );

  console.log(data);

  if (isLoading) {
    return <h2>loading...</h2>;
  }

  if (error) {
    return <h2>Fejl i at hente data, prøv igen</h2>;
  }

  return (
    <>
      <Wrapper>
        <CategoriesList />
      </Wrapper>
      <Wrapper>
        {[data && data?.data.length > 0] ? (
          <ProductCard data={[data?.data]} productDetails />
        ) : null}
      </Wrapper>
    </>
  );
};
