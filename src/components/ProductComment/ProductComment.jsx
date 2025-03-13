import { useContext, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { UserContext } from "../../context/UserContext";
import s from "./ProductComment.module.scss";
import { formatDate } from "../../helpers/formatDate";

export const ProductComment = ({ productSlug, ownerId }) => {
  const { data, isLoading, error } = useFetch(
    `http://localhost:4242/products/${productSlug}`
  );
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (data?.data?.comments?.length > 0) {
      setComments(data?.data?.comments);
    }
  }, [data]);

  const handleDelteComment = async (commentId) => {
    const res = await fetch(`http://localhost:4242/comment/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    });

    if (!res.ok) {
      console.error("Fejl i at slette kommentar");
    }

    const data = await res.json();

    if (data?.message == "Success") {
      const allComments = [...comments];
      const filteredComments = allComments.filter((item) => {
        return item?.id !== commentId;
      });
      setComments(filteredComments);
    }
  };
  return (
    <section className={s.commentsContainer}>
      {comments && comments.length > 0
        ? comments.map((item) => {
            return (
              <div
                className={
                  item?.user?.id == ownerId ? s.ownerStyling : s.customerStyling
                }
                key={item?.id}
              >
                {item?.user?.id == ownerId ? (
                  <p>
                    {item?.user?.firstname} (sælger): d.{" "}
                    {formatDate(item?.createdAt)}
                  </p>
                ) : (
                  <p>
                    {item?.user?.firstname}: d. {formatDate(item?.createdAt)}
                  </p>
                )}
                <div className={s.commentContainer}>
                  <p>{item?.comment}</p>
                </div>
                {user?.user?.id == item?.user?.id ? (
                  <p
                    onClick={() => handleDelteComment(item?.id)}
                    className={s.deleteStyling}
                  >
                    slet kommentar
                  </p>
                ) : null}
              </div>
            );
          })
        : null}
    </section>
  );
};
