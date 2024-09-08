/**
 * @file ContributorsProjectDetails.test.js
 * @brief Ce fichier contient des tests pour le composant ContributorsProjectDetails.
 * @details Il utilise le testing-library de React pour effectuer ces tests.
 */
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useDispatch, useSelector } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';

import { render, screen } from '@testing-library/react';

import ContributorsProjectDetails from '../ContributorsProjectDetails';

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

console.error = jest.fn();

describe('ContributorsProjectDetails', () => {
  beforeEach(() => {
    let dispatchMock = jest.fn();

    useDispatch.mockImplementation(() => dispatchMock);

    useSelector.mockImplementation((callback) => {
      return callback(initialState);
    });

    store = mockStore(initialState);
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={themeMock}>
          <QueryClientProvider client={queryClient}>
            <ContributorsProjectDetails contributors={[]} chefId="1" />
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByText('Nom')).toBeInTheDocument();
    expect(screen.getByText('Prénom')).toBeInTheDocument();
    expect(screen.getByText('Fonction sur le projet')).toBeInTheDocument();
    expect(screen.getByText('Rôle sur le projet')).toBeInTheDocument();
  });

  // it('renders contributors correctly', () => {
  //   render(
  //     <Provider store={store}>
  //       <ThemeProvider theme={themeMock}>
  //         <QueryClientProvider client={queryClient}>
  //         <ContributorsProjectDetails contributors={mockContributors} chefId="1" />
  //         </QueryClientProvider>
  //       </ThemeProvider>
  //     </Provider>
  //   );
  //   expect(screen.getByText('John')).toBeInTheDocument();
  //   expect(screen.getByText('Jane')).toBeInTheDocument();
  //   expect(screen.getByText('Developer')).toBeInTheDocument();
  //   expect(screen.getByText('Designer')).toBeInTheDocument();
  //   expect(screen.getByText('Createur')).toBeInTheDocument();
  //   expect(screen.getByText('Contributeur')).toBeInTheDocument();
  // });

  // it('does not render delete button for chef', () => {
  //   render(
  //     <Provider store={store}>
  //     <ThemeProvider theme={themeMock}>
  //       <QueryClientProvider client={queryClient}>
  //       <ContributorsProjectDetails contributors={mockContributors} chefId="1" />
  //       </QueryClientProvider>
  //     </ThemeProvider>
  //   </Provider>
  //   );
  //   const deleteButtons = screen.getAllByRole('button');
  //   expect(deleteButtons.length).toBe(1);
  // });

  // it('renders delete button for contributors', () => {
  //   render(
  //     <Provider store={store}>
  //     <ThemeProvider theme={themeMock}>
  //       <QueryClientProvider client={queryClient}>
  //       <ContributorsProjectDetails contributors={mockContributors} chefId="1" />
  //       </QueryClientProvider>
  //     </ThemeProvider>
  //   </Provider>
  //   );
  //   const deleteButtons = screen.getAllByRole('button');
  //   expect(deleteButtons.length).toBe(2);
  // });
});
