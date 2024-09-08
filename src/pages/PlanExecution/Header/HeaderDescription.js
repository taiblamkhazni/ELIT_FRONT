/**
 * @file HeaderDescription.js
 * @brief This module defines the HeaderDescription component and the type of its props.
 *
 * The HeaderDescription component provides contextual descriptions and instructions based on the current phase of the multicriteria analysis process.
 * It leverages the DescriptionFeature component to render the descriptions, and dynamically updates based on the current phase compared to the total number of phases.
 */
import { Col, Row } from "antd";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { InfoCircleOutlined } from "@ant-design/icons";

const InfoContainer = styled.div`
  background-color: #e6f7ff;
  padding: 16px;
  margin-bottom: 16px;
`;

const InfoText = styled.p`
  margin: 0;
`;
/**
 * HeaderDescription
 * @brief This component displays dynamic descriptions based on the current phase in the multicriteria analysis.
 * It provides guidance and context to users regarding what to expect and any specific instructions they should be aware of.
 *
 * @param {Object} props - Properties passed to the component, especially the total number of phases.
 * @returns {JSX.Element} Rendered HeaderDescription component.
 */
const HeaderDescription = ({ step, phasesLength }) => {
  const current = useSelector(
    (state) => state.multicriteriaAnalysisReducer?.current
  );

  return (
    <>
      {current < phasesLength && (
        <InfoContainer>
          <Row>
            <Col span={1} style={{ margin: "auto" }}>
              <InfoCircleOutlined
                style={{
                  fontSize: "40px",
                  color: "#0070AD",
                  marginRight: "8px",
                }}
              />
            </Col>
            <Col span={23}>
              {step == 1 ? (
                <InfoText style={{ fontSize: "16px" }}>
                  Cette étape fait l’objet d’une discussion collaborative mais
                  doit-être remplie par le créateur du projet.
                  <br /> A l’issue de cette étape, vous devrez choisir une des
                  méthodes proposées.
                </InfoText>
              ) : (
                <InfoText style={{ fontSize: "16px" }}>
                  Cette étape fait l’objet d’une discussion collaborative :
                  chaque membre du projet peut faire <b>un vote.</b>
                  <br />
                  Notez que pour chaque méthode, une description est fournie
                  avec ses avantages et ses inconvénients.
                </InfoText>
              )}
            </Col>
          </Row>
        </InfoContainer>
      )}
    </>
  );
};

HeaderDescription.propTypes = {
  phasesLength: PropTypes.number.isRequired,
};

export default HeaderDescription;
