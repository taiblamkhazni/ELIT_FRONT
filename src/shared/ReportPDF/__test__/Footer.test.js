
/**
 * @file Footer.test.js
 * @brief Unit tests for the Footer component.
 */
import { render } from "@testing-library/react";

import Footer from '../Footer';



describe('Footer component', () => {
    it('renders the project name correctly', () => {
        const  name= 'My Project' ;
        const { getByText } = render(<Footer name={name}  />);
        expect(getByText('Projet : My Project')).toBeTruthy();
    });

    it('handles missing project name gracefully', () => {
        const { getByText } = render(<Footer name={null} />);
        expect(getByText('Projet :')).toBeTruthy();
    });
});
