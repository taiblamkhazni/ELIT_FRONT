/**
 * @file ColabTable.js
 * @brief Exports the ColabTable.js.
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
 * @brief ColabTable : Component
 * @param collaborateurs - The collaborators.
 */
const ColabTable = ({ collaborateurs }) => {
    return (
      <TableWrapper>
        <StructureGrid
          leftChild={
            <TitleSection margin="0px">
              {t('projectDashboard.collabTable.title')}{collaborateurs?.length > 1 ? "s" : ""} (
              {collaborateurs?.length})
            </TitleSection>
          }
          spanLeft={20}
          rightChild={
            <a href="/#" onClick={(e) => e.preventDefault()}>
              {t('projectDashboard.collabTable.edit')}
            </a>
          }
          spanRight={4}
        />
        <CustomUl fontSize="12px" margin="16px 0px 0px 0px">
          {collaborateurs?.map((c) => {
            const roleCollab =
              c.permission[0] + c.permission.slice(1).toLowerCase();
            return (
              <NotifyLi key={c.key}>
                <StructureGrid
                  spanLeft={5}
                  leftChild={
                    <Row justify="center">
                      <WrapperAvatar resetMargin={true} src={ImgSample} />
                    </Row>
                  }
                  spanRight={19}
                  rightChild={
                    <>
                      <Row justify="start">
                        <div>{`${
                          c?.user?.userFirstName
                        } ${c?.user?.userLastName?.toUpperCase()}`}</div>
                      </Row>
                      <Row>
                        <InfoWrapper>
                          {roleCollab === "Cdp" ? t('projectDashboard.collabTable.roleCDP') : roleCollab}{" "}
                          {t('projectDashboard.collabTable.roleInfo')}
                        </InfoWrapper>
                      </Row>
                    </>
                  }
                />
              </NotifyLi>
            );
          })}
        </CustomUl>
      </TableWrapper>
    );
}

export default ColabTable;
