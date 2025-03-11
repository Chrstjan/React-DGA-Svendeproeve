import { useContext, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { UserContext } from "../../context/UserContext";
import s from "./ProductComment.module.scss";

export const ProductComment = ({ productId, ownerId, commentCreation }) => {
  const { data, isLoading, error } = useFetch(
    `http://localhost:4242/comment/${productId}`
  );
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);

  console.log(commentCreation);

  useEffect(() => {
    if (data?.data) {
      setComments(data?.data);
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
    console.log(data);

    if (data?.message == "Success") {
      const allComments = [...comments];
      const filteredComments = allComments.filter((item) => {
        return item?.id !== commentId;
      });
      console.log(filteredComments);
      setComments(filteredComments);
    }
  };
  return (
    <>
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
                    {item?.user?.firstname} (sælger): d. {commentCreation}
                  </p>
                ) : (
                  <p>
                    {item?.user?.firstname}: d. {commentCreation}
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
    </>
  );
};
