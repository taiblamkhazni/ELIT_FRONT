/**
 * @file BreadCrumbDetailComponent.test.js
 * @brief Unit tests for the BreadCrumbDetailComponent component.
 */

import { BrowserRouter } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// Import render function from '@testing-library/react' package
import { render } from '@testing-library/react';

// Import BreadCrumbDetailComponent component
import BreadCrumbDetailComponent from '../BreadCrumbDetailComponent';

/**
 * @brief mock useLocation hook
 */
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

/**
 * @brief Test the rendering of the BreadCrumbDetailComponent
 */
describe('BreadCrumbDetailComponent', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders component correctly", () => {
    useLocation.mockReturnValue({
      pathname: "/projets/1",
    });

    const { getByText } = render(
      <BrowserRouter>
        <BreadCrumbDetailComponent stepValue="stage1" analyseType="manual" />
      </BrowserRouter>
    );

    expect(getByText('Tableau de bord du projet')).toBeInTheDocument();
    expect(getByText("Tous les projets")).toBeInTheDocument();
  });

  it('renders correctly with stageValue as stage1', () => {
    useLocation.mockReturnValue({
      pathname: "/projets/1/etape1",
    });

    const { getByText } = render(
      <BrowserRouter>
        <BreadCrumbDetailComponent analyseType="manual" />
      </BrowserRouter>
    );

    expect(getByText('Analyse collaborative')).toBeInTheDocument();
  });

  it('renders correctly with stageValue as stage2', () => {
    useLocation.mockReturnValue({
      pathname: "/projets/1/etape2",
    });

    const { getByText } = render(
      <BrowserRouter>
        <BreadCrumbDetailComponent analyseType="manual" />
      </BrowserRouter>
    );

    expect(getByText('Analyse collaborative')).toBeInTheDocument();
  });

  // Waiting for the implementation of the stage3 breadcrumb
  // it("renders correctly with stageValue as stage3", () => {
  //   useLocation.mockReturnValue({
  //     pathname: "/projets/1/etape3",
  //   });
  //   const { getByText } = render(
  //     <BrowserRouter>
  //       <BreadCrumbDetailComponent stageValue="step3" analyseType="manual" />
  //     </BrowserRouter>
  //   );
  //   expect(getByText("Etape 3 : Plan d'exécution")).toBeInTheDocument();
  // });

});
