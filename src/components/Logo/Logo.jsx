import { NavLink } from "react-router-dom";
import s from "./Logo.module.scss";

export const Logo = () => {
  return (
    <NavLink to="/">
      <div className={s.logoStyling}>
        <h1>
          Den Grønne <span>Avis</span>
        </h1>
      </div>
    </NavLink>
  );
};
