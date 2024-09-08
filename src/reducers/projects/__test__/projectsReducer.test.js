/**
 * @file projectsReducer.test.js
 * @brief Ce fichier contient des tests pour le composant MenuTitle.
 */
import { configureStore } from '@reduxjs/toolkit';

import projectsReducer, {
  closeProjectCreationModal,
  deleteProjectFetch,
  deleteProjectSuccess,
  getProjectsFailure,
  getProjectsFetch,
  getProjectsSuccess,
  postNewProjectFetch,
  postNewProjectSuccess,
  postUpdateProjectFetch,
  postUpdateProjectSuccess,  
  showProjectCreationSuccessModal} from '../projectsReducer';

const initialState = {
  projects: [],
  isLoading: true,
  showMessageCreationModal: false,
  showMessageCreationModalPlus: false
};

let store;

beforeEach(() => {
  store = configureStore({ reducer: { projects: projectsReducer } });
});


it('should handle getProjectsFetch', () => {
  store.dispatch(getProjectsFetch());
  const state = store.getState().projects;
  expect(state).toEqual({ ...initialState, isLoading: true, showMessageCreationModal: false,showMessageCreationModalPlus: false});
});


it('should handle getProjectsSuccess', () => {
  const projects = [{ id: 1, name: 'Test Project' }];
  store.dispatch(getProjectsSuccess(projects));
  const state = store.getState().projects;
  expect(state).toEqual({ projects, isLoading: false, showMessageCreationModal: false ,showMessageCreationModalPlus: false});
});


it('should handle getProjectsFailure', () => {
  store.dispatch(getProjectsFailure());
  const state = store.getState().projects;
  expect(state).toEqual({ ...initialState, isLoading: false, showMessageCreationModal: false,showMessageCreationModalPlus: false });
});


it('should handle postNewProjectFetch', () => {
  store.dispatch(postNewProjectFetch());
  const state = store.getState().projects;
  expect(state).toEqual(initialState);
});


it('should handle postNewProjectSuccess', () => {
  const newProject = { id: 2, name: 'New Project' };
  store.dispatch(postNewProjectSuccess(newProject));
  const state = store.getState().projects;
  expect(state).toEqual({ projects: [newProject], isLoading: true , showMessageCreationModal: false,showMessageCreationModalPlus: false});
});
it('should handle postUpdateProjectFetch', () => {
  // Assuming you have already dispatched getProjectsSuccess with some initial projects
  const updatedProject = { projectId: 1, name: 'Updated Project', description: 'Updated Description' };
  store.dispatch(postUpdateProjectFetch(updatedProject));
  const state = store.getState().projects;
  expect(state).toEqual(initialState); // Since postUpdateProjectFetch doesn't modify state directly
});

it('should handle postUpdateProjectSuccess', () => {
  const projects = [{ projectId: 1, name: 'Test Project' }, { projectId: 2, name: 'Another Project' }];
  store.dispatch(getProjectsSuccess(projects));

  const updatedProject = { projectId: 1, name: 'Updated Project', description: 'Updated Description' };
  store.dispatch(postUpdateProjectSuccess(updatedProject));

  const state = store.getState().projects;
  expect(state.projects).toContainEqual(updatedProject);
})

it('should handle deleteProjectFetch', () => {
  store.dispatch(deleteProjectFetch());
  const state = store.getState().projects;
  expect(state).toEqual(initialState);
});


// Test pour deleteProjectSuccess
it('should handle deleteProjectSuccess', () => {
  const projects = [{ projectId: 1, name: 'Test Project' }, { projectId: 2, name: 'Another Project' }];
  store.dispatch(getProjectsSuccess(projects));
  const idToDelete = 1;
  store.dispatch(deleteProjectSuccess(idToDelete));
  const state = store.getState().projects;
  expect(state.projects).not.toContainEqual({ id: idToDelete, name: 'Test Project' });
});
/**
     * Teste should handle showProjectCreationSuccessModal.
     */
it('should handle showProjectCreationSuccessModal', () => {
  store.dispatch(showProjectCreationSuccessModal());
  const state = store.getState().projects;
  expect(state).toEqual({ ...initialState, showMessageCreationModal: true,showMessageCreationModalPlus: false });
});

/**
     * Teste should handle closeProjectCreationModal.
     */
it('should handle closeProjectCreationModal', () => {
  // Préparation de l'état initial pour que le modal soit ouvert
  store.dispatch(showProjectCreationSuccessModal());
  // Fermeture du modal
  store.dispatch(closeProjectCreationModal());
  const state = store.getState().projects;
  expect(state).toEqual({ ...initialState, showMessageCreationModal: false,showMessageCreationModalPlus: false });
});


