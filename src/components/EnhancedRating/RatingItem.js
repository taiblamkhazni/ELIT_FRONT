/**
 * @file RatingItem.js
 * @brief This module exports RatingItem component
 */
import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Container = styled.div`
  margin: ${(props) => (props.margin ? props.margin : "0")};
  display: inline-flex;
  align-items: center;
`

const Icon = styled.svg`
  cursor: pointer;
  fill: ${({ filled }) => (filled ? "#0070AD" : "white")};
  transition: all 200ms;
  padding: 0px 4px;

  &:hover {
  }
`

const HeaderRating = styled.span`
  margin-right: 4px;
`

const CircleRate = (props) => {
    const {
        size,
        filled = false,
        onMouseEnter,
        onMouseLeave,
        onClick,
    } = props

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
                stroke={filled ? "#0070AD" : "#7A7A7A"}
                strokeWidth="2"
            />
        </Icon>
    )
}

const Rating = ({
    headerTitle = "",
    margin = "0",
    onRatingChange,
    value,
    editable = true,
    ...props
}) => {
    const [hovered, setHovered] = useState(0)
    const [activated, setActivated] = useState(0)

    const { stars = 5, size = 36, defaultValue = 0 } = props

    useEffect(() => {
        setActivated(defaultValue)
    }, [defaultValue])

    useEffect(() => {
        if (value) {
            setActivated(value)
        } else {
            setActivated(0)
        }
    }, [value])

    const filled = (id) => hovered >= id || (activated >= id && hovered === 0)

    const onMouseEnter = (id) => () => {
        setHovered(id)
    }

    const onMouseLeave = () => setHovered(0)

    const onClick = (id) => () => {
        setHovered(0)
        setActivated((activated) => (activated !== id ? id : activated))
        onRatingChange(headerTitle, activated !== id ? id : activated)
    }

    return (
        <Container
            margin={margin}
            style={!editable ? { pointerEvents: "none" } : {}}
        >
            <HeaderRating>{headerTitle}</HeaderRating>
            {Array(stars)
                .fill()
                .map((_, index) => {
                    const id = index + 1

                    return (
                        <CircleRate
                            key={id}
                            size={size}
                            filled={filled(id)}
                            onMouseEnter={onMouseEnter(id)}
                            onMouseLeave={onMouseLeave}
                            onClick={onClick(id)}
                        />
                    )
                })}
        </Container>
    )
}

Rating.propTypes = {
    defaultValue: PropTypes.number,
    margin: PropTypes.string,
    size: PropTypes.string,
    value: PropTypes.number.isRequired,
    editable: PropTypes.bool,
    onRatingChange: PropTypes.func,
    headerTitle: PropTypes.string,
}

export default Rating
