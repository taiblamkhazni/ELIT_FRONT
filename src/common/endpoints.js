/**
 * @file endpoints.js
 * @brief Define the enpoints
 */

/**
 * @var ENPOINTS
 * @brief Define the endpoints.
 */
const ENDPOINTS = {
    register: "/register",
    registerAgain: "/sendRegistrationConfirmationEmailAgain",
    login: "/login",
    refreshToken: "/refreshToken",
    forgotPassword: "/forgot-password",
    projects: "/user/projects",
    newProjectsApi: "/user/projectlist/",
    adminProjects: "/admin/projects/",
    report: "/report/",
    multicriteriaAnalysis: "/multi-criteria-analysis/",
    previsibilityAnalysis: "/predictibility-analysis/",
    newPrevisibilityAnalysis: "/predictibility/",
    previsibilityAnalysisVote: "/vote/",
    executionPlan: "/executionPlan",
    brainStorming: "/brainstorming/",
    attachement: "/user/attachments",
    survey: "/survey",
    user: "/user"
}

export default ENDPOINTS
