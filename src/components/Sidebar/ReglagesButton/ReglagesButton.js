/**
 * @file ReglagesButton.js
 * @brief This module exports ReglagesButton component
 */
import { Col, Row, Space } from "antd"
import { Settings } from "assets/icons"
import styled from "styled-components"

const Wrapper = styled(Row)`
  &&& {
    padding: 8px 0px;
    color: #248bc0;
    border-radius: 4px;
    font-weight: 400;
    font-style: normal;
    line-height: 40px;
    margin-top: 32px;
    font-size: 16px;
    padding-left: 10%;
  }

  &&&:hover {
    cursor: pointer;
  }
`

/** Setting section Link Button Component */
export default () => {
    return (
        <Wrapper data-testid="settings-link-wrapper">
            <Col span={24}>
                <Space>
                    <Settings fill="#248BC0" data-testid="settings-icon"/>
                    <span>Réglages</span>
                </Space>
            </Col>
        </Wrapper>
    )
}
