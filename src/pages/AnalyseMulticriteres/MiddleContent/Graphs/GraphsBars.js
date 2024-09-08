/**
 * @file GraphsBars.js
 * @brief This module exports GraphBars component
 */
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { asBase64 } from "store/features/AnalyseMulticritereFeatures/critereBarSlice"
import styled from "styled-components"

import CritereBar from "./CritereBar"

const Wrapper = styled.div`
  height: 257px;
  background: #ffffff;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
`

export const WrapperGraph = styled.div`
  position: absolute;
  width: 90%;
  height: 182px;
  left: 3rem;
  top: 4rem;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.font};
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #248bc0;
  margin: 1rem 0 0 1.5rem;
`

const GraphBars = ({ name, allGraphSorted }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asBase64(""))
    }, [dispatch])
    const data = allGraphSorted.map((e) => ({
        type: e.stepName,
        value: e.escore.toFixed(4) * 100,
    }))
    return (
        <Wrapper>
            <Title>{name}</Title>
            <WrapperGraph>
                <CritereBar data={data} />
            </WrapperGraph>
        </Wrapper>
    )
}

export default GraphBars;