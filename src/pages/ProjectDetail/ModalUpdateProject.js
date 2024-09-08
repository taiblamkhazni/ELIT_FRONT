/**
 * @file ModalUpdateProject.js
 * @brief Exports the ModalUpdateProject.js.
 */

import { useEffect, useState } from "react";
import Edit from "assets/icons/symbols/edit";
import { ErrorAlert } from "components/Alert/Alert";
import { InputCustom, InputTextAreaCustom } from "components/Input/Input";
import { ProjectLabelCustom } from "components/Label/Label";
import { CustomModalEdit, CustomTitleModalEdit } from "components/Modal/Modal";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postUpdateProjectFetch } from "reducers/projects/projectsReducer";
import styled from 'styled-components';
import { t } from "utils/translationUtils";
import {
    projectUpdateValidationSchema,
    projectUpdateValidationSchemaDefaultValues,
} from "validation/Schema";

import { yupResolver } from "@hookform/resolvers/yup";

/**
 * @brief Styled component pour un bouton sans fond.
 */
export const ButtonNoBackground = styled.button`
  height: ${(props) => (props.height ? props.height : "initial")};
  width: ${(props) => (props.width ? props.width : "")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "inherit")};
  border: 1px solid
    ${(props) =>
        props.optionalColor
            ? props.borderOptionalColor
                ? props.borderOptionalColor
                : props.optionalColor
            : props.theme.colors.primaires.blue};
  color: ${(props) =>
        props.optionalColor
            ? props.optionalColor
            : props.theme.colors.primaires.blue};
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : "transparent")};
  margin: ${(props) => (props.margin ? props.margin : "0px 12px 10px 12px")};
  padding: ${(props) => (props.padding ? props.padding : "8px 24px")};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    border: 1px solid
      ${(props) =>
        props.optionalColor
            ? props.theme.colors.secondaires.vertBlue
            : props.theme.colors.secondaires.blue};
    color: ${(props) =>
        props.optionalColor
            ? props.theme.colors.secondaires.vertBlue
            : props.theme.colors.secondaires.blue};
    transition: 0.15s;
  }
  & .icon {
    fill: ${(props) => (props.colorIcon ? props.colorIcon : "")};
  }
  &:hover .icon {
    fill: ${(props) => (props.hoverColorIcon ? props.hoverColorIcon : "")};
    transition: 0.15s;
  }
`;

/**
 * @brief Styled component pour un bouton de validation.
 */
export const NextStepButton = styled.button`
  border: 1px solid ${(props) => props.disabled ? '#E9E9E9' : (props.background ? props.background : props.theme.colors.primaires.blue)};
  color: ${(props) => props.disabled ? '#6A6A6A' : 'white'};
  white-space: nowrap;
  cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
  opacity: ${(props) => props.disabled ? '0.5' : '1'};
  background-color: ${(props) => props.disabled ? '#E9E9E9' : (props.background ? props.background : props.theme.colors.primaires.blue)};
  margin: ${(props) => (props.margin ? props.margin : "0 0 1rem 0")};
  padding: ${(props) => (props.padding ? props.padding : "8px 24px")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "inherit")};
  border-radius: 4px;
  width: ${(props) => (props.width ? props.width : "")};
  &:hover {
    background-color: ${({ theme, disabled }) => disabled ? '#E9E9E9' : theme.colors.secondaires.blue};
    border: 1px solid ${({ theme, disabled }) => disabled ? '#E9E9E9' : theme.colors.secondaires.blue};
    transition: ${({ disabled }) => disabled ? 'none' : '0.15s'};
    cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
  }
`;



/**
 * @brief Div CustomCheckbox composant.
 */
export const InputSectionWrapper = styled.div`
  margin-bottom: 22px;
`;

/**
 * @brief ModalUpdateProject composant.
 * @param {Object} props - Le propriétés du composant.
 * @param {string} props.id - L'identifiant du projet.
 * @param {string} props.name - Le nom du projet.
 * @param {string} props.description - La description du projet.
 * @returns {React.Component} - Le composant ModalUpdateProject.
 */
export default function ModalUpdateProject({id, name, description ,isModalOpen,handleCancel,handleOk}) {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(projectUpdateValidationSchema),
        defaultValues: { ...projectUpdateValidationSchemaDefaultValues, name, description },
        mode: "onChange",
    });
   const dispatch = useDispatch();

    /**
     * @brief Fonction pour gérer la validation de l'édition.
     */
    const handleValider = (values) => {
        dispatch(postUpdateProjectFetch({ projectId: id, name: values.name, description: values.description }));
        reset();
        handleOk();
    };

    /**
     * @brief Effet pour réinitialiser le formulaire lorsque le modal est rouvert.
     */
    useEffect(() => {
        if (isModalOpen) {
            reset({ name, description });
        }
    }, [isModalOpen, name, description, reset]);

    return (
            <CustomModalEdit
                title={<CustomTitleModalEdit>{"Modifier le projet"}</CustomTitleModalEdit>}
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleValider}
                footer={[
                    <ButtonNoBackground key="nextStep" onClick={handleCancel}>
                        Annuler
                    </ButtonNoBackground>,
                    <NextStepButton key="validate" disabled={!isValid} onClick={handleSubmit(handleValider)}>
                        Valider
                    </NextStepButton>,
                ]}
                styles={{ overflowY: "scroll" }}
                width="50%"
            >
                <form data-testid="update-project-form">
                    <InputSectionWrapper>
                        <ProjectLabelCustom htmlFor="name" data-testid="name">
                            {t('projectCreation.form.projetNameLabel')}
                        </ProjectLabelCustom>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <InputCustom
                                    {...field}
                                    id="name"
                                    type="text"
                                    placeholder={t('projectCreation.form.projetNamePlaceholder')}
                                    data-testid="name-input"
                                />
                            )}
                        />
                        <ErrorAlert data-testid="name-error">
                            {errors.name?.message}
                        </ErrorAlert>
                    </InputSectionWrapper>
                    <InputSectionWrapper>
                        <ProjectLabelCustom htmlFor="description" data-testid="description">
                            {t('projectCreation.form.projetDescriptionLabel')}
                        </ProjectLabelCustom>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <InputTextAreaCustom
                                    {...field}
                                    id="description"
                                    placeholder={t('projectCreation.form.projetDescriptionPlaceholder')}
                                    rows={4}
                                    data-testid="description-input"
                                />
                            )}
                        />
                        <ErrorAlert data-testid="description-error">
                            {errors.description?.message}
                        </ErrorAlert>
                    </InputSectionWrapper>
                </form>
            </CustomModalEdit>
    );
}
