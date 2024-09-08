/**
 * @file NotifyTable.js
 * @brief Exports the NotifyTable.js.
 */
import { Row } from "antd"
import ImgSample from "assets/images/jenny.jpg"
import { StructureGrid } from "components/Grid/Grid"
import { WrapperAvatar } from "components/Head/Head"
import { InfoWrapper } from "components/Info/Info"
import { NotifyLi } from "components/Li/Li"
import { CustomUl } from "components/List/List"
import { TableWrapper } from "components/Table/Table"
import { TitleSection } from "components/Title/Title"
import { t } from "utils/translationUtils";

/**
 * @var default
 * @brief default.
 */
export default () => {
  return (
    <TableWrapper>
      <TitleSection margin="0px">{t('projectDashboard.notifyTable.title')}{" "}(5)</TitleSection>
      <CustomUl fontSize="12px" margin="16px 0px 0px 0px">
        <NotifyLi>
          <StructureGrid
            leftChild={
              <Row justify="center">
                <WrapperAvatar resetMargin={true} src={ImgSample} />
              </Row>
            }
            spanLeft={5}
            rightChild={
              <>
                <StructureGrid
                  leftChild={<Row justify="start">Jenny ROBERT</Row>}
                  spanLeft={16}
                  rightChild={<Row justify="end">04 Avr.</Row>}
                  spanRight={8}
                />
                <Row>
                  <InfoWrapper>Lorem ipsum dolor sit amet</InfoWrapper>
                </Row>
              </>
            }
            spanRight={19}
          />
        </NotifyLi>
      </CustomUl>
    </TableWrapper>
  );
};
