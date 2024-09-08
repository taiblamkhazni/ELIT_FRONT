/**
 * @file Schema.test.js
 * @brief Ce fichier contient des tests pour le composant MenuTitle.
 */
import * as Yup from "yup";

import {
  connexionSchema,
  criteriaValidation,
  firstStep,
  inscriptionSchema,
  projectCreationValidationSchema,
} from "../Schema";

describe("criteriaValidation schema", () => {
  it("should validate correctly when all criteria values are within the allowed range", async () => {
    const values = {
      clarite: 50,
      precision: 60,
      rigueur: 70,
    };

    await expect(criteriaValidation.validate(values)).resolves.toBe(values);
  });

  it("should fail validation when a criteria value is below the minimum allowed range", async () => {
    const values = {
      clarite: 0,
      precision: 60,
      rigueur: 70,
    };

    await expect(criteriaValidation.validate(values)).rejects.toThrowError(
      /Le poid doit être au minimum 1/
    );
  });

  it("should fail validation when a criteria value is above the maximum allowed range", async () => {
    const values = {
      clarite: 50,
      precision: 60,
      rigueur: 100,
    };

    await expect(criteriaValidation.validate(values)).rejects.toThrowError(
      /Le poid doit être au maximum 99/
    );
  });

  it("should fail validation when a criteria value is not provided", async () => {
    const values = {
      clarite: 50,
      precision: 60,
    };

    await expect(criteriaValidation.validate(values)).rejects.toThrowError(
      /Ce champ est obligatoire/
    );
  });
});
describe("connexionSchema", () => {
  it("should validate an object with valid email address", async () => {
    const data = { email: "test@example.com", password: "ValidPass123$" };
    const isValid = await connexionSchema.isValid(data);
    expect(isValid).toBe(true);
  });

  it("should not validate an object with invalid email address", async () => {
    const data = { email: "invalid-email-address" };
    const isValid = await connexionSchema.isValid(data);
    expect(isValid).toBe(false);
  });

  it("should not validate an object with missing email address", async () => {
    const data = { email: "" };
    const isValid = await connexionSchema.isValid(data);
    expect(isValid).toBe(false);
  });
});
describe("inscriptionSchema", () => {

  test("invalid input returns errors", async () => {
    const invalidInput = {
      lastname: "Doe",
      firstname: "",
      role: "",
      email: "john.doeexample.com",
      password: process.env.REACT_APP_TEST_PASSWORD,
      confirmPassword: process.env.REACT_APP_TEST_CONFIRM_PASSWORD,
      acceptTerms: false,
    };
    await expect(inscriptionSchema.validate(invalidInput)).rejects.toThrow(
      Yup.ValidationError
    );
  });
});

describe("Validation schema", () => {
  it("should allow valid values", () => {
    const values = {
      name: "Valid Name",
      description: "Valid description",
      acceptTerms: true,
    };

    const isValid = projectCreationValidationSchema.isValidSync(values);

    expect(isValid).toBe(true);
  });

  it("should not allow empty name", () => {
    const values = {
      name: "",
      description: "Valid description",
      acceptTerms: true,
    };

    expect(() => projectCreationValidationSchema.validateSync(values)).toThrow(
      "Veuillez renseigner le nom du projet."
    );
  });

  it("should not allow name with less than 3 characters", () => {
    const values = {
      name: "ab",
      description: "Valid description",
      acceptTerms: true,
    };

    expect(() => projectCreationValidationSchema.validateSync(values)).toThrow(
      "Le nom du projet doit contenir au minimum 3 caractères."
    );
  });

  it("should not allow name with more than 25 characters", () => {
    const values = {
      name: "abcdefghijklmnopqrstuvwxyz",
      description: "Valid description",
      acceptTerms: true,
    };

    expect(() => projectCreationValidationSchema.validateSync(values)).toThrow(
      "Le nom du projet ne doit pas dépasser 20 caractères."
    );
  });

  it("should not allow name with invalid characters", () => {
    const values = {
      name: "Invalid_name@#",
      description: "Valid description",
      acceptTerms: true,
    };

    expect(() => projectCreationValidationSchema.validateSync(values)).toThrow(
      "Uniquement des caractères, des chiffres, des underscores ou des espaces"
    );
  });

  it("should not allow description with more than 100 characters", () => {
    const values = {
      name: "Valid Name",
      description: "a".repeat(256),
      acceptTerms: true,
    };

    expect(() => projectCreationValidationSchema.validateSync(values)).toThrow(
      "La description du projet ne doit pas dépasser 255 caractères."
    );
  });

  it("should not allow non accepted terms", () => {
    const values = {
      name: "Valid Name",
      description: "Valid description",
      acceptTerms: false,
    };

    expect(() => projectCreationValidationSchema.validateSync(values)).toThrow(
      "Veuillez accepter les conditions pour passer à l'étape suivante."
    );
  });
});
describe("firstStep validation schema", () => {
  it("validates a valid object", async () => {
    const validObject = {
      Spec_1: "Valid response 1",
      Spec_2: "Valid response 2",
      Spec_3: "Valid response 3",
      Spec_4: "Valid response 4",
      Spec_5: "Valid response 5",
    };

    await expect(firstStep.validate(validObject)).resolves.toEqual(validObject);
  });

  it("throws error if required field is missing", async () => {
    const invalidObject = {
      Spec_1: "Valid response 1",
      Spec_2: "Valid response 2",
      Spec_3: "",
      Spec_4: "Valid response 4",
      Spec_5: "Valid response 5",
    };

    await expect(firstStep.validate(invalidObject)).rejects.toThrow(
      "Ce champ est obligatoire !"
    );
  });

  it("throws error if response exceeds max length", async () => {
    const invalidObject = {
      Spec_1: "Valid response 1",
      Spec_2: "Valid response 2",
      Spec_3:
        "This response exceeds the maximum character length of 200 characters. This response exceeds the maximum character length of 200 characters. This response exceeds the maximum character length of 200 characters. This response exceeds the maximum character length of 200 characters. This response exceeds the maximum character length of 200 characters.",
      Spec_4: "Valid response 4",
      Spec_5: "Valid response 5",
    };

    await expect(firstStep.validate(invalidObject)).rejects.toThrow(
      "Votre réponse ne doit pas dépasser les 200 caractères"
    );
  });
});
