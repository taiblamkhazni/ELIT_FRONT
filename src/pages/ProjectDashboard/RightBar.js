/**
 * @file RightBar.js
 * @brief Exports the RightBar.js.
 */
import ColabTable from "./ColabTable"
import NotifyTable from "./NotifyTable"

/**
 * @var default
 * @brief default.
 */
export default ({ collaborateurs }) => {

    return (
        <div>
            <NotifyTable />
            <ColabTable collaborateurs={collaborateurs} />
        </div>
    )
}
