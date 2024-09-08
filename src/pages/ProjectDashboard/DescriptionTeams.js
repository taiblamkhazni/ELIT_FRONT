/**
 * @file DescriptionTeams.js
 * @brief Exports the DescriptionTeams.js.
 */
import { Teams } from "assets/icons"
import styled from "styled-components"

/**
 * @brief TeamsWrapper : TeamsWrapper.
 */
const TeamsWrapper = styled.div`
  margin-top: 8px;
  text-align: center;
  background: white;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0px 2px 5px 0px rgb(0 0 0 / 10%);
`
/**
 * @brief TeamsSection : TeamsSection.
 */
export const TeamsSection = () => {
    return (
      <TeamsWrapper>
        <a
          href="https://teams.microsoft.com/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "inherit" }}
        >
          <Teams />
          <span style={{ marginLeft: "10px" }}>Réunion Teams</span>
        </a>
      </TeamsWrapper>
    );
}
