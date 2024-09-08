/**
 * @file WrapperButtons.js
 * @brief This module exports the ProjectFilterSort component used in project management.
 *
 * The WrapperButtons component provides UI elements to sort and filter projects
 * based on their creation date and status. It includes dropdown menus and buttons
 * to apply different filters and sorting criteria.
 */

/**
 * @brief Import the useState hook from React.
 */
import { useState } from "react";
/**
 * @brief Import Col, Input, Row, Select, and Typography components from antd.
 */
import { Col, Input, Row, Select, Typography } from "antd";
/**
 * @brief Import ChevronDown and ChevronUp icons.
 */
import { ChevronDown, ChevronUp } from "assets/icons";
/**
 * @brief Import StructureGrid component from custom Grid components.
 */
import { StructureGrid } from "components/Grid/Grid";
/**
 * @brief Import SelectCustom component from custom Select components.
 */
import { SelectCustom } from "components/Select/Select";
/**
 * @brief Import useProjectCreationContext hook.
 */
import useProjectCreationContext from "hooks/useProjectCreationContext/useProjectCreationContext";
/**
 * @brief Import translation utility.
 */
import { t } from "utils/translationUtils";

/**
 * @brief Import ModalProjectCreation component.
 */
import ModalProjectCreation from "../ModalProjectCreation/ModalProjectCreation";

/**
 * @brief Destructure Search component from Input.
 */
const { Search } = Input;

/**
 * @brief Destructure Title component from Typography.
 */
const { Title } = Typography;

/**
 * @brief WrapperButtons: Component for wrapping buttons and filters for project management.
 * @returns {React.Component} - The WrapperButtons component.
 */
const WrapperButtons = () => {
  /**
   * @brief Destructure project sorting and filtering functions and state from useProjectCreationContext hook.
   */
  const {
    sortProjectsByDate,
    setSortProjectsByDate,
    setSortProjectsByStatus,
    setProjectSearchText,
  } = useProjectCreationContext();

  /**
   * @brief useState hook to manage the current selected filter id.
   */
  const [id, setId] = useState("");

  /**
   * @brief Function to handle sorting projects by date.
   * @param {boolean} value - The value to set for sorting projects by date.
   */
  const onSortProjectByDate = (value) => {
    setSortProjectsByDate(value);
  };

  /**
   * @brief Function to handle changing the filter for project status.
   * @param {string} value - The selected filter value.
   */
  const handleChange = (value) => {
    if (value === "ALL") {
      setId(t('projectCreation.filter.allLabel'));
      setSortProjectsByStatus(false);
    } else {
      value === "CONFIRMED"
        ? setId(t('projectCreation.filter.confirmedLabel'))
        : value === "WAITING"
        ? setId(t('projectCreation.filter.waitingLabel'))
        : setId(t('projectCreation.filter.archivedLabel'));
      setSortProjectsByStatus(value);
    }
  };

  /**
   * @brief Array of filter values for the dropdown menu.
   */
  const filterValues = [
    {
      value: "ALL",
      label: t('projectCreation.filter.allLabel'),
    },
    {
      value: "CONFIRMED",
      label: t('projectCreation.filter.confirmedLabel'),
    },
    {
      value: "WAITING",
      label: t('projectCreation.filter.waitingLabel'),
    },
    {
      value: "ARCHIVED",
      label: t('projectCreation.filter.archivedLabel'),
    },
  ];

  /**
   * @brief Return the JSX for rendering the WrapperButtons component.
   */
  return (
    <>
      <Row justify="end">
        <ModalProjectCreation />
      </Row>
      <StructureGrid
        leftChild={
          <>
            <Row justify="start">
              <Title level={5}>{t('projectCreation.filter.searchLabel')}</Title>
            </Row>
            <Row justify="start">
              <Search
                id="searchProject"
                placeholder={t('projectCreation.filter.searchPlaceholder')}
                size="large"
                onChange={(e) => setProjectSearchText(e.target.value)}
                style={{ width: 400 }}
              />
            </Row>
          </>
        }
        spanLeft={12}
        rightChild={
          <Row justify="end">
            <Col>
              <Row>
                <Title level={5}>{t('projectCreation.filter.selectCustomLabel')}</Title>
              </Row>
              <Row>
                <SelectCustom
                  id={id}
                  placeholder={t('projectCreation.filter.allLabel')}
                  defaultValue="ALL"
                  data-testid="select-status"
                  style={{ width: 130 }}
                  size="large"
                  onChange={handleChange}
                  options={filterValues}
                />
              </Row>
            </Col>

            <Col style={{ marginLeft: '30px' }}>
              <Row>
                <Title level={5}>{t('projectCreation.filter.trierLabel')}</Title>
              </Row>
              <Row>
                <Select
                  id="button-date-de-creation"
                  data-testid="button-date-de-creation"
                  size="large"
                  defaultValue={!sortProjectsByDate 
                    ? t('projectCreation.filter.selectTrierLabel.options.recent') 
                    : t('projectCreation.filter.selectTrierLabel.options.old')}
                  style={{ width: 250 }}
                  onChange={onSortProjectByDate}
                  suffixIcon={sortProjectsByDate ? (
                    <ChevronDown height="16px" width="16px" />
                  ) : (
                    <ChevronUp height="16px" width="16px" />
                  )}
                  options={[
                    { label: t('projectCreation.filter.selectTrierLabel.options.recent'), value: false },
                    { label: t('projectCreation.filter.selectTrierLabel.options.old'), value: true },
                  ]}
                />
              </Row>
            </Col>
          </Row>
        }
        spanRight={12}
      />
    </>
  );
};

/**
 * @brief Export WrapperButtons as default.
 */
export default WrapperButtons;
