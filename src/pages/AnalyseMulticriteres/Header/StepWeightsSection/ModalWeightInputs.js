import { SimpleInputCustom } from "components/Input/Input";
import { TitleSection } from "components/Title/Title";
import { setStringToLowAndNormal } from "utils/effects/effects";

const ModalWeightInputs = ({ weights, current, modalWeightsRef, handleChange }) => {
    return (
        <div style={{ marginBottom: "1rem" }}>
            {weights.map((criteria) => {
                const criteriaLowerCase = setStringToLowAndNormal(
                    criteria.criteriaName
                );

                const defaultValue = (criteria.weightValue * 100).toFixed(2);

                return (
                    <div key={criteria.criteriaName + "_" + current}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                borderBottom: "solid 1px #CCCCCC",
                            }}
                        >
                            <div style={{ width: "87%", padding: "0.5rem 0" }}>
                                <TitleSection>
                                    <label htmlFor={criteriaLowerCase + "_" + current}>
                                        {criteria.criteriaName}
                                    </label>
                                </TitleSection>
                                {criteria.criteriaDescription}
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "13%",
                                    padding: "10px",
                                    gap: "5px",
                                    backgroundColor: "#E2F0F9",
                                }}
                            >
                                <SimpleInputCustom
                                    ref={(el) =>
                                    (modalWeightsRef.current[
                                        `${criteriaLowerCase}_${current}`
                                    ] = el)
                                    }
                                    type="number"
                                    onKeyDown={(event) => { ['-', '.', 'e', 'E', ','].includes(event.key) && event.preventDefault() }}
                                    id={criteriaLowerCase + "_" + current}
                                    data-testid={"input-criteria_" + current}
                                    maxLength={3}
                                    style={{ textAlign: "center" }}
                                    defaultValue={+defaultValue}
                                    onChange={handleChange}
                                />{" "}
                                %
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ModalWeightInputs;
