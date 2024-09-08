/**
 * @file SelectFunctionColab.js
 * @brief Ce fichier contient le composant SelectFunctionColab.
 */
import { Select } from "antd";
import { Extend } from "assets/icons";
import { SelectCustom } from "components/Select/Select";
import useProjectCreationContext from "hooks/useProjectCreationContext/useProjectCreationContext";
import PropTypes from "prop-types";

import { functionColaborators } from "./mockData";

const { Option } = Select;

/**
 * @brief SelectFunctionColab : Le composant SelectFunctionColab.
 * @param func : La fonction.
 **/
const SelectFunctionColab = ({ func }) => {
  const { onChangeFunctionColab } = useProjectCreationContext();
  return (
    <SelectCustom
      id="collaborator-function-dropdown"
      suffixIcon={<Extend />}
      showSearch
      placeholder="Sélectionner"
      onChange={onChangeFunctionColab}
      style={{ width: "100%" }}
      value={func ? func : []}
    >
      {functionColaborators.map((colab) => {
        return (
          <Option id={colab.text === "Chef du projet" ?  "project-manager" :  "developper"} value={colab.value} key={colab.key}>
            {colab.text}
          </Option>
        );
      })}
    </SelectCustom>
  );
};

SelectFunctionColab.propTypes = {
  func: PropTypes.string.isRequired,
};

export default SelectFunctionColab;
