import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../images/logo.png";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LogoWrapper = styled.img`
  margin: 0 1vw;
  height: 12vw;
`;

export const HeaderComponent = () => {
  return (
    <Header>
      <Link to="/restaurants">
        <LogoWrapper src={Logo} alt="logo" />
      </Link>
    </Header>
  );
};
