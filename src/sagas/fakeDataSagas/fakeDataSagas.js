/**
 * @file fakeDataSagas.js
 * @brief This file contains fake datas in order to operate sagas tests.
 */

/**
 * fakeProjectsAdminData
 * @brief Mocked data to simulate the data structure of Projects Admin.
 */
export const fakeProjectsAdminData = [
  {
    projectId: 1,
    name: "projet 1",
    description: "nada",
    createdAt: "2023-10-13T08:58:59.791+00:00",
    updatedAt: "2023-10-13T09:02:07.197+00:00",
    confirmationState: "CONFIRMED",
    chefId: null,
    isArchived: null,
    contributors: [
      {
        contributerId: 1,
        firstName: "John",
        lastName: "Doe",
        email: null,
        isAdmin: null,
        role: "CDP",
      },
    ],
    attachments: null,
    multiCriteriaAnalysisList: null,
  },
];

/**
 * fakeBrainstormingData
 * @brief Mocked data to simulate the data structure of Brainstorming Get route.
 */
export const fakeBrainstormingData = [
  {
    stepId: 1,

    stepName: "Manoeuvrabilité",

    stepRef: 3,

    multiCriteriaAnalysisId: 1,

    formQuestions: [
      {
        questionId: 3,

        questionText:
          "A quel point ou avec quelle probabilité les futures exigences devraient-elles être acceptées ?",

        answerText: "TEST",

        questionRef: "Man_1",

        stepId: 1,

        criterias: [
          {
            criteriaId: 9,

            criteriaName: "Régularité",

            criteriaValue: 1,

            questionId: 3,
          },

          {
            criteriaId: 8,

            criteriaName: "Adaptabilité",

            criteriaValue: 3,

            questionId: 3,
          },

          {
            criteriaId: 7,

            criteriaName: "Disponibilité",

            criteriaValue: 2,

            questionId: 3,
          },
        ],

        brainstormings: [],
      },

      {
        questionId: 2,

        questionText:
          "Y-a-t-il des projets similaires terminés et réussis qui pourraient servir de modèle ?",

        answerText: "TEST",

        questionRef: "Man_4",

        stepId: 1,

        criterias: [
          {
            criteriaId: 6,

            criteriaName: "Régularité",

            criteriaValue: 2,

            questionId: 2,
          },

          {
            criteriaId: 5,

            criteriaName: "Adaptabilité",

            criteriaValue: 2,

            questionId: 2,
          },

          {
            criteriaId: 4,

            criteriaName: "Disponibilité",

            criteriaValue: 2,

            questionId: 2,
          },
        ],

        brainstormings: [],
      },

      {
        questionId: 4,

        questionText:
          "A quel degré les parties prenantes seront-elles disponibles pendant l’exécution ?",

        answerText: "TEST",

        questionRef: "Man_2",

        stepId: 1,

        criterias: [
          {
            criteriaId: 12,

            criteriaName: "Régularité",

            criteriaValue: 2,

            questionId: 4,
          },

          {
            criteriaId: 11,

            criteriaName: "Adaptabilité",

            criteriaValue: 3,

            questionId: 4,
          },

          {
            criteriaId: 10,

            criteriaName: "Disponibilité",

            criteriaValue: 2,

            questionId: 4,
          },
        ],

        brainstormings: [],
      },

      {
        questionId: 1,

        questionText:
          "Avec quelle régularité le projet requerra-t-il d’intégrer de nouveaux membres au sein des équipes ?",

        answerText: "TEST",

        questionRef: "Man_3",

        stepId: 1,

        criterias: [
          {
            criteriaId: 2,

            criteriaName: "Adaptabilité",

            criteriaValue: 3,

            questionId: 1,
          },

          {
            criteriaId: 1,

            criteriaName: "Disponibilité",

            criteriaValue: 2,

            questionId: 1,
          },

          {
            criteriaId: 3,

            criteriaName: "Régularité",

            criteriaValue: 1,

            questionId: 1,
          },
        ],

        brainstormings: [
          {
            brainstormingId: 1,

            brainstormingText: "blabla",

            isChecked: true,

            questionId: 1,

            predictibilityAnalysisId: 1,

            userId: 1,

            firstName: "John",

            lastName: "Doe",

            role: "CDP",
          },
        ],
      },
    ],

    escore: 0.4125,
  },
];

/**
 * @brief Mocked data for testing brainstorming actions in reducers.
 */
export const brainDataFake = {
  type: "brainStormingResumeReducer/getBrainStormingResumeFetch",
  payload: 1
};

/**
 * @brief Mocked data for testing user-related actions in reducers.
 */
export const userDataFake = {
  type: "userReducer/getUserInfoByIdFetch",
  payload: 1
};

/**
 * @brief Mocked data representing a user from a customer's perspective.
 */
export const userFake ={
userId: 1,
username: "user",
userLastName: "Doe",
userFirstName: "John",
userEmail: "user@user.com",
userAvatar: null
};

/**
 * @brief Mocked data concerning avatar fetching from user reducer.
 */
export const avatarDataFake = {
  type: "userReducer/getUserAvatarFetch",
  payload: 1
};

/**
 * @brief Mocked URL data for an avatar.
 */
export const avatarUrl = "'blob:http://localhost:3000/e1574461-10c4-4c29-9351-6265f7ec8ef9'";

/**
 * @brief Mocked data for testing project fetching in the projectSaga.js file.
 */
export const fakeDataWorkGetProject = {
  type: "projectReducer/getProjectFetch",
  payload: "1"
};
/**
 * @brief Mocked project result data structure.
 */
export const fakeDataWorkGetProjectResult = {
  projectId: 1,
  name: "test",
  description: "dfds",
  createdAt: "2023-10-18T12:43:26.431+00:00",
  updatedAt: "2023-10-18T12:44:50.019+00:00",
  confirmationState: "CONFIRMED",
  chefId: 1,
  isArchived: false,
  contributors: [
    {
      contributerId: 1,
      firstName: "John",
      lastName: "Doe",
      email: "user@user.com",
      isAdmin: false,
      role: "CDP",
    }
  ],
  attachments: [
    {
      attachmentId: 1,
      fileName: "dessin.pdf",
      filePath: "src/main/resources/projects/1697633006412_test/dessin.pdf",
      contentType: "application/pdf",
    }
  ],
  multiCriteriaAnalysisList: [
    {
      multiCriteriaAnalysisId: 1,
      createdAt: "2023-10-18T12:43:26.475+00:00",
      updatedAt: "2023-10-18T12:43:26.475+00:00",
      multiCriteriaAnalysisIteration: 1,
      isFinished: false,
      formSteps: [
        {
          stepId: 1,
          stepName: "Manoeuvrabilité",
          stepRef: 3,
          formQuestions: [
            {
              questionId: 3,
              questionText: "À quel point ou avec quelle probabilité les futures exigences devraient-elles être acceptées ?",
              answerText: null,
              questionRef: "Man_1",
              criterias: [
                {
                  criteriaId: 8,
                  criteriaName: "Adaptabilité",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 7,
                  criteriaName: "Disponibilité",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 9,
                  criteriaName: "Régularité",
                  criteriaValue: 0,
                  score: 0
                }
              ],
              brainstormings: []
            },
            {
              questionId: 1,
              questionText: "Avec quelle régularité le projet requerra-t-il d'intégrer de nouveaux membres au sein des équipes ?",
              answerText: null,
              questionRef: "Man_3",
              criterias: [
                {
                  criteriaId: 1,
                  criteriaName: "Disponibilité",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 3,
                  criteriaName: "Régularité",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 2,
                  criteriaName: "Adaptabilité",
                  criteriaValue: 0,
                  score: 0
                }
              ],
              brainstormings: []
            },
            {
              questionId: 2,
              questionText: "Y-a-t-il des projets similaires terminés et réussis qui pourraient servir de modèle ?",
              answerText: null,
              questionRef: "Man_4",
              criterias: [
                {
                  criteriaId: 4,
                  criteriaName: "Disponibilité",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 6,
                  criteriaName: "Régularité",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 5,
                  criteriaName: "Adaptabilité",
                  criteriaValue: 0,
                  score: 0
                }
              ],
              brainstormings: []
            },
            {
              questionId: 4,
              questionText: "A quel degré les parties prenantes seront-elles disponibles pendant l'exécution ?",
              answerText: null,
              questionRef: "Man_2",
              criterias: [
                {
                  criteriaId: 11,
                  criteriaName: "Adaptabilité",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 10,
                  criteriaName: "Disponibilité",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 12,
                  criteriaName: "Régularité",
                  criteriaValue: 0,
                  score: 0
                }
              ],
              brainstormings: []
            }
          ],
          stepWeights: [
            {
              weightId: 1,
              criteriaName: "Disponibilité",
              criteriaDescription: "Dans quelle mesure l'élément/l'individu que l'attribut de découverte interroge est-il disponible, c'est-à-dire accessible, récupérable ou prêt à rester impliqué.",
              weightValue: 0.5
            },
            {
              weightId: 3,
              criteriaName: "Régularité",
              criteriaDescription: "Dans quelle mesure l'élément/l'individu que l'attribut de découverte interroge est-il régulier, c'est-à-dire récurrent et se produisant ou contribuant souvent.",
              weightValue: 0.25
            },
            {
              weightId: 2,
              criteriaName: "Adaptabilité",
              criteriaDescription: "Dans quelle mesure l'élément/l'individu que l'attribut Découverte interroge est-il adaptable, c’est-à-dire tolérant au changement.",
              weightValue: 0.25
            }
          ],
          stepScores: [],
          escore: null
        },
        {
          stepId: 2,
          stepName: "Spécificité",
          stepRef: 1,
          formQuestions: [
            {
              questionId: 5,
              questionText: "Quels sont les enjeux qui sont à la fois connus et acceptés ?",
              answerText: null,
              questionRef: "Spec_3",
              criterias: [
                {
                  criteriaId: 13,
                  criteriaName: "Clarté",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 15,
                  criteriaName: "Rigueur",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 14,
                  criteriaName: "Précision",
                  criteriaValue: 0,
                  score: 0
                }
              ],
              brainstormings: []
            },
            {
              questionId: 7,
              questionText: "Quel est le produit final du projet ?",
              answerText: null,
              questionRef: "Spec_1",
              criterias: [
                {
                  criteriaId: 19,
                  criteriaName: "Clarté",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 21,
                  criteriaName: "Rigueur",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 20,
                  criteriaName: "Précision",
                  criteriaValue: 0,
                  score: 0
                }
              ],
              brainstormings: []
            },
            {
              questionId: 8,
              questionText: "Quel est le minimum attendu pour considérer le projet comme réussi ?",
              answerText: null,
              questionRef: "Spec_4",
              criterias: [
                {
                  criteriaId: 24,
                  criteriaName: "Rigueur",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 22,
                  criteriaName: "Clarté",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 23,
                  criteriaName: "Précision",
                  criteriaValue: 0,
                  score: 0
                }
              ],
              brainstormings: []
            },
            {
              questionId: 6,
              questionText: "Quels sont les motivations du projet liées à l’environnement ?",
              answerText: null,
              questionRef: "Spec_2",
              criterias: [
                {
                  criteriaId: 18,
                  criteriaName: "Rigueur",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 16,
                  criteriaName: "Clarté",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 17,
                  criteriaName: "Précision",
                  criteriaValue: 0,
                  score: 0
                }
              ],
              brainstormings: []
            }
          ],
          stepWeights: [
            {
              weightId: 5,
              criteriaName: "Précision",
              criteriaDescription: "Dans quelle mesure la spécification qui répond à la ou aux questions déclenchées par l'attribut de découverte est-elle précise, c’est-à-dire exactement exprimée et formulée.",
              weightValue: 0.25
            },
            {
              weightId: 4,
              criteriaName: "Clarté",
              criteriaDescription: "Dans quelle mesure la spécification qui répond à la ou aux questions déclenchées par l'attribut de découverte est-elle claire, c'est-à-dire bien définie et simple.",
              weightValue: 0.5
            },
            {
              weightId: 6,
              criteriaName: "Rigueur",
              criteriaDescription: "Dans quelle mesure la spécification qui répond à la ou aux questions déclenchées par l'attribut de découverte est-elle approfondie, c’est-à-dire exhaustive et suffisamment détaillée.",
              weightValue: 0.25
            }
          ],
          stepScores: [],
          escore: null
        },
        {
          stepId: 3,
          stepName: "Certitude",
          stepRef: 2,
          formQuestions: [
            {
              questionId: 11,
              questionText: "A quel degré sont et seront disponibles le management et les commanditaires/sponsors du projet ? ",
              answerText: null,
              questionRef: "Unc_3",
              criterias: [
                {
                  criteriaId: 30,
                  criteriaName: "Clarté",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 29,
                  criteriaName: "Complétude",
                  criteriaValue: 0,
                  score: 0
                }
              ],
              brainstormings: []
            },
            {
              questionId: 10,
              questionText: "Les exigences sont-elles complètes ?",
              answerText: null,
              questionRef: "Unc_1",
              criterias: [
                {
                  criteriaId: 27,
                  criteriaName: "Complétude",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 28,
                  criteriaName: "Clarté",
                  criteriaValue: 0,
                  score: 0
                }
              ],
              brainstormings: []
            },
            {
              questionId: 9,
              questionText: "Jusqu’à quel point l’utilité du produit dans son périmètre business paraît-elle claire ?",
              answerText: null,
              questionRef: "Unc_2",
              criterias: [
                {
                  criteriaId: 25,
                  criteriaName: "Complétude",
                  criteriaValue: 0,
                  score: 0
                },
                {
                  criteriaId: 26,
                  criteriaName: "Clarté",
                  criteriaValue: 0,
                  score: 0
                }
              ],
              brainstormings: []
            }
          ],
          stepWeights: [
            {
              weightId: 8,
              criteriaName: "Clarté",
              criteriaDescription: "Dans quelle mesure la réponse à la ou aux questions qui déclenche l'attribut Découverte est-elle claire, c'est-à-dire sans équivoque, non conflictuelle ou cohérente.",
              weightValue: 0.5
            },
            {
              weightId: 7,
              criteriaName: "Complétude",
              criteriaDescription: "Dans quelle mesure l'élément que l'attribut de découverte interroge est-il exhaustif c’est-à-dire complet, offrant une vue d'ensemble holistique.",
              weightValue: 0.5
            }
          ],
          stepScores: [],
          escore: null
        }
      ],
      predictibilityAnalysis: null
    }
  ]
};
