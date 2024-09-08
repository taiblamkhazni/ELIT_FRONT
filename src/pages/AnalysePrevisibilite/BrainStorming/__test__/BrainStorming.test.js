import BrainStorming from "pages/BrainStorming/BrainStormingPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider, useDispatch, useSelector } from "react-redux";
import { MemoryRouter, useNavigate } from 'react-router-dom';
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";

import {  render, screen } from "@testing-library/react";

import "jest-localstorage-mock";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));


console.error = jest.fn()


jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

console.error = jest.fn()

const mockStore = configureStore();

let store;

const themeMock = {
    colors: {
        primaires: {
            blueLight: "#someColor",
            blueDark: "#someColor",
            blue: "#someColor",
        },
        secondaires: {
            grisLight: "#someColor",
        },
        avertissements: {
            danger: "red",
        },
    },
    fontWeights: {
        regular: "400",
    },
    lineHeights: {
        Deci: "1.5",
    },
};


describe("testing the FileTable component", () => {
    beforeEach(() => {

        useNavigate.mockReturnValue(jest.fn());

        let dispatchMock = jest.fn();

        const initialState = {
            projectReducer: {
                projectId: 1,
                currentUserRole: "CDP",
                reportsNumber: {
                    multicriteria_report: 0,
                    predictibility_report: 0,
                    execution_report: 0,
                }
            },
            previsibilityAnalysisReducer: {
                isHavingComments: true
            },
            authentificationReducer: {
                user: {

                }
            },
            brainStormingResumeReducer:{
                brainStorming:[],
                isLoadingBrainstorming:false
            }
        };

        const mockAuthTokens = { "access-token": "fake-access-token" };
        const mockAuthTokensString = JSON.stringify(mockAuthTokens);

        jest.spyOn(window.localStorage, "getItem").mockReturnValue(mockAuthTokensString);

        store = mockStore(initialState)

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        useDispatch.mockImplementation(() => dispatchMock);
        SwalWithBootstrapButtons.fire = jest.fn().mockResolvedValue({ isConfirmed: true });
        render(
            <MemoryRouter>
                <ThemeProvider theme={themeMock}>
                    <Provider store={store}>
                        <QueryClientProvider client={new QueryClient()}>
                            <BrainStorming iteration2={""} />
                        </QueryClientProvider>
                    </Provider>
                </ThemeProvider>
            </MemoryRouter>
        )
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should display the objective text", () => {
        expect(screen.getByText(/L'objectif du brainstorming est d'améliorer le choix de la méthodologie/i)).toBeInTheDocument();
    });

    it("should display the info text", () => {
        expect(screen.getByText(/Révisez les réponses aux questions afin de lancer une nouvelle analyse/i)).toBeInTheDocument();
    });

});
