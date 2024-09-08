/**
 * @file TitleDate.js
 * @brief Exports the TitleDate.js.
 */
import { Row } from "antd"
import { format, parseISO } from "date-fns"
import { TitlePage } from "pages/ProjectCreation/WrapperProjectSearch/WrapperProjectSearch"
import styled from "styled-components"
import { t } from "utils/translationUtils";

/**
 * @var TitleDate
 * @brief TitleDate.
 */
const TitleDate = styled.span`
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.secondaires.grisDark};
`
/**
 * @var default
 * @brief default.
 */
export default ({ title, date }) => {
  return (
    <Row justify="start" style={{ alignItems: "baseline" }}>
      <TitlePage margin="0px 17px 0px 0px">{title}</TitlePage>
      <div>
        <TitleDate>{t('projectDashboard.createdAt')}{" "}{format(parseISO(date), "dd/MM/yyyy")}</TitleDate>
      </div>
    </Row>
  );
};
