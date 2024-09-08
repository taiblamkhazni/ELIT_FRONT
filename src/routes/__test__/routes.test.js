/**
 * @file routes.test.js
 * @brief Ce fichier contient des tests pour le l'objet ROUTES.
 */
import ROUTES from '../../routes/routes';
/**
 * @brief test unitaire pour l'objet ROUTES.
 */
describe('ROUTES', () => {
  it('should have the correct properties', () => {
    expect(ROUTES).toEqual({
      inscription: "/inscription",
      about: "/about",
      LearnMoreCollab: "/learn-more-collab",
      connexion: "/connexion",
      receiveMail: "/receiveMail",
      confirmAccount: "/confirm-account",
      forgotPassword: "/forgot-password",
      tokenExpired: "/token-expired",
      invalidToken: "/invalid-token",
      resetPassword: "/reset-password",
      profil: "/profil",
      settings: "/reglages",
      dashboard: "/dashboard",
      projets: "/projets",
      analyseMulticriteres: "etape1",
      analysePrevisibilite: "etape2",
      iteration2: "iteration2",
      brainstorming: "brainstorming",
      brainstormingIteration2: "brainstorming/iteration2",
      multicriteriaAnalyseIteration2: "brainstorming/iteration2/al",
      planExecution: "etape3",
      administration: "/administration"
    });
  });
});
