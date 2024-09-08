/**
 * @file CreateProjectButton.test.js
 * @brief Contient les tests unitaires pour le composant CreateProjectButton.
 */
import { fireEvent, render } from "@testing-library/react";

/**
 * @brief Importation du composant CreateProjectButton pour le tester
 */
import CreateProjectButton from "../CreateProjectButton";

/**
 * @brief Importation du jest-styled-components.
 */
import "jest-styled-components";



describe("I want to see my button for project creation and be able to interact with it", () => {
  it("initially, the component should renders correctly to the user", () => {
    console.error = jest.fn();
    const handleClick = jest.fn();
    const { getByText } = render(
      <CreateProjectButton onClick={handleClick}>Test</CreateProjectButton>
    );

    expect(getByText("Test")).toBeInTheDocument();
  });

  it("when the user clicks on the button, it should executes the function", () => {
    console.error = jest.fn();
    const handleClick = jest.fn();
    const { getByText } = render(
      <CreateProjectButton onClick={handleClick}>Test</CreateProjectButton>
    );

    fireEvent.click(getByText("Test"));

    expect(handleClick).toHaveBeenCalled();
  });

  it("the plus icon should be displayed to the user", () => {
    console.error = jest.fn();
    const handleClick = jest.fn();
    const { getByAltText } = render(
      <CreateProjectButton onClick={handleClick}>Test</CreateProjectButton>
    );

    expect(getByAltText("plus icon")).toBeInTheDocument();
  });
});

describe("I want to test the style of the custom button", () => {
  const defaultProps = {
    onClick: jest.fn(),
    children: "test",
  };

  it("should apply correct background color when backgroundColor prop is provided", () => {
    const { getByTestId } = render(
      <CreateProjectButton {...defaultProps} colorButton="#ff0000" />
    );
    const button = getByTestId("custom-button");
    expect(button).toHaveStyleRule("background-color", "#ff0000");
  });

  it("should apply correct padding when padding prop is provided", () => {
    const { getByTestId } = render(
      <CreateProjectButton {...defaultProps} padding="15px 30px" />
    );
    const button = getByTestId("custom-button");
    expect(button).toHaveStyleRule("padding", "15px 30px");
  });

  it("should apply correct margin when margin prop is provided", () => {
    const { getByTestId } = render(
      <CreateProjectButton {...defaultProps} margin="10px 20px" />
    );
    const button = getByTestId("custom-button");
    expect(button).toHaveStyleRule("margin", "10px 20px");
  });
});
