import { useParams } from "react-router-dom";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { CategoriesList } from "../components/CategoriesList/CategoriesList";
import { useFetch } from "../hooks/useFetch";
import { ProductDetailsCard } from "../components/ProductDetailsCard/ProductDetailsCard";
import { ProductCommentForm } from "../components/ProductCommentForm/ProductCommentForm";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { ProductComment } from "../components/ProductComment/ProductComment";

export const ProductDetailsPage = () => {
  const { user } = useContext(UserContext);
  const { productSlug } = useParams();
  const { data, isLoading, error } = useFetch(
    `http://localhost:4242/products/${productSlug}`
  );
  //Bliver brugt til at re-render comments component hver gang der oprettes en besked
  const [newComment, setNewComment] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getNewComments = async () => {
      const res = await fetch(`http://localhost:4242/products/${productSlug}`);

      if (!res.ok) {
        console.error("Fejl i at hente comments");
      }

      const data = await res.json();

      if (data?.data?.comments?.length > 0) {
        setComments(data?.data?.comments);
      }
    };
    getNewComments();
  }, [newComment]);

  if (isLoading) {
    return <h2>loading...</h2>;
  }

  if (error) {
    return <h2>Fejl i at hente data, prøv igen</h2>;
  }

  return (
    <>
      <Wrapper type="productsListing">
        <CategoriesList />
        <Wrapper headerType="noTop">
          {data ? <ProductDetailsCard data={data?.data} /> : null}
        </Wrapper>
      </Wrapper>
      <Wrapper
        headerType="commentHeader"
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
            setNewComment={setNewComment}
          />
        ) : null}
      </Wrapper>
      <Wrapper headerType="noTop" type="commentContainer">
        {data && data?.data ? (
          <ProductComment comments={comments} ownerId={data?.data?.owner?.id} />
        ) : null}
      </Wrapper>
    </>
  );
};
