/**
 * @file endpoints.test.js
 * @brief Ce fichier contient des tests pour l'objet ENDPOINTS.
 */
import ENDPOINTS from '../endpoints';
/**
 * @brief test unitaire pour l'objet ENDPOINTS.
 */
describe('ENDPOINTS', () => {
  it('should have the correct properties', () => {
    expect(ENDPOINTS).toEqual({
      register: '/register',
      registerAgain: "/sendRegistrationConfirmationEmailAgain",
      login: '/login',
      refreshToken: '/refreshToken',
      forgotPassword: "/forgot-password",
      projects: '/user/projects',
      newProjectsApi: '/user/projectlist/',
      adminProjects: '/admin/projects/',
      report: '/report/',
      multicriteriaAnalysis: '/multi-criteria-analysis/',
      previsibilityAnalysis: '/predictibility-analysis/',
      newPrevisibilityAnalysis: '/predictibility/',
      previsibilityAnalysisVote: '/vote/',
      executionPlan: '/executionPlan',
      brainStorming: '/brainstorming/',
      attachement: '/user/attachments',
      survey: '/survey',
      user: '/user',
    });
  });
});
