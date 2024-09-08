/**
 * @file ConfirmProject.js
 * @brief Ce fichier contient le composant de confirmation des projets.
 *
 * Il fournit une interface utilisateur pour confirmer ou rejeter des projets en fonction de leurs identifiants.
 */
import { useState } from "react"
import { validateProject } from "hooks/queries/queries"
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"
import { t } from "utils/translationUtils";

/**
 * @brief Ce composant fournit une interface pour confirmer ou rejeter des projets basés sur leurs identifiants.
 *
 * Il utilise des états pour gérer les identifiants de confirmation et de rejet et interagit avec
 * une API pour valider les actions sur les projets.
 * @returns {JSX.Element} Élément JSX représentant l'interface utilisateur de confirmation de projet.
 */
export default () => {
  const [confirmId, setConfirmId] = useState(0)
  const [rejectId, setRejectId] = useState(0)

  /**
   * Handles changes to the input fields for confirming and rejecting projects.
   * @param {Event} e - The event object from the input field.
   */
  const handleChange = (e) => {
    if (e.target.name === "confirm") {
      setConfirmId(e.target.value)
    } else {
      setRejectId(e.target.value)
    }
  }

  /**
   * Handles the validation of project confirmation or rejection.
   * @param {Event} e - The event object from the form submission.
   * @param {string} state - The state of the action, either 'confirm' or 'reject'.
   */
  const handleValidate = (e, state) => {
    e.preventDefault()
    if (state === "confirm") {
      onValidateProjetById(confirmId, true)
    } else {
      onValidateProjetById(rejectId, false)
    }
  }

  const { mutate: validateProjectById } = validateProject()

  /**
   * Confirms or rejects the project based on the given project ID and status.
   * @param {number} projectId - The ID of the project to be confirmed or rejected.
   * @param {boolean} status - The status of the action, `true` for confirm, `false` for reject.
   */
  const onValidateProjetById = (projectId, status) => {
    const actionType = status ? t('administration.confirmProject.actionTypeConfirmation') : t('administration.confirmProject.actionTypeRejection')
    SwalWithBootstrapButtons.fire({
      title: `${actionType} ${t('administration.confirmProject.title')}`,
      text: `${t('administration.confirmProject.textFirstHalf')} ${status ? t('administration.confirmProject.confirm') : t('administration.confirmProject.reject')} ${t('administration.confirmProject.textSecondHalf')}`,
      showCancelButton: true,
      confirmButtonColor: "#10B581",
      cancelButtonColor: "#C91432",
      confirmButtonText: status ? t('administration.confirmProject.confirmButton') : t('administration.confirmProject.rejectButton'),
      cancelButtonText: t('administration.confirmProject.cancelButton'),
    }).then((result) => {
      if (result.isConfirmed) {
        validateProjectById([projectId, status])
      }
    })
  }

  return (
    <>
      <h1>{t('administration.confirmProject.title')}</h1>
      <div>
        <form onSubmit={(e) => handleValidate(e, "confirm")}>
          <label htmlFor="confirmInput">
            {t('administration.confirmProject.confirmInputLabel')}
          </label>
          <input
            id="confirmInput"
            placeholder={t('administration.confirmProject.confirmInputPlaceholder')}
            name="confirm"
            type="number"
            value={confirmId}
            onChange={handleChange}
          />
          <button>{t('administration.confirmProject.confirmInputButton')}</button>
        </form>
      </div>

      <div>
        <form onSubmit={(e) => handleValidate(e, "reject")}>
          <label htmlFor="rejectInput">{t('administration.confirmProject.rejectInputLabel')}</label>
          <input
            id="rejectInput"
            placeholder={t('administration.confirmProject.rejectInputPlaceholder')}
            name="reject"
            type="number"
            value={rejectId}
            onChange={handleChange}
          />
          <button>{t('administration.confirmProject.rejectInputButton')}</button>
        </form>
      </div>
    </>
  );
}
