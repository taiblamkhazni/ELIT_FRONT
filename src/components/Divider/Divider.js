/**
 * @file Divider.js
 * @brief This module exports Divider component
 */
import { Divider } from "antd"
import PropTypes from "prop-types"
import styled from "styled-components"
import { base } from "theme/base"

/**
 * custom divider composant
 */
/**
 * @brief HorizontalDividerBase.
 * @param theme the selected theme tu use.
 * @return component.
 */
export const HorizontalDividerBase = styled(Divider)`
  border-top: 1px solid ${base.colors.secondaires.grisLight};
  margin: 0;
  padding: 0;
`
/**
 * @brief HorizontalDivider.
 * @param margin Margin for component.
 * @param padding Padding for component.
 * @return component.
 */
export const HorizontalDivider = ({
    margin = "32px 0px 0px 0px",
    padding = "0",
}) => {
    return (
        <div style={{ padding: padding, margin: margin }}>
            <HorizontalDividerBase />
        </div>
    )
}

HorizontalDivider.propTypes = {
    margin: PropTypes.string,
    padding: PropTypes.string,
}
