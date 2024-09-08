/**
* @file regexPatterns.js.
* @brief Constants for regex patterns.
* @details Contains all the regular expressions used for pattern matching in validation schemas.
*/

export const REGEX_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD: /^(?=.*[~!@#$%^&*()_+\-=[\]{};':"\\,.<>?éàèÉÀÈ])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{12,32}$/,
    NAME: /^[A-Za-zÀ-ÖØ-öø-ÿ'-]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ'-]+)*$/,
    PROJECT_TEXT: /^(?![\s]{2})[a-zA-Z0-9\s.,\t\r\n@_+~éàèçôâùûê'î-]+$/u,
    VOTE_TEXT: /^(?![\s]{2})[a-zA-Z0-9\s.,\t\r\n@_+~éàèçôâùûê'î-]+$/,
};

/**
 * @brief Constants for error messages.
 * @details This object contains all the error messages for validation schemas.
 */
export const ERROR_MESSAGES = {
    // Criteria Validation
    CRITERIA_REQUIRED: "Ce champ est obligatoire !",
    CRITERIA_MIN: "Le poid doit être au minimum 1",
    CRITERIA_MAX: "Le poid doit être au maximum 99",

    // Connection Schema
    EMAIL_INVALID: "L’adresse e-mail est invalide. Veuillez respecter le format exemple@domaine.com",
    PASSWORD_INVALID: "Veuillez vérifier que le mot de passe inscrit comporte bien les caractères recommandés.",

    // Forget Password Schema
    FORGOT_PASSWORD_EMAIL_INVALID: "L’adresse e-mail est invalide. Veuillez respecter le format exemple@domaine.com",

    // Password Reset Schema
    NEW_PASSWORD_REQUIRED: "Veuillez renseigner votre mot de passe.",
    CONFIRM_PASSWORD_REQUIRED: "Veuillez confirmer votre mot de passe.",
    PASSWORD_MISMATCH: "Les mots de passes ne sont pas identiques.",

    // Password Change Schema
    OLD_PASSWORD_REQUIRED: "Veillez rentrer votre mot de passe actuel.",

    // Registration Schema
    LASTNAME_REQUIRED: "Veuillez renseigner votre nom.",
    LASTNAME_MIN: "Le nom doit contenir au minimum 2 caractères.",
    LASTNAME_MAX: "Le nom peut contenir au maximum 25 caractères.",
    FIRSTNAME_REQUIRED: "Veuillez renseigner votre prénom.",
    FIRSTNAME_MIN: "Le prénom doit contenir au minimum 2 caractères.",
    FIRSTNAME_MAX: "Le prénom peut contenir au maximum 25 caractères.",
    CONFIRM_PASSWORD_TEXT: "Les mots de passe renseignés ne sont pas identiques.",
    LASTNAME_TEXT: "Uniquement des lettres, tirets, apostrophes et espaces.",

    // Profile Schema
    PROFILE_FIRSTNAME_REQUIRED: "Veuillez renseigner votre prénom.",
    PROFILE_LASTNAME_REQUIRED: "Veuillez renseigner votre nom.",

    // Project Creation Schema
    PROJECT_NAME_REQUIRED: "Veuillez renseigner le nom du projet.",
    PROJECT_NAME_MIN: "Le nom du projet doit contenir au minimum 3 caractères.",
    PROJECT_NAME_MAX: "Le nom du projet ne doit pas dépasser 20 caractères.",
    PROJECT_DESC_REQUIRED: "Veuillez renseigner la description du projet.",
    PROJECT_DESC_MIN: "La description du projet doit contenir au minimum 3 caractères.",
    PROJECT_DESC_MAX: "La description du projet ne doit pas dépasser 255 caractères.",
    PROJECT_TERMS_REQUIRED: "Veuillez accepter les conditions pour passer à l'étape suivante.",
    PROJECT_TEXT: "Uniquement des caractères, des chiffres, des underscores ou des espaces",
    
    

    // Multi-step Schemas
    MULTI_STEP_REQUIRED: "Ce champ est obligatoire !",
    MULTI_STEP_MAX: "Votre réponse ne doit pas dépasser les 200 caractères",

    // Voting Schema
    VOTE_METHOD_REQUIRED: "Ce champ est obligatoire !",
    VOTE_TEXT_REQUIRED: "Votre réponse doit être un texte",
    VOTE_TEXT_INVALID: "Votre réponse contient des caractères invalides!",
    VOTE_TEXTAREA: "Votre réponse doit contenir au moins 3 caractères",

    // Comment Schema
    COMMENT_TEXT_REQUIRED: "Ce champ est obligatoire !",
    COMMENT_TEXT_MAX: "Votre réponse ne doit pas dépasser les 1000 caractères",

    // BrainStorming Schema
    BRAINSTORMING_TEXT_REQUIRED: "Ce champ est obligatoire !",
    BRAINSTORMING_TEXT_MAX: "Votre réponse ne doit pas dépasser les 200 caractères",
};
