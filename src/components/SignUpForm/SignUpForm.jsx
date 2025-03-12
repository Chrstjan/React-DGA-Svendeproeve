import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Toastbar } from "../Toastbar/Toastbar";
import s from "./SignUpForm.module.scss";

export const SignUpForm = () => {
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
      toast("Bruger oprettet!");
    } else {
      toast("Kunne ikke oprette Bruger!, Prøv igen");
    }
  };

  const handleFormSubmit = async (data) => {
    const { username, password, firstname, lastname, address, town, zipcode } =
      {
        ...data,
      };

    const formData = {
      email: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      address: address,
      zipcode: zipcode,
      city: town,
    };

    const res = await fetch(`http://localhost:4242/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const userData = await res.json();

    if (userData) {
      notify(true);
    } else {
      notify(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={s.formStyling}>
        <span className={s.inputContainer}>
          <label htmlFor="username">Email</label>
          <input
            {...register("username", {
              required: "username is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid username format",
              },
              minLength: {
                value: 8,
                message: "username must be at least 8 characters",
              },
            })}
            type="email"
            id="username"
            name="username"
            placeholder="Din email....."
          />
        </span>
        {errors.username ? <p>{errors.username.message}</p> : null}
        <span className={s.inputContainer}>
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "password is required",
              pattern: {
                value: /^[A-Za-z\d@$!%*?&]{5,}$/,
                message: "Invalid password format",
              },
              minLength: {
                value: 5,
                message: "password must be at least 5 characters",
              },
            })}
            type="password"
            id="password"
            name="password"
            placeholder="Dit password......"
          />
        </span>
        {errors.password ? <p>{errors.password.message}</p> : null}
        <span className={s.inputContainer}>
          <label htmlFor="firstname">Fornavn</label>
          <input
            {...register("firstname", {
              required: "firstname is required",
              pattern: {
                message: "Invalid firstname format",
              },
              minLength: {
                value: 2,
                message: "password must be at least 2 characters",
              },
            })}
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Dit fornavn......"
          />
        </span>
        {errors.firstname ? <p>{errors.firstname.message}</p> : null}
        <span className={s.inputContainer}>
          <label htmlFor="lastname">Efternavn</label>
          <input
            {...register("lastname", {
              required: "lastname is required",
              pattern: {
                message: "Invalid lastname format",
              },
              minLength: {
                value: 5,
                message: "lastname must be at least 5 characters",
              },
            })}
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Dit efternavn......"
          />
        </span>
        {errors.lastname ? <p>{errors.lastname.message}</p> : null}
        <span className={s.inputContainer}>
          <label htmlFor="address">Adresse</label>
          <input
            {...register("address", {
              required: "address is required",
              pattern: {
                message: "Invalid address format",
              },
              minLength: {
                value: 5,
                message: "address must be at least 5 characters",
              },
            })}
            type="text"
            id="address"
            name="address"
            placeholder="Din adresse......"
          />
        </span>
        {errors.address ? <p>{errors.address.message}</p> : null}
        <span className={s.inputContainer}>
          <label htmlFor="town">By</label>
          <input
            {...register("town", {
              required: "town is required",
              pattern: {
                message: "Invalid town format",
              },
              minLength: {
                value: 4,
                message: "town must be at least 4 characters",
              },
            })}
            type="text"
            id="town"
            name="town"
            placeholder="Din by......"
          />
        </span>
        {errors.town ? <p>{errors.town.message}</p> : null}
        <span className={s.inputContainer}>
          <label htmlFor="zipcode">Postnummer</label>
          <input
            {...register("zipcode", {
              required: "zipcode is required",
              pattern: {
                message: "Invalid zipcode format",
              },
              minLength: {
                value: 4,
                message: "zipcode must be at least 4 characters",
              },
            })}
            type="text"
            id="zipcode"
            name="zipcode"
            placeholder="Dit postnummer......"
          />
        </span>
        {errors.zipcode ? <p>{errors.zipcode.message}</p> : null}
        <p className={s.linkStyling}>
          Har du allerede en konto hos os? Klik{" "}
          <NavLink to="/login">her</NavLink> for at vende tilbage til logn
        </p>
        <div className={s.buttonContainer}>
          <span className={s.termsContainer}>
            <input type="checkbox" name="terms" required />
            <label htmlFor="terms">
              Jeg har læst og forstået{" "}
              <NavLink>de gældende betingelser</NavLink> for oprettelse af
              kundekonto og brug af denne side
            </label>
          </span>
          <input type="submit" value="Opret" />
        </div>
      </form>
      <Toastbar />
    </>
  );
};
