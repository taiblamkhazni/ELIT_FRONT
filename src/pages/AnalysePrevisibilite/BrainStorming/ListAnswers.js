/**
 * @file ListµAnswer.js
 * @brief This module exports MenuTitle component
 */
import { useEffect } from "react"
import { Col } from "antd"
import Rating from "components/EnhancedRating/RatingItem"
import { LabelCustom } from "components/Label/Label"
import { TitleSection } from "components/Title/Title"
import { HeaderWrapper } from "components/Wrapper/Wrappers";
import { useDispatch, useSelector } from "react-redux"
import { setIsHavingComments } from "reducers/previsibilityAnalysis/previsibilityAnalysisReducer"
import styled from "styled-components"
import { Spinner } from "utils/Spinner"

import AnswerModal from "./AnswerModal";
import ListCommentaires from "./ListCommentaires";

const BodyWrapper = styled.div`
  background: white;
  padding: 12px;
  margin-bottom: 28px;
`;

const QuestionWrapper = styled.div`
  margin-bottom: 1.5rem;
  padding: 16px 8px 0px 24px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
`
/**
 * @brief Tag : Tag Component
 **/
const Tag = styled.div`
  padding: 5px 12px 6px 12px;
  gap: 3px;

  border: solid 1px;
  border-radius: 50px;
  font-size: 12px;
  color: ${(props) => props.color};
`;

export default ({ iteration2 }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.projectReducer.currentUser)
  const sections = useSelector((state) => state.brainStormingResumeReducer.brainStorming)
  const isLoading = useSelector((state) => state.brainStormingResumeReducer.isLoadingBrainstorming)

  useEffect(() => {
    if (sections) {
      const checkHasComments = sections.reduce(
        (acc, s) => {
          s.formQuestions.forEach((question) => {
            if (question.brainstormings.length > 0) {
              acc["check"] = true
            }
          })
          return acc
        },
        { check: false }
      )
      dispatch(setIsHavingComments(checkHasComments.check ? true : false))
    }
  }, [sections,dispatch])

  return (
    <>
      {isLoading ? (
        <Spinner size="small" message="" />
      ) : (
        <>
          {[...sections].length > 0 && [...sections].slice().sort((a, b) => {
            if (a.stepRef > b.stepRef) {
              return 1;
            }
            return -1;
          })
            .map((s, sectionIndex) => {
              return (
                <div key={s.stepRef}>
                  <TitleSection>
                    {sectionIndex + 1}. {s.stepName}
                  </TitleSection>
                  {s.formQuestions.slice()
                    .sort((a, b) => {
                      if (
                        a.questionRef.split("_")[1] >
                        b.questionRef.split("_")[1]
                      ) {
                        return 1;
                      }
                      return -1;
                    })
                    .map((question, questionIndex) => {
                      return (
                        <>
                          <HeaderWrapper style={{backgroundColor:question.updateQuestion ? "#10B5811A" : "#248BC01A"}}>
                            <Col span={18}>
                              <LabelCustom isBlack={true}>
                                {`Question ${sectionIndex + 1}.${questionIndex + 1
                                  }.  `}
                                <strong> {question.questionText}</strong>
                              </LabelCustom>
                            </Col>
                            {question.updateQuestion ? 
                              <Tag color="#178036">Réponse modifiée</Tag>
                            : null}
                          </HeaderWrapper>
                          <QuestionWrapper key={question.questionRef}>

                            <BodyWrapper>
                              <div>{question.answerText}</div>
                              <div
                                style={{
                                  marginTop: "16px",
                                  display: "flex",
                                  "alignItems": "center",
                                  "justifyContent": "space-between"
                                }}
                              >
                                {question.criterias.slice()
                                  .sort((a, b) => {
                                    if (a.criteriaName < b.criteriaName) {
                                      return -1;
                                    }
                                    if (a.criteriaName > b.criteriaName) {
                                      return 1;
                                    }
                                    return 0;
                                  })
                                  .map((c) => (
                                    <Rating
                                      key={c.criteriaName}
                                      defaultValue={0}
                                      margin="0 20px 0 0"
                                      headerTitle={c.criteriaName}
                                      value={c.criteriaValue}
                                      editable={false}
                                      color={'red'}
                                    />
                                  ))}
                                {currentUser.role === "CDP" && (<AnswerModal question={question} />)}
                              </div>

                              <div style={{ "marginTop": "20px" }} >
                                <div>
                                  {question.brainstormings.length > 0 && (<strong>
                                    Commentaires (
                                    {question.brainstormings.length})
                                  </strong>)}
                                </div>
                                <ListCommentaires
                                  question={question}
                                  commentaires={question.brainstormings}
                                  iteration2={iteration2}
                                  currentUser={currentUser}
                                />
                              </div>

                            </BodyWrapper>
                          </QuestionWrapper>

                        </>
                      );
                    })}
                </div>
              );
            }
            )
          }
        </>
      )}
    </>
  );
};
