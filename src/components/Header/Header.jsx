import s from "./header.module.scss"

export const Header = ({children}) => {
  return (
    <header className={s.headerStyling}>{children}</header>
  )
}