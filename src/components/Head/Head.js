/**
 * @file Head.js
 * @brief Composant Head.
 */

/**
 * @brief Import des modules react
 */
import { useCallback, useState } from "react";
import { Button, Col, Divider, Dropdown, Flex, Popover, Row, Space } from "antd";
/**
 * @brief Import de avatarDefault.
 */
import avatarDefault from "assets/images/avatarDefault.jpg";
import deconnectLogo from "assets/images/deconnect.png";
/**
 * @brief Import de tooltipUserProfilImg.
 */
import tooltipUserProfilImg from "assets/images/image_parameter.png";
import { NextStepButton } from "components/Button/Button";
import { StructureGrid } from "components/Grid/Grid";
/**
 * @brief Import de useAuth.
 */
import useAuth from "hooks/useAuth/useAuth";
/**
 * @brief Import de IgnoreButtonTooltip.
 */
import IgnoreButtonTooltip from "pages/Dashboard/IgnoreButtonTooltip";
/**
 * @brief Import de NotifyTable.
 */
import NotifyTable from "pages/ProjectDashboard/NotifyTable";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setStageNumberWelcomeTooltip } from "reducers/welcomeTooltip/welcomeTooltipReducer";
/**
 * @brief Import de styled-components.
 */
import styled from "styled-components";
import { base } from "theme/base";

import { DownOutlined } from "@ant-design/icons";

/** Custom Header Wrapper Component*/
const CustomHeader = styled(Flex)`
    background: ${({ theme }) => theme.colors.primaires.white};
    height: 72px;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
    margin: 0px 0px 2px 1px;
    align-items: center;
`;

/**
 * @brief Header Title Component
 * @details Si un padding est spécifié via les props, il sera utilisé, sinon, le padding par défaut sera "8px 24px".
 */
const Title = styled.h1`
font-size: 15px;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

/** Username Text Display Component*/
const Username = styled.span`
  font-size: 18px;
  line-height: 40px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primaires.blueDark};
`;

/** Avatar Image Wrapper Component*/
export const WrapperAvatar = styled.img`
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: ${(props) => (props.resetMargin ? "0px" : "0px 8px 0px 8px")};
  border: 2px solid ${({ theme }) => theme.colors.secondaires.grisLight};
`;

/** Custom Vertical Divider Component*/
const CustomDivider = styled(Divider)`
  font-size: 30px;
  color: ${({ theme }) => theme.colors.secondaires.grisLight};
`;

/** Lef Part Wrapper of Header Component*/
const WrapperLeft = styled(Col)`
  &&& {
    text-align: end;
    padding-right: 2%;
  }
`;
/**
 * @brief Header Title Component
 * @details Si un padding est spécifié via les props, il sera utilisé, sinon, le padding par défaut sera "8px 24px".
 */
/** Icon Notification Wrapper Component*/
const NotifyWrapper = styled.div`
  position: fixed;
  z-index: 1;
  right: 14rem;
  top: 1.5rem;
  width: 17rem;
`;

/** Header Component */
export default () => {
    const user = useSelector((state) => state.userReducer.userInfo);
    const avatarUrl = useSelector((state) => state.userReducer.avatarUrl);
    const { logoutUser } = useAuth();
    const setAvatarUrl = (() => {
        const avatar = avatarUrl ? avatarUrl : avatarDefault;
        return avatar
    })(avatarUrl);
    const [notificationHidden, setNotificationHidden] = useState(true);

    /** Begin - Drop Menu of User Profil. */
    const menuItems = [
        {
            key: "profile",
            label: <Link id="texte-monprofil" to="/profil">Mon compte</Link>,
        },
        {
            key: "logout",
            label: (
                <a id="texte-deconnexion" onClick={logoutUser} href="/connexion">
                    Déconnexion <img id="image-deconnexion" src={deconnectLogo} alt="desconnect" />
                </a>
            ),
        },
    ];

    /** Ending - Drop Menu of User Profil. */

    const toolTipStage = useSelector(
        (state) => state.welcomeTooltipReducer.stageNumber
    );

    const openTooltip = toolTipStage === 3;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        dispatch(setStageNumberWelcomeTooltip(toolTipStage + 1));
    }, [dispatch, toolTipStage]);

    /** Begin - Content of user profile tooltip for description of user profil section at the first ever connection */
    const contentPopover = (
        <>
            <StructureGrid
                spanLeft={19}
                leftChild={
                    <p style={{ textAlign: "justify", fontSize: "12px" }}>
                        En cliquant sur votre nom et prénom, un bouton déroulant s’affiche
                        vous permettant d’accèder aux paramètres de votre compte. Ainsi vous
                        pourrez consulter les données et les modifier.
                    </p>
                }
                spanRight={5}
                rightChild={
                    <Row align="center">
                        <img src={tooltipUserProfilImg} alt="" />
                    </Row>
                }
            />

            <Row align="right" justify="end">
                {/* <ButtonNoBackground
          fontSize={"10px"}
          padding={"8px 12px"}
          height={"100%"}
          margin="15px 12px 0 0"
        >
          Ignorer
        </ButtonNoBackground> */}
                <IgnoreButtonTooltip />
                <NextStepButton
                    padding={"0px 12px"}
                    fontSize={"10px"}
                    margin="15px 0 0 0"
                    onClick={handleClick}
                >
                    Suivant
                </NextStepButton>
            </Row>
        </>
    );
    /** Ending - Content of user profile tooltip for description of user profil section at the first ever connection */

    return (
        <>
            <CustomHeader justify="flex-end">
                {/* Header Title section */}
                <Title style={{ cursor: 'pointer' }} id="Apropos-link" onClick={() => navigate("/about")}>
                    À propos
                </Title>
                {/* User profile section */}
                <WrapperLeft >
                    <Popover
                        placement="bottomRight"
                        content={contentPopover}
                        trigger="click"
                        open={openTooltip}
                        overlayStyle={{ width: "406px" }}
                        overlayInnerStyle={{ padding: "0" }}
                    >
                        <Space
                            style={
                                openTooltip
                                    ? {
                                        zIndex: 10,
                                        backgroundColor: "white",
                                        position: "relative",
                                        padding: "10px",
                                        borderRadius: "4px",
                                    }
                                    : {}
                            }
                        >
                            <div
                                data-testid="setNotificationHiddenDiv"
                                onClick={() => setNotificationHidden(!notificationHidden)}
                            >
                            </div>
                            <CustomDivider type="vertical" />

                            <WrapperAvatar id="image-profil" src={setAvatarUrl} alt="image profil" />

                            <Dropdown
                                menu={{
                                    items: menuItems,
                                }}
                            >
                                <a id="nom-liste-container">
                                    <Username id="profil-connecte">
                                        {user?.userFirstName} {user?.userLastName}
                                    </Username>
                                    <Button type="text">
                                        <DownOutlined id="image-fleche-liste-deroulante" style={{ color: `${base.colors.primaires.blue}` }} />
                                    </Button>
                                </a>
                            </Dropdown>
                        </Space>
                    </Popover>
                </WrapperLeft>

            </CustomHeader>

            {/* Notification section */}
            {!notificationHidden && (
                <NotifyWrapper>
                    <NotifyTable />
                </NotifyWrapper>
            )}
        </>
    );
};
