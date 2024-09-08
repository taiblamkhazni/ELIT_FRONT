/**
 * @file Sidebar.js
 * @brief Ce fichier contient le code pour le composant 'Sidebar'.
 */
/**
 *  @brief Importation du composant Divider
 */
import { Flex } from "antd";
/**
 *  @brief Importation du composant Chatbox
 */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Logo from "../Logo/Logo";

import AdministrationButton from "./AdministrationButton/AdministrationButton";
import Menu from "./Menu/Menu";

/**
 *  @brief Création d'un composant 'Sider' personnalisé avec des styles spécifiques.
 */
const CustomSider = styled(Flex)`
  &&& {
    display: flex;
    flex-direction: column;
    align-items: center;

    min-height: 100vh;
    height: 100%;

    padding-top: 1.5rem;

    background: ${({ theme }) => theme.colors.primaires.white};
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.06),
      0px 3px 1px rgba(0, 0, 0, 0.06);
  }
`;

/**
 *  @brief Création d'un composant 'WrapperCataloge' personnalisé avec des styles spécifiques.
 */
const WrapperCataloge = styled(Flex)`
  width: 100%;
  margin: 2rem auto;
`;

/** Sidebar section component */
export default () => {
  const user = useSelector((state) => state.authentificationReducer.user);

  return (
    <CustomSider vertical>
      {/* Logo section */}
      <Link to="/dashboard">
        <Logo variant="black" />
      </Link>
      <WrapperCataloge vertical>
        {/* administration section link section*/}
        {user?.roles?.find((role) => role === "ADMIN") && (
          <Link to="/administration">
            <AdministrationButton data-testid="administration-button" />
          </Link>
        )}

        {/* projects list section link section*/}
        {user?.roles?.find((role) => role === "USER") && (
          <Menu data-testid="menu" />
        )}
      </WrapperCataloge>
    </CustomSider>
  );
};
