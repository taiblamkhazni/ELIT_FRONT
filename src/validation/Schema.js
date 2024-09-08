/**
 * @fiSchema.js
 * @brief This file defines the validation schemas for forms in the application using the Yup library.
 *
 * It includes various schemas for different form validations such as criteria validation,
 * connection and registration forms, and generic validations. Each schema is detailed
 * with the necessary validation rules and error messages.
 */
import * as Yup from "yup";

import { ERROR_MESSAGES,REGEX_PATTERNS } from "./regexPatterns";

/**
 * @brief Validation scheme for weight criteria in application forms.
 * @details Each criterion is a number between 1 and 99.
 */
export const criteriaValidation = Yup.object().shape({
  clarite: Yup.number()
    .required(ERROR_MESSAGES.CRITERIA_REQUIRED)
    .min(1, ERROR_MESSAGES.CRITERIA_MIN)
    .max(99, ERROR_MESSAGES.CRITERIA_MAX),
  precision: Yup.number()
    .required(ERROR_MESSAGES.CRITERIA_REQUIRED)
    .min(1, ERROR_MESSAGES.CRITERIA_MIN)
    .max(99, ERROR_MESSAGES.CRITERIA_MAX),
  rigueur: Yup.number()
    .required(ERROR_MESSAGES.CRITERIA_REQUIRED)
    .min(1, ERROR_MESSAGES.CRITERIA_MIN)
    .max(99, ERROR_MESSAGES.CRITERIA_MAX),
}).required();

/**
* @brief Validation scheme for login form.
* @details The email is checked to follow a specific structure.
*/
export const connexionSchema = Yup.object().shape({
  email: Yup.string()
    .required(ERROR_MESSAGES.EMAIL_INVALID)
    .test('email-format', ERROR_MESSAGES.EMAIL_INVALID, value => Yup.string().email().isValidSync(value)),
  password: Yup.string()
    .required(ERROR_MESSAGES.PASSWORD_INVALID)
    .matches(REGEX_PATTERNS.PASSWORD, ERROR_MESSAGES.PASSWORD_INVALID),
}).required();

/**
 * @brief Validation scheme for forgot password form.
 * @details The email is checked to follow a specific structure.
 */
export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required(ERROR_MESSAGES.FORGOT_PASSWORD_EMAIL_INVALID)
    .test('email-format', ERROR_MESSAGES.FORGOT_PASSWORD_EMAIL_INVALID, value => Yup.string().email().isValidSync(value)),
}).required();

/**
 * @brief Validation scheme for the password reset form.
 * @details Checks form fields such as password and confirm password.
 */
export const passwordResetSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required(ERROR_MESSAGES.NEW_PASSWORD_REQUIRED)
    .matches(REGEX_PATTERNS.PASSWORD, ERROR_MESSAGES.PASSWORD_INVALID),
  confirmPassword: Yup.string()
    .required(ERROR_MESSAGES.CONFIRM_PASSWORD_REQUIRED)
    .oneOf([Yup.ref("newPassword")], ERROR_MESSAGES.PASSWORD_MISMATCH),
});

/**
 * @brief Validation scheme for the password change form.
 * @details Checks form fields such as oldpassword, new password and confirm password.
 */
export const passwordChangeSchema = Yup.object().shape({
  oldPassword: Yup.string().required(ERROR_MESSAGES.OLD_PASSWORD_REQUIRED),
  newPassword: Yup.string()
    .required(ERROR_MESSAGES.NEW_PASSWORD_REQUIRED)
    .matches(REGEX_PATTERNS.PASSWORD, ERROR_MESSAGES.PASSWORD_INVALID),
  confirmPassword: Yup.string()
    .required(ERROR_MESSAGES.CONFIRM_PASSWORD_REQUIRED)
    .oneOf([Yup.ref("newPassword")], ERROR_MESSAGES.PASSWORD_MISMATCH),
});

/**
 * @brief Validation scheme for the registration form.
 * @details Checks form fields such as last name, first name, role, email, and password.
 */
export const inscriptionSchema = Yup.object().shape({
  lastname: Yup.string()
    .required(ERROR_MESSAGES.LASTNAME_REQUIRED)
    .min(2, ERROR_MESSAGES.LASTNAME_MIN)
    .max(25, ERROR_MESSAGES.LASTNAME_MAX)
    .matches(REGEX_PATTERNS.NAME, ERROR_MESSAGES.LASTNAME_TEXT),
  firstname: Yup.string()
    .required(ERROR_MESSAGES.FIRSTNAME_REQUIRED)
    .min(2, ERROR_MESSAGES.FIRSTNAME_MIN)
    .max(25, ERROR_MESSAGES.FIRSTNAME_MAX)
    .matches(REGEX_PATTERNS.NAME, ERROR_MESSAGES.LASTNAME_TEXT),
  email: Yup.string()
    .required(ERROR_MESSAGES.EMAIL_INVALID)
    .test('email-format', ERROR_MESSAGES.EMAIL_INVALID, value => Yup.string().email().isValidSync(value)),
  password: Yup.string()
    .required(ERROR_MESSAGES.NEW_PASSWORD_REQUIRED)
    .matches(REGEX_PATTERNS.PASSWORD, ERROR_MESSAGES.PASSWORD_INVALID),
  confirmPassword: Yup.string()
    .required(ERROR_MESSAGES.CONFIRM_PASSWORD_REQUIRED)
    .matches(REGEX_PATTERNS.PASSWORD, ERROR_MESSAGES.PASSWORD_INVALID)
    .oneOf([Yup.ref("password")], ERROR_MESSAGES.CONFIRM_PASSWORD_TEXT),
}).required();

/**
 * @brief Validation scheme for the Profile form.
 * @details Checks form fields such as last name, first name.
 */
export const profileSchema = Yup.object().shape({
  firstname: inscriptionSchema.fields.firstname,
  lastname: inscriptionSchema.fields.lastname,
});

/**
 * @brief The maximum file size allowed for upload.
 * @details The size is in bytes, so here the maximum allowed size is 200MB.
 */
export const MAX_FILE_SIZE = 200 * 1024 * 1024;
/**
 * @brief Generic validation scheme for the project creation.
 * @details It contains fields such as projectName, projectLink and projectDescription.
 */
export const projectCreationValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required(ERROR_MESSAGES.PROJECT_NAME_REQUIRED)
    .min(3, ERROR_MESSAGES.PROJECT_NAME_MIN)
    .max(20, ERROR_MESSAGES.PROJECT_NAME_MAX)
    .matches(REGEX_PATTERNS.PROJECT_TEXT, ERROR_MESSAGES.PROJECT_TEXT)
    .default(""),
  description: Yup.string()
    .required(ERROR_MESSAGES.PROJECT_DESC_REQUIRED)
    .min(3, ERROR_MESSAGES.PROJECT_DESC_MIN)
    .max(255, ERROR_MESSAGES.PROJECT_DESC_MAX)
    .matches(REGEX_PATTERNS.PROJECT_TEXT, ERROR_MESSAGES.PROJECT_TEXT)
    .default(""),
  acceptTerms: Yup.bool()
    .oneOf([true], ERROR_MESSAGES.PROJECT_TERMS_REQUIRED)
    .default(false),
}).required();

/**
 * @brief Generic validation scheme for project updates.
 * @details It contains fields such as projectName and projectDescription. This schema is used for updating project details.
 */
export const projectUpdateValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required(ERROR_MESSAGES.PROJECT_NAME_REQUIRED)
    .min(3, ERROR_MESSAGES.PROJECT_NAME_MIN)
    .max(20, ERROR_MESSAGES.PROJECT_NAME_MAX)
    .matches(REGEX_PATTERNS.PROJECT_TEXT, ERROR_MESSAGES.PROJECT_TEXT)
    .default(""),
  description: Yup.string()
    .required(ERROR_MESSAGES.PROJECT_DESC_REQUIRED)
    .min(3, ERROR_MESSAGES.PROJECT_DESC_MIN)
    .max(255, ERROR_MESSAGES.PROJECT_DESC_MAX)
    .matches(REGEX_PATTERNS.PROJECT_TEXT, ERROR_MESSAGES.PROJECT_TEXT)
    .default(""),
}).required();
/**
 * @brief Default values for the projectCreation validation schema.
 * @details These values are used to reset the forms.
 */
export const projectUpdateValidationSchemaDefaultValues = projectUpdateValidationSchema.cast();
  /**
 * @brief Default values for the projectCreation validation schema.
 * @details These values are used to reset the forms.
 */
  export const projectCreationValidationSchemaDefaultValues = projectCreationValidationSchema.cast();

/**
 * @brief File types allowed for uploading.
 * @details This is a list of allowed file MIME types.
 */
export const ALLOWED_FILE_TYPES = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

/**
 * @brief Validation scheme for the first step of a multi-step process.
 */
export const firstStep = Yup.object().shape({
  Spec_1: Yup.string()
    .max(200, ERROR_MESSAGES.MULTI_STEP_MAX)
    .required(ERROR_MESSAGES.MULTI_STEP_REQUIRED),
  Spec_2: Yup.string()
    .max(200, ERROR_MESSAGES.MULTI_STEP_MAX)
    .required(ERROR_MESSAGES.MULTI_STEP_REQUIRED),
  Spec_3: Yup.string()
    .max(200, ERROR_MESSAGES.MULTI_STEP_MAX)
    .required(ERROR_MESSAGES.MULTI_STEP_REQUIRED),
  Spec_4: Yup.string()
    .max(200, ERROR_MESSAGES.MULTI_STEP_MAX)
    .required(ERROR_MESSAGES.MULTI_STEP_REQUIRED),
  Spec_5: Yup.string()
    .max(200, ERROR_MESSAGES.MULTI_STEP_MAX)
    .required(ERROR_MESSAGES.MULTI_STEP_REQUIRED),
}).required();

/**
 * @brief Validation scheme for the second step of a multi-step process.
 */
export const secondStep = Yup.object().shape({
  Unc_1: Yup.string()
    .max(200, ERROR_MESSAGES.MULTI_STEP_MAX)
    .required(ERROR_MESSAGES.MULTI_STEP_REQUIRED),
  Unc_2: Yup.string()
    .max(200, ERROR_MESSAGES.MULTI_STEP_MAX)
    .required(ERROR_MESSAGES.MULTI_STEP_REQUIRED),
  Unc_3: Yup.string()
    .max(200, ERROR_MESSAGES.MULTI_STEP_MAX)
    .required(ERROR_MESSAGES.MULTI_STEP_REQUIRED),
}).required();

/**
* @brief Validation scheme for the third step of a multi-step process.
*/
export const thirdStep = Yup.object().shape({
  Man_1: Yup.string()
    .max(200, ERROR_MESSAGES.MULTI_STEP_MAX)
    .required(ERROR_MESSAGES.MULTI_STEP_REQUIRED),
  Man_2: Yup.string()
    .max(200, ERROR_MESSAGES.MULTI_STEP_MAX)
    .required(ERROR_MESSAGES.MULTI_STEP_REQUIRED),
  Man_3: Yup.string()
    .max(200, ERROR_MESSAGES.MULTI_STEP_MAX)
    .required(ERROR_MESSAGES.MULTI_STEP_REQUIRED),
  Man_4: Yup.string()
    .max(200, ERROR_MESSAGES.MULTI_STEP_MAX)
    .required(ERROR_MESSAGES.MULTI_STEP_REQUIRED),
}).required();

/**
 * @brief Validation scheme for voting.
 * @details It includes fields for scoring method and selection method.
 */
export const voteSchema = Yup.object().shape({
  ratingMethod: Yup.number()
    .required(ERROR_MESSAGES.MULTI_STEP_REQUIRED),
  selectMethod: Yup.string()
    .required(ERROR_MESSAGES.MULTI_STEP_REQUIRED),
  textareaVote: Yup.string()
    .min(3, ERROR_MESSAGES.VOTE_TEXTAREA)
    .max(200, ERROR_MESSAGES.VOTE_TEXT_MAX)
    .required(ERROR_MESSAGES.VOTE_TEXT_REQUIRED)
    .matches(REGEX_PATTERNS.VOTE_TEXT, ERROR_MESSAGES.VOTE_TEXT_INVALID),
}).required();

/**
 * @brief Validation scheme for comments.
 */
export const commentSchema = Yup.object().shape({
  textareaComment: Yup.string()
    .max(1000, ERROR_MESSAGES.COMMENT_TEXT_MAX)
    .required(ERROR_MESSAGES.COMMENT_TEXT_REQUIRED),
}).required();

/**
 * @brief Validation scheme for BrainStorming research techniques.
 */
export const BrainStormingSchema = Yup.object().shape({
  brainstormingText: Yup.string()
    .max(200, ERROR_MESSAGES.BRAINSTORMING_TEXT_MAX)
    .required(ERROR_MESSAGES.BRAINSTORMING_TEXT_REQUIRED),
}).required();
