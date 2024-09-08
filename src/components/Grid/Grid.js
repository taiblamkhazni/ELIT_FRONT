/**
 * @file Grid.js
 * @brief This module exports Grid component
 */
import { Col, Row } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";

const EnhancedRow = styled(Row)`
  margin: ${(props) => (props.margin ? props.margin : "0")};
  padding: ${(props) => (props.padding ? props.padding : "0")};
  border-bottom: ${(props) => (props.borderbottom ? props.borderbottom : "0")};
  overflow: hidden;
`;

/**
 * Custom Layout Component
 */
export const StructureGrid = ({
  leftChild,
  rightChild,
  spanLeft = 18,
  spanRight = 6,
  align = "",
  gutter = [0, 0],
  margin = "0",
  padding = "",
  justify = "",
  borderBottom = "",
  spanMedium = 6,
  MeduimChild = "",
  meduimCol= false
}) => {
  return (
    <EnhancedRow
      gutter={gutter}
      align={align}
      margin={margin}
      padding={padding}
      borderbottom={borderBottom}
      justify={justify}
      data-testid="enhanced-row"
    >
      <Col span={spanLeft}>{leftChild}</Col>
      {meduimCol && <Col span={spanMedium}>{MeduimChild}</Col>}
      <Col span={spanRight}>{rightChild}</Col>
    </EnhancedRow>
  );
};

StructureGrid.propTypes = {
  leftChild: PropTypes.element, // component defined in the left part of layout
  rightChild: PropTypes.element, // component defined in the right part of layout
  spanLeft: PropTypes.number, // width of the layout left part: 0->24
  spanRight: PropTypes.number, // width of the layout right part: 0->24
  align: PropTypes.string, // vertical alignment: top|middle|bottom
  justify: PropTypes.string, // horizontal arrangement: start|end|center
  gutter: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]), // Space between grids. Ex: [horizontal, vertical]
  padding: PropTypes.string, // padding style
  borderBottom: PropTypes.string, // custom border for layout
};
