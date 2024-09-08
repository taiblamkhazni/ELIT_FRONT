/**
 * @file Description.test.js
 * @brief Ce fichier contient des tests pour les composant  Description, DescriptionBold, DescriptionFeature et DescriptionFeatureBold.
 */
import renderer from "react-test-renderer"

import { render, screen } from "@testing-library/react"

import {
    Description,
    DescriptionBold,
    DescriptionFeature,
    DescriptionFeatureBold,
} from "../Description"

import "jest-styled-components"

test("Description tests props deactive", () => {
    const tree = renderer.create(<Description />).toJSON()
    expect(tree).toHaveStyleRule("margin", "8px 0px 0px 0px")
    expect(tree).toHaveStyleRule("text-align", "justify")
    expect(tree).toHaveStyleRule("color", "inherit")
})

test("Description tests props active", () => {
    const tree = renderer.create(<Description checked margin="10px" />).toJSON()
    expect(tree).toHaveStyleRule("margin", "10px")
    expect(tree).toHaveStyleRule("text-align", "justify")
    expect(tree).toHaveStyleRule("color", "#7A7A7A")
})

test("DescriptionFeature tests with props", () => {
    render(<DescriptionFeature content="abc" margin="10px" checked={true} />)
    expect(screen.getByText(/abc/i)).toBeInTheDocument()
    expect(screen.getByText(/abc/i)).toHaveStyleRule("margin", "10px")
    expect(screen.getByText(/abc/i)).toHaveStyleRule("color", "#7A7A7A")
})

test("DescriptionFeature tests with no props", () => {
    render(<DescriptionFeature />)
    expect(screen.getByText(/No description/i)).toBeInTheDocument()
    expect(screen.getByText(/No description/i)).toHaveStyleRule(
        "margin",
        "8px 0px 0px 0px"
    )
    expect(screen.getByText(/No description/i)).toHaveStyleRule(
        "color",
        "inherit"
    )
})

test("DescriptionBold tests props deactive", () => {
    const tree = renderer.create(<DescriptionBold />).toJSON()
    expect(tree).toHaveStyleRule("margin", "8px 0px 0px 0px")
    expect(tree).toHaveStyleRule("text-align", "justify")
    expect(tree).toHaveStyleRule("font-weight", "700")
})

test("DescriptionBold tests props active", () => {
    const tree = renderer.create(<DescriptionBold margin="10px" />).toJSON()
    expect(tree).toHaveStyleRule("margin", "10px")
    expect(tree).toHaveStyleRule("text-align", "justify")
    expect(tree).toHaveStyleRule("font-weight", "700")
})

test("DescriptionFeatureBold tests with props", () => {
    render(<DescriptionFeatureBold content="abc" margin="10px" />)
    expect(screen.getByText(/abc/i)).toBeInTheDocument()
    expect(screen.getByText(/abc/i)).toHaveStyleRule("margin", "10px")
    expect(screen.getByText(/abc/i)).toHaveStyleRule("text-align", "justify")
    expect(screen.getByText(/abc/i)).toHaveStyleRule("font-weight", "700")
})

test("DescriptionFeatureBold tests with no props", () => {
    render(<DescriptionFeatureBold />)
    expect(screen.getByText(/No description/i)).toBeInTheDocument()
    expect(screen.getByText(/No description/i)).toHaveStyleRule(
        "margin",
        "8px 0px 0px 0px"
    )
    expect(screen.getByText(/No description/i)).toHaveStyleRule(
        "text-align",
        "justify"
    )
    expect(screen.getByText(/No description/i)).toHaveStyleRule(
        "font-weight",
        "700"
    )
})
