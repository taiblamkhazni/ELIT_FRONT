/* eslint-disable react-hooks/exhaustive-deps */
/**
 * @file ModalWeightsChange.js
 * @brief Contains the ModalWeightsChange component and the errors object for different types of errors.
 */
import { useCallback, useRef, useState } from "react"
import { Flex } from "antd"
import { X } from "assets/icons"
import { ErrorAlert } from "components/Alert/Alert"
import { ButtonNoBackground, NextStepButton } from "components/Button/Button";
import { DescriptionFeature } from "components/Description/Description"
import { CustomModal } from "components/Modal/Modal"
import { TitleSection } from "components/Title/Title"
import { useStepContext } from "pages/AnalyseMulticriteres/AnalyseMulticriteresPage"
import { useSelector } from "react-redux"
import { setStringToLowAndNormal } from "utils/effects/effects"
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"

import ModalWeightInputs from "./ModalWeightInputs";

/**
 * ModalWeightsChange
 * @brief A React functional component that provides a modal for adjusting criteria weights.
 * @returns {JSX.Element} Rendered component
 */
const ModalWeightsChange = () => {
    /** @brief State for controlling the visibility of the modal*/
    const [isModalOpen, setIsModalOpen] = useState(false);
    const current = useSelector(
        (state) => state.multicriteriaAnalysisReducer.current
    );
    /**
     * @hook useStepContext
     * @brief Custom hook to manage and provide context for the steps in the multicriteria analysis.
     * @returns {Object} An object containing functions and state related to the steps.
     */
    const { listStepWeights, setListStepweights, getCurrentStepWeights } = useStepContext();
    const [errorMessage, setErrorMessage] = useState(false)
    /** @brief State for tracking focused input fields in the modal*/
    const [focusedWeightInputList, setFocusedWeightInputList] = useState([]);
    const weights = [...getCurrentStepWeights(current)].sort((a, b) =>
        a.criteriaName > b.criteriaName ? 1 : -1
    );

    /**
     * @var modalWeightsRef
     * @brief Reference object for managing state and interactions of modal weights.
     */
    const modalWeightsRef = useRef({});

    /**
     * handleOk
     * @brief Closes the modal by setting its visibility to false.
     */
    const handleOk = () => {
        setIsModalOpen(false);
    };

    /**
     * showModal
     * @brief Opens the modal by setting its visibility to true.
     */
    const showModal = () => {
        setIsModalOpen(true);
    };

    /**
     * resetInputReturnDefault
     * @brief Resets all input fields to their default state based on the current step's criteria weights.
     */
    const resetInputReturnDefault = () => {
        const listNameAllInputByCurrentStep = getListAllNameInput();

        listNameAllInputByCurrentStep.forEach((e) => {
            const value = weights.find(
                (w) => setStringToLowAndNormal(w.criteriaName) === e.split("_")[0]
            ).weightValue;
            modalWeightsRef.current[e].value = parseFloat(value * 100);
            enableDomElement(modalWeightsRef.current[e]);
        });
    };

    /**
     * resetModal
     * @brief Resets the modal to its initial state, including visibility and error flags.
     */
    const resetModal = () => {
        setErrorMessage(false);
        setIsModalOpen(false);
        setFocusedWeightInputList([]);
    };

    /**
     * handleCancel
     * @brief Handles the modal cancellation process, confirming with the user before resetting inputs.
     */
    const handleCancel = () => {
        SwalWithBootstrapButtons.fire({
            title: "Êtes-vous sûr?",
            text: "Cette action est irréversible !",
            showCancelButton: true,
            cancelButtonColor: "#C91432",
            confirmButtonColor: "#10B581",
            confirmButtonText: "Confirmer",
            cancelButtonText: "Annuler",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                setErrorMessage(false)
                resetInputReturnDefault();
                resetModal();
            }
        });
    };

    /**
     * onChangeCritere
     * @brief Handles changes in criteria weights, including input validation and dynamic adjustment of other inputs.
     * @param {string} critere - Identifier of the criteria being modified.
     * @param {Event} event - Event object containing the new value of the input.
     */
    const onChangeCritere = (critere,) => {
        const critereId = `${critere}_${current}`;
        const listCriteriaInpuDom = Object.keys(modalWeightsRef.current)
            .map((e) => {
                return { critereId: e, dom: modalWeightsRef.current[e] };
            })
            .filter((e) => e.critereId.includes(`_${current}`));

        if (!focusedWeightInputList.includes(critereId)) {
            const value = [...focusedWeightInputList, critereId];
            if (value.length === listCriteriaInpuDom.length) {
                setFocusedWeightInputList([]);
            } else {
                setFocusedWeightInputList(value);
            }
        }

        const changedModalWeightsValues = modalWeightsRef.current
        let sumOfValues = 0
        for (const property in changedModalWeightsValues) {
            if (changedModalWeightsValues[property] != null) {
                sumOfValues += parseInt(changedModalWeightsValues[property].value)
            }
        }
        if (sumOfValues === 100) {
            setErrorMessage(false)
        } else {
            setErrorMessage(true)
        }
    };

    /**
     * enableDomElement
     * @brief Enables a DOM element, making it interactive.
     * @param {HTMLElement} domElement - The DOM element to be enabled.
     */
    const enableDomElement = (domElement) => {
        domElement.disabled = "";
        domElement.style.cursor = "";
    };

    const getListAllNameInput = () => {
        return Object.keys(modalWeightsRef.current).filter((e) =>
            e.includes(`_${current}`)
        );
    };

    const handleSubmit = () => {
        const notCurrentStepList = listStepWeights.filter(
            (s) => s.currentStep !== current
        );
        const cloneWeights = [...weights];

        const weightsUpdate = cloneWeights.map((e) => {
            const itemClone = { ...e };
            itemClone.weightValue = parseFloat(
                modalWeightsRef.current[
                    `${setStringToLowAndNormal(e.criteriaName)}_${current}`
                ].value / 100
            );
            return itemClone;
        });

        const data = [
            ...notCurrentStepList,
            { currentStep: current, stepWeights: weightsUpdate },
        ];
        setListStepweights(data);
        resetModal();
    };
    const handleClick = useCallback((e) => {
        ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
    }, []);

    /**
     * idToRef
     * @brief Turn id to its reference.
     * @param {String} id - An id of input element.
     * @returns {String} Reference targeted.
     */
    const idToRef = (id) => {
        const lastIndex = id.lastIndexOf("_");

        if (lastIndex !== -1 && lastIndex !== id.length - 1) {
            return id.substring(0, lastIndex);
        } else {
            return id;
        }
    };

    const handleChange = useCallback((event) => {
        const criteriaTargeted = idToRef(event.target.id);
        onChangeCritere(criteriaTargeted);
    }, []);

    return (
        <>
            <CustomModal
                title={<TitleSection style={{color:"black"}}>Créer un projet</TitleSection>}
                maskClosable={false}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                closeIcon={<X fill="#000" />}
                width={684}
                footer={
                    <Flex justify="end" gap="small">
                        <ButtonNoBackground
                            onClick={handleCancel}
                            margin="0px"
                            padding="10px 16px"
                        >
                            Annuler
                        </ButtonNoBackground>
                        <NextStepButton
                            data-testid="next-step-button"
                            onClick={handleSubmit}
                            margin="0px"
                            padding="10px 16px"
                            disabled={errorMessage}
                        >
                            Valider
                        </NextStepButton>
                    </Flex>
                }
            >
                <DescriptionFeature
                    content={
                        "Les critères d'évaluations aident les décideurs à évaluer quantitativement l’ensemble des questions. Les collaborateurs peuvent aussi définir un poids pour chaque critères afin d'indiquer si un critère est prépondérant à un autre critère. Aucune valeur ne peut être égale à 0 %."
                    }
                    margin={"0px"}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ width: "87%", padding: "0.5rem 0" }}>{ }</div>
                    <div style={{ width: "13%", padding: "10px 10px 2px", textAlign: "center" }}>
                        Pondération
                    </div>
                </div>
                <ModalWeightInputs
                    weights={weights}
                    current={current}
                    modalWeightsRef={modalWeightsRef}
                    handleClick={handleClick}
                    handleChange={handleChange} />
                {errorMessage && (
                    <Flex justify="center">
                        <ErrorAlert margin="1rem" fontSize="1rem" textAlign="center">
                            Tous les champs doivent être renseigné, <br />
                            être des chiffres ronds et le total doit être égal à 100.
                        </ErrorAlert>
                    </Flex>
                )}
            </CustomModal>

            <ButtonNoBackground margin="30px 0px 0px 0px" onClick={showModal}>
                Modifier les valeurs des critères
            </ButtonNoBackground>
        </>
    );
}

export default ModalWeightsChange;
