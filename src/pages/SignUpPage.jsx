import { Wrapper } from "../components/Wrapper/Wrapper";
import { SignUpForm } from "../components/SignUpForm/SignUpForm";
import { DonationCard } from "../components/DonationCard/DonationCard";

export const SignUpPage = () => {
  return (
    <>
      <Wrapper headerType="formHeader" text="Opret en konto">
        <SignUpForm />
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
