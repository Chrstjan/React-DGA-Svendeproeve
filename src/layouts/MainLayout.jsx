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
        <Dropdown defaultText="vælg en kategori" canNavigate />
        <Button
          action={() => handleButtonClick()}
          text="opret annonce"
          type="createButton"
        />
        <Wrapper type="iconContainer">
          <img src="/icons/icons-mail-30.png" alt="mail icon" />
          <img src="/icons/icons-info-30.png" alt="info icon" />
          <NavLink to="/profile">
            <img src="/icons/icons-account-30.png" alt="account icon" />
          </NavLink>
        </Wrapper>
      </Header>
      <Outlet />
      <Footer />
    </>
  );
};
