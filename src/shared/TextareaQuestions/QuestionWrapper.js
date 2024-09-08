/**
 * @file QuestionWrapper.js
 * @brief Exports the QuestionWrapper.js.
 */
import { useEffect, useState } from "react";
import { ErrorAlert } from "components/Alert/Alert";
import { LabelCustom } from "components/Label/Label";
import { TextareaCustom } from "components/Textarea/Textarea";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { t } from "utils/translationUtils";

/**
 * @brief QuestionWrapperStyle.
 */
const QuestionWrapperStyle = styled.div`
  margin-bottom: 22px;
  padding: 16px 24px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
`;
/**
 * @brief QuestionWrapper.
 * @param validation
 */
const QuestionWrapper = ({ validation }) => {
  const listQuestions = useSelector(
    (state) => state.executionPlanReducer.listQuestions
  );

  const [isQuestions, setIsQuestions] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (listQuestions) {
        setIsQuestions(listQuestions);
      }
    }, 10); 
    return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
  }, [listQuestions]);

  return <>
    {isQuestions.map((question, index) => (
      <QuestionWrapperStyle key={question.executionQuestionId}>
        <LabelCustom htmlFor={index} style={{ margin: "0 0 .5rem 0" }}>
          {index + 1}. {question.title} : &nbsp;
          <b style={{ color: "black" }}>{question.description}</b>&nbsp;
          <span style={{ color: "red" }}>*</span>
        </LabelCustom>
        <TextareaCustom
          rows="8"
          placeholder={t("global.textAreaQuestion.placeholder")}
          defaultValue={question.answer}
          {...validation?.register(`${question.executionQuestionId}`, {
            required: "Ce champ est obligatoire !",
            maxLength: {
              value: 400,
              message: t("global.textAreaQuestion.maxLength"),
            },
            minLength: {
              value: 3,
              message: "Votre réponse doit avoir au minimum 3 caractères",
            },
            pattern: {
              value: /^(?![\s]{2})[a-zA-Z0-9\s.,\t\r\n@_+~éàèçôâùûê'î-]+$/,
              message: t("global.textAreaQuestion.pattern"),
            },
          })}
        />
        <ErrorAlert>
          {
            validation.formState.errors[`${question.executionQuestionId}`]
              ?.message
          }
        </ErrorAlert>
      </QuestionWrapperStyle>
    ))}
  </>
};

export default QuestionWrapper;
