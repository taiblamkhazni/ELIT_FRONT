/**
 * @file LearnMoreCollabPage.test.js
 * @brief This file contains tests for the LearnMoreCollabPage component.
 */

/**
 * @brief Importation of react-query's QueryClient and QueryClientProvider for handling server state.
 */
import { QueryClient, QueryClientProvider } from 'react-query';
/**
 * @brief Importation of redux and its hooks.
 */
import * as redux from "react-redux";
/**
 * @brief Importation of BrowserRouter for routing.
 */
import { BrowserRouter } from 'react-router-dom';
/**
 * @brief Importation of redux-mock-store to create a mock Redux store for testing.
 */
import configureStore from "redux-mock-store";
/**
 * @brief Importation of ThemeProvider for styled-components.
 */
import { ThemeProvider } from "styled-components";

/**
 * @brief Importation of testing utilities from react-testing-library.
 */
import { render, screen } from '@testing-library/react';

/**
 * @brief Importation of the component to be tested.
 */
import LearnMoreCollabPage from '../LearnMoreCollabPage';

/**
 * @brief Importation of jest-dom's custom matchers for better assertions.
 */
import '@testing-library/jest-dom/extend-expect';

/** 
 * @brief Creation of a new QueryClient for handling server state.
 */
const queryClient = new QueryClient();

/**
 * @brief Mocking react-redux's hooks for the purpose of testing.
 */
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}));

/**
 * @brief Creating a mock Redux store.
 */
const mockStore = configureStore();

/**
 * @brief Creating a simulated theme for the styled-components Provider.
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

describe('LearnMoreCollabPage', () => {
    let store;

    /**
     * @brief Initialize a new Redux store with initial state.
     */
    store = mockStore({
        authentificationReducer: {
            user: {
                firstname: "John",
                lastname: "Doe"
            },
        },
        welcomeTooltipReducer: {
            stageNumber: 1
        },
        projectReducer: {
            projectId: 1
        }
    });

    test('renders the title', () => {
        render(
            <redux.Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <BrowserRouter>
                        <QueryClientProvider client={queryClient}>
                            <LearnMoreCollabPage />
                        </QueryClientProvider>
                    </BrowserRouter>
                </ThemeProvider>
            </redux.Provider>
        );
        const titleElement = screen.getByText(/Une analyse collaborative d'aide à la décision/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('renders the first step title', () => {
        render(
            <redux.Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <BrowserRouter>
                        <QueryClientProvider client={queryClient}>
                            <LearnMoreCollabPage />
                        </QueryClientProvider>
                    </BrowserRouter>
                </ThemeProvider>
            </redux.Provider>
        );
        const stepTitleElement = screen.getByText(/Complétez un formulaire/i);
        expect(stepTitleElement).toBeInTheDocument();
    });

    test('renders the second step title', () => {
        render(
            <redux.Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <BrowserRouter>
                        <QueryClientProvider client={queryClient}>
                            <LearnMoreCollabPage />
                        </QueryClientProvider>
                    </BrowserRouter>
                </ThemeProvider>
            </redux.Provider>
        );
        const stepTitleElement = screen.getByText(/Échangez avec les collaborateurs/i);
        expect(stepTitleElement).toBeInTheDocument();
    });

    test('renders the third step title', () => {
        render(
            <redux.Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <BrowserRouter>
                        <QueryClientProvider client={queryClient}>
                            <LearnMoreCollabPage />
                        </QueryClientProvider>
                    </BrowserRouter>
                </ThemeProvider>
            </redux.Provider>
        );
        const stepTitleElement = screen.getByText(/Choisissez la méthode/i);
        expect(stepTitleElement).toBeInTheDocument();
    });

    test('renders the form image', () => {
        render(
            <redux.Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <BrowserRouter>
                        <QueryClientProvider client={queryClient}>
                            <LearnMoreCollabPage />
                        </QueryClientProvider>
                    </BrowserRouter>
                </ThemeProvider>
            </redux.Provider>
        );
        const formImage = screen.getByAltText(/Complétez un formulaire/i);
        expect(formImage).toBeInTheDocument();
    });

    test('renders the collaborate image', () => {
        render(
            <redux.Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <BrowserRouter>
                        <QueryClientProvider client={queryClient}>
                            <LearnMoreCollabPage />
                        </QueryClientProvider>
                    </BrowserRouter>
                </ThemeProvider>
            </redux.Provider>
        );
        const collaborateImage = screen.getByAltText(/Échangez avec les collaborateurs/i);
        expect(collaborateImage).toBeInTheDocument();
    });

    test('renders the choose method image', () => {
        render(
            <redux.Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <BrowserRouter>
                        <QueryClientProvider client={queryClient}>
                            <LearnMoreCollabPage />
                        </QueryClientProvider>
                    </BrowserRouter>
                </ThemeProvider>
            </redux.Provider>
        );
        const chooseMethodImage = screen.getByAltText(/Choisissez la méthode/i);
        expect(chooseMethodImage).toBeInTheDocument();
    });
});
