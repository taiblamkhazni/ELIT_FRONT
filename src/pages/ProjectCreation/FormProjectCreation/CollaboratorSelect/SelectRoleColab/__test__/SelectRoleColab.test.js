import useProjectCreationContext from "hooks/useProjectCreationContext/useProjectCreationContext";

import { render, screen } from "@testing-library/react";

import { rulesColaborators } from "../mockData";
import SelectRoleColab from "../SelectRoleColab";

jest.mock("hooks/useProjectCreationContext/useProjectCreationContext.js");

describe("I want to see the dropdown of roles and have the possibility to interact with it", () => {
  let mockOnChangeRoleColab;

  beforeEach(() => {
    mockOnChangeRoleColab = jest.fn();

    useProjectCreationContext.mockReturnValue({
      onChangeRoleColab: mockOnChangeRoleColab,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("initially, it should display the dropdown to the user", () => {
    render(<SelectRoleColab role="" />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("the dropdown should display the options to the user", () => {
    render(<SelectRoleColab role="" />);

    expect(
      screen.getByRole("combobox", { value: rulesColaborators[0].value })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("combobox", { value: rulesColaborators[1].value })
    ).toBeInTheDocument();
  });

  it("if a role already exists, it should be displayed as default to the user", () => {
    render(<SelectRoleColab role={rulesColaborators[0].value} />);

    expect(screen.getByText(rulesColaborators[0].text)).toBeInTheDocument();
  });

  it("the user should be able to select a role", () => {
    render(<SelectRoleColab role="" />);

    mockOnChangeRoleColab(rulesColaborators[1].value);

    expect(mockOnChangeRoleColab).toHaveBeenCalledWith(
      rulesColaborators[1].value
    );
  });
});
