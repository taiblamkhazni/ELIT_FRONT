/**
 * @file ScrollingMenus.js
 * @brief Exports the ScrollingMenus.js.
 */
import { useState } from "react"
import { HorizontalDivider } from "components/Divider/Divider"
import { StructureGrid } from "components/Grid/Grid"
import { TextBold } from "components/Text/Text"

import { DownOutlined, UpOutlined } from "@ant-design/icons"

/**
 * @var default
 * @brief default.
 */
export default ({ title, content, open }) => {
    const [active, setActive] = useState(open)

    return (
        <>
            <StructureGrid
                leftChild={
                    <TextBold color={active ? "#248BC0" : "#1F1A28"} margin="0 0 1rem 0">
                        {title}
                    </TextBold>
                }
                rightChild={
                    active ? (
                        <UpOutlined
                            onClick={() => setActive(!active)}
                            style={{
                                color: "#248BC0",
                                fontSize: "1rem",
                                float: "right",
                                marginRight: "0.5rem",
                            }}
                        />
                    ) : (
                        <DownOutlined
                            onClick={() => setActive(!active)}
                            style={{
                                color: "#1F1A28",
                                fontSize: "1rem",
                                float: "right",
                                marginRight: "0.5rem",
                            }}
                        />
                    )
                }
            />
            {active ? <>{content}</> : <HorizontalDivider margin="0 0 1rem 0" />}
        </>
    )
}
