import { useParams } from "react-router-dom";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { CategoriesList } from "../components/CategoriesList/CategoriesList";
import { useFetch } from "../hooks/useFetch";
import { ProductDetailsCard } from "../components/ProductDetailsCard/ProductDetailsCard";
import { ProductCommentForm } from "../components/ProductCommentForm/ProductCommentForm";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ProductComment } from "../components/ProductComment/ProductComment";

export const ProductDetailsPage = () => {
  const { user } = useContext(UserContext);
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
      <Wrapper headerType="noTop">
        {data ? <ProductDetailsCard data={data?.data} /> : null}
      </Wrapper>
      <Wrapper
        headerType="formHeader"
        text={
          !user.access_token
            ? "Du skal være logget ind for at sende en kommentar"
            : user?.user?.id == data?.data?.owner?.id
            ? "Svar kommentar"
            : "Kontakt sælger"
        }
      >
        {data && user.access_token ? (
          <ProductCommentForm
            productId={data?.data?.id}
            ownerId={data?.data?.owner?.id}
          />
        ) : null}
      </Wrapper>
      <Wrapper headerType="noTop" type="rowWrapper">
        {data && data?.data ? (
          <ProductComment
            productSlug={productSlug}
            ownerId={data?.data?.owner?.id}
          />
        ) : null}
      </Wrapper>
    </>
  );
};
