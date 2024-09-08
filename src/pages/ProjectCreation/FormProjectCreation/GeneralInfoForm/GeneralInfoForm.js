/**
 * @file GeneralInfoForm.js
 * @brief Ce fichier contient le composant GeneralInfoForm et la définition de ses composants de style.
 */
import { ErrorAlert } from "components/Alert/Alert";
import { InputCustom, InputTextAreaCustom } from "components/Input/Input";
import { ProjectLabelCustom } from "components/Label/Label";
import { TitleSection } from "components/Title/Title";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import { t } from "utils/translationUtils";

/**
 * @brief Div Wrapper composant.
 */
const Wrapper = styled.div`
  font-size: 14px;
`;

/**
 * @brief Div ConfirmSection composant.
 */
const ConfirmSection = styled.div`
  margin-top: 27px;
`;

/**
 * @brief Div CustomCheckbox composant.
 */
export const InputSectionWrapper = styled.div`
  margin-bottom: 22px;
`;

/**
 * @brief Ce composant fournit une interface pour la saisie des informations générales du projet.
 * @param control - Le contrôle du formulaire.
 * @param errors - Les erreurs du formulaire.
 * @param setAcceptTerms - La fonction de définition des conditions d'acceptation.
 */
const GeneralInfoForm = ({ control, errors, setAcceptTerms }) => {
  return (
    <Wrapper>
      <TitleSection id="descption-project-title">{t('projectCreation.form.descriptionProjectTitle')}</TitleSection>
      <form>
        <InputSectionWrapper>
          <ProjectLabelCustom id="project-name" htmlFor="name">{t('projectCreation.form.projetNameLabel')}</ProjectLabelCustom>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputCustom
                {...field}
                id="name"
                type="text"
                placeholder={t('projectCreation.form.projetNamePlaceholder')}
              />
            )}
          />
          <ErrorAlert id="project-name-error">{errors.name?.message}</ErrorAlert>
        </InputSectionWrapper>
        <InputSectionWrapper>
          <ProjectLabelCustom id="project-description" htmlFor="description">{t('projectCreation.form.projetDescriptionLabel')}</ProjectLabelCustom>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <InputTextAreaCustom
                {...field}
                id="description"
                placeholder={t('projectCreation.form.projetDescriptionPlaceholder')}
                rows={4}
              />
            )}
          />
          <ErrorAlert id="project-description-error">{errors.description?.message}</ErrorAlert>
        </InputSectionWrapper>
      </form>
      <TitleSection id="sensitivity-data-title">{t('projectCreation.form.sensitivityDataTitle')}</TitleSection>
      <div>
        <span id="sensitivity-data-commitment">
          {t('projectCreation.form.sensitivityDataCommitment')}
        </span>
        <ul id="sensitivity-data-select">
          <li>
            {t('projectCreation.form.sensitivityDataSelect1')}
          </li>
          <li>
            {t('projectCreation.form.sensitivityDataSelect2')}
          </li>
          <li>
            {t('projectCreation.form.sensitivityDataSelect3')}
          </li>
        </ul>
      </div>
      <ConfirmSection>
        <Controller
          name="acceptTerms"
          control={control}
          render={({ field }) => (
            <input
              checked={field.value}
              onChange={(e) => {
                field.onChange(e.target.checked);
                setAcceptTerms(e.target.checked);
              }}
              {...field}
              id="acceptTerms"
              type="checkbox"
            />
          )}
        />
        <label id="accept-terms-label" htmlFor="acceptTerms">
          {t('projectCreation.form.acceptTerms')}
        </label>
      </ConfirmSection>
      <ErrorAlert>{errors.acceptTerms?.message}</ErrorAlert>
    </Wrapper>
  );
};

GeneralInfoForm.propTypes = {
  control: PropTypes.any.isRequired,
  errors: PropTypes.object.isRequired,
};

export default GeneralInfoForm;
