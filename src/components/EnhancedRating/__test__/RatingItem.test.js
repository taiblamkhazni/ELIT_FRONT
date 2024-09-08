/**
 * @file RatingItem.test.js
 * @brief Ce fichier contient des tests pour le composant Rating.
 */
import renderer from "react-test-renderer";
/**
 * @brief Import de styled-components.
 */
import { ThemeProvider } from "styled-components";
import { base } from "theme/base";

/**
 * @brief Import du composant Rating pour le tester.
 */
import Rating from "../RatingItem";

/**
 * @brief Import de jest-styled-components.
 */
import "jest-styled-components";
/**
 * @brief Test du composant Rating.
 */
test("ButtonNoBackground tests props active", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <Rating
          key="test"
          // step={step}
          defaultValue={0}
          margin="0 48px 0 0"
          headerTitle="title"
          // questionLabel={question.questionRef}
          value={2}
          editable={false}
          filled={false}
        />
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toHaveStyleRule("margin", "0 48px 0 0");

  renderer
    .create(
      <ThemeProvider theme={base}>
        <Rating
          key="test"
          // step={step}
          filled
          size={20}
          color={"kjjj"}
          // questionLabel={question.questionRef}
          hovered={0}
        />
      </ThemeProvider>
    )
    .toJSON();
});
