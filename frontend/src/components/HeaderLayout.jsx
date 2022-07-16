import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../images/logo.png";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LogoWrapper = styled.img`
  margin: 0 1vw;
  width: 14vw;
  max-width: 165px;
  height: 14vw;
  max-height: 165px;
`;

export const HeaderLayout = ({children}) => {
  // React.memoだとchildrenなどにJSXの要素が入るとメモできないため親コンポーネントでuseMemo
  return (
    <Header>
      <Link to="/restaurants">
        <LogoWrapper src={Logo} alt="logo" />
      </Link>
      {children}
    </Header>
  );
};
