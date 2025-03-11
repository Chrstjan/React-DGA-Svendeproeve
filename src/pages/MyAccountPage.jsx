import { Wrapper } from "../components/Wrapper/Wrapper";
import { Button } from "../components/Button/Button";
import { useState } from "react";
import { UserProductCard } from "../components/UserProductCard/UserProductCard";
import { AccountForm } from "../components/AccountForm/AccountForm";

export const MyAccountPage = () => {
  const [showSelected, setShowSelected] = useState("profile");
  return (
    <>
      <Wrapper type="rowWrapper">
        <Button
          action={() => setShowSelected("profile")}
          type="accountBtn"
          text="Min profil"
        />
        <Button
          action={() => setShowSelected("products")}
          type="accountBtn"
          text="Mine Annoncer"
        />
      </Wrapper>
      <Wrapper headerType="noTop">
        {showSelected == "products" ? <UserProductCard /> : <AccountForm />}
      </Wrapper>
    </>
  );
};
