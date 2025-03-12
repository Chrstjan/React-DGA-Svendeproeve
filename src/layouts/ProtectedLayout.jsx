import { useContext } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Header } from "../components/Header/Header";
import { Logo } from "../components/Logo/Logo";
import { Dropdown } from "../components/Dropdown/Dropdown";
import { Button } from "../components/Button/Button";
import { Footer } from "../components/Footer/Footer";
import { Wrapper } from "../components/Wrapper/Wrapper";

export const ProtectedLayout = () => {
  const { user } = useContext(UserContext);

  if (!user?.access_token) {
    return <Navigate to="/" redirect />;
  }

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
            <img src="/icons/icons-mail-30.png" alt="mail icon" />
            <img src="/icons/icons-info-30.png" alt="info icon" />
            <NavLink to="/profile">
              <img src="/icons/icons-account-30.png" alt="account icon" />
            </NavLink>
          </Wrapper>
        </Wrapper>
      </Header>
      <Outlet />
      <Footer />
    </>
  );
};
