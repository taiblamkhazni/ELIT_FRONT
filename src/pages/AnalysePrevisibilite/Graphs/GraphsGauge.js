/**
 * @file GraphsGauge.js
 * @brief This module exports MenuTitle component
 */
import { useEffect } from "react"
import AspectsGauge from "pages/AnalysePrevisibilite/Graphs/AspectsGauge"
import AspectsGaugePDF from "pages/AnalysePrevisibilite/Graphs/AspectsGaugePDF"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { asBase64 } from "store/features/AnalysePrevisibiliteFeatures/aspectsGaugeSlice"
import styled from "styled-components"

/**
 * @brief Wrapper : Wrapper Component
 */
const Wrapper = styled.div`
  height: 248px;
  background: #ffffff;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
`
/**
 * @brief WrapperGraph : Wrapper Graph Component
 */
const WrapperGraph = styled.div`
  width: 75%;
  height: 9rem;
  margin: auto;
`
/**
 * @brief Title : Title Component
 **/
const Title = styled.h1`
  font-family: ${({ theme }) => theme.font};
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #1F1A28;
  margin: 1rem 1rem 0 1.5rem;
`
/**
 * @brief GraphLabels : Graph Labels Component
 **/
const GraphLabels = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => (props.color ? props.color : "")};
  padding: 0.5rem 0;
`

/**
 * @brief GraphsGauge : Graphs Gauge Component
 * @param name
 * @param result
 **/
const GraphsGauge = ({ name, result }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(asBase64(""))
  }, [dispatch])

  return (
    
    <Wrapper>
      <Title>{name}</Title>
      <WrapperGraph>
        <AspectsGauge />
         <div style={{  height: "0px" }}> 
          <AspectsGaugePDF/>
          </div>
        
      </WrapperGraph>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "-1.2rem 1.6rem",
        }}
      >
        <GraphLabels color={result === "high" ? "#21A759" : "#FFB24A"}>
          Low
        </GraphLabels>
        <GraphLabels color={result === "high" ? "#21A759" : "#FFB24A"}>High</GraphLabels>
      </div>
    </Wrapper>
  );
}

/**
 * @brief GraphsGauge : PropTypes
 **/
GraphsGauge.propTypes = {
  name: PropTypes.string,
  result: PropTypes.string, // (low|high)
}

export default GraphsGauge;
