import s from "./Wrapper.module.scss"

export const Wrapper = ({children, type}) => {
  return (
    <section className={`${s.wrapperStyling} ${s[type]}`}>{children}</section>
  )
}