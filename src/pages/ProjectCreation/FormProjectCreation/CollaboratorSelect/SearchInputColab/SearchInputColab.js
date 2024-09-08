/**
 * @file SearchInputColab.js
 * @brief This module exports the SearchInputColab component used for searching and selecting collaborators.
 *
 * The SearchInputColab component is a custom select input that allows users to search for
 * and select collaborators based on a keyword. It integrates with the application's
 * context to manage the selection of collaborators and uses the User API to fetch
 * search results. It supports multiple selections and displays custom information for each
 * collaborator, including avatar, name, function, and email.
 */
import { useCallback, useEffect, useState } from "react"
import { Col, Row, Select } from "antd"
import avatarDefault from "assets/images/avatarDefault.jpg"
import AvatarCustomUrl from "components/AvatarCustomUrl/AvatarCustomUrl"
import { WrapperAvatar } from "components/Head/Head"
import { SelectCustom } from "components/Select/Select"
import { getUsersByKeywordApi } from "hooks/apis/UserApi"
import useProjectCreationContext from "hooks/useProjectCreationContext/useProjectCreationContext"
import PropTypes from "prop-types"
import styled from "styled-components"
import { t } from "utils/translationUtils";

const { Option } = Select

/**
 * @brief : ColabItemWrapper is a styled component that wraps the collaborator's information.
 */
const ColabItemWrapper = styled(Row)`
  align-items: center;
`
/**
 * @brief : EmailWrapper is a styled component that wraps the collaborator's email.
 **/
const EmailWrapper = styled.div`
  color: ${({ theme }) => theme.colors.secondaires.grisDark};
  font-size: 12px;
`
/**
 * @brief : FonctionColabWrapper is a styled component that wraps the collaborator's function.
 */
const FonctionColabWrapper = styled.div`
  color: #0070ad;
  font-size: 12px;
`

/**
 * @brief : InfoColabWrapper is a styled component that wraps the collaborator's information.
 **/
const InfoColabWrapper = styled.div`
  color: ${({ theme }) => theme.colors.primaires.blueDark};
`

/**
 * @brief SearchInputColab : The SearchInputColab Component
 * @param {Object} props Component props
 * @param {string} props.placeHolderText Placeholder text for the input
 * @param {Array} props.listSelected Array of selected collaborators
 * @returns {React.Component} The SearchInputColab component.
 */
const SearchInputColab = ({ placeHolderText, listSelected, invitedColabs }) => {
  const {
    colabList,
    handleSelectColab,
    handleDeselectedColab,
    user: userCurrent,
  } = useProjectCreationContext()
  const [dataSearch, setDataSearch] = useState(colabList || [])

  const onSearch = useCallback(async (value) => {
    try {
      const data = await getUsersByKeywordApi(value ? value : "");
      if (data) {
        const filteredData = data.filter(colab => {
          return !invitedColabs.some(invited => invited.contributerId === colab.userId) && colab.userId !== userCurrent.id;
        });
        setDataSearch(filteredData);
      }
    } catch (error) {
      console.error(t('projectCreation.selectCollaborator.fetchError'), error);
    }
  }, [invitedColabs, userCurrent.id]);

  useEffect(() => {
    onSearch('');
    if (colabList) {
      setDataSearch(
        colabList?.filter((colab) => colab.userId !== userCurrent.id)
      )
    }
  }, [colabList, userCurrent.id,onSearch])

  const handleClick = useCallback((input, option) => {
    return option.dataSearch.toLowerCase().includes(input.toLowerCase())
  }, [])

  const listOptionsComponents = dataSearch?.map((option) => {
    return (
      <Option
        key={option.userId}
        value={option.userId}
        label={`${option.userFirstName} ${option.userLastName}`}
        dataSearch={`${option.userFirstName} ${option.userFirstName} ${option.userEmail}`}
      >
        <div>
          <ColabItemWrapper id="collaborators-list">
            <Col>
              {option.userHasAvatar ? (
                <AvatarCustomUrl
                  colab={{
                    contributerId: option.userId,
                    firstName: option.userFirstName,
                    lastName: option.userLastName,
                  }}
                  key={option.userId}
                />
              ) : (
                <WrapperAvatar
                  id="collaorator-xx-list-img"
                  key={option.userId}
                  height="32px"
                  width="32px"
                  src={avatarDefault}
                  title={`${option?.userFirstName} ${option?.userLastName}`}
                />
              )}
            </Col>
            <Col>
              <div>
                <InfoColabWrapper id="collaborators-list-title">
                  {option.userLastName ? option.userLastName + "," : ""}{" "}
                  {option.userFirstName}
                </InfoColabWrapper>
                <FonctionColabWrapper>
                  {option.fonction ? option.fonction : ""}
                </FonctionColabWrapper>
                <EmailWrapper>de:"{option.userEmail}"</EmailWrapper>
              </div>
            </Col>
          </ColabItemWrapper>
        </div>
      </Option>
    );
  })

  return (
    <SelectCustom
      id="collaborator-dropdown"
      mode="multiple"
      style={{
        width: "100%",
      }}
      placeholder={placeHolderText}
      defaultValue={[]}
      optionLabelProp="label"
      optionFilterProp="dataSearch"
      onFocus={() => onSearch("")}
      onSelect={handleSelectColab}
      onDeselect={handleDeselectedColab}
      maxTagCount="responsive"
      filterOption={handleClick}
      value={listSelected}
    >
      {listOptionsComponents}
    </SelectCustom>
  )
}

SearchInputColab.propTypes = {
  placeHolderText: PropTypes.string,
  listSelected: PropTypes.array.isRequired,
}

export default SearchInputColab
