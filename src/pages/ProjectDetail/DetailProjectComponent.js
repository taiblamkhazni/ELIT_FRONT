/**
 * @file DetailProjectComponent.js
 * @brief This component displays detailed information about a dedicated project.
 * It includes the project name, creation date, description, and options to view collaborative or AI analysis.
 * Users can switch between collaborative analysis and analysis with artificial intelligence (AI).
 * It also provides additional information and options based on the selected analysis mode.
 */

import { useState } from "react";
import {  Col, Radio, Row, Typography } from "antd";
import Edit from "assets/icons/symbols/edit";
import ListStage from "pages/ProjectDashboard/ListStage"
import ListStageIA from "pages/ProjectDashboard/ListStageIA"
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { base as graphiqueChart } from "theme/base";
import { t } from "utils/translationUtils";

import ModalUpdateProject from "./ModalUpdateProject";

const {  Paragraph, Title } = Typography;

/**
 * @brief Displays detailed project information including name, creation date, and description.
 * @param name - The name of the project.
 * @param createdAtFormated - The formatted creation date of the project.
 * @param description - The description of the project.
 */
export default function DetailProjectComponent({ chefId, id, name, createdAtFormated, description }) {
  /**
   * @brief Select the current user from the authentication reducer in the Redux store.
   */
  const curentUser = useSelector((state) => state.authentificationReducer?.user);
  const [value, setValue] = useState("collab");
  const [isModalOpen, setIsModalOpen] = useState(false);


  /**
   * @brief Handles the change of radio button for switching between collaborative and AI views.
   * @param e: The event object.
   */
  const onChangeSwitch = (e) => {
    setValue(e.target.value);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Row>
        <Col span={8}>
          <Title id="visualisation-project-name" style={{ fontSize: graphiqueChart.fontSizes.Hecto, marginTop: '0px' }}>
            {name}
            {curentUser?.id === chefId && (
              <>
                <Edit onClick={() => setIsModalOpen(true)} style={{ marginLeft: '5px' }} />
                <ModalUpdateProject chefId={chefId} id={id} name={name} description={description} isModalOpen={isModalOpen} handleOk={handleOk}
                  handleCancel={handleCancel} />
              </>
            )}
          </Title>
        </Col>
        <Col span={4} offset={12}>
          <Title
            id="visualisation-project-date"
            style={{
              fontSize: graphiqueChart.fontSizes.Centi,
              color: 'darkgray',
              textAlign: 'right',
            }}
          >
            {t('projectDetails.createdAt')}{' '}{createdAtFormated}
          </Title>
        </Col>
      </Row>
      <Paragraph id="visualisation-project-description" style={{ fontSize: graphiqueChart.fontSizes.Deci }}>
        {description}
      </Paragraph>
      <Paragraph id="choix-methode-description" style={{ fontSize: graphiqueChart.fontSizes.Deci }}>
        {t('projectDetails.choose')}
      </Paragraph>
      <Row>
        <Radio.Group
          defaultValue="collab"
          onChange={(e) => onChangeSwitch(e)}
          value={value}
          buttonStyle="solid"
          style={{ width: "100%", marginBottom: "32px" }}
        >
          <Row>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 12 }}
              xl={{ span: 12 }}
            >
              <Radio.Button
                id="Analyse collaborative"
                value="collab"
                style={{
                  width: "100%",
                  textAlign: "center",
                  height: "48px",
                  fontWeight: "bold",
                  paddingTop: "8px",
                  ...(value !== "collab" ? { color: "#0070AD" } : {}),
                }}
              >
                {t('projectDetails.collabAnalysis')}
              </Radio.Button>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 12 }}
              xl={{ span: 12 }}
            >
              <Radio.Button
                id="analyse-ia"
                value="ia"
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "bold",
                  height: "48px",
                  paddingTop: "8px",
                  ...(value !== "ia" ? { color: "#0070AD" } : {}),
                }}
              >
                {t('projectDetails.aiAnalysis')}

              </Radio.Button>
            </Col>
          </Row>
        </Radio.Group>
      </Row>
      {value === "collab" && <ListStage />}
      {value === "IA" && <ListStageIA />}
    </>
  );
}
DetailProjectComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdAtFormated: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};