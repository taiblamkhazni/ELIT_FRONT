/**
 * @file SettingsPage.test.js
 * @brief This file contains tests aimed at ensuring the proper rendering and behavior of the Settings component, especially in relation to Redux's state and actions.
 */
import { TitlePage } from "pages/ProjectCreation/WrapperProjectSearch/WrapperProjectSearch";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "styled-components";
import { base } from "theme/base";

import { render, screen } from "@testing-library/react";

import Settings from "../SettingsPage";


/** @brief Mock for react-redux hooks.*/
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

/** @brief Mock for custom hook.*/
jest.mock("hooks/useProjectCreationContext/useProjectCreationContext.js");

/** @brief To avoid console error outputs during testing.*/
console.error = jest.fn()



/** @brief Initial state to mimic the application's Redux state.*/
const initialState = {
    authentificationReducer: {
        user: {
            firstname: "John",
            lastname: "Doe"
        },
    },
    userReducer: {
        userInfo: {},
        avatarUrl: "https://exaplme.com"
    },
    projectsReducer: {
        showMessageCreationModal: true, // Adjust according to your state structure
    },
    projectReducer: {
        projectId: 1, 
    },
    welcomeTooltipReducer: {
        stageNumber: 1
    }
};
/** @brief Mock theme for styled-components.*/
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

let dispatchMock

/**
 * @brief Test suite for the Settings component.
 */
describe("testing the profil component", () => {
    beforeEach(() => {
        dispatchMock = jest.fn();

        useDispatch.mockImplementation(() => dispatchMock);

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

       

        render(
            <ThemeProvider theme={themeMock}>
                <BrowserRouter>
                    <Settings />
                </BrowserRouter>
            </ThemeProvider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * @brief Test to check if it renders Settings component
     */
    test("renders Settings component", () => {
        const settingsComponent = screen.getByText("Réglages");
        expect(settingsComponent).toBeInTheDocument();
    });

    it("renders the title correctly", () => {
        const { getByText } = render(
            <ThemeProvider theme={base}>
                <TitlePage />
            </ThemeProvider>
        );
            //Inside your test
            const titleElement = getByText("À propos");
            expect(titleElement).toBeInTheDocument();
    });
});