/**
 * @file ModalUpdateProject.test.js
 * @brief Unit tests for ModalUpdateProject component.
 */

/**
 * @brief Importation des modules nécessaires pour les tests
 */
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import { t } from 'utils/translationUtils';

/**
 * @brief Importation des fonctions de test de react-testing-library
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

/**
 * @brief Importation du composant à tester
 */
import ModalUpdateProject from '../ModalUpdateProject';

/**
 * @brief Mocking the translation utility function
 */
jest.mock('utils/translationUtils');

/**
 * @brief Mocking the projects reducer actions
 */
jest.mock('reducers/projects/projectsReducer', () => ({
    postUpdateProjectFetch: jest.fn().mockResolvedValue({
        projectId: "1",
        name: "Updated Project",
        description: "Updated Description",
    }),
}));

/**
 * @brief Configuration du mock store avec le middleware thunk
 */
const mockStore = configureStore([thunk]);

/**
 * @brief Création d'un thème simulé pour le Provider de styled-components
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

/**
 * @brief Début des tests pour le composant ModalUpdateProject
 */
describe('ModalUpdateProject', () => {
    let store;

    /**
     * @brief Initialisation du store et de la fonction de traduction avant chaque test
     */
    beforeEach(() => {
        store = mockStore({});
        t.mockReturnValue((key) => key);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * @brief Fonction pour rendre le composant avec les props et providers nécessaires
     */
    const renderComponent = (props) => {
        render(
            <Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <ModalUpdateProject {...props} />
                </ThemeProvider>
            </Provider>
        );
    };

    /**
     * @brief Test pour vérifier que la modal s'ouvre lors de l'activation du state isModalOpen
     */
    test('should open modal when isModalOpen is true', () => {
        renderComponent({ id: '1', name: 'Test Project', description: 'Test Description', isModalOpen: true });

        expect(screen.getByText('Modifier le projet')).toBeInTheDocument();
    });

    /**
     * @brief Test pour vérifier que la modal se ferme lors du clic sur le bouton d'annulation
     */
    test('should close modal on cancel button click', () => {
        const handleCancel = jest.fn();
        renderComponent({ id: '1', name: 'Test Project', description: 'Test Description', isModalOpen: true, handleCancel });

        fireEvent.click(screen.getByText('Annuler'));

        expect(handleCancel).toHaveBeenCalled();
    });

    /**
     * @brief Test pour vérifier l'affichage des erreurs de validation
     */
    test('should display validation errors', async () => {
        renderComponent({ id: '1', name: 'Test Project', description: 'Test Description', isModalOpen: true });

        fireEvent.change(screen.getByTestId('name-input'), {
            target: { value: '' },
        });
        fireEvent.change(screen.getByTestId('description-input'), {
            target: { value: '' },
        });

        fireEvent.click(screen.getByText('Valider'));

        await waitFor(() => {
            expect(screen.getByText("Veuillez renseigner le nom du projet.")).toBeInTheDocument();
            expect(screen.getByText("Veuillez renseigner la description du projet.")).toBeInTheDocument();
        });
    });

    /**
     * @brief Test pour vérifier que le formulaire est réinitialisé lors de l'annulation
     */
    test('should reset form on cancel', () => {
        const handleCancel = jest.fn();
        renderComponent({ id: '1', name: 'Test Project', description: 'Test Description', isModalOpen: true, handleCancel });

        fireEvent.change(screen.getByTestId('name-input'), {
            target: { value: 'Updated Project' },
        });
        fireEvent.change(screen.getByTestId('description-input'), {
            target: { value: 'Updated Description' },
        });

        fireEvent.click(screen.getByText('Annuler'));

        expect(handleCancel).toHaveBeenCalled();
        expect(screen.getByTestId('name-input').value).toBe('Updated Project');
        expect(screen.getByTestId('description-input').value).toBe('Updated Description');
    });

});
