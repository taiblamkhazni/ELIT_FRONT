/**
 * @file GraphsBars.js
 * @brief This module exports MenuTitle component
 */
import { memo, useEffect } from "react";
import AspectsBarEScore from "pages/AnalysePrevisibilite/Graphs/AspectsBarEScore";
import AspectsBarMethod from "pages/AnalysePrevisibilite/Graphs/AspectsBarMethod";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { asBase64 as barEscore } from "store/features/AnalysePrevisibiliteFeatures/aspectsBarEScoreSlice";
import { asBase64 as barMethod } from "store/features/AnalysePrevisibiliteFeatures/aspectsBarMethodSlice";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 248px;
  background: #ffffff;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
`;

const WrapperGraph = styled.div`
  position: absolute;
  width: 90%;
  height: 180px;
  left: 3rem;
  top: 4rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.font};
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #1f1a28;
  margin: 1rem 0 0 1.5rem;
`;

/** Bar statistic diagram */
const GraphsBars = memo(
  ({ name, type, methodologies = [], elementalEscores = [] }) => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(barEscore(""));
      dispatch(barMethod(""));
    }, [dispatch]);

    const methodologiesData = methodologies.reduce((acc, m) => {
      if (m.value === "NaN") {
        acc[m.name] = { percent: 0, votesNumber: m.nbVotes };
      } else {
        acc[m.name] = {
          percent: m.value * 100,
          votesNumber: m.nbVotes,
        };
      }
      return acc;
    }, {});

    const elementalEscoresConvertForChart = elementalEscores.map((e) => {
      return {
        type: e.stepName,
        value: parseFloat(e.escore).toFixed(4) * 100,
      };
    });

    return (
      <Wrapper>
        <Title>{name}</Title>
        <WrapperGraph>
          {type === "method" && (
            <AspectsBarMethod methodologiesData={methodologiesData} />
          )}
          {type === "e-score" && (
            <AspectsBarEScore
              elementalEscores={elementalEscoresConvertForChart}
            />
          )}
        </WrapperGraph>
      </Wrapper>
    );
  }
);

GraphsBars.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string, // (method|e-score) - the type of data that diagram serve for
  methodologies: PropTypes.array,
  elementalEscores: PropTypes.array,
};

export default GraphsBars;
