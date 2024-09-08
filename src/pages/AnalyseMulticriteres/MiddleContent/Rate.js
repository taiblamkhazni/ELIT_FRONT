/**
 * @file Rate.js
 * @brief Custom Rate Component
 *
 * This module provides a custom rating component for multicriteria analysis questions.
 * The Rate component utilizes styled-components for theming and renders a set of circles,
 * representing the rating scale. Each circle can be toggled to represent a selected rating.
 * The component provides interactive feedback on hover and click events.
 */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * @brief Styled container for the rating component.
 */
const Container = styled.div`
  margin: ${(props) => (props.margin ? props.margin : "0")};
  display: inline-flex;
  align-items: center;
`;

/**
 * @brief Styled SVG circle icon for the rating component.
 */
const Icon = styled.svg`
  cursor: pointer;
  fill: ${({ filled }) => (filled ? "#0070AD" : "white")};
  transition: all 200ms;
  padding: 0px 4px;

  &:hover {
  }
`;

/**
 * @brief Styled header rating text for the rating component.
 */
const HeaderRating = styled.span`
  margin-right: 4px;
`;

/**
 * CircleRate
 * @brief Renders a circle icon that can be toggled between filled and unfilled states.
 *
 * @param {Object} props - Properties passed to the component
 * @returns {JSX.Element} A styled SVG circle icon.
 */
const CircleRate = (props) => {
    const {
        size,
        filled = false,
        onMouseEnter,
        onMouseLeave,
        onClick,
        color = false,
    } = props;

    return (
        <Icon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            filled={filled}
            height={size !== 36 ? size : "16px"}
            wight={size !== 36 ? size : "17px"}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            <circle
                cx="8"
                cy="8"
                r="7"
                stroke={filled ? "#0070AD" : color ? "#E88774" : "#7A7A7A"}
                strokeWidth="2"
            />
        </Icon>
    );
};

/**
 * Rate
 * @brief Main component for capturing user ratings with an interactive set of circles.
 *
 * @param {string} title - Display title for the rating category.
 * @param {string} margin - Margin styling for the rating container.
 * @param {function} onChange - Callback function to handle rating changes.
 * @param {number} defaultValue - The default rating value.
 * @param {boolean} editable - Determines if the rating component is editable.
 * @param {Object} props - Additional properties passed to the component.
 * @returns {JSX.Element} A wrapper component with the rating title and interactive rating circles.
 */
const Rate = ({
    title = "",
    margin = "0",
    onChange,
    defaultValue = 0,
    editable = true,
    ...props
}) => {
    const [hovered, setHovered] = useState(0);
    const [activated, setActivated] = useState(0);

    const { stars = 5, size = 36, color } = props;

    useEffect(() => {
        setActivated(defaultValue);
    }, [defaultValue]);

    const filled = (id) => hovered >= id || (activated >= id && hovered === 0);

    const onMouseEnter = (id) => () => {
        setHovered(id);
    };

    const onMouseLeave = () => setHovered(0);

    const onClick = (id) => () => {
        setHovered(0);
        setActivated((activated) => (activated !== id ? id : activated));
        onChange(title, activated !== id ? id : activated);
    };

    return (
        <div>
            <Container
                margin={margin}
                style={!editable ? { pointerEvents: "none" } : {}}
            >
                <HeaderRating>{title}</HeaderRating>
                {Array(stars)
                    .fill()
                    .map((_, index) => {
                        const id = index + 1;

                        return (
                            <CircleRate
                                key={id}
                                size={size}
                                filled={filled(id)}
                                onMouseEnter={onMouseEnter(id)}
                                onMouseLeave={onMouseLeave}
                                onClick={onClick(id)}
                                color={color}
                            />
                        );
                    })}
            </Container>
        </div>
    );
};

/**
 * @brief PropTypes for the CircleRate component.
 */
CircleRate.propTypes = {
    filled: PropTypes.bool.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.bool,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
};

/**
 * @brief PropTypes for the Rate component.
 */
Rate.propTypes = {
    title: PropTypes.string.isRequired,
    margin: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.number,
    editable: PropTypes.bool,
    color: PropTypes.bool,
    stars: PropTypes.number,
    size: PropTypes.number,
};

export default Rate;
