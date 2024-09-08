/**
 * @file BrainstormingCommentForm.js
 * @brief Ce fichier contient le composant BrainstormingCommentForm.
 */
import { ErrorAlert } from "components/Alert/Alert"
import { TextareaCustom } from "components/Textarea/Textarea"
import PropTypes from "prop-types"
import styled from "styled-components"
import { t } from "utils/translationUtils";

const Wrapper = styled.div`
  font-size: 14px;
`
/** Input Section Wrapper Component*/
const InputSectionWrapper = styled.div`
  margin-bottom: 22px;
`
 
const BrainstormingCommentForm = ({ register, errors, content }) => {
    return (
        <Wrapper>
            <form>
                <InputSectionWrapper>
                    <TextareaCustom
                        id="brainstormingText"
                        rows={3}
                        cols={50}
                        placeholder={ t('analysePrevisibilite.brainstorming.commentForm.placeholder') }
                        {...register("brainstormingText")}
                        defaultValue={content}
                    />
                    <ErrorAlert>{errors.brainstormingText?.message}</ErrorAlert>
                </InputSectionWrapper>
            </form>
        </Wrapper>
    )
}

BrainstormingCommentForm.propTypes = {
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
}

export default BrainstormingCommentForm
