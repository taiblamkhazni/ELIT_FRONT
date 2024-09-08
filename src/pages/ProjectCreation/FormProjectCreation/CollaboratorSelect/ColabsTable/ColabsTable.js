/**
 * @file ColabsTable.js
 * @brief Ce fichier définit le composant ColabsTable.
 */
import { useCallback } from "react"
import { Trash2 } from "assets/icons"
import AvatarCustomUrl from "components/AvatarCustomUrl/AvatarCustomUrl"
import { CustomUl } from "components/List/List"
import { HeaderTitle, TitleSection } from "components/Title/Title"
import useProjectCreationContext from "hooks/useProjectCreationContext/useProjectCreationContext"
import PropTypes from "prop-types"
import { t } from "utils/translationUtils";

import "./ColabsTable.scss"

const ColabsTable = ({ colabs, isCDP, chefId }) => {
    const { deleteColabById } = useProjectCreationContext()
    const handleClick = useCallback((contributerId) => () => deleteColabById(contributerId), [deleteColabById])
    return (
        <CustomUl className="responsive-table">
            <li className="table-header">
                <div className="col col-1">
                    <TitleSection>{t('projectCreation.selectCollaborator.table.title')}{" "}({colabs.length})</TitleSection>
                </div>
                <div className="col col-2">
                    <HeaderTitle>{t('projectCreation.selectCollaborator.table.function')}</HeaderTitle>
                </div>
                <div className="col col-3">
                    <HeaderTitle>{t('projectCreation.selectCollaborator.table.rights')}</HeaderTitle>
                </div>
                {isCDP.check ? (
                    <div className="col col-4 centerHeader">
                        <HeaderTitle>{t('projectCreation.selectCollaborator.table.delete')}</HeaderTitle>
                    </div>
                ) : (
                    <></>
                )}
            </li>
            {colabs &&
                colabs.length > 0 &&
                colabs.map((colab) => {
                    let supprimerComponent;

                    if (isCDP.check) {
                        if (isCDP?.user?.contributerId === chefId) {
                            if (colab.contributerId !== chefId) {
                                supprimerComponent = (
                                    <div className="col col-4 centerRow" data-label="Supprimer">
                                        <Trash2
                                            id='collaorator-xx-delete-img'
                                            alt="trash icon"
                                            onClick={handleClick(colab.contributerId)}
                                        />
                                    </div>
                                );
                            }
                        } else {
                            if (colab.role === "CDP") {
                                supprimerComponent = (
                                    <div className="col col-4 centerRow" data-label="Supprimer">
                                        <Trash2
                                            fill={"#1F1A28"}
                                            alt="trash icon"
                                            onClick={() => deleteColabById(colab.contributerId)}
                                        />
                                    </div>
                                );
                            }
                        }
                    }

                    let droit;
                    if (colab.role === "CDP") {
                        droit = "Chef de projet" + (colab.contributerId === chefId ? " (principal)" : "");
                    } else {
                        droit = colab.role;
                    }

                    return (
                        <li className="table-row" key={colab.id}>
                            <div className="col col-1 paddingLeft8" data-label="Colaborateur Name">
                                <AvatarCustomUrl colab={colab} key={colab.id} />
                                <span id='collaorator-xx-name' className="paddingLeft8">
                                    {colab.firstName} {colab.lastName}
                                </span>
                            </div>
                            <div id='collaorator-xx-function' className="col col-2" data-label="Fontion">
                                {colab.func ? colab.func : ""}
                            </div>
                            <div id='collaorator-xx-right' className="col col-3" data-label="Droit">
                                {droit}
                            </div>
                            {supprimerComponent}
                        </li>
                    );
                })
            }

        </CustomUl>
    )
}

ColabsTable.propTypes = {
    colabs: PropTypes.array.isRequired,
}

export default ColabsTable
