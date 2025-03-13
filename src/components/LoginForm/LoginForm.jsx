import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import s from "./LoginForm.module.scss";
import { Toastbar } from "../Toastbar/Toastbar";

export const LoginForm = ({ setShowForm }) => {
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const notify = (success) => {
    if (success) {
      toast("Du er logget ind!");
    } else {
      toast("Bruger ikke fundet, forket username eller password");
    }
  };

  const handleFormSubmit = async (data) => {
    const { username, password } = { ...data };

    const formData = {
      username: username,
      password: password,
    };

    const res = await fetch(`http://localhost:4242/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      notify(false);
    }

    const userData = await res.json();

    if (userData.message == "Success") {
      loginUser(userData?.data);
      notify(true);
      navigate("/profile");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={s.formStyling}>
        <span className={s.inputContainer}>
          <label htmlFor="username">Email</label>
          <input
            {...register("username", {
              required: "Email er påkrævet",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Ikke gyldig email",
              },
              minLength: {
                value: 8,
                message: "Email skal være mindst 8 bogstaver",
              },
            })}
            type="email"
            id="username"
            name="username"
            placeholder="Din email....."
          />
          <img src="/icons/At sign.svg" alt="At Icon" />
        </span>
        {errors.username ? <p>{errors.username.message}</p> : null}
        <span className={s.inputContainer}>
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "Password er påkrævet",
              pattern: {
                value: /^[A-Za-z\d@$!%*?&]{5,}$/,
                message: "Ikke gyldigt password",
              },
              minLength: {
                value: 5,
                message: "Password skal være mindst 5 bogstaver",
              },
            })}
            type="password"
            id="password"
            name="password"
            placeholder="Dit password......"
          />
          <img src="/icons/Secure.svg" alt="Secure Icon" />
        </span>
        {errors.password ? <p>{errors.password.message}</p> : null}
        <p className={s.linkStyling}>
          Har du ikke allerede en konto? Klik{" "}
          <span onClick={() => setShowForm("signup")} className={s.formLink}>
            her
          </span>
          {""} for at gå til sign up
        </p>
        <span className={s.buttonContainer}>
          <input type="submit" value="Login" />
        </span>
      </form>
      <Toastbar />
    </>
  );
};
