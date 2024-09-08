/**
 * @file Commentaire.js
 * @brief This module exports MenuTitle component
 */
import { useState } from "react"
import { Dropdown, Menu, Row, Space } from "antd"
import { MoreVertical, UnCheck } from "assets/icons"
import Uncheck from "assets/icons/symbols/uncheck"
import AvatarCustomUrl from "components/AvatarCustomUrl/AvatarCustomUrl"
import { DescriptionFeature } from "components/Description/Description"
import { StructureGrid } from "components/Grid/Grid"
import { InfoWrapper } from "components/Info/Info"
import {
    ValidateCommentQuery,
} from "hooks/queries/queries"
import { useDispatch, useSelector } from "react-redux"
import { deleteBrainStormingFetch, getBrainStormingFetch } from "reducers/brainStormingResume/brainStormingResumeReducer"
import styled from "styled-components"
import { t } from "utils/translationUtils"

const CommentaireWrapper = styled.div`
  padding: 16px;
  margin-top: 16px;
  border-radius: 4px;
  background: ${({ theme, checked }) =>
        checked ? "#10B5811A" : theme.colors.secondaires.gris};
  opacity: ${({ checked }) => (checked ? "0.9" : "inherit")};
`

const MoreOptionsMenu = ({ commentId, setIsUpdating }) => {
    const projectId = useSelector((state) => state.projectReducer.projectId);
    const idAL = useSelector((state) => state.previsibilityAnalysisReducer.id)
    const dispatch = useDispatch();

    const onDeleteComment = (commentId, projectId) => {
        dispatch(deleteBrainStormingFetch({ commentId, projectId, idAL }))
    }
    return (
        <Menu
            items={[
                {
                    key: "2",
                    label: (
                        <a
                            href="/#"
                            onClick={(e) => {
                                e.preventDefault()
                                setIsUpdating(true)
                            }}
                        >
                            {t('analysePrevisibilite.brainstorming.comment.modify')}
                        </a>
                    ),
                },
                {
                    key: "1",
                    label: (
                        <a
                            href="/#"
                            onClick={(e) => {
                                e.preventDefault()
                                onDeleteComment(commentId, projectId)
                            }}
                        >
                            {t('analysePrevisibilite.brainstorming.comment.delete')}
                        </a>
                    ),
                },
            ]}
        />
    )
}

const ValidateOptionMenu = ({ commentId, isValidatedComment, commentaire: c }) => {
    const { mutate: validateComment } = ValidateCommentQuery()
    const [, setIsValidatedComment] = useState(c.isChecked)
    const projectId = useSelector((state) => state.projectReducer.projectId);
    const idAL = useSelector((state) => state.previsibilityAnalysisReducer.id)
    const dispatch = useDispatch();
    return (
        <Menu
            items={[
                {
                    key: "1",
                    label: (
                        <a
                            href="/#"
                            onClick={(e) => {
                                setIsValidatedComment(isValidatedComment ? false : true)
                                validateComment([
                                    commentId,
                                    JSON.stringify({ isConfirmed: isValidatedComment ? false : true }),
                                    projectId
                                ], {
                                    onSuccess: () => {
                                        dispatch(getBrainStormingFetch({ idAL, projectId }))
                                    },
                                })
                                e.preventDefault()
                            }}
                        >
                            {t('analysePrevisibilite.brainstorming.comment.solve')}
                        </a>
                    ),
                },
            ]}
        />
    )
}
export default ({ commentaire: c, index, setIsUpdating }) => {
    const [isValidatedComment,] = useState(c.isChecked)
    const currentUser = useSelector((state) => state.projectReducer.currentUser)
    return (
        <CommentaireWrapper key={index} checked={isValidatedComment}>
            <StructureGrid
                spanLeft={23}
                leftChild={
                    <div>
                        <AvatarCustomUrl
                            colab={{
                                contributerId: c.userId,
                                lastName: c.lastName,
                                firstName: c.firstName,
                            }}
                            key={index}
                        />
                        {/* <WrapperAvatar src={ImgSample} height="32px" width="32px" /> */}
                        {` ${c.firstName} ${c.lastName.toUpperCase()}`}
                        <InfoWrapper margin="0 0 0 8px" display="inline-block">
                            {c.role === "CDP" ? "Chef de projet" : c.role}
                        </InfoWrapper>
                        {/* )} */}
                    </div>
                }
                spanRight={1}
                rightChild={
                    <Row justify="center">
                        <Space>
                            {isValidatedComment ? (
                                <>
                                    {currentUser.role === "CDP" ? (
                                        <Dropdown
                                            overlay={
                                                <ValidateOptionMenu commentId={c.brainstormingId} isValidatedComment={isValidatedComment} commentaire={c} />
                                            }
                                            placement="bottomRight"
                                        >
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Uncheck check={isValidatedComment ? true : false} />
                                            </a>
                                        </Dropdown>
                                    ) : (
                                        <UnCheck check={true} />
                                    )
                                    }
                                </>
                            ) : (
                                <>
                                    {currentUser.role === "CDP" && (
                                        <Dropdown
                                            overlay={
                                                <ValidateOptionMenu commentId={c.brainstormingId} isValidatedComment={isValidatedComment} commentaire={c} />
                                            }
                                            placement="bottomRight"
                                        >
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Uncheck check={isValidatedComment ? true : false} />
                                            </a>
                                        </Dropdown>
                                    )}
                                    {currentUser.role === "CDP" ||
                                        currentUser.contributerId === c.userId ? (
                                        <Dropdown
                                            overlay={
                                                <MoreOptionsMenu commentId={c.brainstormingId} setIsUpdating={setIsUpdating} />
                                            }
                                            placement="bottomLeft"
                                        >
                                            <a onClick={(e) => e.preventDefault()}>
                                                <MoreVertical />
                                            </a>
                                        </Dropdown>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            )}
                        </Space>
                    </Row>
                }
            />
            <DescriptionFeature
                content={c.brainstormingText}
                checked={isValidatedComment}
            />
        </CommentaireWrapper >
    )
}
