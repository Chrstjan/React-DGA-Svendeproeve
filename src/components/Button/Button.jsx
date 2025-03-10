import s from "./Button.module.scss";

export const Button = ({ action, type, text }) => {
  return (
    <button onClick={action} className={`${s.buttonStyling} ${s[type]}`}>
      {text}
    </button>
  );
};