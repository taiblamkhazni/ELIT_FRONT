/**
 * @file HeaderDescription.js
 * @brief This module defines the HeaderDescription component and the type of its props.
 *
 * The HeaderDescription component provides contextual descriptions and instructions based on the current phase of the multicriteria analysis process.
 * It leverages the DescriptionFeature component to render the descriptions, and dynamically updates based on the current phase compared to the total number of phases.
 */
import { Col, Row } from "antd";
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import styled from 'styled-components';

import { InfoCircleOutlined } from '@ant-design/icons';

const InfoContainer = styled.div`
  background-color: #e6f7ff;
  padding: 16px;
  margin-bottom: 16px;
  border-left: 4px solid #1890ff;
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
const HeaderDescription = ({ phasesLength }) => {
  const current = useSelector(state => state.multicriteriaAnalysisReducer.current)
  return (
    <>
      {current < phasesLength && (
        <InfoContainer>
          <Row>
            <Col span={1} style={{ paddingTop: '30px' }}>
              <InfoCircleOutlined style={{ fontSize: '30px', color: '#1890ff', marginRight: '8px' }} /></Col>
            <Col span={23}>
              <InfoText>
                Ce formulaire comporte 3 thématiques. L’objectif est d’analyser les spécifications du projet afin d’augmenter le niveau de prévisibilité de la méthode de gestion de projet.
                <br></br> Organiser une session collaborative, à distance ou en présentiel, avec toutes les parties prenantes du projet afin de compléter collectivement ce formulaire (environ 1 heure).
                <br></br>{" "}
                <b>
                  Tous les champs signalés par un astérisque (*) sont
                  obligatoires.
                </b>
              </InfoText>
            </Col>
          </Row>
        </InfoContainer>

        //     {/* {t('projectDetails.headerDescription')} */}

      )}
    </>
  );
}

HeaderDescription.propTypes = {
  phasesLength: PropTypes.number.isRequired,
}

export default HeaderDescription
