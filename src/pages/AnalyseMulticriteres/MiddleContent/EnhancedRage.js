/**
 * @file EnhancedRate.js
 * @brief This module provides an enhanced rating component for analysis questions.
 *
 * It uses the react-hook-form's Controller to manage form data and validations.
 * This enhanced version includes additional features such as custom error alerts and a unique key generation mechanism.
 */
import { useEffect, useRef } from "react"
import { ErrorAlert } from "components/Alert/Alert"
import PropTypes from "prop-types"
import { Controller } from "react-hook-form"
import { setStringToLowAndNormal } from "utils/effects/effects"

import Rate from "./Rate"

/**
 * EnhancedRate
 * @brief This component represents an enhanced rating input for analysis questions.
 * It includes additional features for error handling and a custom onChange handler.
 *
 * @param {Object} props - Properties passed to the component.
 * @returns {JSX.Element} Rendered enhanced rating input component.
 */
const EnhancedRate = ({
    title = "",
    groupName = "groupName",
    editable = true,
    defaultValue = 0,
    validation,
    margin = 0,
    size = 36,
 // eslint-disable-next-line @typescript-eslint/no-empty-function
 onChange = (groupName, label, value) => { },
}) => {
    const {
        control,
        formState: { errors },
        register,
        getValues,
        setValue,
    } = validation;

    const RateItemRef = useRef(null);

    const uniqueKey = `${setStringToLowAndNormal(
        title
    )}_${setStringToLowAndNormal(groupName)}`;

    useEffect(() => {
        if (defaultValue > 0) {
            setValue(`${uniqueKey}`, `${defaultValue}`);
        }
    }, [defaultValue, setValue, uniqueKey]);

    const { ref, ...rest } = register(`${uniqueKey}`);

    return (
        <Controller
            rules={{
                required: "Notation obligatoire!",
                validate: () => {
                    return getValues(`${uniqueKey}`) !== 0;
                },
            }}
            name={`${uniqueKey}`}
            control={control}
            defaultValue={true}
            passRef={true}
            render={({ field }) => {
                return (
                    <div
                        style={{ margin: margin, display: "block" }}
                        {...rest}
                        id={uniqueKey}
                        ref={(e) => {
                            ref(e);
                            RateItemRef.current = e; // you can still assign to ref
                        }}
                    >
                        <div>
                            <Rate
                                title={title}
                                onChange={(label, value) => {
                                    if (value) {
                                        field.onChange(value);
                                        onChange(groupName, label, value);
                                    } else {
                                        field.onChange(0);
                                    }
                                }}
                                editable={editable}
                                defaultValue={Number(defaultValue)}
                                size={size}
                            />
                        </div>
                        {Object.keys(errors).length > 0 && errors[uniqueKey] ? (
                            <ErrorAlert>{errors[uniqueKey].message}</ErrorAlert>
                        ) : (
                            <></>
                        )}
                    </div>
                );
            }}
        />
    );
};

/**
 * @brief The properties of the EnhancedRate component.
 */
EnhancedRate.propTypes = {
    groupName: PropTypes.string.isRequired,
    title: PropTypes.string,
    editable: PropTypes.bool,
    defaultValue: PropTypes.number,
    validation: PropTypes.object.isRequired,
    margin: PropTypes.string,
    size: PropTypes.number,
    onChange: PropTypes.func,
}

export default EnhancedRate
