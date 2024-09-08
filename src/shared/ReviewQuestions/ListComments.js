/**
 * @file ListComments.js
 * @brief Exports the ListComments.js.
 */
import AvatarCustomUrl from "components/AvatarCustomUrl/AvatarCustomUrl"
import { DescriptionFeature } from "components/Description/Description"
import { InfoWrapper } from "components/Info/Info"
import styled from "styled-components"

/**
 * @brief CommentWrapper.
 */
const CommentWrapper = styled.div`
  padding: 16px;
  background: ${({ backGround, theme }) =>
    backGround ? backGround : theme.colors.secondaires.gris};
  margin-top: 16px;
  border-radius: 4px;
`
/**
 * @brief ListComments.
 * @param comments 
 */
const ListComments = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => {
        return (
          <CommentWrapper
            key={comment.id}
            backGround={comment.isChecked ? "#10B5811a" : "#F9F9F9"}
          >
            <div>
              <AvatarCustomUrl
                colab={{
                  contributerId: comment.userId,
                  lastName: comment.lastName,
                  firstName: comment.firstName,
                }}
              />
              {` ${comment.firstName
                } ${comment.lastName.toUpperCase()}`}
              <InfoWrapper margin="0 0 0 8px" display="inline-block">
                {comment.role === "CDP"
                  ? "Chef de projet"
                  : comment.role}
              </InfoWrapper>
            </div>
            <DescriptionFeature content={comment.brainstormingText} />
          </CommentWrapper>
        );
      })}
    </>
  )
}

export default ListComments;
