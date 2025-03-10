import s from "./Wrapper.module.scss"

export const Wrapper = ({children, type, text, subText}) => {
  return (
    <>
      <header className={s.sectionHeader}>
        {text ? <h3>{text}</h3> : null}
        {subText ? <p>{subText}</p> : null}
      </header>
      <section className={`${s.wrapperStyling} ${s[type]}`}>{children}</section>
    </>
  )
}