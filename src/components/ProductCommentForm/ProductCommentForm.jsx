import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import s from "./ProductCommentForm.module.scss";

export const ProductCommentForm = ({ productId, setCommentCreation }) => {
  const { user } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const notify = (success) => {
    if (success) {
      toast("Kommentar oprettet");
    } else {
      toast("Kunne ikke oprette kommentar");
    }
  };

  const handleFormSubmit = async (data) => {
    const { comment } = { ...data };

    const formData = {
      comment: comment,
    };

    const res = await fetch(`http://localhost:4242/comment/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
      body: JSON.stringify(formData),
    });

    const commentData = await res.json();
    const { createdAt } = { ...commentData?.data };

    setCommentCreation(createdAt);

    if (commentData) {
      notify(true);
    } else {
      notify(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={s.formStyling}>
        <span className={s.inputContainer}>
          <textarea
            {...register("comment", {
              required: "comment is required",
              pattern: {
                message: "Invalid comment format",
              },
              minLength: {
                value: 8,
                message: "comment must be at least 8 characters",
              },
            })}
            id="comment"
            name="comment"
            placeholder="Skriv en besked til sælger"
          />
        </span>
        {errors.username ? <p>{errors.username.message}</p> : null}
        <span className={s.buttonContainer}>
          <input type="submit" value="Send" />
        </span>
      </form>
    </>
  );
};
