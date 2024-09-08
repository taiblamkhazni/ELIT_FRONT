/**
 * @file Snackbar.test.js
 * @brief Ce fichier contient des tests pour le composant MenuTitle.
 */
import { toast } from "react-toastify";

import { Snackbar } from "../Snackbar";

// Mock the toast module
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Snackbar", () => {
  it("should call toast.success when type is 'success'", () => {
    const message = "Success message";
    const options = {
      position: "bottom-center"
    };
    Snackbar("success", message, options);

    expect(toast.success).toHaveBeenCalledWith(message, options);
  });

  it("should call toast.error when type is 'error'", () => {
    const message = "Error message";
    const options = {
      position: "bottom-center"
    };
    Snackbar("error", message, options);

    expect(toast.error).toHaveBeenCalledWith(message, options);
  });

  it("should do nothing when an invalid type is provided", () => {
    const message = "Invalid message";
    Snackbar("invalid-type", message);

    expect(toast.success).not.toHaveBeenCalled();
    expect(toast.error).not.toHaveBeenCalled();
  });
});
