import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Logo } from "../components/Logo/Logo";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { Button } from "../components/Button/Button";
import { Dropdown } from "../components/Dropdown/Dropdown";
import { Footer } from "../components/Footer/Footer";

export const MainLayout = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/create");
  };

  return (
    <>
      <Header>
        <Logo />
        <Wrapper headerType="noTop" type="navContainer">
          <Dropdown defaultText="vælg kategori" canNavigate />
          <Button
            action={() => handleButtonClick()}
            text="opret annonce"
            type="createButton"
          />
          <Wrapper headerType="noTop" type="iconContainer">
            <img src="/icons/Mail.svg" alt="mail icon" />
            <img src="/icons/Info.svg" alt="info icon" />
            <NavLink to="/profile">
              <img src="/icons/Account.svg" alt="account icon" />
            </NavLink>
          </Wrapper>
        </Wrapper>
      </Header>
      <Outlet />
      <Footer />
    </>
  );
};
