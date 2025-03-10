import { Button } from "../Button/Button"
import s from "./Footer.module.scss"

export const Footer = () => {
  return (
    <footer className={s.footerStyling}>
        <div className={s.leftContainer}>
            <header>
                <h2>Nyhedsbrev</h2>
            </header>
            <p>Vil du være med på den grønne front? Tilmeld dig vores nyhedsbrev og få de seneste klima opdateringer direkte i din indbakke</p>
            <span className={s.inputContainer}>
                <input type="email" />
                <input type="submit" value="Tilmeld"/>
            </span>
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
            <p>Vi støtter på organisatorisk plan op om FN´s verdensmål og har derfor besluttet at en del af overskuddet går direkte til verdensmål nr. 13; Klimahandling</p>
            <a>Læs mere om verdensmålene her</a>
        </div>
    </footer>
  )
}