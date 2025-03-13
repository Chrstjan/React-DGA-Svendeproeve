import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../Button/Button";
import s from "./Footer.module.scss";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Toastbar } from "../Toastbar/Toastbar";

export const Footer = () => {
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
      toast("Tilmeldt nyhedsbrev!");
    } else {
      toast("Noget gik galt i at tilmelde prøv igen senere");
    }
  };

  const handleFormSubmit = async (data) => {
    const { email } = { ...data };

    const body = new URLSearchParams();
    body.append("email", email);
    body.append("hasNewsletter", true);

    const res = await fetch("http://localhost:4242/users", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
      body: body,
    });

    if (!res.ok) {
      notify(false);
    }

    const userData = await res.json();
    console.log(userData);

    if (userData) {
      notify(true);
    }
  };

  return (
    <>
      <footer className={s.footerStyling}>
        <div className={s.leftContainer}>
          <header>
            <h2>Nyhedsbrev</h2>
          </header>
          <p>
            Vil du være med på den grønne front? Tilmeld dig vores nyhedsbrev og
            få de seneste klima opdateringer direkte i din indbakke
          </p>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <span className={s.inputContainer}>
              <input
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid email format",
                  },
                  minLength: {
                    value: 8,
                    message: "email must be at least 8 characters",
                  },
                })}
                type="email"
              />
              <input type="submit" value="Tilmeld" />
              {errors.email ? <p>{errors.email.message}</p> : null}
            </span>
          </form>
        </div>
        <div className={s.middleContainer}>
          <header>
            <h2>Kontakt</h2>
          </header>
          <p>Redningen 32</p>
          <p>2210 Vinterby Øster</p>
          <p>+45 88229422</p>
          <p>dga@info.dk</p>
        </div>
        <div className={s.rightContainer}>
          <header>
            <h2>FN´s Verdensmål</h2>
          </header>
          <p>
            Vi støtter på organisatorisk plan op om FN´s verdensmål og har
            derfor besluttet at en del af overskuddet går direkte til verdensmål
            nr. 13; Klimahandling
          </p>
          <a href="https://www.verdensmaalene.dk/maal" target="_blank">
            Læs mere om verdensmålene her
          </a>
        </div>
      </footer>
      <Toastbar />
    </>
  );
};
