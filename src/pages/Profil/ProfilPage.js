/**
 * @file ProfilPage.js
 * @brief Profil Page Module
 *
 * This module exports a function that renders the <Profil /> component
 * wrapped inside a <PageBase /> component. It serves as the user profile
 * page in the application.
 */
import { useState } from "react";
import PageBase from "pages/PageBase/PageBase"
import ChangePasswordForm from "pages/Profil/ChangePasswordForm/ChangePasswordForm"
import UserInformationForm from "pages/Profil/UserInformationsForm/UserInformationForm"
import { TitlePage } from "pages/ProjectCreation/WrapperProjectSearch/WrapperProjectSearch"
import { useSelector } from "react-redux";
import styled from "styled-components";
import { t } from "utils/translationUtils";

/**
 * @brief Wrapper.
 */
const Wrapper = styled.div`
  background: white;
  padding: 40px 20px;
  box-shadow: 0px 0px 20px rgb(0 0 0 / 10%);
  margin-top: 22px;
  border-radius: 5px;
`;

/**
 * @brief isEmpty : Check if object is empty
 * @param obj
 */
export const isEmpty = (obj) => {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
};

/**
 * @brief Profil : This component is used to display the user's profile.
 */
const Profil = () => {
    /**
       * @brief userInfo - User information.
       */
    const userInfo = useSelector((state) => state.userReducer.userInfo);
    /**
     * @brief changePass - State to change password.
     */
    const [changePass, setChangePass] = useState(false);
    return (
        <PageBase>
            <>
                {userInfo && (
                    <div style={{padding: "20px 40px"}}>
                        <TitlePage id="texte-MonCompte">{t('profil.title')}</TitlePage>
                        <Wrapper>
                            {!changePass ? (
                                <UserInformationForm
                                    userInfo={userInfo}
                                    setChangePass={setChangePass}
                                />
                            ) : (
                                <ChangePasswordForm setChangePass={setChangePass} />
                            )}
                        </Wrapper>
                    </div>
                )}
            </>
        </PageBase>
    )
}

export default Profil;
