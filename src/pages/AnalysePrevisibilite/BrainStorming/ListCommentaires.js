/**
 * @file ListCommientaires.js
 * @brief Ce fichier définit le composant ListCommientaires.
 */
import { useEffect, useRef, useState } from "react";
import { ButtonNoBackground } from "components/Button/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {  postBrainStormingFetch, putBrainStormingFetch } from "reducers/brainStormingResume/brainStormingResumeReducer"
import { t } from "utils/translationUtils";
import { BrainStormingSchema } from "validation/Schema";

import { yupResolver } from "@hookform/resolvers/yup";

import BrainstormingCommentForm from "./BrainStormingCommentForm/BrainStormingCommentForm";
import Commentaire from "./Commentaire";


export default ({ question, commentaires, iteration2, currentUser }) => {

  const predictibilityAnalysisId = useSelector((state) => state.previsibilityAnalysisReducer.id)
  const projectId = useSelector((state) => state.projectReducer.projectId);
  const idAL = useSelector((state) => state.previsibilityAnalysisReducer.id)
  const [isUpdating, setIsUpdating] = useState(false)
  const dispatch = useDispatch();
  const divRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsUpdating(false)
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [divRef]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BrainStormingSchema),
  })

  const handleFormSubmit = (data, brainstormingId) => {
    if (!isUpdating) {
      data["questionId"] = question.questionId
      data["predictibilityAnalysisId"] = predictibilityAnalysisId
      dispatch(postBrainStormingFetch({ data, projectId,idAL }))

    } else {
      data["brainstormingId"] = brainstormingId
      dispatch(putBrainStormingFetch({ data, projectId,idAL }))
      setIsUpdating(false)
    }
  }



  return (
    <>
      {commentaires.map((c, index) => {
        return (
          < div key={index}> {
            isUpdating && c.userId === currentUser.contributerId ?
              <form ref={divRef}>
                <BrainstormingCommentForm
                  register={register}
                  errors={errors}
                  content={
                    c.brainstormingText
                  }
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <ButtonNoBackground
                    onClick={() => setIsUpdating(false)}
                    type="button"
                  >
                    { t('analysePrevisibilite.brainstorming.listComments.cancel') }
                  </ButtonNoBackground>
                  <ButtonNoBackground
                    onClick={handleSubmit((data) => handleFormSubmit(data, c.brainstormingId))}
                    type="button"
                  >
                    { t('analysePrevisibilite.brainstorming.listComments.submit') }
                  </ButtonNoBackground>
                </div>
              </form>
              : <Commentaire
                key={index}
                commentaire={c}
                index={index}
                iteration2={iteration2}
                setIsUpdating={setIsUpdating}
              />
          }
          </div>
        );
      })}
      
      { !commentaires?.find((comment) => comment.userId === currentUser.contributerId) &&
      
        <form>
          <BrainstormingCommentForm
            register={register}
            errors={errors}

          />
          <ButtonNoBackground
            style={{
              display: "flex",
              "alignItems": "center",
              "justifyContent": "space-between",
              "marginLeft": "auto"
            }}
            margin="5px 0px 0px 0px"
            onClick={handleSubmit((data) => handleFormSubmit(data))}
            type="button"
          >
            { t('analysePrevisibilite.brainstorming.listComments.add') }
          </ButtonNoBackground>
        </form>
      }
    </>
  );
};
