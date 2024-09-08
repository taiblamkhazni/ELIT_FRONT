import { QueryClient, QueryClientProvider } from "react-query";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

import ProjectDashboardFeature from "../ProjectDashboard";


jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock("hooks/apis/AdminApi")

console.error = jest.fn()
console.log = jest.fn()

const mockStore = configureStore();

let store;

const initialState = {
    projectReducer: {
        project:
        {
            isArchived: false,
            confirmationState: "WAITING",
            name: "Project test",
            projectId: 1,
            contributors: [],
            chefId: 1,
            createdAt: new Date(2023, 1, 1).toISOString()
        },
        reportsNumber: [

        ]
    },
    authentificationReducer: {
        user: {

        }
    },
    multicriteriaAnalysisReducer: {
        isFinished: true
    },
    previsibilityAnalysisReducer: {
        isFinished: true
    },
    executionPlanReducer: {
        isFinished: true
    }
};

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

describe("testing the profil component", () => {
    beforeEach(() => {
        dispatchMock = jest.fn();

        useDispatch.mockImplementation(() => dispatchMock);

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        store = mockStore(initialState);

        render(
            <Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <QueryClientProvider client={new QueryClient()}>
                        <BrowserRouter>
                            <ProjectDashboardFeature />
                        </BrowserRouter>
                    </QueryClientProvider>
                </ThemeProvider>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("it should show the right component", () => {
        const text = screen.getByText("Project test");
        expect(text).toBeInTheDocument()
    });
});
