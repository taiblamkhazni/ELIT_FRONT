/**
 * @file ListAnswer.js
 * @brief Exports the ListAnswer.js.
 */
import { HorizontalDivider } from "components/Divider/Divider"
import { LabelCustom } from "components/Label/Label"
import { TitleSection } from "components/Title/Title"
import { HeaderWrapper } from "components/Wrapper/Wrappers"
import { GetBrainStormingResumeByPrevIdQuery } from "hooks/queries/queries"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { Spinner } from "utils/Spinner"
import { t } from "utils/translationUtils";

import ListCommentaires from "./ListComments"

/**
 * @brief BodyWrapper.
 */
const BodyWrapper = styled.div`
  background: white;
  padding: 24px;
  margin-bottom: 24px;
`

/**
 * @brief ListAnswer
**/
const ListAnswer = () => {
  const id = useSelector(state => state.previsibilityAnalysisReducer.id)
  const projectId = useSelector((state) => state.projectReducer.projectId);
  const { data: sections, isLoading } = GetBrainStormingResumeByPrevIdQuery(id, projectId)

  return (
    <>
      {isLoading ? (
        <Spinner size="small" message="" />
      ) : (
        <>
          {sections
            .sort((a, b) => (a.stepRef > b.stepRef ? 1 : -1))
            .map((section, sectionIndex) => {
              return (
                <div key={section.id}>
                  <TitleSection>
                    {sectionIndex + 1}. {section.stepName}
                  </TitleSection>
                  {section.formQuestions
                    .sort((a, b) =>
                      a.questionRef.split("_")[1] >
                        b.questionRef.split("_")[1]
                        ? 1
                        : -1
                    )
                    .map((question, questionIndex) => {
                      return (
                        <div key={question.id}>
                          <HeaderWrapper validate="rgba(36, 139, 192, 0.1)">
                            <LabelCustom>
                              <strong>
                                {`${t('global.review.question')} ${sectionIndex + 1}.${questionIndex + 1
                                  }. `}
                              </strong>{" "}
                              {question.questionText}
                            </LabelCustom>
                          </HeaderWrapper>
                          <BodyWrapper>
                            <div>{question.answerText}</div>
                            {question.brainstormings.length > 0 && (
                              <>
                                <HorizontalDivider margin="22px 0 16px 0" />
                                <div>
                                  <div>
                                    <strong>
                                      {t('global.review.comments')} (
                                      {question.brainstormings.length})
                                    </strong>
                                  </div>
                                  <ListCommentaires
                                    comments={question.brainstormings}
                                  />
                                </div>
                              </>
                            )}
                          </BodyWrapper>
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </>
      )}
    </>
  );
}

export default ListAnswer;
