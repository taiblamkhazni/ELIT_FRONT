/**
 * @file SidebarProjectItemWrapper.js
 * @brief Component for rendering project items in a sidebar, with conditional styling and navigation logic
 */
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setIdPlanExecution } from "reducers/executionPlan/executionPlanReducer";
import { getProjectFetch } from "reducers/project/projectReducer";
import ROUTES from "routes/routes";
import styled, { css } from "styled-components";
import { setStringToLowAndNormal } from "utils/effects/effects";
import { SwalSnackBarError } from "utils/Swal/SwalComponents";

/**
 * @brief Styled component for the text part of the item
 */
const TextItemWrapper = styled.span`
  display: flex;
  align-items: center;

  gap : 10px;

  color: #2B0A3D;
`;

/**
 * @brief CSS helper for active state styling
 */
export const active = css`
  font-weight: 700;
  transition: 0.1s;
  background-color: rgba(36, 139, 192, 0.1);
`;

/**
 * @brief Styled component for list item
 */
const CustomLi = styled.li`
  & {
    cursor: pointer;
    line-height: 40px;
    margin-bottom: 0.5rem;
    padding-left: 1.2rem;
    border-radius: 4px;
  }

  &:hover {
    font-weight: 700;
    transition: 0.1s;
    background-color: rgba(36, 139, 192, 0.1);
  }
  &:hover ${TextItemWrapper} {
  }
  ${({ active }) => {
    if (active === "true") {
      return `
        font-weight: 700;
        transition: 0.1s;
        background-color: rgba(36, 139, 192, 0.1);
      `;
    }
  }}
`;

/**
 * @brief SidebarProjectItemWrapper is a React component used for displaying individual project items
 *        in a sidebar. It handles navigation and active state styling based on the current route.
 *
 * @param {object} props - The component props.
 * @param {ReactNode} children - The children elements to render inside the component.
 * @param {string|number} dataItem - Identifier for the project item.
 * @param {string} status - Status of the project item, affects navigation logic.
 *
 */
const SidebarProjectItemWrapper = ({ children, dataItem, status }) => {
  const { pathname } = useLocation();
  const idProjet = pathname.split("/")[2];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickMenuOnSideBar = useCallback((route) => {
    if (setStringToLowAndNormal(status) === "confirmed") {
      navigate(route);
    } else {
      SwalSnackBarError.fire({
        title: "Oops...",
        text: "Ce projet n'est pas encore confirmé",
      });
    }
  }, [navigate, status]);

  const handlerClick = useCallback(() => {
    dispatch(setIdPlanExecution(null))
    dispatch(getProjectFetch(dataItem));
    onClickMenuOnSideBar(ROUTES.projets + "/" + dataItem);
  }, [dataItem, dispatch, onClickMenuOnSideBar]);

  return (
    <CustomLi
      onClick={handlerClick}
      active={+dataItem === +idProjet ? "true" : "false"}
    >
      <TextItemWrapper id={`emplacement-projet-${dataItem}`}>{children}</TextItemWrapper>
    </CustomLi>
  );
};

export default SidebarProjectItemWrapper;
