import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import s from "./AccountForm.module.scss";
import { Button } from "../Button/Button";

export const AccountForm = () => {
  const { user, logoutUser } = useContext(UserContext);
  const [users, setUsers] = useState({});

  console.log(user);

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

  useEffect(() => {
    console.log(users);
  }, [users]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const notify = (success) => {
    if (success) {
      toast("Oplysninger opdateret!");
    } else {
      toast("Noget gik galt, i at opdatere bruger");
    }
  };

  const handleFormSubmit = async (data) => {
    const { firstname, lastname, address, zipcode, phone, email } = { ...data };

    const formData = {
      firstname: firstname,
      lastname: lastname,
      address: address,
      zipcode: zipcode,
      phone: phone,
      email: email,
    };

    const res = await fetch(`http://localhost:4242/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const userData = await res.json();
    console.log(userData?.data);

    if (userData) {
      notify(true);
    } else {
      notify(false);
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
    console.log(deleteData);

    if (
      deleteData.message == "User and related products deleted successfully"
    ) {
      logoutUser();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={s.formStyling}>
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
                message: "firstname must be at least 2 characters",
              },
            })}
            type="text"
            id="firstname"
            name="firstname"
            placeholder={users?.firstname}
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
                value: 4,
                message: "lastname must be at least 4 characters",
              },
            })}
            type="text"
            id="lastname"
            name="lastname"
            placeholder={users?.lastname}
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
                value: 4,
                message: "address must be at least 4 characters",
              },
            })}
            type="text"
            id="address"
            name="address"
            placeholder={users?.address}
          />
        </span>
        {errors.address ? <p>{errors.address.message}</p> : null}
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
            type="number"
            id="address"
            name="address"
            placeholder={users?.zipcode}
          />
        </span>
        {errors.zipcode ? <p>{errors.zipcode.message}</p> : null}
        <span className={s.inputContainer}>
          <label htmlFor="phone">Telefon</label>
          <input
            {...register("phone", {
              required: "phone is required",
              pattern: {
                message: "Invalid phone format",
              },
              minLength: {
                value: 8,
                message: "phone must be at least 8 characters",
              },
            })}
            type="number"
            id="phone"
            name="phone"
            placeholder={users?.phone || "11223344"}
          />
        </span>
        {errors.phone ? <p>{errors.phone.message}</p> : null}
        <span className={s.inputContainer}>
          <label htmlFor="phone">Email</label>
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
            id="email"
            name="email"
            placeholder={users?.email}
          />
        </span>
        {errors.phone ? <p>{errors.phone.message}</p> : null}
        <div className={s.checkboxContainer}>
          <span>
            <label htmlFor="newsletter">
              Jeg ønsker at modtage nyheder om klima-indsatsen, gode tilbud,
              ekslusive deals og lignende promoverings-mails fra den grønne avis
              og samarbejds-parnere?
            </label>
            <input type="checkbox" id="newsletter" name="newsletter" />
          </span>
          <span>
            <label htmlFor="newsletter">
              Jeg ønsker at modtage notifikationer i form af emails når der sker
              en opdatering på en af mine annoncer eller jeg modtager en ny
              henvendelse?
            </label>
            <input type="checkbox" id="notification" name="notification" />
          </span>
        </div>
        <span className={s.buttonContainer}>
          <Button
            action={() => handleDeleteUser()}
            type="deleteBtn"
            text="slet profil"
          />
          <input type="submit" value="gem ændringer" />
        </span>
      </form>
    </>
  );
};
