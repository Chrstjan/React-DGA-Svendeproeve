import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Toastbar } from "../Toastbar/Toastbar";
import s from "./SignUpForm.module.scss";

export const SignUpForm = ({ setShowForm }) => {
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

    if (!res.ok) {
      notify(false);
    }

    const userData = await res.json();

    if (userData?.message == "User created successfully") {
      notify(true);
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
        </span>
        {errors.username ? <p>{errors.username.message}</p> : null}
        <span className={s.inputContainer}>
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "Password er påkrævet",
              pattern: {
                value: /^[A-Za-z\d@$!%*?&]{5,}$/,
                message: "Ikke Password kodeord",
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
        </span>
        {errors.password ? <p>{errors.password.message}</p> : null}
        <span className={s.inputContainer}>
          <label htmlFor="firstname">Fornavn</label>
          <input
            {...register("firstname", {
              required: "Fornavn er påkrævet",
              pattern: {
                message: "Ikke gyldigt fornavn",
              },
              minLength: {
                value: 2,
                message: "Fornavn skal være mindst 2 bogstaver",
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
              required: "Efternavn er påkrævet",
              pattern: {
                message: "Ikke gyldigt efternavn",
              },
              minLength: {
                value: 5,
                message: "Efternavn skal være mindst 5 bogstaver",
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
              required: "Adresse påkrævet",
              pattern: {
                message: "Ikke gyldig adresse",
              },
              minLength: {
                value: 5,
                message: "Adresse skal være mindst 5 bogstaver",
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
              required: "By er påkrævet",
              pattern: {
                message: "Ikke gyldig by",
              },
              minLength: {
                value: 4,
                message: "By skal være mindst 4 bogstaver",
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
              required: "Postnummer er påkrævet",
              pattern: {
                message: "Ikke gyldigt postnummer",
              },
              minLength: {
                value: 4,
                message: "Postnummer skal være mindst 4 bogstaver",
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
          <span onClick={() => setShowForm("login")} className={s.formLink}>
            her
          </span>{" "}
          for at vende tilbage til login
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
