import s from "./Button.module.scss";

export const Button = ({ action, type, text, active }) => {
  return (
    <button
      onClick={action}
      className={`${s.buttonStyling} ${s[type]} ${s[active]}`}
    >
      {text}
    </button>
  );
};
