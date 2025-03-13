import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import s from "./ProductComment.module.scss";
import { formatDate } from "../../helpers/formatDate";

export const ProductComment = ({ comments, ownerId }) => {
  const { user } = useContext(UserContext);
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    if (comments.length > 0) {
      setAllComments(comments);
      console.log(comments);
    }
  }, [comments]);

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
      const allProductComments = [...allComments];
      const filteredComments = allProductComments.filter((item) => {
        return item?.id !== commentId;
      });
      setAllComments(filteredComments);
    }
  };
  return (
    <section className={s.commentsContainer}>
      {allComments && allComments.length > 0
        ? allComments.map((item) => {
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
