import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import s from "./AccountForm.module.scss";
import { Button } from "../Button/Button";
import { Toastbar } from "../Toastbar/Toastbar";

export const AccountForm = () => {
  const { user, logoutUser } = useContext(UserContext);
  const [users, setUsers] = useState({});
  const [hasNewsletter, setHasNewsletter] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await fetch("http://localhost:4242/users", {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });

      if (!res.ok) {
        console.error("Fejl, Kunne ikke finde brugere");
      }

      const data = await res.json();
      setUsers(data?.data);
    };
    getUserInfo();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (users) {
      setHasNewsletter(users?.hasNewsletter || false);
      setHasNotification(users.hasNotification || false);

      reset({
        firstname: users?.firstname || "",
        lastname: users?.lastname || "",
        address: users?.address || "",
        zipcode: users?.zipcode || "",
        phone: users?.phone || "11223344",
        email: users?.email || "",
      });
    }
  }, [users, reset]);

  const notify = (success) => {
    if (success) {
      toast("Oplysninger opdateret!");
    } else {
      toast("Noget gik galt, i at opdatere bruger");
    }
  };

  const handleFormSubmit = async (data) => {
    const { firstname, lastname, address, zipcode, email } = {
      ...data,
    };

    const formData = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      address: address,
      zipcode: zipcode,
      hasNewsletter: hasNewsletter,
      hasNotification: hasNotification,
    };

    const res = await fetch(`http://localhost:4242/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      notify(false);
    }

    const userData = await res.json();

    if (userData.message == "User updated successfully") {
      notify(true);
    }
  };

  const handleDeleteUser = async () => {
    const res = await fetch("http://localhost:4242/users", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    });

    if (!res.ok) {
      console.error("Fejl i at slette bruger");
    }

    const deleteData = await res.json();

    if (
      deleteData.message == "User and related products deleted successfully"
    ) {
      logoutUser();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={s.formStyling}>
        <div className={s.inputsContainer}>
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
                  value: 4,
                  message: "Efternavn skal være mindst 4 bogstaver",
                },
              })}
              type="text"
              id="lastname"
              name="lastname"
            />
          </span>
          {errors.lastname ? <p>{errors.lastname.message}</p> : null}
          <span className={s.inputContainer}>
            <label htmlFor="address">Adresse</label>
            <input
              {...register("address", {
                required: "Adresse er påkrævet",
                pattern: {
                  message: "Ikke gyldig adresse",
                },
                minLength: {
                  value: 4,
                  message: "Adresse skal være mindst 4 bogstaver",
                },
              })}
              type="text"
              id="address"
              name="address"
            />
          </span>
          {errors.address ? <p>{errors.address.message}</p> : null}
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
            />
          </span>
          {errors.zipcode ? <p>{errors.zipcode.message}</p> : null}
          <span className={s.inputContainer}>
            <label htmlFor="phone">Telefon</label>
            <input
              {...register("phone", {
                required: "Telefon er påkrævet",
                pattern: {
                  message: "Ikke gyldigt telefon nummer",
                },
                minLength: {
                  value: 8,
                  message: "Telefon skal være mindst 8 bogstaver",
                },
              })}
              type="number"
              id="phone"
              name="phone"
            />
          </span>
          {errors.phone ? <p>{errors.phone.message}</p> : null}
          <span className={s.inputContainer}>
            <label htmlFor="phone">Email</label>
            <input
              {...register("email", {
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
              id="email"
              name="email"
            />
          </span>
          {errors.phone ? <p>{errors.phone.message}</p> : null}
        </div>
        <div className={s.checkboxContainer}>
          <div className={s.topContainer}>
            <span className={s.checkbox}>
              <label htmlFor="newsletter">
                Jeg ønsker at modtage nyheder om klima-indsatsen, gode tilbud,
                ekslusive deals og lignende promoverings-mails fra den grønne
                avis og samarbejds-parnere?
              </label>
              <input
                {...register("newsletter")}
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={hasNewsletter}
                onChange={(e) => setHasNewsletter(e.target.checked)}
              />
              {errors.newsletter ? <p>{errors.newsletter.message}</p> : null}
            </span>
            <span className={s.checkbox}>
              <label htmlFor="notification">
                Jeg ønsker at modtage notifikationer i form af emails når der
                sker en opdatering på en af mine annoncer eller jeg modtager en
                ny henvendelse?
              </label>
              <input
                {...register("notification")}
                type="checkbox"
                id="notification"
                name="notification"
                checked={hasNotification}
                onChange={(e) => setHasNotification(e.target.checked)}
              />
              {errors.notification ? (
                <p>{errors.notification.message}</p>
              ) : null}
            </span>
          </div>
          <span className={s.buttonContainer}>
            <Button
              action={() => handleDeleteUser()}
              type="deleteBtn"
              text="slet profil"
            />
            <Button action={() => logoutUser()} type="deleteBtn" text="Log ud"/>
            <input type="submit" value="gem ændringer" />
          </span>
        </div>
      </form>
      <Toastbar />
    </>
  );
};
