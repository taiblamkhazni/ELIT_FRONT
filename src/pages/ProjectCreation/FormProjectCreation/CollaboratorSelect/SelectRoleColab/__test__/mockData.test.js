import { rulesColaborators } from "../mockData";

describe("mockData content", () => {
  it("should have the correct values", () => {
    expect(rulesColaborators).toEqual([
      {
        key: "Observateur",
        text: "Observateur",
        value: "Observateur",
      },
      {
        key: "Contributeur",
        text: "Contributeur",
        value: "Contributeur",
      },
    ]);
  });
});
