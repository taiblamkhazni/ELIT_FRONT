/**
 * @file SubMenu.js
 * @brief Define the SubMenu component
 */
import React from "react";
import { Col, Row } from "antd";
import { CustomUl } from "components/List/List";
import styled from "styled-components";

/**
 * @var TitleSubMenu
 * @brief The style of the component.
 */
const TitleSubMenu = styled.h4`
  font-weight: 600;
  margin: 0;
`;

/**
 * @var default
 * @brief Logic to render the component.
 * @returns The component
 */
export default ({ data }) => {
  const renderTextWithLineBreaks = (text) => {
    return text.split('<br/>').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };
  return (
    <div style={{ background: "#fafafa", padding: "10px" }}>
      <Row style={{ marginBottom: "5px" }}>
        <Col span={4}>
          <TitleSubMenu style={{ color: "#178036", width: "80%" }}>
            Quand l'utiliser ?
          </TitleSubMenu>
        </Col>
        <Col span={14}>
          <CustomUl margin="0 0 0 0px">
          {renderTextWithLineBreaks(data.advantages)}

          </CustomUl>
        </Col>
      </Row>
      <Row style={{ marginBottom: "5px" }}>
        <Col span={4}>
          <TitleSubMenu style={{ color: "#E30021" }}>
            Quand l'éviter ?
          </TitleSubMenu>
        </Col>
        <Col span={14}>
          <CustomUl>
          {renderTextWithLineBreaks(data.disadvantages)}
          </CustomUl>
        </Col>
      </Row>
    </div>
  );
};
