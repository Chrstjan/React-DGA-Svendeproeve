import { useState } from "react";
import { DonationCard } from "../components/DonationCard/DonationCard";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { SignUpForm } from "../components/SignUpForm/SignUpForm";
import { Wrapper } from "../components/Wrapper/Wrapper";

export const LoginPage = () => {
  const [showform, setShowForm] = useState("login");
  return (
    <>
      <Wrapper
        headerType="formHeader"
        text={showform == "login" ? "Velkommen tilbage" : "Opret en konto"}
      >
        {showform == "login" ? (
          <LoginForm setShowForm={setShowForm} />
        ) : (
          <SignUpForm setShowForm={setShowForm} />
        )}
      </Wrapper>
      <Wrapper type="infoImage">
        <DonationCard
          type="toDate"
          headerText="Donationer til Dato"
          subText="Sammen med dig har vi siden starten indsamlet:"
          money="452.231,50 kr"
          footertext="Tak fordi du handler brugt, med omtanke for klimaet"
        />
        <DonationCard
          type="thisYear"
          headerText="Donationer i år"
          subText="Sammen med dig har vi i år indsamlet:"
          money="112.452,75 kr"
          footertext="Tak fordi du handler brugt, med omtanke for jorden"
        />
      </Wrapper>
    </>
  );
};
