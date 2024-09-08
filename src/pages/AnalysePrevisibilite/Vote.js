/**
 * @file Vote.js
 * @brief This module exports MenuTitle component
 */
import { useCallback, useEffect, useState } from "react";
import { Flex } from "antd";
import { X } from "assets/icons";
import { ErrorAlert } from "components/Alert/Alert";
import UserAvatar from "components/Avatar/UserAvatar";
import { ButtonNoBackground, NextStepButton } from "components/Button/Button";
import { StructureGrid } from "components/Grid/Grid";
import { CustomModal } from "components/Modal/Modal";
import { SelectCustom } from "components/Select/Select";
import { Text, TextBold, TextLight } from "components/Text/Text";
import { TextareaCustom } from "components/Textarea/Textarea";
import { FooterWrapper, HeaderWrapper } from "components/Wrapper/Wrappers";
import {
  createVote,
  getAllVotesByAnalysePrevisibilityId,
} from "hooks/apis/AnalysePrevisibiliteApi";
import { updateVoteByIdQuery } from "hooks/queries/queries";
import EnhancedRate from "pages/AnalyseMulticriteres/MiddleContent/EnhancedRage";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getVotesFetch,
  getVotesSuccess,
} from "reducers/previsibilityAnalysis/previsibilityAnalysisReducer";
import ROUTES from "routes/routes";
import styled from "styled-components";
import { SwalSnackBarSuccessProject, SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";
import { voteSchema } from "validation/Schema";

import { QuestionCircleOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";

/**
 * @brief Wrapper : Wrapper Component
 **/
export const VoteWrapper = styled.div`
  margin: 1.5rem 0;
  background-color: white;
  border: 1px solid #e9e9e9;
  border-radius: 8px;
`;

/**
 * @brief TextUser : Text User Component
 **/
const TextUser = styled.span`
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.lineHeight};
  color: ${(props) => props.color};
`;

/**
 * @brief Status : Status Component
 **/
// const Status = styled.div`
//   padding: 0.5rem 0.5rem;
//   border: 1px solid ${(props) => props.validate};
//   border-radius: 4px;
//   color: ${(props) => props.validate};
// `;

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

/**
 * @brief QuestionWrapper : Question Wrapper Component
 **/
export const QuestionWrapper = styled.div`
  margin: 1.5rem;
`;

/**
 * @brief MethodologyInfoWrapper : Methodology Wrapper Component
 */
const MethodologyInfoWrapper = styled.div`
  visibility: ${(props) => (props.visibility ? "visible" : "hidden")};
  display: flex;
  align-items: "center";
`;

/**
 * @brief LinkMethod : Link Method Component
 **/
const LinkMethod = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  color: ${(props) => (props.color ? props.color : "#248BC0")};
  margin: 0 0.4rem;
  pointer-events: ${(props) => (props.clickable ? "none" : "")};
  &:hover {
    color: ${(props) => (props.color ? props.color : "#248BC0")};
  }
`;

/**
 * @brief TextBoldLeft : Text Bold Left Component
 **/
const TextBoldLeft = styled(TextBold)`
  float: left;
`;

/**
 * @brief MethodsDesc : Methods Description Component
 **/
const MethodsDesc = styled.div`
  margin-bottom: 1.5rem;
`;

/**
 * @brief MethodsTitle : Methods Title Component
 **/
const MethodsTitle = styled.h3`
  margin: 0 auto;

  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #0070AD;
`;

/**
 * @brief options : options Component
 **/
const options = [
  { value: "AGILE", label: "Agile" },
  { value: "CLASSIC", label: "Classique" },
  { value: "HYBRID", label: "Hybride" },
];

/**
 * @brief methodsHelp : methods Help Component
 **/
export const methodsHelp = {
  GLOBAL: {
    description:
      "Voici une description générale des différentes méthodologies de gestion de projet : Agile, Classique et Hybride.",
    agile:
      "Une approche itérative et incrémentale du développement de logiciels, qui est réalisée de manière collaborative par des équipes auto-organisées dans un cadre de gouvernance efficace. La cérémonie est «juste assez» pour produire des logiciels de haute qualité de manière rentable et rapide et qui répondent aux l'évolution des besoins de ses parties prenantes.",
    classique:
      "Avant l’avènement des méthodes agiles, des solutions dites \"classiques/traditionnelle\" sont considérées comme les précurseurs et sont toujours utilisées aujourd’hui. \nDans la gestion de projet traditionnelle, l'équipe de projet créera un système et un plan permettant au projet d'être exécuté de manière séquentielle ou cyclique. Cela comprend l'initiation, la phase de planification, l'exécution, la surveillance et la phase de clôture.",
    hybride:
      "Une association d’approches prédictives, itératives, incrémentales ou agiles. Cette méthode hybride ferait coexister une méthodologie de projet Agile, avec une méthodologie de projet prédictive, dans le cas où certaines parties du cycle de développement seraient confiées à des entités tierces.",
  },
  AGILE: {
    description:
      "Une approche itérative et incrémentale du développement de logiciels, qui est réalisée de manière collaborative par des équipes auto-organisées dans un cadre de gouvernance efficace. La cérémonie est «juste assez» pour produire des logiciels de haute qualité de manière rentable et rapide et qui répondent aux l'évolution des besoins de ses parties prenantes.",
    advantages:
      "L’apport de valeur constant : en effectuant des livraisons fonctionnelles et opérationnelles régulières, les équipes agiles mettent le fruit de leur travail à disposition des utilisateurs et clients en fonction de la valeur apportée. Un Time to market optimisé : l’accent étant mis sur la réalisation des fonctionnalités apportant le plus de valeur au client, un MVP peut être mis à disposition plus rapidement.",
    inconveniences:
      "L’ambigüité de la vision produit : Les développements étant réalisés sur des fonctionnalités, un projet peut manquer de vision globale. La réalisation de fonctionnalités, réalisées séparément les unes des autres, peut apporter de la confusion dans la réalisation d’un projet global. La gestion à long terme : La volatilité des priorités ajoute un risque sur l’homogénéisation du produit. Le développement sans priorisation, ni vision globale apporte un risque d’éparpillement non négligeable.",
  },
  CLASSIC: {
    description:
      "Avant l’avènement des méthodes agiles, des solutions dites \"classiques/traditionnelle\" sont considérées comme les précurseurs et sont toujours utilisées aujourd’hui. \nDans la gestion de projet traditionnelle, l'équipe de projet créera un système et un plan permettant au projet d'être exécuté de manière séquentielle ou cyclique. Cela comprend l'initiation, la phase de planification, l'exécution, la surveillance et la phase de clôture.",
    advantages:
      "Il y a assez de bibliographie sur ces méthodes, avec plusieurs cas réel d'application, pouvant servir de base pour savoir quand appliquer, quand éviter, comment résoudre un problèm rencontré, etc. La maitrise du budget et du délai s'avère plus facile.",
    inconveniences:
      "Ils ne sont pas centrés à l'ouverture aux changements, même si  quelques uns (e.g. spirale) peuvent prendre les changements sans que le projet soit en danger. Pour quelques uns entre eux, l'effet tunnel peut prendre des dimensions importantes, si le besoin du client change après la description initiale du besoin.",
  },
  HYBRID: {
    description:
      "Une association d’approches prédictives, itératives, incrémentales ou agiles. Cette méthode hybride ferait coexister une méthodologie de projet Agile, avec une méthodologie de projet prédictive, dans le cas où certaines parties du cycle de développement seraient confiées à des entités tierces.",
    title:
      "La coexistence des deux précédents méthodes a pour but d'atténuer leurs inconvénients tout en gardant leurs avantages. Alors, lister les avantages et inconvénients n'est plus le cas. Il faut par contre faire attention aux points: ",
    content: [
      " bien mesurer le périmètre de ce qui sera prédictif ou agile, en s’assurant de la bonne couverture des exigences fonctionnelles et/ou techniques dans le délai et le budget consenti",
      "l’articulation des méthodes ou la dominante méthodologique dépendra des usages des équipes, de leur acculturation à l’agilité, ou du périmètre technique ou fonctionnel impacté",
      "dans le cas d ‘une sous-traitance d’un ou plusieurs lots auprès d’une ESN, il conviendra de bien apprécier l’incertitude liée aux exigences techniques, le taux de changement ou le risque minimum d'exécution.",
      "la disponibilité et la qualité des composants sous-traités sera également un risque à couvrir pour ne pas mettre en péril les itérations à venir et/ou le déploiement des fonctionnalités.",
    ],
  },
};

/**
 * @brief MethodModal : Method Modal Component
 * @param selectedMethod
 * @param isModalOpen
 * @param handleVisibility
 **/
const MethodModal = ({ selectedMethod, isModalOpen, handleVisibility }) => {
  const [selectedMethodState, setSelectedMethodState] =
    useState(selectedMethod);

  let methodTitle = "En savoir plus sur les méthodologies";

  switch (selectedMethod) {
    case "AGILE":
      methodTitle += " - Agile";
      break;

    case "CLASSIC":
      methodTitle += " - Classique";
      break;

    case "HYBRID":
      methodTitle += " - Hybride";
      break;

    default:
      break;
  }

  useEffect(() => {
    setSelectedMethodState(selectedMethod);
  }, [selectedMethod]);

  const modalContent = (selectedMethodState) => {
    if (selectedMethodState === "AGILE" || selectedMethodState === "CLASSIC") {
      return (
        <>
          <MethodsDesc>
            <MethodsTitle>Avantages</MethodsTitle>
            {methodsHelp[selectedMethod]?.advantages}
          </MethodsDesc>
          <MethodsDesc>
            <MethodsTitle>Inconvénients</MethodsTitle>
            {methodsHelp[selectedMethod]?.inconveniences}
          </MethodsDesc>
        </>
      );
    } else if (selectedMethodState === "HYBRID") {
      return (
        <MethodsDesc>
          {methodsHelp[selectedMethod]?.title}
          <li>
            {methodsHelp[selectedMethod]?.content?.map((content, index) => (
              <ul key={index}>- {content}</ul>
            ))}
          </li>
        </MethodsDesc>
      );
    } else {
      return (
        <>
          <MethodsDesc>
            <MethodsTitle>Méthode Agile</MethodsTitle>
            {methodsHelp.GLOBAL.agile}
          </MethodsDesc>
          <MethodsDesc>
            <MethodsTitle>Méthode Classique</MethodsTitle>
            {methodsHelp.GLOBAL.classique}
          </MethodsDesc>
          <MethodsDesc>
            <MethodsTitle>Méthode Hybride</MethodsTitle>
            {methodsHelp.GLOBAL.hybride}
          </MethodsDesc>
        </>
      );
    }
  };

  return (
    <CustomModal
      title={methodTitle}
      maskClosable={false}
      open={isModalOpen}
      onOk={handleVisibility}
      onCancel={handleVisibility}
      footer={[
        <>
          <NextStepButton key="validate" onClick={handleVisibility}>
            Fermer
          </NextStepButton>
        </>,
      ]}
      closeIcon={<X fill="#000" />}
      width={684}
    >
      <MethodsDesc>{methodsHelp[selectedMethod]?.description}</MethodsDesc>

      {modalContent(selectedMethodState)}
    </CustomModal>
  );
};

/**
 * @brief Vote : Vote Component
 **/
export default ({
  username,
  role,
  owner: isOwner,
  validate,
  value,
  userId,
  votes,
}) => {
  const [owner, setOwner] = useState(isOwner);
  const projectId = useSelector((state) => state.projectReducer.projectId);
  useEffect(() => {
    setOwner(isOwner);
  }, [isOwner]);

  // react hook form for vote form
  const optionsValidation = {
    mode: "onChange",
    resolver: yupResolver(voteSchema),
  };
  const optionsForm = useForm(optionsValidation);
  const { control, handleSubmit, formState, setValue, getValues } = optionsForm;
  const { errors } = formState;

  // state for rating prediction value
  const id = useSelector((state) => state.previsibilityAnalysisReducer.id);
  const [modeUpdate, setModeUpdate] = useState(false);
  const { mutate: updateVoteRequest } = updateVoteByIdQuery(role);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVisibility = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    if (value.chosenPMM) {
      setValue("selectMethod", value.chosenPMM);
    }
    if (value.justification) {
      setValue("textareaVote", value.justification);
    } else {
      setValue("textareaVote", "");
    }
    if (value.predictibilityValue) {
      setValue("ratingMethod", value.predictibilityValue);
    } else {
      setValue("ratingMethod", 0);
    }
  }, [setValue, value]);

  const updateVote = (voteId) => {
    const dataVoteToSend = JSON.stringify({
      chosenPMM: getValues("selectMethod"),
      justification: getValues("textareaVote"),
      predictibilityValue: getValues("ratingMethod"),
      isConfirmed: true,
      predictibilityAnalysisId: id,
    });
    if (voteId) {
      updateVoteRequest([voteId, dataVoteToSend, projectId]);
    } else {
      getAllVotesByAnalysePrevisibilityId(id, projectId).then((value) => {
        if (owner) {
          const voteId = value.filter((v) => v.userId === userId)[0].voteId;
          updateVoteRequest([voteId, dataVoteToSend, projectId]);
        }
      });
    }
  };
  const handleClick = useCallback(() => {
    navigate(ROUTES.projets + "/" + projectId);
  }, [navigate,projectId]);

  /** Value and condition to make Validate in HeaderWrapper clearer */
  let headerColor = validate ? "#10B5811A" : "#248BC01A";

  return (
    <VoteWrapper key={userId}>
      <MethodModal
        selectedMethod={selectedMethod}
        isModalOpen={isModalOpen}
        handleVisibility={handleVisibility}
      />
      <HeaderWrapper validate={headerColor}>
        <Flex align="center" justify="space-between" style={{ width: "100%" }}>
          <Flex align="center" gap="1rem">
            <UserAvatar userId={userId} userName={username} size="32px" />
            <TextUser fontSize="16px" lineHeight="28px" color="#1F1A28">
              {username} {owner ? "(Vous)" : ""}
            </TextUser>
            <TextUser fontSize="14px" lineHeight="24px" color="#7A7A7A">
              {role}
            </TextUser>
          </Flex>
          {validate ? (
            <Tag color="#178036">Enregistré</Tag>
          ) : (
            <Tag color="#0070AD">Non renseigné</Tag>
          )}
        </Flex>
      </HeaderWrapper>
      <form
        onSubmit={handleSubmit((data) => {
          if (data && id) {
            const dataVoteToSend = JSON.stringify({
              chosenPMM: data.selectMethod,
              justification: data.textareaVote,
              predictibilityValue: data.ratingMethod,
              isConfirmed: true,
              predictibilityAnalysisId: id,
              userId: userId,
            });

            createVote(dataVoteToSend, projectId).then((res) => {
              if (res === 200) {
                if (role === "Chef de projet") {
                  SwalSnackBarSuccessProject.fire({
                    text: "Vos réponses ont été enregistrées, vous pouvez lancer l'analyse si vous le souhaitez"
                  });
                } else {
                  SwalWithBootstrapButtons.fire({
                    confirmButtonColor: "#3085d6",
                    text: "Votre vote a été enregistré avec succès !",
                  });
                }
                setModeUpdate(true);

                dispatch(
                  getVotesSuccess([
                    {
                      voteId: null,
                      chosenPMM: data.selectMethod,
                      justification: data.textareaVote,
                      predictibilityValue: data.ratingMethod,
                      predictibilityAnalysisId: id,
                      isConfirmed: true,
                      userId: userId,
                    },
                    ...votes.filter((v) => v.userId !== userId),
                  ])
                );
                dispatch(getVotesFetch(id));
              }
            });
          }
        })}
      >
        <QuestionWrapper>
          <div style={{ margin: "0 0 2rem" }}>
            <TextBoldLeft color="#248BC0" margin="0 .5rem 0 0">
              1.
            </TextBoldLeft>
            <Text>
              Avec les éléments à votre disposition, quelle méthodologie
              envisagez-vous pour ce projet ? *
            </Text>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "1rem 1.7rem",
              }}
            >
              <Controller
                name="selectMethod"
                control={control}
                render={({ field }) => (
                  <SelectCustom
                    {...field}
                    placeholder="Sélectionnez"
                    style={{ width: "15rem" }}
                    disabled={!owner}
                    options={options}
                    onSelect={(value) => setSelectedMethod(value)}
                  />
                )}
              />
              <ErrorAlert>
                {errors ? errors["selectMethod"]?.message : ""}
              </ErrorAlert>
              <MethodologyInfoWrapper visibility={owner}>
                <QuestionCircleOutlined
                  style={{
                    fontSize: "24px",
                    color: "#0070AD",
                    margin: "0 0 0 1rem",
                  }}
                />
                <LinkMethod
                  href="#/"
                  color={owner ? "#0070AD" : "#7A7A7A"}
                  clickable={!owner}
                  onClick={() => handleVisibility()}
                >
                  En savoir plus sur les méthodologies
                </LinkMethod>
              </MethodologyInfoWrapper>
            </div>
          </div>
          <div style={{ margin: "0 0 1.5rem" }}>
            <TextBoldLeft color="#248BC0" margin="0 .5rem 0 0">
              2.
            </TextBoldLeft>
            <Text>
              Evaluez la prédiction de la méthodologie sur une note de 1 à 5. *
            </Text>

            <div style={{ margin: "1rem 1.7rem" }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <EnhancedRate
                  title={""}
                  defaultValue={value.predictibilityValue ? Number(value.predictibilityValue) : 0}
                  groupName={`ratingMethod`}
                  validation={optionsForm}
                  margin="0 10px 0 0"
                  onChange={(label, _, value) => {
                    setValue(label, value);
                  }}
                  editable={owner}
                />
                <TextLight color="#7A7A7A" margin="0">
                  1 rond la note la moins satisfaisante et 5 ronds la plus satisfaisante.
                </TextLight>
              </div>
              <ErrorAlert>
                {errors ? errors["ratingMethod"]?.message : ""}
              </ErrorAlert>
            </div>
          </div>
          <div>
            <TextBoldLeft color="#248BC0" margin="0 .5rem .5rem 0">
              3.
            </TextBoldLeft>
            <Text>Justifiez votre choix. *</Text>
            <div style={{ margin: "0 0 0 1.7rem" }}>
              <Controller
                name="textareaVote"
                control={control}
                render={({ field }) => (
                  <TextareaCustom
                    {...field}
                    placeholder="Écrivez ici"
                    rows={5}
                    background={owner ? "#FFFFFF" : "#F9F9F9"}
                    readOnly={!owner}
                    options={options}
                  />
                )}
              />
              <ErrorAlert>
                {errors ? errors["textareaVote"]?.message : ""}
              </ErrorAlert>
            </div>
          </div>
        </QuestionWrapper>
        {owner && (

          <StructureGrid
            spanLeft={12}
            spanRight={12}
            leftChild={role !== "Chef de projet" && (
              <FooterWrapper>
                <ButtonNoBackground onClick={handleClick}>
                  Retour au tableau de bord
                </ButtonNoBackground>
              </FooterWrapper>

            )}
            rightChild={
              <FooterWrapper style={{ justifyContent: "flex-end" }}>
                {value.voteId || modeUpdate ? (
                  <div>
                    <ButtonNoBackground
                      margin="0"
                      onClick={() => updateVote(value.voteId)}
                      type="button"
                    >
                      Enregistrer mes modifications
                    </ButtonNoBackground></div>
                ) : (
                  <ButtonNoBackground type="submit" margin="0">
                    Enregistrer mes réponses
                  </ButtonNoBackground>
                )}
              </FooterWrapper>
            }
          />
        )}
      </form>
    </VoteWrapper>
  );
};
