/**
 * @file List.test.js
 * @brief Ce fichier contient des tests pour le composant List.
 */
import { render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant List pour le tester.
 */
import List from "../List";

/**
 * @brief Importation du @testing-library/jest-dom.
 */
import "@testing-library/jest-dom";

/**
 * @brief Création d'un mock pour le composant CustomWrapperItem.
 */
const CustomWrapperItem = (props) => (
  <li
    style={{ color: "blue" }}
    {...props}
  ></li>
);

describe("List Component", () => {
  it("renders the list items", () => {
    const data = [
      { projectId: "1", confirmationState: "confirmed", name: "Item 1" },
      { projectId: "2", confirmationState: "pending", name: "Item 2" },
    ];

    render(<List data={data} WrapperItem={CustomWrapperItem} />);

    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(2);
    expect(items[0]).toHaveTextContent("Item 1");
    expect(items[1]).toHaveTextContent("Item 2");
  });

  it("renders the list with custom WrapperItem component", () => {
    const data = [
      { projectId: "1", confirmationState: "confirmed", name: "Item 1" },
      { projectId: "2", confirmationState: "pending", name: "Item 2" },
    ];

    console.error = jest.fn();
    render(<List data={data} WrapperItem={CustomWrapperItem} />);

    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(2);
    expect(items[0]).toHaveTextContent("Item 1");
    expect(items[1]).toHaveTextContent("Item 2");
  });
});
