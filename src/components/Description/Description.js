/**
 * @file Description.js
 * @brief This module exports Description component
 */
import PropTypes from "prop-types"
import styled from "styled-components"

export const Description = styled.div`
  margin: ${(props) => (props.margin ? props.margin : "8px 0px 0px 0px")};
  text-align: justify;
  color: ${(props) => (props.checked ? "#7A7A7A" : "inherit")};
`

/**
 * description text composant
 */
export const DescriptionFeature = ({ content, checked = false, margin }) => {
    return (
        <Description margin={margin} checked={checked}>
            {content ? content : "No description"}
        </Description>
    )
}

DescriptionFeature.propTypes = {
    content: PropTypes.string,
    checked: PropTypes.bool,
    margin: PropTypes.string,
}

/**
 * @brief description bold text component and style
 */
export const DescriptionBold = styled.div`
  margin: ${(props) => (props.margin ? props.margin : "8px 0px 0px 0px")};
  text-align: justify;
  font-weight: 700;
`

/**
 * @brief description feature bold text component
 */
export const DescriptionFeatureBold = ({ content, margin }) => {
    return (
        <DescriptionBold margin={margin}>
            {content ? content : "No description"}
        </DescriptionBold>
    )
}

DescriptionFeatureBold.propTypes = {
    content: PropTypes.string,
    margin: PropTypes.string,
}
