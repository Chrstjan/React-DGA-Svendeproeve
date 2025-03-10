import s from "./DonationCard.module.scss"

export const DonationCard = ({headerText, subText, money, footertext, type}) => {
  return (
    <figure className={`${s.donationCard} ${s[type]}`}>
        <header>
            <h2>{headerText}</h2>
            <h3>{subText}</h3>
        </header>
        <span className={s.moneyStyling}>
            <h2>{money}</h2>
        </span>
        <p>{footertext}</p>
    </figure>
  )
}