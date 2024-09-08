/**
 * @file List.js
 * @brief This module exports List component
 */
import Grid from "assets/icons/symbols/grid";
import styled from "styled-components";

/**
 * @brief Custom List Wrapper Component
 **/
export const CustomUl = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;

  list-style: none;
`;

/**
 * @brief Custom List Component
 **/
const List = ({ data, WrapperItem }) => {
  return (
    <CustomUl>
      {Object.keys(data).map((key) => (
        <WrapperItem
          key={key}
          dataItem={data[key].projectId}
          status={data[key].confirmationState}
        >
          <Grid fill="#248BC0" alt="list project grid icon" data-testid="grid-icon" />
          {data[key].name}
        </WrapperItem>
      ))}
    </CustomUl>
  );
};

export default List;
