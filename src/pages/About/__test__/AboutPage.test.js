/**
 * @file AboutPage.test.js
 * @brief This file contains tests for the AboutPage component.
 */

/**
 * @brief Importation of react-redux.
 */
import * as redux from "react-redux";
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
/**
 * @brief Importation of configureStore.
 */
import configureStore from "redux-mock-store";
// Assuming you're using redux-mock-store for testing
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

import AboutPage from '../AboutPage';
jest.mock("../../PageBase/PageBase", () => ({ children }) => <div>{children}</div>);

import '@testing-library/jest-dom/extend-expect';


/**
 * @brief Mock the assets to prevent errors during testing
 */
jest.mock('../../../assets/images/about.jpg', () => 'mock-about.jpg');
jest.mock('../../../assets/images/GroupAbout.png', () => 'mock-groupAbout.png');

/**
 * @brief Using Jest to simulate useDispatch and useSelector hooks from react-redux.
 */
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

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

/**
 * @brief Tests for the AboutPage component.
 */
describe('AboutPage component tests', () => {

  let store;
  let useSelectorMock;

  beforeEach(() => {
    useSelectorMock = jest.spyOn(redux, 'useSelector');
    useSelectorMock.mockClear();
    
    /**
 * @brief Initialize a new Redux store with initial state
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
    render(
      <redux.Provider store={store}>
        <ThemeProvider theme={themeMock}>
          <BrowserRouter>
            <AboutPage />
          </BrowserRouter>
        </ThemeProvider>
      </redux.Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * @brief Test to check if it renders without crashing
   */


  /**
 * @test Checks if the main title is displayed.
 */
  it('should display the main title', () => {
    const title = screen.getByText('A propos');
    expect(title).toBeInTheDocument();
  });

  /**
   * @test Checks if the section titles are displayed.
   */
  it('should display the section titles', () => {
    const sectionTitles = [
      "Qu'est-ce que ELIT ?",
      'Une démarche simple, collaborative et flexible',
      'Le groupe Capgemini',
      'SogetiLabs France'
    ];
    sectionTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  /**
   * @test Checks if the images are displayed with correct alt text.
   */
  it('should display the images with correct alt text', () => {
    const teamImage = screen.getByAltText('Team');
    expect(teamImage).toBeInTheDocument();
    expect(teamImage).toHaveAttribute('src', 'mock-about.jpg');

    const illustrationImage = screen.getByAltText('Illustration');
    expect(illustrationImage).toBeInTheDocument();
    expect(illustrationImage).toHaveAttribute('src', 'mock-groupAbout.png');
  });

  /**
   * @test Checks if the contact section is displayed with correct email link.
   */

  it('should display the contact section with correct email link', () => {
    expect(screen.getByRole('heading', { level: 2, name: /SogetiLabs France/i })).toBeInTheDocument();

    const emailLink = screen.getByText('elit.global@capgemini.com');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:elit.global@capgemini.com');
  });

});
