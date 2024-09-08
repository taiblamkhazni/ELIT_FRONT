/**
 * @file ChangePasswordForm.js
 * @brief This module exports the ChangePasswordForm component.
 */

import { Flex, Input } from "antd";
import vector from "assets/images/vector.png";
import { ErrorAlert } from "components/Alert/Alert";
import { NextStepButton } from "components/Button/Button";
import { FormLabelCustom } from "components/Label/Label";
import { SmallTextHyperLink } from "components/Text/Text";
import { TitleH3 } from "components/Title/Title";
import CustomPasswordTooltip from "components/Tooltip/CustomPasswordTooltip";
import { updatePasswordByUserId } from "hooks/apis/UserApi";
import _ from "lodash"
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { t } from "utils/translationUtils";
import { passwordChangeSchema } from "validation/Schema";

import { yupResolver } from "@hookform/resolvers/yup";

/**
 * @brief ChangePasswordForm : This component is used to change the user's password.
 * @param setChangePass - Function to set the change password form.
  */
const ChangePasswordForm = ({ setChangePass }) => {
  const user = useSelector((state) => state.authentificationReducer.user);

  /**
   * @brief optionsForm : The form options.
   **/
  const optionsForm = {
    mode: "onChange",
    resolver: yupResolver(passwordChangeSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    }
  }
  const validationChangePassword = useForm(optionsForm)

  /**
   * @brief handleSubmit : Handles the form submission.
   **/
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    clearErrors,
    register,
    reset
  } = validationChangePassword;

  /**
   * @brief onSubmit : Handles the form submission.
   * @param data - Form data containing the new and old password data.
   */
  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("oldPass", data.oldPassword);
    formData.append("newPass", data.newPassword);
    updatePasswordByUserId(user.id, formData).then((res) => {
      if (res) {
        reset({
          oldPass: "",
          newPass: "",
          confirNewpass: "",
        });
      }
    });
  };

  /**
   * @brief handleChange : Handles the form change.
   * @param e - The event.
   **/
  const handleChange = (e) => {
    if (_.isEmpty(e.target.value)) {
      clearErrors(e.target.name, '');
    }
  };

  return (
    <div>
      <Flex gap="small" align="center">
        <img
          id='svg-retour-Moncompte'
          style={{
            height: "14px",
            position: "relative",
            width: "8px",
          }}
          alt="Vector stroke"
          src={vector}
        />
        <SmallTextHyperLink
          id='lien-retour-Moncompte'
          onClick={() => setChangePass(false)}
          color="#248BC0"
          fontSize="16px"
          style={{
            flex: "0 0 auto !important",
            fontWeight: "500",
            fontSize: "18px",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
            textDecorationThickness: "2px",
          }}
        >
          {"Revenir à mon compte"}
        </SmallTextHyperLink>
      </Flex>
      <TitleH3 id="title-modif-password">{t('profil.changePassword.title')}</TitleH3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          vertical
          align="flex-start"
          gap="middle"
          style={{ margin: "1rem 0", width: "60%" }}
        >
          <Controller
            name="oldPassword"
            control={control}
            {...register("oldPassword")}
            render={({ field }) => (
              <Flex vertical style={{ width: "100%" }}>
                <FormLabelCustom
                  id='lib-ancien-mdp'
                  htmlFor="oldPassword"
                  data-tooltip-id="my-tooltip-1"
                >
                  {t('profil.changePassword.oldPasswordLabel')}
                  <CustomPasswordTooltip />
                </FormLabelCustom>
                <Input.Password
                  {...field}
                  id="oldPassword"
                  placeholder={t('profil.changePassword.oldPasswordPlaceholder')}
                  type="password"
                  onKeyUp={(e) => handleChange(e)}
                  status={_.has(errors, "oldPassword") ? "error" : ""}
                  style={{
                    height: "2.5rem",
                    width: "100%",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                />
                <ErrorAlert>
                  {errors && _.has(errors, "oldPassword")
                    ? _.get(errors, "oldPassword").message
                    : ""}
                </ErrorAlert>
              </Flex>
            )}
          />
          <Flex style={{ width: "100%" }} gap="middle">
            <Controller
              name="newPassword"
              control={control}
              {...register("newPassword")}
              render={({ field }) => (
                <Flex vertical style={{ width: "100%" }}>
                  <FormLabelCustom
                    id='lib-nv-mdp'
                    htmlFor="newPassword"
                    data-tooltip-id="my-tooltip-1"
                  >
                    {t('profil.changePassword.newPasswordLabel')}
                    <CustomPasswordTooltip />
                  </FormLabelCustom>
                  <Input.Password
                    {...field}
                    id="newPassword"
                    placeholder={t('profil.changePassword.newPasswordPlaceholder')}
                    type="password"
                    onKeyUp={(e) => handleChange(e)}
                    status={_.has(errors, "newPassword") ? "error" : ""}
                    style={{
                      height: "2.5rem",
                      width: "100%",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                  <ErrorAlert>
                    {errors && _.has(errors, "newPassword")
                      ? _.get(errors, "newPassword").message
                      : ""}
                  </ErrorAlert>
                </Flex>
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              {...register("confirmPassword")}
              render={({ field }) => (
                <Flex vertical style={{ width: "100%" }}>
                  <FormLabelCustom
                    id='lib-confirme-mdp'
                    data-tooltip-id="my-tooltip-1"
                    htmlFor="confirmPassword"
                  >
                    {t('profil.changePassword.confirmPasswordLabel')}
                    <CustomPasswordTooltip />
                  </FormLabelCustom>
                  <Input.Password
                    {...field}
                    id="confirmPassword"
                    placeholder={t('profil.changePassword.confirmPasswordPlaceholder')}
                    type="password"
                    onKeyUp={(e) => handleChange(e)}
                    status={_.has(errors, "confirmPassword") ? "error" : ""}
                    style={{
                      height: "2.5rem",
                      width: "100%",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                  <ErrorAlert>
                    {errors && _.has(errors, "confirmPassword")
                      ? _.get(errors, "confirmPassword").message
                      : ""}
                  </ErrorAlert>
                </Flex>
              )}
            />
          </Flex>
        </Flex>
        <NextStepButton
          id="btn-profil-envoyer"
          type="submit"
          data-testid="sendButton"
          margin="1rem 0 0"
          disabled={!isValid}
        >
          {t('profil.changePassword.submit')}
        </NextStepButton>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
