import s from "./DonationCard.module.scss";

export const DonationCard = ({
  headerText,
  subText,
  infoText,
  money,
  footertext,
  type,
}) => {
  return (
    <figure className={`${s.donationCard} ${s[type]}`}>
      <header>
        <h2>{headerText}</h2>
        {subText ? <h3>{subText}</h3> : null}
        {infoText ? <p>{infoText}</p> : null}
      </header>
      {money ? (
        <span className={s.moneyStyling}>
          <h2>{money}</h2>
        </span>
      ) : null}
      {footertext ? <p>{footertext}</p> : null}
    </figure>
  );
};
