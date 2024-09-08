/**
 * @file ProjectCreationPage.test.js
 * @brief Ensures that the ProjectCreation component is rendered correctly and interacts as expected with the Redux store and React-Query.
 */
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import configureStore from "redux-mock-store";

import { render } from '@testing-library/react';

import ProjectCreation from '../ProjectCreationPage';

const queryClient = new QueryClient();

const mockStore = configureStore();

/**
 * @brief Initial state mock for the Redux store.
 */
let initialState = {
    projectReducer: {
        projectId: 1
    },
    authentificationReducer: {
        user: {
            firstName: "",
            lastName: ""
        }
    }
}

let store = mockStore(initialState);

/**
 * @brief Mock the ProjectCreationProvider component.
 */
jest.mock("context/ProjectCreationProvider", () => () => <div>ProjectCreation Component</div>);
/**
 * @brief Mock the PageBase component.
 */
jest.mock("pages/PageBase/PageBase", () => ({ children }) => <div>{children}</div>);

/**
 * @brief Test suite for the ConnexionPage component.
 */
describe('ConnexionPage', () => {

    /**
     * @brief Test to verify the rendering of the ProjectCreation component.
     *
     * This test ensures that the ProjectCreation component renders without any errors or crashes.
     * It also confirms that the mocked component is present in the DOM after rendering.
     */
    it('renders without crashing', () => {
        const { getByText } = render(
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ProjectCreation />
                </QueryClientProvider>
            </Provider>
        );

        expect(getByText("ProjectCreation Component")).toBeInTheDocument();
    });
});
