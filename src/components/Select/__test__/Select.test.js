/**
 * @file Select.test.js
 * @brief Ce fichier contient des tests pour le composant SelectCustom.
 */
import renderer from "react-test-renderer";
/**
 * @brief Import de styled-components.
 */
import { ThemeProvider } from "styled-components";
import { base } from "theme/base";

import { SelectCustom } from "../Select";

/**
 * @brief Import de jest-styled-components.
 */
import "jest-styled-components";
/**
 * @brief Test de l'échec du composant SelectCustom.
 */
test("SelectCustom component failed", () => {
  const tree = renderer.create(
    <ThemeProvider theme={base}>
      <SelectCustom>SelectCustom</SelectCustom>
    </ThemeProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('height', '100% !important', {
    modifier: '.antd-select',
  });
  expect(tree).toHaveStyleRule('height', '100% !important', {
    modifier: '.ant-select-selector',
  });
  expect(tree).toHaveStyleRule('align-items', 'center !important', {
    modifier: '.ant-select-selector',
  });
  expect(tree).toHaveStyleRule('border-radius', '4px !important', {
    modifier: '.ant-select-selector',
  });
  expect(tree).toHaveStyleRule('border-color', '#CCCCCC !important', {
    modifier: '.ant-select-selector',
  });
  expect(tree).toHaveStyleRule('color', '#248BC0 !important', {
    modifier: '.ant-select-arrow',
  });
  expect(tree).toHaveStyleRule('height', '100% !important', {
    modifier: '.ant-select-selection-search',
  });
  expect(tree).toHaveStyleRule('height', '100% !important', {
    modifier: '.ant-select-selection-search-input',
  });
});
