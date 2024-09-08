/**
 * @file AnalysusStatusComponent.js
 * @brief This module exports AnalysusStatusComponent component
 */
import { Col, Row } from "antd";
import { DotIcon } from "assets/icons";

import "../ListProjects.css";

/**
 * @breif This component is used to display the status of the analysis of the project
 * @param multiCriteriaStatus
 */
export default function AnalysisStatusComponent({ multiCriteriaStatus }) {
  // dictionnary containing content and color within the statut of the project
  let dicoMultiCri = { content: "", color: "#6A6A6A" };
  if (multiCriteriaStatus === "NOT_STARTED") {
    dicoMultiCri = { content: "", color: "#6A6A6A" };
  } else if (multiCriteriaStatus === "IN_PROGRESS") {
    dicoMultiCri = {
      content: "Analyse collaborative en cours",
      color: "#6A6A6A",
    };
  } else if (multiCriteriaStatus === "DONE") {
    dicoMultiCri = {
      content: "Analyse collaborative en cours",
      color: "#6A6A6A",
    };
  }

  return (
    <Row justify="center" align="middle" gutter={20}>
      {/* to be rework start: Ia element this block should be rework when IA analysis will be available and backend should send information  * th */}
      <Col style={{ display: "none" }}>
        <Row justify="center" align="middle">
          <DotIcon fill="#6A6A6A" />
          <p style={{ color: "#6A6A6A" }} className="m-0 ml-4">
            Analysis ia
          </p>
        </Row>
      </Col>
      {/*to be rework end */}

      {/* Collaborative element */}
      {multiCriteriaStatus !== "NOT_STARTED" && (
        <Col>
          <Row justify="center" align="middle">
            <DotIcon fill={dicoMultiCri.color} />
            <p style={{ color: dicoMultiCri.color }} className="m-0 ml-4 mr-4">
              {dicoMultiCri.content}
            </p>
          </Row>
        </Col>
      )}
    </Row>
  );
}
