/**
 * @file WrapperProjectSearch.js
 * @brief This module exports the SearchProjectsHeader component used for managing project searches.
 *
 * The WrapperProjectSearch component provides a user interface for displaying the total number of projects
 * and a search input field. It allows users to search through their projects dynamically. This component
 * leverages the useProjectCreationContext for state management and actions related to project searching.
 */

/**
 * @brief Import Row component from antd.
 */
import { Row } from "antd"
/**
 * @brief Import StructureGrid component from custom Grid components.
 */
import { StructureGrid } from "components/Grid/Grid"
/**
 * @brief Import styled from styled-components.
 */
import styled from "styled-components"
/**
 * @brief Import translation utility.
 */
import { t } from "utils/translationUtils";

/**
 * @brief TitlePage: Styled component for the title.
 * @param {Object} props - Props for styling the component.
 * @param {string} props.margin - Optional margin property to adjust spacing.
 * @returns {React.Component} - The styled TitlePage component.
 */
export const TitlePage = styled.div`
  margin: ${(props) => (props.margin ? props.margin : "0px")};
  font-size: 22px;
  font-weight: 400;
`

/**
 * @brief WrapperProjectSearch: Component for wrapping the project search header.
 * @returns {React.Component} - The SearchProjectsHeader component.
 */
const WrapperProjectSearch = () => {

  /**
   * @brief Return the JSX for rendering the StructureGrid with project search header.
   */
  return (
    <StructureGrid
      margin="4px 0px 20px 0px"
      leftChild={
        <Row justify="start">
          <TitlePage id="texte-Mesprojets">{t('projectCreation.search.title')}</TitlePage>
        </Row>
      }
      spanLeft={12}
    />
  )
}

/**
 * @brief Export WrapperProjectSearch as default.
 */
export default WrapperProjectSearch;
