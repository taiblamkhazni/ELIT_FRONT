/**
 * @file ModalWeightsChange.test.js
 * @brief Contient les tests unitaires pour le composant ModalWeightsChange.
 */

import { StepsContext, useStepContext } from "pages/AnalyseMulticriteres/AnalyseMulticriteresPage";
import { Provider, useDispatch, useSelector } from "react-redux";
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";

import { fireEvent, render, screen } from "@testing-library/react";

import ModalWeightsChange from "../ModalWeightsChange";


/**
 * @brief Jest mocks for hooks
 */
jest.mock("pages/AnalyseMulticriteres/AnalyseMulticriteresPage");

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

console.error = jest.fn()


const mockStore = configureStore();
let store;

/**
 * @brief Mock pour le thème.
 */
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


/**
 * @brief render function
 */
const renderComponent = (stateOverride = {}) => {
    const initialState = {
        multicriteriaAnalysisReducer: {
            current: 1,
            ...stateOverride,
        },
    };

    store = mockStore(initialState);

    useSelector.mockImplementation((callback) => {
        return callback(initialState);
    });

    return render(
        <ThemeProvider theme={themeMock}>
            <Provider store={store}>
                <StepsContext.Provider>
                    <ModalWeightsChange />
                </StepsContext.Provider>
            </Provider>
        </ThemeProvider>
    );
};



describe("testing the ModalWeightsChange component", () => {
    let resetInputReturnDefault;
    let resetModal;

    beforeEach(() => {
        let setListStepweights = jest.fn()
        let listStepWeights = []
        let getCurrentStepWeights = jest.fn(() => [])
        resetInputReturnDefault = jest.fn()
        resetModal = jest.fn()
        let setErrorMessage = jest.fn()
        let errorMessage = []

        let dispatchMock = jest.fn();

        useDispatch.mockImplementation(() => dispatchMock);

        useStepContext.mockReturnValue({
            setListStepweights, listStepWeights, getCurrentStepWeights, resetInputReturnDefault, resetModal, errorMessage, setErrorMessage
        });

    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    /**
     * Test to check if it shows the right title
     */
    it("should show the right title", () => {
        renderComponent();
        SwalWithBootstrapButtons.fire = jest.fn().mockResolvedValue({ isConfirmed: true });

        let title = screen.queryByText("Critères")
        expect(title).not.toBeInTheDocument()

        let button1 = screen.getByText("Modifier les valeurs des critères");
        fireEvent.click(button1)

        let button2 = screen.getByText("Annuler");
        fireEvent.click(button2)

        expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith(
            {
                title: "Êtes-vous sûr?",
                text: "Cette action est irréversible !",
                showCancelButton: true,
                cancelButtonColor: "#C91432",
                confirmButtonColor: "#10B581",
                confirmButtonText: "Confirmer",
                cancelButtonText: "Annuler",
                reverseButtons: true,
            }
        )
    });

    /**
     * Test to check if it handles cancellation properly
     */
    it("should handle cancellation properly", () => {
        renderComponent();
        SwalWithBootstrapButtons.fire = jest.fn().mockResolvedValue({ isConfirmed: false });

        let button1 = screen.getByText("Modifier les valeurs des critères");
        fireEvent.click(button1)

        let button2 = screen.getByText("Annuler");
        fireEvent.click(button2)

        expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith(
            {
                title: "Êtes-vous sûr?",
                text: "Cette action est irréversible !",
                showCancelButton: true,
                cancelButtonColor: "#C91432",
                confirmButtonColor: "#10B581",
                confirmButtonText: "Confirmer",
                cancelButtonText: "Annuler",
                reverseButtons: true,
            }
        );

        expect(resetInputReturnDefault).not.toHaveBeenCalled();
        expect(resetModal).not.toHaveBeenCalled();
    });

    /**
     * Test to check if it renders NextStepButton
     */
    it("should display NextStepButton", () => {
        renderComponent({ errorMessage: false });

        fireEvent.click(screen.getByText("Modifier les valeurs des critères"));

        // Ensure NextStepButton is present.
        const nextStepButton = screen.getByTestId("next-step-button");
        expect(nextStepButton).toBeInTheDocument();
    });

});

