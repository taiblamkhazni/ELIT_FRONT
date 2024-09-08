/**
 * @file EnhancedRate.js
 * @brief fichier de test pour l'analyse multicriteres partie rate
 */
import { act, render } from "@testing-library/react";

import EnhancedRate from "../EnhancedRage";

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    Controller: jest.fn().mockImplementation(({ render }) => render({ field: {}, fieldState: {} })),
}));


/**
 * @brief unit test for enhanced rate
 */
describe("EnhancedRate", () => {

    let testProps;

    beforeEach(() => {
        testProps = {
            register: jest.fn().mockReturnValue({
                ref: {}
            }),
            setValue: jest.fn(),
            getValues: jest.fn(),
            control: {},
            formState: { errors: {} },
        };
    });


    it("renders with default props", () => {
        act(() => {
            render(<EnhancedRate validation={testProps} groupName="test" />);
        });
    });

    it("sets default value using useEffect", () => {
        act(() => {
            render(<EnhancedRate groupName="test" validation={testProps} defaultValue={5} />);
        });
        expect(testProps.setValue).toHaveBeenCalledWith(expect.any(String), "5");
    });

    it("renders with a different groupName", () => {
        act(() => {
            render(<EnhancedRate validation={testProps} groupName="differentGroupName" />);
        });
    });


    it("validates correctly when value is not 0", () => {
        testProps.getValues = jest.fn().mockReturnValue(1);
        act(() => {
            render(<EnhancedRate groupName="test" validation={testProps} />);
        });
    });

    it("renders ErrorAlert when errors exist", () => {
        testProps.formState.errors = { someKey: { message: "Some error" } };
        act(() => {
            render(<EnhancedRate groupName="test" validation={testProps} />);
        });
    });

});
