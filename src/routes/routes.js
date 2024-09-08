/**
 * @file routes.js
 * @brief Define the constant route variables
 */

/**
 * @var ROUTES
 * @brief Define the routes.
 */
const ROUTES = {
    inscription: "/inscription",
    connexion: "/connexion",
    receiveMail: "/receiveMail",
    confirmAccount: "/confirm-account",
    tokenExpired: "/token-expired",
    invalidToken: "/invalid-token",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    profil: "/profil",
    settings: "/reglages",
    dashboard: "/dashboard",
    about: "/about",
    LearnMoreCollab: "/learn-more-collab",
    projets: "/projets",
    analyseMulticriteres: "etape1",
    analysePrevisibilite: "etape2",

    // SUB_ROUTES_PREVISI_ANALYSIS
    iteration2: "iteration2",
    brainstorming: "brainstorming",
    brainstormingIteration2: "brainstorming/iteration2",
    multicriteriaAnalyseIteration2: "brainstorming/iteration2/al",
    // SUB_ROUTES_PREVISI_ANALYSIS

    planExecution: "etape3",
    administration: "/administration"
}

export default ROUTES
