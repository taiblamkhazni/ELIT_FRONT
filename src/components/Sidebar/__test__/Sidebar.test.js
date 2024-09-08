/**
 * @file Sidebar.test.js
 * @brief Ce fichier contient des tests pour le composant Sidebar.
 */
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { ThemeProvider } from 'styled-components';

import { render, screen } from "@testing-library/react";

import rootReducer from "../../../reducers/rootReducers";
import Sidebar from "../Sidebar";

const mockStateWithAdminRole = {
  authentificationReducer: {
    user: {
      roles: ["ADMIN"],
    },
  },
  projectReducer: {
    projectId: "123",
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
  },
};

const storeWithAdminRole = createStore(rootReducer, mockStateWithAdminRole);

// Pour tester sans le rôle ADMIN, vous pouvez créer un autre mock store
const mockStateWithoutAdminRole = {
  authentificationReducer: {
    user: {
      roles: ["USER"],
    },
  },
  projectReducer: {
    projectId: "123",
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
  },
};

const storeWithoutAdminRole = createStore(rootReducer, mockStateWithoutAdminRole);
const themeMock = {
  colors: {
    primaires: {
      white: '#FFFFFF',
    },
    secondaires: {
      blue: '#someColor',
    },

  },
};

describe("Sidebar Component", () => {
  it("renders the Logo, TableBordButton, Menu, AdministrationButton and Chatbox components when user is admin", () => {
    render(
      <Provider store={storeWithAdminRole}>
        <ThemeProvider theme={themeMock}>
          <BrowserRouter>
            <Sidebar />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );

    const logo = screen.getByTestId("logo");
    const administrationButton = screen.getByTestId("administration-button");

    expect(logo).toBeInTheDocument();
    expect(administrationButton).toBeInTheDocument();
  });

  it("renders the Logo, TableBordButton and Menu components when user is not admin", () => {
    render(
      <Provider store={storeWithoutAdminRole}>
        <ThemeProvider theme={themeMock}>
          <BrowserRouter>
            <Sidebar />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );


    const logo = screen.getByTestId("logo");
    const menu = screen.getByTestId("menu");

    expect(logo).toBeInTheDocument();
    expect(menu).toBeInTheDocument();
  });
});
