/**
 * @file LogoAuthenBlack.test.js
 * @brief Ce fichier contient des tests pour le composant LogoAuthenBlack.
 */
import { render, screen } from "@testing-library/react";

import LogoAuthenBlack from "./LogoAuthenBlack";

describe("LogoAuthenBlack Component", () => {
    it("renders the ELIT", () => {
        render(<LogoAuthenBlack alt='elit-black-logo' />);

        const elitBlackLogo = screen.getByAltText("elit-black-logo");

        expect(elitBlackLogo).toBeInTheDocument();
    });
});