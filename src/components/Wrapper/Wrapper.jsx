import s from "./Wrapper.module.scss";

export const Wrapper = ({
  children,
  type,
  headerType,
  text,
  subText,
  infoText,
}) => {
  return (
    <>
      <header className={`${s.sectionHeader} ${s[headerType]}`}>
        {text ? <h3>{text}</h3> : null}
        {subText ? <p>{subText}</p> : null}
        {infoText ? <p>{infoText}</p> : null}
      </header>
      <section className={`${s.wrapperStyling} ${s[type]}`}>{children}</section>
    </>
  );
};
