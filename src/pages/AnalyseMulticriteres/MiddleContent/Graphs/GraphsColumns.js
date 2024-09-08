/**
 * @file GraphsColumns.js
 * @brief This module exports MenuTitle component
 */
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { initiateAllState } from "store/features/AnalyseMulticritereFeatures/critereColumnSlice"
import styled from "styled-components"

import CritereColumn from "./CritereColumn"

const Wrapper = styled.div`
  height: 287px;
  background: #ffffff;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
`

const WrapperGraph = styled.div`
  position: absolute;
  width: 80%;
  height: 214px;
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

const GraphsColumns = ({ graph }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initiateAllState())
    }, [dispatch])
    return (
        <>
            {graph.value ? (
                <Wrapper>
                    <Title>{graph.name}</Title>
                    <WrapperGraph>
                        <CritereColumn graph={graph} />
                    </WrapperGraph>
                </Wrapper>
            ) : (
                <></>
            )}
        </>
    )
}

export default GraphsColumns;
