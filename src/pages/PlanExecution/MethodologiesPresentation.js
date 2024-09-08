/**
 * @file MethodologiesPresentation.js
 * @brief This module exports MenuTitle component
 */
import { useCallback, useEffect, useState } from "react";
import { Col, Row } from "antd";
import { SquareMinus, SquarePlus } from "assets/icons/";
import Puce from "assets/icons/symbols/puce";
import avatarDefault from "assets/images/avatarDefault.jpg";
import AvatarCustomUrl from "components/AvatarCustomUrl/AvatarCustomUrl";
import { HorizontalDivider } from "components/Divider/Divider";
import { WrapperAvatar } from "components/Head/Head";
import { InfoWrapper } from "components/Info/Info";
import { useDispatch, useSelector } from "react-redux";
import {
  setVote2MethodsHyBrid,
  setVoteMethod,
} from "reducers/executionPlan/executionPlanReducer";
import styled from "styled-components";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";

import SubMenu from "./DescriptionColumn/SubMenu";
import DescriptionColumn from "./DescriptionColumn";
import ModalMethodologie from "./ModalMethodologie";

const TabWrapper = styled.div`
  margin-bottom: 22px;
  padding: 16px 24px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
`;

const RowTitle = styled(InfoWrapper)`
  font-size: 14px;
`;

const ColCheckbox = styled(Col)`
  display: flex;
  justify-content: space-evenly;
`;

const ClicModal = styled.span`
  :hover {
    cursor: pointer;
    color: #248bc0;
  }
`;

const SquarePlusMinusCustom = styled.div`
  display: inline-block;
  cursor: pointer;
  vertical-align: top;
  & .icon {
    fill: #0070ad;
  }
  &:hover .icon {
    fill: #39b7bf;
  }
`;

export default ({ isAdmin = false, setIsVoted, methodologieChoosed }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenClassic, setIsModalOpenClassic] = useState(false);
  const [isOpenedSubMenuByMethodId, setIsOpenedSubMenuByMethodId] = useState(0);
  const project = useSelector((state) => state.projectReducer.project);
  const projectId = useSelector((state) => state.projectReducer.projectId);

  const { contributors } = project;
  const currentUser = useSelector((state) => state.projectReducer.currentUser);
  const idPlanExecution = useSelector(
    (state) => state.executionPlanReducer.idPlanExecution
  );

  const contributorsWithoutObservator = contributors?.filter(
    (c) => c.role !== "Observateur"
  );

  const dispatch = useDispatch();

  const voteMethod = useSelector(
    (state) => state.executionPlanReducer.voteMethod
  );

  const vote2MethodsHyBrid = useSelector(
    (state) => state.executionPlanReducer.vote2MethodsHyBrid
  );

  const methods = useSelector(
    (state) => state.executionPlanReducer.methodologiesArray
  );
  const [isCheckVoted, setIsCheckVoted] = useState(null);
  const [isHybridAgile, setIsHybridAgile] = useState(null);
  const [isHybridClassique, setIsHybridClassique] = useState(null);

  const onMethodChanged = (event) => {
    const value = parseInt(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
      // Un utilisateur ne peut voter qu'une seule fois
      setIsCheckVoted(value);
      dispatch(setVoteMethod([value]));
    } else {
      // Réinitialiser l'état si la case est désélectionnée
      setIsCheckVoted(null);
      dispatch(setVoteMethod([]));
    }

  };

  function capitalizeFirstLetter(string) {
    if (string == "CLASSIC") {
      string = "Classique";
    }
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const onMethodsHybridChanged = (event, methodologyName) => {
    if (event.target.checked) {
      const value = parseInt(event.target.value);
      if (methodologyName === "Classique") {
        setIsHybridClassique(value);
        dispatch(
          setVote2MethodsHyBrid([...vote2MethodsHyBrid, +event.target.value])
        );
      } else {
        setIsHybridAgile(value);
        dispatch(
          setVote2MethodsHyBrid([...vote2MethodsHyBrid, +event.target.value])
        );
      }
    } else if (!event.target.checked) {
      const eliminateVote = vote2MethodsHyBrid.filter(
        (v) => v !== +event.target.value
      );
      dispatch(setVote2MethodsHyBrid(eliminateVote));
      if (methodologyName === "Classique") {
        setIsHybridClassique(null);
      } else {
        setIsHybridAgile(null);
      }
    }
  };
  useEffect(() => { setIsOpenedSubMenuByMethodId(0); }, []);
  useEffect(() => {
    if (!isAdmin) {
      const idVotedMethod = methods?.reduce((acc, e) => {
        if (e.votes.length) {
          acc = e.id;
        }
        return acc;
      }, 0);

      const listMethodeHybridVoted = methods?.reduce((acc, e) => {
        if (e.votes.length) {
          acc = [...acc, e.id];
        }
        return acc;
      }, []);
      if (idVotedMethod > 0) {
        setIsVoted(true);
        setIsCheckVoted(idVotedMethod);
        dispatch(setVoteMethod(idVotedMethod));
      } else {
        if (voteMethod && voteMethod.length === 1) {
          setIsVoted(true);
          setIsCheckVoted(voteMethod[0]);
        } else {
          setIsVoted(false);
          setIsCheckVoted(null);
          dispatch(setVoteMethod([]));
        }
      }

      if (listMethodeHybridVoted?.length > 0) {
        setIsVoted(true);
        dispatch(setVote2MethodsHyBrid(listMethodeHybridVoted));
        setIsHybridClassique(listMethodeHybridVoted[0]);
        setIsHybridAgile(listMethodeHybridVoted[1]);
      } else {
        setIsVoted(false);
        dispatch(setVote2MethodsHyBrid([]));
        setIsHybridClassique(null);
        setIsHybridAgile(null);
      }
    } else {
      const idVotedMethod = methods?.reduce((acc, e) => {
        const votesByIdCurrentUser = e.votes.filter(
          (v) => v.userId === currentUser.contributerId
        );
        if (votesByIdCurrentUser.length) {
          acc = e.id;
        }
        return acc;
      }, 0);
      if (idVotedMethod > 0) {
        setIsVoted(true);
        setIsCheckVoted(idVotedMethod);
        dispatch(setVoteMethod(idVotedMethod));
      } else {
        if (voteMethod && voteMethod.length === 1) {
          setIsVoted(true);
          setIsCheckVoted(voteMethod[0]);
        } else {
          setIsVoted(false);
          setIsCheckVoted(null);
          dispatch(setVoteMethod([]));
        }
      }
      const listMethodeHybridVoted = methods?.reduce((acc, e) => {
        const votesByIdCurrentUser = e.votes.filter(
          (v) => v.userId === currentUser.contributerId
        );
        if (votesByIdCurrentUser.length) {
          acc = [...acc, e.id];
        }
        return acc;
      }, []);
      if (listMethodeHybridVoted.length > 0) {
        setIsVoted(true);
        dispatch(setVote2MethodsHyBrid(listMethodeHybridVoted));
        setIsHybridClassique(listMethodeHybridVoted[0]);
        setIsHybridAgile(listMethodeHybridVoted[1]);
      } else {
        setIsVoted(false);
        dispatch(setVote2MethodsHyBrid([]));
        setIsHybridClassique(null);
        setIsHybridAgile(null);
      }
    }
  }, [
    idPlanExecution,
    currentUser.contributerId,
    dispatch,
    isAdmin,
    methods,
    setIsVoted,
    projectId
  ]);
  const handleClickClicModal = useCallback(
    () => setIsModalOpenClassic(true),
    []
  );

  const handleClickClicSquarePlusMinusCustom = useCallback(
    (id) => () => setIsOpenedSubMenuByMethodId(id),
    []
  );

  const handleClickZero = useCallback(
    () => setIsOpenedSubMenuByMethodId(0),
    []
  );
  const handleClickModalOpen = useCallback(() => setIsModalOpen(true), []);

  return (
    <>
      {isAdmin ? (
        <>
          {methodologieChoosed === "HYBRID" ? (
            <>
              {/* ================ Méthode Hybride Classique ================== */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <ClicModal
                  style={{
                    display: "flex",
                    paddingLeft: "34px",
                    paddingTop: "10px",
                  }}
                  onClick={handleClickClicModal}
                >
                  <Puce fill="#12ABDB" width="16" height="17" />
                  <b style={{ marginLeft: "5px" }}>Méthode Classique</b>
                </ClicModal>

                <ColCheckbox
                  style={{ paddingBottom: "3px", marginRight: "23px" }}
                  span={6}
                >
                  {contributorsWithoutObservator.map((c) => {
                    return (
                      <AvatarCustomUrl
                        key={c?.contributerId}
                        colab={c}
                        margin="0"
                        idPlanExecution={idPlanExecution}
                      />
                    );
                  })}
                </ColCheckbox>
              </div>
              {methods
                ?.filter((m) => m.methodologyName === "Classique")
                .map((data) => (
                  <TabWrapper style={{ marginBottom: "8px" }} key={data.id}>
                    <div>
                      <Row style={{ margin: ".5rem 0 0 .5rem" }}>
                        <Col span={4}>
                          {isOpenedSubMenuByMethodId !== data.id ? (
                            <SquarePlusMinusCustom
                              data-testid="icon"
                              onClick={handleClickClicSquarePlusMinusCustom(
                                data.id
                              )}
                            >
                              <SquarePlus size="18px" />
                            </SquarePlusMinusCustom>
                          ) : (
                            <SquarePlusMinusCustom
                              data-testid="icon"
                              onClick={handleClickZero}
                            >
                              <SquareMinus size="18px" />
                            </SquarePlusMinusCustom>
                          )}
                          <span
                            style={{ marginLeft: "5px", fontWeight: "bold" }}
                          >
                            {data.methodName}
                          </span>
                        </Col>
                        <Col span={14}>
                          <DescriptionColumn value={data.methodDescription} />
                        </Col>
                        <ColCheckbox span={6}>
                          {contributorsWithoutObservator.map((c, index) => {
                            const checked = data.votes?.filter(
                              (e) => e.userId === c.contributerId
                            )[0];

                            return (
                              <div
                                key={c.contributerId}
                                style={{
                                  heigh: "2rem",
                                  width: "2rem",
                                  textAlign: "center",
                                  marginRight: "10px",
                                }}
                              >
                                <input
                                  style={{ cursor: "pointer" }}
                                  type="checkbox"
                                  key={c.contributerId}
                                  name={index + "_" + c.contributerId}
                                  value={data.id}
                                  defaultChecked={
                                    checked || isHybridClassique === data.id
                                  }
                                  disabled={currentUser.contributerId !== c.contributerId
                                    ? true
                                    : isHybridClassique !== null && isHybridClassique !== data.id

                                  }
                                  onClick={(event) => onMethodsHybridChanged(event, data.methodologyName)}
                                />
                              </div>
                            );
                          })}
                        </ColCheckbox>
                      </Row>
                      <ModalMethodologie
                        isModalOpen={isModalOpenClassic}
                        setIsModalOpen={setIsModalOpenClassic}
                        methodologie={"Classique"}
                      />
                    </div>
                    {isOpenedSubMenuByMethodId === data.id && (
                      <SubMenu data={data} />
                    )}
                  </TabWrapper>
                ))}

              {/* ================ Méthode Hybride Agile ================== */}

              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <ClicModal
                  style={{
                    display: "flex",
                    paddingLeft: "34px",
                    paddingTop: "10px",
                  }}
                  onClick={handleClickModalOpen}
                >
                  <Puce fill="#FFB24A" width="16" height="17" />
                  <b style={{ marginLeft: "5px" }}>Méthode Agile</b>
                </ClicModal>

                <ColCheckbox
                  style={{ paddingBottom: "3px", marginRight: "23px" }}
                  span={6}
                >
                  {contributorsWithoutObservator.map((c) => {
                    return (
                      <AvatarCustomUrl
                        key={c?.contributerId}
                        colab={c}
                        margin="0"
                        idPlanExecution={idPlanExecution}
                      />
                    );
                  })}
                </ColCheckbox>
              </div>

              {methods
                ?.filter((m) => m.methodologyName === "Agile")
                .map((data) => (
                  <TabWrapper style={{ marginBottom: "8px" }} key={data.id}>
                    <div>
                      <Row style={{ margin: ".5rem 0 0 .5rem" }}>
                        <Col span={4}>
                          {isOpenedSubMenuByMethodId !== data.id ? (
                            <SquarePlusMinusCustom
                              data-testid="icon"
                              onClick={handleClickClicSquarePlusMinusCustom(
                                data.id
                              )}
                            >
                              <SquarePlus size="18px" />
                            </SquarePlusMinusCustom>
                          ) : (
                            <SquarePlusMinusCustom
                              data-testid="icon"
                              onClick={handleClickZero}
                            >
                              <SquareMinus size="18px" />
                            </SquarePlusMinusCustom>
                          )}
                          <span
                            style={{ marginLeft: "5px", fontWeight: "bold" }}
                          >
                            {data.methodName}
                          </span>
                        </Col>
                        <Col span={14}>
                          <DescriptionColumn value={data.methodDescription} />
                        </Col>
                        <ColCheckbox span={6}>
                          {contributorsWithoutObservator.map((c, index) => {
                            const checked = data.votes?.filter(
                              (e) => e.userId === c.contributerId
                            )[0];
                            return (
                              <div
                                key={c.contributerId}
                                style={{
                                  heigh: "2rem",
                                  width: "2rem",
                                  textAlign: "center",
                                  marginRight: "10px",
                                }}
                              >
                                <input
                                  style={{ cursor: "pointer" }}
                                  type="checkbox"
                                  key={c.contributerId}
                                  name={index + "_" + c.contributerId}
                                  value={data.id}
                                  defaultChecked={
                                    checked || isHybridAgile === data.id
                                  }
                                  disabled={currentUser.contributerId !== c.contributerId
                                    ? true
                                    : isHybridAgile !== null && isHybridAgile !== data.id

                                  }
                                  onClick={(event) => onMethodsHybridChanged(event, data.methodologyName)}
                                />
                              </div>

                            );
                          })}

                        </ColCheckbox>
                      </Row>
                      <ModalMethodologie
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        methodologie={"Agile"}
                      />
                    </div>
                    {isOpenedSubMenuByMethodId === data.id && (
                      <SubMenu data={data} />
                    )}
                  </TabWrapper>
                ))}
            </>
          ) : (
            <>
              {/* ================ Méthode Agile ou Classique (non hybride) ================== */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <ClicModal
                  style={{
                    display: "flex",
                    paddingLeft: "34px",
                    paddingTop: "10px",
                  }}
                  onClick={
                    methodologieChoosed == "Agile"
                      ? handleClickModalOpen
                      : handleClickClicModal
                  }
                >
                  <Puce
                    fill={
                      methodologieChoosed == "Classique" ? "#12ABDB" : "#FFB24A"
                    }
                    width="16"
                    height="17"
                  />
                  <b style={{ marginLeft: "5px" }}>
                    Méthode {capitalizeFirstLetter(methodologieChoosed)}
                  </b>
                </ClicModal>

                <ColCheckbox
                  style={{ paddingBottom: "3px", marginRight: "23px" }}
                  span={6}
                >
                  {contributorsWithoutObservator.map((c) => {
                    return (
                      <AvatarCustomUrl
                        key={c?.contributerId}
                        colab={c}
                        margin="0"
                        idPlanExecution={idPlanExecution}
                      />
                    );
                  })}
                </ColCheckbox>
              </div>
              {methods?.map((data) => {
                return (
                  <TabWrapper style={{ marginBottom: "8px" }} key={data.id}>
                    <div>
                      <Row style={{ margin: ".5rem 0 0 .5rem" }}>
                        <Col span={4}>
                          {isOpenedSubMenuByMethodId !== data.id ? (
                            <SquarePlusMinusCustom
                              data-testid="icon"
                              onClick={handleClickClicSquarePlusMinusCustom(
                                data.id
                              )}
                            >
                              <SquarePlus size="18px" />
                            </SquarePlusMinusCustom>
                          ) : (
                            <SquarePlusMinusCustom
                              data-testid="icon"
                              onClick={handleClickZero}
                            >
                              <SquareMinus size="18px" />
                            </SquarePlusMinusCustom>
                          )}

                          <span style={{ marginLeft: "5px" }}>
                            {data.methodName}
                          </span>
                        </Col>
                        <Col span={14}>
                          <DescriptionColumn value={data.methodDescription} />
                        </Col>
                        <ColCheckbox span={6}>
                          {contributorsWithoutObservator.map((c, index) => {
                            const checked = data.votes?.filter(
                              (e) => e.userId === c.contributerId
                            )[0];
                            return (
                              <div
                                key={c.contributerId}
                                style={{
                                  heigh: "2rem",
                                  width: "2rem",
                                  textAlign: "center",
                                }}
                              >
                                <input
                                  key={c.contributerId}
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  type={"checkbox"}
                                  name={index + "_" + c.contributerId}
                                  value={data.id}
                                  defaultChecked={checked || isCheckVoted === data.id}
                                  onChange={onMethodChanged}
                                  disabled={currentUser.contributerId !== c.contributerId
                                    ? true
                                    : isCheckVoted !== null && isCheckVoted !== data.id
                                  }
                                />
                              </div>

                            );
                          })}
                        </ColCheckbox>
                      </Row>
                      <ModalMethodologie
                        isModalOpen={
                          methodologieChoosed == "Agile"
                            ? isModalOpen
                            : isModalOpenClassic
                        }
                        setIsModalOpen={
                          methodologieChoosed == "Agile"
                            ? setIsModalOpen
                            : setIsModalOpenClassic
                        }
                        methodologie={data.methodologyName}
                      />
                    </div>
                    {isOpenedSubMenuByMethodId === data.id && (
                      <SubMenu data={data} />
                    )}
                  </TabWrapper>
                );
              })}
            </>
          )}
        </>
      ) : (
        <>
          {methodologieChoosed === "HYBRID" ? (
            <>
              {/* ============= Méthode Hybride Classique (Contributeur) =========== */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <ClicModal
                  style={{
                    display: "flex",
                    paddingLeft: "34px",
                    marginBottom: "10px",
                  }}
                  onClick={handleClickClicModal}
                >
                  <Puce fill="#12ABDB" width="16" height="17" />
                  <b style={{ marginLeft: "5px", marginBottom: "5px" }}>
                    Méthode Classique
                  </b>
                </ClicModal>

                <ColCheckbox
                  style={{ fontWeight: "bold", marginRight: "23px" }}
                  span={6}
                >
                  Vote
                </ColCheckbox>
              </div>

              {methods
                ?.filter((m) => m.methodologyName === "Classique")
                .map((data) => {
                  return (
                    <TabWrapper style={{ marginBottom: "8px" }} key={data.id}>
                      <div>
                        <Row
                          style={{
                            margin: ".5rem 0 0 .5rem",
                          }}
                        >
                          <Col span={4}>
                            {isOpenedSubMenuByMethodId !== data.id ? (
                              <SquarePlusMinusCustom
                                data-testid="icon"
                                onClick={handleClickClicSquarePlusMinusCustom(
                                  data.id
                                )}
                              >
                                <SquarePlus size="18px" />
                              </SquarePlusMinusCustom>
                            ) : (
                              <SquarePlusMinusCustom
                                data-testid="icon"
                                onClick={handleClickZero}
                              >
                                <SquareMinus size="18px" />
                              </SquarePlusMinusCustom>
                            )}
                            <span
                              style={{
                                marginLeft: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              {data.methodName}
                            </span>
                          </Col>
                          <Col span={14}>
                            <DescriptionColumn value={data.methodDescription} />
                          </Col>
                          <ColCheckbox span={6}>
                            <input
                              style={{
                                cursor: "pointer",
                              }}
                              type="checkbox"
                              name="methods"
                              value={data.id}
                              checked={isHybridClassique === data.id}
                              disabled={isHybridClassique !== null && isHybridClassique !== data.id}

                              onChange={(event) => onMethodsHybridChanged(event, data.methodologyName)}
                            />
                          </ColCheckbox>
                        </Row>
                        <ModalMethodologie
                          isModalOpen={isModalOpenClassic}
                          setIsModalOpen={setIsModalOpenClassic}
                          methodologie={"Classique"}
                        />
                      </div>
                      {isOpenedSubMenuByMethodId === data.id && (
                        <SubMenu data={data} />
                      )}
                    </TabWrapper>
                  );
                })}
              {/* ================ Méthode Hybride Agile (Contributeur) ================== */}
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <ClicModal
                  style={{
                    display: "flex",
                    paddingLeft: "34px",
                    marginBottom: "10px",
                  }}
                  onClick={handleClickModalOpen}
                >
                  <Puce fill="#FFB24A" width="16" height="17" />
                  <b style={{ marginLeft: "5px", marginBottom: "5px" }}>
                    Méthode Agile
                  </b>
                </ClicModal>

                <ColCheckbox
                  style={{ fontWeight: "bold", marginRight: "23px" }}
                  span={6}
                >
                  Vote
                </ColCheckbox>
              </div>

              {methods
                ?.filter((m) => m.methodologyName === "Agile")
                .map((data) => {
                  return (
                    <TabWrapper style={{ marginBottom: "8px" }} key={data.id}>
                      <div>
                        <Row style={{ margin: ".5rem 0 0 .5rem" }}>
                          <Col span={4}>
                            {isOpenedSubMenuByMethodId !== data.id ? (
                              <SquarePlusMinusCustom
                                data-testid="icon"
                                onClick={handleClickClicSquarePlusMinusCustom(
                                  data.id
                                )}
                              >
                                <SquarePlus size="18px" />
                              </SquarePlusMinusCustom>
                            ) : (
                              <SquarePlusMinusCustom
                                data-testid="icon"
                                onClick={handleClickZero}
                              >
                                <SquareMinus size="18px" />
                              </SquarePlusMinusCustom>
                            )}
                            <span style={{ marginLeft: "5px" }}>
                              {data.methodName}
                            </span>
                          </Col>
                          <Col span={14}>
                            <DescriptionColumn value={data.methodDescription} />
                          </Col>
                          <ColCheckbox span={6}>
                            <input
                              style={{ cursor: "pointer" }}
                              type="checkbox"
                              name="methods"
                              value={data.id}
                              checked={isHybridAgile === data.id}
                              disabled={isHybridAgile !== null && isHybridAgile !== data.id}
                              onChange={(event) => onMethodsHybridChanged(event, data.methodologyName)}
                            />
                          </ColCheckbox>
                        </Row>
                        <ModalMethodologie
                          isModalOpen={isModalOpen}
                          setIsModalOpen={setIsModalOpen}
                          methodologie={"Agile"}
                        />
                      </div>
                      {isOpenedSubMenuByMethodId === data.id && (
                        <SubMenu data={data} />
                      )}
                    </TabWrapper>
                  );
                })}
            </>
          ) : (
            <>
              {/* ================ Méthode Agile ou Classique pour contributeur (non hybride) ================== */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <ClicModal
                  style={{
                    display: "flex",
                    paddingLeft: "34px",
                    paddingTop: "10px",
                  }}
                  onClick={
                    methodologieChoosed == "Agile"
                      ? handleClickModalOpen
                      : handleClickClicModal
                  }
                >
                  <Puce
                    fill={
                      methodologieChoosed == "Classique" ? "#12ABDB" : "#FFB24A"
                    }
                    width="16"
                    height="17"
                  />
                  <b style={{ marginLeft: "5px", marginBottom: "5px" }}>
                    Méthode {capitalizeFirstLetter(methodologieChoosed)}
                  </b>
                </ClicModal>

                <ColCheckbox
                  style={{ fontWeight: "bold", marginRight: "23px" }}
                  span={6}
                >
                  Vote
                </ColCheckbox>
              </div>
              {methods?.map((data) => {
                return (
                  <TabWrapper style={{ marginBottom: "8px" }} key={data.id}>
                    <div>
                      <Row style={{ margin: ".5rem 0 0 .5rem" }}>
                        <Col span={4}>
                          {isOpenedSubMenuByMethodId !== data.id ? (
                            <SquarePlusMinusCustom
                              data-testid="icon"
                              onClick={handleClickClicSquarePlusMinusCustom(
                                data.id
                              )}
                            >
                              <SquarePlus size="18px" />
                            </SquarePlusMinusCustom>
                          ) : (
                            <SquarePlusMinusCustom
                              data-testid="icon"
                              onClick={handleClickZero}
                            >
                              <SquareMinus size="18px" />
                            </SquarePlusMinusCustom>
                          )}

                          <span style={{ marginLeft: "5px" }}>
                            {data.methodName}
                          </span>
                        </Col>
                        <Col span={14}>
                          <DescriptionColumn value={data.methodDescription} />
                        </Col>
                        <ColCheckbox span={6}>
                          {methodologieChoosed !== "HYBRID" ? (
                            <input
                              style={{ cursor: "pointer" }}
                              type={"checkbox"}
                              name="methods"
                              value={data.id}
                              checked={isCheckVoted === data.id}
                              disabled={isCheckVoted !== null && isCheckVoted !== data.id}
                              onChange={onMethodChanged}
                            />

                          ) : (
                            <input
                              style={{ cursor: "pointer" }}
                              type="checkbox"
                              name="methods"
                              value={data.id}
                              checked={
                                vote2MethodsHyBrid.includes(data.id) &&
                                vote2MethodsHyBrid.length <= 2
                              }
                              onChange={onMethodsHybridChanged}
                            />
                          )}

                        </ColCheckbox>
                      </Row>

                      <ModalMethodologie
                        isModalOpen={
                          methodologieChoosed == "Agile"
                            ? isModalOpen
                            : isModalOpenClassic
                        }
                        setIsModalOpen={
                          methodologieChoosed == "Agile"
                            ? setIsModalOpen
                            : setIsModalOpenClassic
                        }
                        methodologie={data.methodologyName}
                      />
                    </div>
                    {isOpenedSubMenuByMethodId === data.id && (
                      <SubMenu data={data} />
                    )}
                  </TabWrapper>
                );
              })}
            </>
          )}
        </>
      )}
    </>
  );
};
