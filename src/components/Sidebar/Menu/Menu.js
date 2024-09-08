/**
 * @file Menu.js
 * @brief This module exports Menu component
 */
import { Suspense, useCallback, useEffect, useState } from "react";
import { Flex, Popover, Row } from "antd";
import tooltipListProjectsImg from "assets/images/image_project.png";
import { NextStepButton } from "components/Button/Button";
import { StructureGrid } from "components/Grid/Grid";
import List from "components/List/List";
import ProjectCreationProvider from "context/ProjectCreationProvider";
import IgnoreButtonTooltip from "pages/Dashboard/IgnoreButtonTooltip";
import ModalProjectCreation from "pages/ProjectCreation/ModalProjectCreation/ModalProjectCreation";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { showProjectCreationSuccessModalPlus } from "reducers/projects/projectsReducer";
import { setStageNumberWelcomeTooltip } from "reducers/welcomeTooltip/welcomeTooltipReducer";
import styled from "styled-components";
import { Spinner } from "utils/Spinner";

import { PlusCircleOutlined, RightOutlined } from "@ant-design/icons";

import SidebarProjectItemWrapper from "./SidebarProjectItemWrapper/SidebarProjectItemWrapper";

export const WrapperSidebarItem = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 8px;
  padding: 0 1.2rem ;

  font-weight: ${({ $isactive }) => ($isactive ? "700" : "500")};
  font-size: 13px;
  line-height: 56px;
  color: #2b0a3d;

  background: ${(props) =>
    props.checked ? "rgba(36, 139, 192, 0.1)" : "white"};

  &:hover {
    cursor: pointer;
    font-weight: 700;
    background: rgba(36, 139, 192, 0.1);
  }
`;

/**
 * @brief Styled component for the "Voir tous" button
 */
const EnPlusButton = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;

  line-height: 40px;
  margin-bottom: 0.5rem;
  padding-left: 1.2rem;
  border-radius: 4px;

  font-size: 13px;
  color: #2b0a3d;
  font-weight: 500;
  text-align: left;

  & svg {

  }

  &:hover {
    font-weight: 700;
  }
`;

export default () => {
  const showMessageCreationModalPlus = useSelector(state => state.projectsReducer.showMessageCreationModalPlus);
  const data = useSelector((state) => state.projectsReducer.projects) || [];
  const [isProjects, setIsProjects] = useState([]);
  let navigate = useNavigate();
  let { pathname } = useLocation();
  const [sevenFirstProjectItem, setSevenFirstProjectItem] = useState([]);

  const onClickEnPlusProjects = () => {
    // Somewhere in your code, e.g. inside a handler:
    navigate("/projets");
  };
  const showModal = () => {
    dispatch(showProjectCreationSuccessModalPlus());
  };

  const toolTipStage = useSelector(
    (state) => state.welcomeTooltipReducer.stageNumber
  );

  const openTooltip = toolTipStage === 2;

  const dispatch = useDispatch();

  const handlerClick = useCallback(() => {
    dispatch(setStageNumberWelcomeTooltip(toolTipStage + 1));
  }, [dispatch, toolTipStage]);

  useEffect(() => {
    const sortedProjects = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setIsProjects(sortedProjects);
    setSevenFirstProjectItem(sortedProjects.slice(0, 7));
  }, [data]);

  const content = (
    <>
      <StructureGrid
        spanLeft={19}
        leftChild={
          <p style={{ textAlign: "justify", fontSize: "12px" }}>
            Mes projets vous permet d’accéder aux différents projets que vous
            avez pu créer par l’outil ou dédié par le chef de projet. Vous
            pouvez consulter / continuer l’analyse d’un projet et modifier selon
            vos droits.
          </p>
        }
        spanRight={5}
        rightChild={
          <Row align="center">
            <img src={tooltipListProjectsImg} alt="" />
          </Row>
        }
      />
      <Row align="right" justify="end">
        <IgnoreButtonTooltip />
        <NextStepButton
          padding={"0px 12px"}
          fontSize={"10px"}
          margin="15px 0 0 0"
          onClick={handlerClick}
        >
          Suivant
        </NextStepButton>
      </Row>
    </>
  );

  return (
    <>
      <Flex vertical>
        <Popover
          open={openTooltip}
          placement="rightTop"
          content={content}
          trigger="click"
          overlayStyle={{ width: "406px" }}
          overlayInnerStyle={{ padding: "0" }}
        >
          <div
            data-testid="menu"

            style={
              openTooltip
                ? {
                  position: "relative",
                  zIndex: "2",
                  background: "white",
                  display: "block",
                  borderRadius: "4px",
                  padding: "0",
                }
                : {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 1.2rem",
                }
            }
          >
            <WrapperSidebarItem
              onClick={() => navigate("/projets")}
              checked={pathname === "/projets" ? true : false}
              $isactive={pathname === "/projets"}
            >
              <span>TOUS LES PROJETS</span>

            </WrapperSidebarItem>
            <PlusCircleOutlined style={{
              color: '#4EA1CD',
              fontSize: '18px', // Adjust size as needed
              stroke: '#4EA1CD',
              strokeWidth: 2, // Adjust stroke width to make it bolder
            }} onClick={showModal} />
            {showMessageCreationModalPlus && <ProjectCreationProvider><ModalProjectCreation isPlusModal={showMessageCreationModalPlus} /></ProjectCreationProvider>}



          </div>
        </Popover>
        <Flex vertical>
          <Suspense fallback={<Spinner size={"small"} message="" />}>
            {isProjects ? (
              <>
                <List
                  data={sevenFirstProjectItem}
                  WrapperItem={SidebarProjectItemWrapper}
                />
                {isProjects.length > 7 ? (
                  <EnPlusButton href="/#" onClick={onClickEnPlusProjects}>
                    Voir tous <RightOutlined style={{ width: "1.5em", paddingTop: "2px", paddingLeft: "8px" }} />
                  </EnPlusButton>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </Suspense>
        </Flex>
      </Flex>
    </>
  );
};
