/**
 * @file DescriptionColumn.js
 * @brief Define the DescriptionColumn
 */
import React, { useState } from "react";

import "./DescriptionColumn.css";

/** Component for description box of dataset item */
/**
 * @var default
 * @brief Component for description box of dataset item.
 */
export default (props) => {
  const [collapse, setCollapse] = useState(false)

  const readMore = (
    <span className="more" onClick={() => setCollapse(!collapse)}>
      ...Lire la suite
    </span>
  )
  const readLess = (
    <span className="less" onClick={() => setCollapse(!collapse)}>
      Lire moins
    </span>
  )
  const renderTextWithLineBreaks = (text) => {
    return text.split('<br/>').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  let data;
  if (props.value) {
    if (!collapse) {
      data = props.value.length > 100 ? (
        <>
          <div style={{ height: "20px", overflowY: "hidden" }}>
            {renderTextWithLineBreaks(props.value)}
          </div>
          {readMore}
        </>
      ) : (
        <div>{renderTextWithLineBreaks(props.value)}</div>
      );
    } else {
      data = (
        <>
          <div>{renderTextWithLineBreaks(props.value)}</div>
          {readLess}
        </>
      );
    }
  } else {
    data = <></>;
  }

  return data;
};
