/**
 * @file UserInformationForm.js
 * @brief Ce fichier contient le composant UserInformationForm qui permet à l'utilisateur de modifier ses informations personnelles.
 */
import { useCallback, useEffect, useState } from "react";
import { Flex } from "antd";
import { ErrorAlert } from "components/Alert/Alert";
import { ButtonNoBackground, NextStepButton } from "components/Button/Button";
import { InputCustom } from "components/Input/Input";
import { LabelCustom } from "components/Label/Label";
import { SmallTextHyperLink } from "components/Text/Text";
import { TitleSection } from "components/Title/Title";
import {
  updateUserInfosByUserId,
} from "hooks/apis/UserApi";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserInfoByIdFetch,
  getUserInfoByIdSuccess,
} from "reducers/user/userReducer";
import { Snackbar } from "utils/Snackbar/Snackbar";
import { t } from "utils/translationUtils";
import { profileSchema } from "validation/Schema";

import { yupResolver } from "@hookform/resolvers/yup";

import ChangeAvatarForm from "../ChangeAvatarForm/ChangeAvatarForm";


/**
 * @brief UserInformationForm : Ce composant permet à l'utilisateur de modifier ses informations personnelles.
 * @param userInfo - Les informations de l'utilisateur.
 * @param setChangePass - Fonction pour changer le mot de passe.
 **/
const UserInformationForm = ({ userInfo, setChangePass }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.authentificationReducer.user);
  const [saveUserInfosMode, setSaveUserInfosMode] = useState(false);


  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    dispatch(getUserInfoByIdFetch(user.id));
  }, [dispatch, user.id]);

  const profileFormOptions = {
    resolver: yupResolver(profileSchema),
    mode: "onChange",
  };
  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
  } = useForm(profileFormOptions);

  /**
   * Update user information
   * @brief onUpdateInfosOfUsers : Met à jour les informations de l'utilisateur.
   * if success get snckbar success message
   * if erro get snackbar error message
   * @param data inputs information for user
   */
  const onUpdateInfosOfUsers = (data) => {
    const formData = new FormData();
    formData.append("userFirstName", data["firstname"]);
    formData.append("userLastName", data["lastname"]);
    updateUserInfosByUserId(user.id, formData).then((res) => {
      if (res) {
        Snackbar("success", res);
        dispatch(
          getUserInfoByIdSuccess({
            ...userInfo,
            userFirstName: data["firstname"],
            userLastName: data["lastname"],
          })
        );
        setSaveUserInfosMode(false);
      } else
        Snackbar(
          "error",
          t('profil.userInfoForm.error')
        );
    });
  };

  return (
    <Flex vertical style={{ width: "100%" }}>
      <Flex justify="space-between" gap="large" style={{ width: "100%" }}>
        <Flex vertical style={{ width: "60%" }}>
          <p id="texte-ChampsObligatoires">
            {t('profil.userInfoForm.info')}
          </p>
          <Flex justify="space-between" gap="middle" style={{ width: "100%" }}>
            <Controller
              name="lastname"
              control={control}
              defaultValue={userInfo.userLastName}
              render={({ field }) => (
                <Flex vertical style={{ width: "100%" }}>
                  <LabelCustom>
                    <TitleSection id="texte-Nom">{t('profil.userInfoForm.lastnameLabel')}</TitleSection>
                  </LabelCustom>
                  <InputCustom
                    {...field}
                    id="nom"
                    type="text"
                    placeholder={t('profil.userInfoForm.lastnamePlaceholder')}
                    label="Nom"
                    status={errors.lastname ? "error" : ""}
                    onChange={(e) => {
                      field.onChange(e);
                      if (e.target.value !== userInfo.userLastName) {
                        setSaveUserInfosMode(true);
                      } else {
                        setSaveUserInfosMode(false);
                      }
                    }}
                  />
                  {errors.lastname && (
                    <ErrorAlert>{errors.lastname.message}</ErrorAlert>
                  )}
                </Flex>
              )}
            />
            <Controller
              name="firstname"
              control={control}
              defaultValue={userInfo.userFirstName}
              render={({ field }) => (
                <Flex vertical style={{ width: "100%" }}>
                  <LabelCustom>
                    <TitleSection id="texte-Prenom">{t('profil.userInfoForm.firstnameLabel')}</TitleSection>
                  </LabelCustom>
                  <InputCustom
                    {...field}
                    id="prenom"
                    type="text"
                    placeholder={t('profil.userInfoForm.firstnamePlaceholder')}
                    label="Prénom"
                    status={errors.firstname ? "error" : ""}
                    onChange={(e) => {
                      field.onChange(e);
                      if (e.target.value !== userInfo.userFirstName) {
                        setSaveUserInfosMode(true);
                      } else {
                        setSaveUserInfosMode(false);
                      }
                    }}
                  />
                  {errors.firstname && (
                    <ErrorAlert>{errors.firstname.message}</ErrorAlert>
                  )}
                </Flex>
              )}
            />
          </Flex>
          <Flex vertical style={{ width: "49%", marginTop: "1rem" }}>
            <LabelCustom>
              <TitleSection id="texte-AdresseMail">{t('profil.userInfoForm.emailLabel')}</TitleSection>
            </LabelCustom>
            <InputCustom
              id="email"
              type="text"
              placeholder={t('profil.userInfoForm.emailPlaceholder')}
              disabled={true}
              defaultValue={userInfo.userEmail}
            />
          </Flex>
        </Flex>
        <Flex vertical style={{ width: "25%" }}>
          <ChangeAvatarForm user={user} />
        </Flex>
      </Flex>
      <SmallTextHyperLink
        id="lien-modifier-motdePasse"
        onClick={() => setChangePass(true)}
        color="#248BC0"
        fontSize={"15px"}
        style={{
          textDecoration: "underline",
          fontWeight: "bold",
          width: "fit-content",
        }}
      >
        {t('profil.userInfoForm.changePassword')}
      </SmallTextHyperLink>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          margin: "30px 0px 0 0",
        }}
      >
        <NextStepButton
          id="bouton-submit"
          data-testid="submit"
          margin="0.5rem 0"
          width="auto"
          onClick={handleSubmit((data) => onUpdateInfosOfUsers(data))}
          disabled={!isValid || !saveUserInfosMode}
        >
          {t('profil.userInfoForm.submit')}
        </NextStepButton>

        <ButtonNoBackground id="bouton-reset" margin="0 10px 0 10px" onClick={handleClick}>
          {t('profil.userInfoForm.cancel')}
        </ButtonNoBackground>
      </div>
    </Flex>
  );
}

export default UserInformationForm;
