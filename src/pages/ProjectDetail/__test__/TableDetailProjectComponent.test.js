/**
 * @file TableDetailProjectComponent.test.js
 * @brief Ce fichier contient des tests pour le composant TableDetailProjectComponent.
 * @details Il utilise le testing-library de React pour effectuer ces tests.
 */
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useDispatch, useSelector } from "react-redux";
import configureStore from 'redux-mock-store';
import { ThemeProvider } from "styled-components";

import { render } from '@testing-library/react';

import TableDetailProjectComponent from '../TableDetailProjectComponent';

/**
 * @brief Utilisation de Jest pour simuler le hook useDispatch et useSelector de react-redux.
 */
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));


/**
 * @brief Configuration du magasin Redux simulé
 */
const mockStore = configureStore();
let store;

/**
 * @brief Initialisation de l'état initial du magasin Redux simulé
 */
const initialState = {
  authentificationReducer: {
    user: {
      roles: ["ADMIN"],
    },
  },
  projectReducer: {
    projectId: "1",
    project: {
      contributors: [
        {
          email: "example@example.com",
          firstName: "John",
          lastName: "Doe",
          role: "Contributeur",
        },
      ],
    },
  }
};

/**
 * @brief Créer un nouveau client de requête pour les tests
 */
const queryClient = new QueryClient();

/**
 * @brief Ajouter des données factices pour une certaine clé de requête
 */
queryClient.setQueryData();

/**
 *  Création d'un thème simulé pour le Provider de styled-components
 */
const themeMock = {
  colors: {
    primaires: {
      blueLight: "#someColor",
      blueDark: "#someColor",
    },
    secondaires: {
      grisLight: "#someColor",
    },
    avertissements: {
      danger: "red"
    }
  },
  fontWeights: {
    regular: "400",
  },
  lineHeights: {
    Deci: "1.5",
  },
};

describe('TableDetailProjectComponent', () => {
  beforeEach(() => {
    let dispatchMock = jest.fn();

    useDispatch.mockImplementation(() => dispatchMock);

    useSelector.mockImplementation((callback) => {
      return callback(initialState);
    });

    store = mockStore(initialState);
  });

  const mockProps = {
    projectId: '1',
    attachments: [],
    contributors: [],
    chefId: '1',
  };

  it('renders without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <ThemeProvider theme={themeMock}>
          <QueryClientProvider client={queryClient}>
            <TableDetailProjectComponent {...mockProps} />
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });

  // it('changes menu when onChangeMenu is called', async () => {
  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <ThemeProvider theme={themeMock}>
  //         <QueryClientProvider client={queryClient}>
  //           <TableDetailProjectComponent {...mockProps} />
  //         </QueryClientProvider>
  //       </ThemeProvider>
  //     </Provider>
  //   );


  //   fireEvent.click(getByText("Collaborateurs"));
  //   expect(getByTestId('contributors-project-details')).toBeInTheDocument();
  // });

  // it('renders tabs for files and staff', async () => {
  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <ThemeProvider theme={themeMock}>
  //         <QueryClientProvider client={queryClient}>
  //           <TableDetailProjectComponent {...mockProps} />
  //         </QueryClientProvider>
  //       </ThemeProvider>
  //     </Provider>
  //   );
  //   await waitFor(() => {
  //     expect(getByText('Fichiers')).toBeInTheDocument();
  //     expect(getByText('Collaborateurs')).toBeInTheDocument();
  //   })
  // });

  // it('renders FilesProjectDetails by default', () => {
  //   const { getByTestId } = render(
  //     <Provider store={store}>
  //     <ThemeProvider theme={themeMock}>
  //       <QueryClientProvider client={queryClient}>
  //         <TableDetailProjectComponent {...mockProps} />
  //       </QueryClientProvider>
  //     </ThemeProvider>
  //   </Provider>
  //   );
  //   expect(getByTestId('files-project-details')).toBeInTheDocument();
  // });

  // it('renders ContributorsProjectDetails when staff tab is clicked', () => {
  //   const { getByText, getByTestId } = render(
  //     <Provider store={store}>
  //     <ThemeProvider theme={themeMock}>
  //       <QueryClientProvider client={queryClient}>
  //         <TableDetailProjectComponent {...mockProps} />
  //       </QueryClientProvider>
  //     </ThemeProvider>
  //   </Provider>
  //   );
  //   fireEvent.click(getByText('Collaborateurs'));
  //   expect(getByTestId('contributors-project-details')).toBeInTheDocument();
  // });
});
