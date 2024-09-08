/**
 * @file SelectRoleColab.js
 * @brief Ce fichier contient le composant SelectRoleColab.
 */
import { Select } from "antd";
import { Extend } from "assets/icons";
import { SelectCustom } from "components/Select/Select";
import useProjectCreationContext from "hooks/useProjectCreationContext/useProjectCreationContext";
import PropTypes from "prop-types";

import { rulesColaborators } from "./mockData";

const { Option } = Select;

/**
 * @brief SelectRoleColab : Le composant SelectRoleColab.
 * @param role : Le rôle.
 **/
const SelectRoleColab = ({ role }) => {
  const { onChangeRoleColab } = useProjectCreationContext();
  return (
    <SelectCustom
      id="collaborator-right-dropdown"
      suffixIcon={<Extend />}
      showSearch
      placeholder="Sélectionner"
      onChange={onChangeRoleColab}
      style={{ width: "100%" }}
      value={role ? role : []}
    >
      {rulesColaborators.map((colab) => {
        return (
          <Option id={colab.value == "OBSERVER" ? "observator" : "contributor"} value={colab.value} key={colab.key}>
            {colab.text}
          </Option>
        );
      })}
    </SelectCustom>
  );
};

SelectRoleColab.propTypes = {
  role: PropTypes.string.isRequired,
};

export default SelectRoleColab;
