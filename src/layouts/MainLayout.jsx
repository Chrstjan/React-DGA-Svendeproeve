import { Outlet } from "react-router-dom"
import { Header } from "../components/Header/Header"
import { Logo } from "../components/Logo/Logo"
import { Wrapper } from "../components/Wrapper/Wrapper"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { Button } from "../components/Button/Button"
import { Dropdown } from "../components/Dropdown/Dropdown"
import { Footer } from "../components/Footer/Footer"

export const MainLayout = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Header>
        <Logo />
        <Dropdown defaultText="vælg en kategori" canNavigate/>
        {user?.access_token ?  <Button text="opret annonce" type="createButton"/>: null}
        <Wrapper type="iconContainer">
          <img src="./icons/icons-mail-30.png"/>
          <img src="./icons/icons-info-30.png"/>
          <img src="./icons/icons-account-30.png"/>
        </Wrapper>
      </Header>
        <Outlet />
      <Footer />
    </>
  )
}