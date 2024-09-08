/**
 * @file MiddleContent.test.js
 * @brief test MiddleContent
 */
import { render } from "@testing-library/react";

import MiddleContent from "../MiddleContent";

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}));

/**
 * @brief unite test render MiddleContent
 */
describe("MiddleContent", () => {
    it("MiddleContent", () => {

        render(<MiddleContent />);

    });


});
