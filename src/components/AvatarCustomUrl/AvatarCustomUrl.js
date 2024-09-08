/**
 * @file AvatarCustomUrl.js
 * @brief Ce fichier contient le composant AvatarCustomUrl .
 */

import { useState } from "react";
import { Tooltip } from "antd";
import avatarDefault from "assets/images/avatarDefault.jpg"
/**
 * @brief Import du composant WrapperAvatar
 */
import { WrapperAvatar } from "components/Head/Head"

import useAvatarUrl from "./useAvatarUrl"



const AvatarCustomUrl = ({ colab, margin = null, idPlanExecution }) => {
  const url = useAvatarUrl(colab.contributerId);
  const title = `${colab?.firstName} ${colab?.lastName}`;

  const role = colab?.role === "CDP" ? "Chef de projet (Créateur)" : colab?.func ;

  let [border, setBorder] = useState(false);

  return (
    idPlanExecution ?
      <Tooltip title={
        <div style={{ color: "black", textAlign: "left" }}>
          <div>{title}</div>
          <div style={{ fontSize: "small", color: "gray", textAlign: "left" }}>{role}</div>
        </div>
      }
        placement="topRight" color="white">

        <WrapperAvatar
          id="collaorator-xx-list-img"
          src={url ? url : avatarDefault}
          height="32px"
          width="32px"
          title={title}
          resetMargin={margin ? "0" : null}
          style={{ border: border ? "3px solid #12ABDB" : "2px solid rgb(233, 233, 233)" }}

          onMouseEnter={() => setBorder(true)}
          onMouseLeave={() => setBorder(false)}
        />
      </Tooltip>
      :
      <WrapperAvatar
        id="collaorator-xx-list-img"
        src={url ? url : avatarDefault}
        height="32px"
        width="32px"
        title={title}
        resetMargin={margin ? "0" : null}
      />
  );
};

export default AvatarCustomUrl;
