/**
 * @file projectReducer.test.js
 * @brief Ce fichier contient des tests pour le reducer du project.
 */
import { configureStore } from '@reduxjs/toolkit';

/**
 * @brief Importation du reducer projectReducer pour le tester.
 */
import projectReducer, {
  addContributor, deleteContributor, getAttachementsProjectById,
  getCurrentUser, getCurrentUserRole,
  getProjectFailure,
  getProjectFetch,
  getProjectSuccess, getReportsListFetch, getReportsListSuccess,
  getResultsMultiFetch, getResultsMultiFetchSuccess, setAttachements, setCheckUserIsObservateur,
  setProjectId, setReportsNumber
} from '../projectReducer';


/** 
 * @brief Substitution de la fonction console.warn par une fonction vide de jest.
 */
console.warn = jest.fn()

describe('projectReducer', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { project: projectReducer } });
  });

  const initialState = {
    project: null,
    isLoading: false,
    projectId: null,
    resultsMulti: null,
    currentUser: null,
    currentUserRole: null,
    reportsList: null,
    reportsNumber: {
      multicriteria_report: 0,
      predictibility_report: 0,
      execution_report: 0,
    },
    checkUserIsObservateur: false,
    attachments: null,
  };

  it('should handle getProjectFetch', () => {
    store.dispatch(getProjectFetch());
    const state = store.getState().project;
    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  it('should handle getProjectSuccess', () => {
    const project = { id: 1, name: 'Project 1' };
    store.dispatch(getProjectSuccess(project));
    const state = store.getState().project;
    expect(state).toEqual({ ...initialState, isLoading: false, project });
  });

  it('should handle getProjectFailure', () => {
    store.dispatch(getProjectFailure());
    const state = store.getState().project;
    expect(state).toEqual({ ...initialState, isLoading: false });
  });

  it('should handle setProjectId', () => {
    const projectId = 2;
    store.dispatch(setProjectId(projectId));
    const state = store.getState().project;
    expect(state).toEqual({ ...initialState, isLoading: true, projectId });
  });

  it('should handle getCurrentUser', () => {
    const currentUser = { id: 1, name: 'User 1' };
    store.dispatch(getCurrentUser(currentUser));
    const state = store.getState().project;
    expect(state).toEqual({ ...initialState, isLoading: true, currentUser });
  });

  it('should handle setCheckUserIsObservateur', () => {
    const checkUserIsObservateur = true;
    store.dispatch(setCheckUserIsObservateur(checkUserIsObservateur));
    const state = store.getState().project;
    expect(state).toEqual({ ...initialState, isLoading: true, checkUserIsObservateur });
  });
  it('should handle getResultsMultiFetch', () => {
    store.dispatch(getResultsMultiFetch());
    const state = store.getState().project;
    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  it('should handle getResultsMultiFetchSuccess', () => {
    const resultsMulti = { id: 3 };
    store.dispatch(getResultsMultiFetchSuccess(resultsMulti));
    const state = store.getState().project;
    expect(state).toEqual({ ...initialState, isLoading: true, resultsMulti });
  });

  it('should handle getCurrentUserRole', () => {
    const currentUserRole = { role: 'Scrum master' }
    store.dispatch(getCurrentUserRole(currentUserRole));
    const state = store.getState().project;
    expect(state).toEqual({ ...initialState, isLoading: true, currentUserRole });
  });

  it('should handle setAttachements', () => {
    const attachments = {}
    store.dispatch(setAttachements(attachments));
    const state = store.getState().project;
    expect(state).toEqual({ ...initialState, isLoading: true, attachments });
  });
  it('should handle getReportsListFetch', () => {
    store.dispatch(getReportsListFetch());
    const state = store.getState().project;
    expect(state).toEqual({ ...initialState, isLoading: true });
  });
  it('should handle getReportsListSuccess', () => {
    const reportsList = {}
    store.dispatch(getReportsListSuccess(reportsList));
    const state = store.getState().project;
    expect(state).toEqual({ ...initialState, isLoading: true, reportsList });
  });
  it('should handle setReportsNumber', () => {
    const reportsNumber = { multicriteria_report: 0, predictibility_report: 0, execution_report: 0 }
    store.dispatch(setReportsNumber(reportsNumber));
    const state = store.getState().project;
    expect(state).toEqual({ ...initialState, isLoading: true, reportsNumber });
  });

  it('addContributor should add a contributor to the project', () => {
    const contributor = { contributerId: 1, name: 'John Doe' };
    store.dispatch(addContributor(contributor));
    const state = store.getState().project;
    expect(state.project.contributors).toContainEqual(contributor);
  });

  it('deleteContributor should remove a contributor from the project', () => {
    const contributor1 = { contributerId: 1, name: 'John Doe' };
    const contributor2 = { contributerId: 2, name: 'Jane Doe' };
    store.dispatch(addContributor(contributor1));
    store.dispatch(addContributor(contributor2));
    store.dispatch(deleteContributor(contributor1.contributerId));
    const state = store.getState().project;
    expect(state.project.contributors).not.toContainEqual(contributor1);
    expect(state.project.contributors).toContainEqual(contributor2);
  });

  it('getAttachementsProjectById should return the state', () => {
    const state = store.getState().project;
    const result = getAttachementsProjectById(state);
    expect(result).toEqual({ payload: state, type: "projectReducer/getAttachementsProjectById" });
  });
});
