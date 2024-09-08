/**
 * @file ChangeAvatarForm.js
 * @brief This module exports the ChangeAvatarForm component.
 */
import { useState } from "react";
import avatarDefault from "assets/images/avatarDefault.jpg";
import { SmallText } from "components/Text/Text";
import {
  deleteAvatarByUserId,
  updateAvatarByUserId
} from "hooks/apis/UserApi";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAvatarSuccess
} from "reducers/user/userReducer";
/**
 * @brief styled : import styled-components library
 */
import styled from "styled-components";
import { Snackbar } from "utils/Snackbar/Snackbar";
import { t } from "utils/translationUtils";

// import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

/**
 * @brief UserAvatarWrapper : The user avatar wrapper.
 * @param border - The border of the user avatar wrapper.
 * @param width - The width of the user avatar wrapper.
 * @param height - The height of the user avatar wrapper.
 * @param margin - The margin of the user avatar wrapper.
 **/
const UserAvatarWrapper = styled.div`
  border-radius: 50%;
  width: 124px;
  height: 124px;
  margin: 0 auto 27px auto;
  border: 1px solid rgba(173, 182, 209, 0.5);
`;

/**
 * @brief ChangeAvatarForm : This component is used to change the user's avatar.
 * @param user : The user object.
 * @returns The ChangeAvatarForm component.
*/
const ChangeAvatarForm = ({ user }) => {
  const avatarUrl = useSelector((state) => state.userReducer.avatarUrl);
  const [avatarImg, setAvatarImg] = useState({});
  const [avatarErr, setAvatarErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const dispatch = useDispatch();

  let url = null;

  /**
   * @brief onSelectFile : Handles the file selection.
   * @param e - The event object.
   * @returns The selected file.
   **/
  const onSelectFile = (e) => {
    url = URL.createObjectURL(e.target.files[0]);
    const formatAvatar = e.target.files[0].name.split(".");

    if (e.target.files[0].size / 1025 > 800) {
      setAvatarErr(true);
      setErrMessage(t('profil.avatar.avatarMaxSize'));
    } else if (!( /^(jpg|jpeg|JPG|JPEG|png|PNG)$/).test(formatAvatar[1])) {
      setAvatarErr(true);
      setErrMessage(t('profil.avatar.wrongFormat'));
    } else {
      setAvatarErr(false);
      dispatch(getUserAvatarSuccess(url));
      setAvatarImg(e.target.files[0]);
      let formData = new FormData();
      formData.append("userAvatar", e.target.files[0]);
      updateAvatarByUserId(user.id, formData).then((res) => {
        if (res) {
          Snackbar("success", t('profil.avatar.changeSucces'));
        }
      });
    }
    e.target.value = "";
  };

  const onDeleteAvatar = () => {
    dispatch(getUserAvatarSuccess(null));
    let formData = new FormData();
    formData.append("userAvatar", avatarImg);
    deleteAvatarByUserId(user.id, formData).then((res) => {
      if (res) {
        Snackbar("success", t('profil.avatar.deleteSucces'));
      }
    });
  };

  return (
    <>
      <div>
        <UserAvatarWrapper>
          {avatarUrl ? (
            <img
              id="image-photoProfil"
              src={avatarUrl}
              alt="avatar image"
              style={{
                display: "block",
                margin: "auto",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
              }}
            />
          ) : (
            <img
              id="image-photoProfil"
              src={avatarDefault}
              alt="avatar image"
              style={{
                display: "block",
                margin: "auto",
                width: "100%",
                borderRadius: "50%",
              }}
            />
          )}
        </UserAvatarWrapper>
        <label
          style={{
            border: "1px solid #ccc",
            display: "block",
            padding: "8px 14px",
            cursor: "pointer",
            margin: "0 auto",
            textAlign: "center",
            background: "#248BC0",
            borderRadius: "5px",
            fontSize: "12px",
            color: "white",
          }}
        >
          <input
            id="avatar-input"
            type="file"
            style={{ display: "none" }}
            accept=".png,.jpg,.jpeg"
            onChange={onSelectFile}
          />
          {avatarUrl ? t('profil.avatar.change') : t('profil.avatar.import')}
        </label>
        {avatarUrl && (
          <div
            style={{
              textAlign: "center",
              marginTop: "5px",
              cursor: "pointer",
            }}
          >
            {/* <img
              src={deleteAvatar}
              alt="delete avatar"
              style={{ marginRight: "5px" }}
            /> */}
            <DeleteOutlineIcon sx={{ color: '#248BC0', verticalAlign: 'middle', marginRight: '5px' }} />
            <p
              onClick={onDeleteAvatar}
              style={{
                color: "#248BC0",
                fontSize: "15px",
                display: "inline",
                textAlign: "center",
                paddingBottom: "2px",
                fontWeight: "bold",
              }}
            >
               {t('profil.avatar.delete')}
            </p>
          </div>
        )}
      </div>
      <div style={{ width: "100%" }}>
        {avatarErr ? (
          <SmallText
            id="texte-exigences-photo"
            color="red"
            fontSize="11px"
            style={{
              width: "50%",
              margin: "0 auto",
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            {t('profil.avatar.error')}{errMessage}
          </SmallText>
        ) : (
          <SmallText
            id="texte-exigences-photo"
            color="#7A7A7A"
            fontSize="11px"
            style={{
              width: "50%",
              margin: "0 auto",
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            {t('profil.avatar.importRules')}
          </SmallText>
        )}
      </div>
    </>
  );
};

export default ChangeAvatarForm;
