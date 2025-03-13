import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import s from "./ProductCommentForm.module.scss";
import { Toastbar } from "../Toastbar/Toastbar";

export const ProductCommentForm = ({ productId, ownerId, setNewComment }) => {
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

    if (!res.ok) {
      notify(false);
    }

    const commentData = await res.json();
    console.log(commentData);

    if (commentData) {
      setNewComment((prev) => prev + 1);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={s.formStyling}>
        <span className={s.inputContainer}>
          <textarea
            {...register("comment", {
              required: "Kommentar skal indeholde noget",
              pattern: {
                message: "Ikke gyldig kommentar",
              },
              minLength: {
                value: 8,
                message: "Kommentar skal være mindst 8 bogstaver.",
              },
            })}
            id="comment"
            name="comment"
            placeholder={
              user?.user?.id == ownerId
                ? "Skriv en besked til forspørgelser"
                : "Skriv en besked til sælger....."
            }
          />
        </span>
        {errors.comment ? <p>{errors.comment.message}</p> : null}
        <span className={s.buttonContainer}>
          <input type="submit" value="Send" />
        </span>
      </form>
      <Toastbar />
    </>
  );
};
