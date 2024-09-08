/**
 * @file injectGlobals.js
 * @brief Define the constants getting the environment variables
 */

export const getApplicationEnvVar = (envVarName) =>
    process.env[`REACT_APP_${envVarName}`] || ""

export const backendAPI = getApplicationEnvVar("BACKEND_API") || ""

export const numberIterationMaximum =
  getApplicationEnvVar("NUMBER_ITERATION_MAXIMUM") || "2"
