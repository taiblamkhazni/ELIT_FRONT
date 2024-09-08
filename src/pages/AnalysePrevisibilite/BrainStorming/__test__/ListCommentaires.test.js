/**
 * @file ListCommentaires.test.js
 * @brief Contient les tests unitaires pour le composant ListCommentaires.
 */
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant ListCommentaires pour le tester
 */
import ListCommentaires from "../ListCommentaires";
/**
 * Mock the Commentaire components to avoid testing their internal implementation
 */
jest.mock("../Commentaire.js", () => {
  return ({ commentaire }) => (
    <div>
      <p>
        {commentaire.firstName} {commentaire.lastName}
      </p>
      <p>{commentaire.brainstormingText}</p>
    </div>
  );
});
/**
 * @brief Mocking the projects reducer actions
 */
jest.mock('reducers/brainStormingResume/brainStormingResumeReducer', () => ({
  postBrainStormingFetch: jest.fn().mockResolvedValue({
    data: {
      brainstormingText
        :
        "comment",
      predictibilityAnalysisId
        :
        1,
      questionId
        : 8
    }, projectId: "1",
    idAL: "1",
  }),
  putBrainStormingFetch: jest.fn().mockResolvedValue({
    data: {
      brainstormingText
        :
        "comment",
      predictibilityAnalysisId
        :
        1,
      questionId
        : 8
    }, projectId: "1",
    idAL: "1",
  }),
}));
/**
 * @brief Configuration du mock store avec le middleware thunk
 */
const mockStore = configureStore([thunk]);

describe("I want to see the list of commentaries", () => {
  let store;
  const mockCommentaires = [
    {
      brainstormingId: "4",
      userId: "1",
      lastName: "Doe",
      firstName: "John",
      role: "CDP",
      brainstormingText: "test comment",
    },
    {
      brainstormingId: "4",
      userId: "5",
      lastName: "Foo",
      firstName: "David",
      role: "Contributor",
      brainstormingText: "another test comment",
    },
  ];
  const currentUser = {
    contributerId: "1"
  };
  store = mockStore({previsibilityAnalysisReducer: {
    id: '1' // Provide a mock id or the expected value
  },projectReducer:{projectId: '1'}});

  it("should display the content of commentaries to the user", () => {
    render(
      <Provider store={store}>
        {/* <ThemeProvider theme={themeMock}> */}
        <ListCommentaires iteration2={true} commentaires={mockCommentaires} currentUser={currentUser}/>
        {/* </ThemeProvider> */}
      </Provider>

    );

    expect(screen.getByText("test comment")).toBeInTheDocument();
    expect(screen.getByText("another test comment")).toBeInTheDocument();
  });

  it("should display the full list of commentaries to the user", () => {
    render(
      <Provider store={store}>
        <ListCommentaires iteration2={true} commentaires={mockCommentaires} currentUser={currentUser}/>
      </Provider>
    );

    expect(screen.getAllByText("comment", { exact: false })).toHaveLength(2);
  });
});
