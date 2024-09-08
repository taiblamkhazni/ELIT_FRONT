/**
 * @file TableBordButton.js
 * @brief This module exports TableBordButton component
 */
import { useCallback } from "react"
import { Flex, Popover, Row, Tooltip } from "antd"
import { Grid } from "assets/icons"
import tooltipAcceuillImg from "assets/images/image_home.png"
import { NextStepButton } from "components/Button/Button"
import IgnoreButtonTooltip from "pages/Dashboard/IgnoreButtonTooltip"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { setStageNumberWelcomeTooltip } from "reducers/welcomeTooltip/welcomeTooltipReducer"
import styled from "styled-components"

export const WrapperSidebarItem = styled(Flex)`
  &&& {
    padding: ${(props) => (props.padding ? props.padding : "0px 0px 0px 8px")};
    border-radius: 4px;

    font-weight: ${({ $isactive }) => ($isactive ? "bold" : "normal")};
    font-style: normal;
    font-size: 18px;
    line-height: 56px;

    margin-bottom: 8px;

    color: #2B0A3D;
    background: ${(props) =>
    props.checked ? "rgba(36, 139, 192, 0.1)" : "white"};
  }

  &&&:hover {
    background: rgba(36, 139, 192, 0.1);
    cursor: pointer;
    transition: 0.35s;
  }
`

export const WrapperSidebarItemHover = styled(Row)`
  &&& {
    border-radius: 4px;
    padding: ${(props) => (props.padding ? props.padding : "8px 0px 8px 10%")};
    color: #2B0A3D;
    font-style: normal;
    line-height: 40px;
    margin: ${(props) => (props.margin ? props.margin : "25px 0px 0px 0px")};
    font-size: 16px;
    background: ${(props) =>
    props.checked ? "rgba(36, 139, 192, 0.1)" : "white"};
  }
  &&&:hover {
    background: ${(props) =>
    props.resetbackgroundhover ? "white" : "rgba(36, 139, 192, 0.1)"};
    cursor: pointer;
    transition: 0.35s;
  }
`

/** Home page Tooltip Component - present home page section at the first time of connection  */
export default () => {
  let navigate = useNavigate()
  let { pathname } = useLocation()
  const toolTipStage = useSelector(
    (state) => state.welcomeTooltipReducer.stageNumber
  )
  const dispatch = useDispatch()
  const handleClick = useCallback(() => {
    dispatch(setStageNumberWelcomeTooltip(toolTipStage + 1))
  }, [dispatch, toolTipStage])

  const handleNavigate = useCallback(() => {
    navigate("/dashboard")
  }, [navigate])

  const openTooltip = toolTipStage === 1;

  const content = (
    <>
      <Flex vertical>
        <Row align="center">
          <img src={tooltipAcceuillImg} alt="" />
        </Row>
        <Row style={{ textAlign: "justify", fontSize: "12px" }}>
          Cette rubrique vous permet de retourner à la page d’accueil vous
          permettant d’accéder à une explication exhaustive de l’outil, à une
          vidéo explicative du projet et à la création d’un projet.
        </Row>
        <Row align="right" justify="end">
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
      </Flex>
    </>
  );

  return (
    <Flex vertical>
      <Popover
        open={openTooltip}
        placement="rightTop"
        content={content}
        trigger="click"
        overlayStyle={{ width: "406px" }}
        overlayInnerStyle={{ padding: "0" }}
      >
        <Tooltip
          data-testid="table-bord-button"
          style={
            openTooltip
              ? {
                position: "relative",
                zIndex: "2",
                background: "white",
                display: "block",
                borderRadius: "4px",
              }
              : { position: "relative" }
          }
        >
          <WrapperSidebarItem
            data-testid="wrapper-sidebar-item"
            checked={pathname === "/dashboard" ? true : false}
            $isactive={pathname === "/dashboard"}
            onClick={handleNavigate}
          >
            <Flex align="center" gap="small">
              <Grid id="image-accueil" fill="#248BC0" data-testid="grid-icon" />
              <span id="texte-Page d'accueil">Page d'accueil</span>
            </Flex>
          </WrapperSidebarItem>
        </Tooltip>
      </Popover>
    </Flex>
  );
}
