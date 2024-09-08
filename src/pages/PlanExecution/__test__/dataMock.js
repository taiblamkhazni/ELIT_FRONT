/**
 * @file dataMock.js
 * @brief Contient les données mocker pour les utlisées dans les tests.
 */
export const themeMock = {
  colors: {
    primaires: {
      blueLight: "#someColor",
      blueDark: "#someColor",
    },
    secondaires: {
      grisLight: "#someColor",
    },
    avertissements: {
      danger: "red"
    }
  },
  fontWeights: {
    regular: "400",
  },
  lineHeights: {
    Deci: "1.5",
  },
};
export const initialState = {
  authentificationReducer: {
    user: {
      sub: 'user@user.com',
      firstname: 'John',
      roles: [
        'USER'
      ],
      iss: 'http://localhost:8080/api/refreshToken',
      id: 1,
      exp: 1688045713,
      lastname: 'Doe'
    },
    isRefreshTokenValid: true
  },
  executionPlanReducer: {
    idPlanExecution: 2,
    voteMethod: null,
    vote2MethodsHyBrid: [],
    methodologiesArray: [
      {
        methodologyName: "Classique",
        id: 1,
        methodName: "Cascade",
        methodDescription: "description",
        disadvantages: "disadvantages",
        advantages: "advantages",
        votes: []
      },
      {
        methodologyName: "Classique",
        id: 2,
        methodName: "Cycle en V",
        methodDescription: "description",
        disadvantages: "disadvantages",
        advantages: "advantages",
        votes: []
      },
      {
        methodologyName: "Classique",
        id: 3,
        methodName: "Spirale",
        methodDescription: "description",
        disadvantages: "disadvantages",
        advantages: "advantages",
        votes: []
      },
      {
        methodologyName: "Classique",
        id: 4,
        methodName: "Cycle en Y",
        methodDescription: "description",
        disadvantages: "disadvantages",
        advantages: "advantages",
        votes: []
      },
      {
        methodologyName: "Agile",
        id: 5,
        methodName: "Kanban",
        methodDescription: "description",
        disadvantages: "disadvantages",
        advantages: "advantages",
        votes: []
      },
      {
        methodologyName: "Agile",
        id: 6,
        methodName: "Scrum",
        methodDescription: "description",
        disadvantages: "disadvantages",
        advantages: "advantages",
        votes: []
      },
      {
        methodologyName: "Agile",
        id: 7,
        methodName: "XP",
        methodDescription: "description",
        disadvantages: "disadvantages",
        advantages: "advantages",
        votes: []
      },
      {
        methodologyName: "Agile",
        id: 8,
        methodName: "Scrumban",
        methodDescription: "description",
        disadvantages: "disadvantages",
        advantages: "advantages",
        votes: []
      },
      {
        methodologyName: "Agile",
        id: 9,
        methodName: "Lean",
        methodDescription: "description",
        disadvantages: "disadvantages",
        advantages: "advantages",
        votes: []
      },
      {
        methodologyName: "Agile",
        id: 10,
        methodName: "Dad",
        methodDescription: "description",
        disadvantages: "disadvantages",
        advantages: "advantages",
        votes: []
      },
      {
        methodologyName: "Agile",
        id: 11,
        methodName: "Safe",
        methodDescription: "description",
        disadvantages: "disadvantages",
        advantages: "advantages",
        votes: []
      },
      {
        methodologyName: "Agile",
        id: 12,
        methodName: "Less",
        methodDescription: "description",
        disadvantages: "disadvantages",
        advantages: "advantages",
        votes: []
      },
      {
        methodologyName: "Agile",
        id: 13,
        methodName: "Nexux",
        methodDescription: "description",
        disadvantages: "disadvantages",
        advantages: "advantages",
        votes: []
      },
      {
        methodologyName: "Agile",
        id: 14,
        methodName: "Scrum of Scrums",
        methodDescription: "description",
        disadvantages: "disadvantages",
        advantages: "advantages",
        votes: []
      }
    ]
  },
  projectReducer: {
    currentUser: {
      contributerId: 3,
      firstName: "Charles",
      lastName: "Baker",
      email: "contributer@elit.com",
      job: "DÃ©veloppeur back",
      isAdmin: false,
      role: "OBSERVER"
    },
    project: {
      projectId: 2,
      name: "Projet 2",
      description: "Description",
      createdAt: "2023-06-29T07:52:14.698+00:00",
      updatedAt: "2023-06-29T07:52:14.698+00:00",
      confirmationState: "CONFIRMED",
      chefId: 1,
      isArchived: false,
      contributors: [
        {
          contributerId: 1,
          firstName: "John",
          lastName: "Doe",
          email: "user@user.com",
          job: "DÃ©veloppeur front",
          isAdmin: false,
          role: "CDP"
        },
        {
          contributerId: 3,
          firstName: "Charles",
          lastName: "Baker",
          email: "contributer@elit.com",
          job: "DÃ©veloppeur back",
          isAdmin: false,
          role: "OBSERVER"
        }
      ],
      attachments: [
        {
          attachmentId: 2,
          fileName: "garanties.pdf",
          filePath: "outildedecision/src/main/resources/projects/1688025134695_projet_2/garanties.pdf",
          contentType: "application/pdf"
        }
      ],
      multiCriteriaAnalysisList: [
        {
          multiCriteriaAnalysisId: 2,
          createdAt: "2023-06-29T07:52:14.713+00:00",
          updatedAt: "2023-06-29T07:53:25.101+00:00",
          multiCriteriaAnalysisIteration: 1,
          isFinished: true,
          formSteps: [
            {
              stepId: 4,
              stepName: "ManoeuvrabilitÃ©",
              stepRef: 3,
              formQuestions: [
                {
                  questionId: 12,
                  questionText: "Avec quelle rÃ©gularitÃ© le projet requerra-t-il dâ€™intÃ©grer de nouveaux membres au sein des Ã©quipes ?",
                  answerText: "Caractéristiques de la méthodologie\n                        Classique",
                  questionRef: "Man_3",
                  criterias: [
                    {
                      criteriaId: 32,
                      criteriaName: "AdaptabilitÃ©",
                      criteriaValue: 2,
                      score: 0
                    },
                    {
                      criteriaId: 31,
                      criteriaName: "DisponibilitÃ©",
                      criteriaValue: 2,
                      score: 0
                    },
                    {
                      criteriaId: 33,
                      criteriaName: "RÃ©gularitÃ©",
                      criteriaValue: 2,
                      score: 0
                    }
                  ],
                  brainstormings: []
                },
                {
                  questionId: 15,
                  questionText: "A quel degrÃ© les parties prenantes seront-elles disponibles pendant lâ€™exÃ©cution ?",
                  answerText: "Caractéristiques de la méthodologie\n                        Classique",
                  questionRef: "Man_2",
                  criterias: [
                    {
                      criteriaId: 40,
                      criteriaName: "DisponibilitÃ©",
                      criteriaValue: 3,
                      score: 0
                    },
                    {
                      criteriaId: 41,
                      criteriaName: "AdaptabilitÃ©",
                      criteriaValue: 2,
                      score: 0
                    },
                    {
                      criteriaId: 42,
                      criteriaName: "RÃ©gularitÃ©",
                      criteriaValue: 1,
                      score: 0
                    }
                  ],
                  brainstormings: []
                },
                {
                  questionId: 14,
                  questionText: "A quel point ou avec quelle probabilitÃ© les futures exigences devraient-elles Ãªtre acceptÃ©es ?",
                  answerText: "Caractéristiques de la méthodologie\n                        Classique",
                  questionRef: "Man_1",
                  criterias: [
                    {
                      criteriaId: 38,
                      criteriaName: "AdaptabilitÃ©",
                      criteriaValue: 2,
                      score: 0
                    },
                    {
                      criteriaId: 39,
                      criteriaName: "RÃ©gularitÃ©",
                      criteriaValue: 2,
                      score: 0
                    },
                    {
                      criteriaId: 37,
                      criteriaName: "DisponibilitÃ©",
                      criteriaValue: 2,
                      score: 0
                    }
                  ],
                  brainstormings: []
                },
                {
                  questionId: 13,
                  questionText: "Y-a-t-il des projets similaires terminÃ©s et rÃ©ussis qui pourraient servir de modÃ¨le ?",
                  answerText: "Caractéristiques de la méthodologie\n                        Classique",
                  questionRef: "Man_4",
                  criterias: [
                    {
                      criteriaId: 36,
                      criteriaName: "RÃ©gularitÃ©",
                      criteriaValue: 2,
                      score: 0
                    },
                    {
                      criteriaId: 34,
                      criteriaName: "DisponibilitÃ©",
                      criteriaValue: 3,
                      score: 0
                    },
                    {
                      criteriaId: 35,
                      criteriaName: "AdaptabilitÃ©",
                      criteriaValue: 3,
                      score: 0
                    }
                  ],
                  brainstormings: []
                }
              ],
              stepWeights: [
                {
                  weightId: 9,
                  criteriaName: "DisponibilitÃ©",
                  criteriaDescription: "Dans quelle mesure l'Ã©lÃ©ment/l'individu que l'attribut de dÃ©couverte interroge est-il disponible, c'est-Ã -dire accessible, rÃ©cupÃ©rable ou prÃªte Ã  rester impliquÃ©e.",
                  weightValue: 0.5
                },
                {
                  weightId: 11,
                  criteriaName: "RÃ©gularitÃ©",
                  criteriaDescription: "Dans quelle mesure l'Ã©lÃ©ment/l'individu que l'attribut dÃ©couverte interroge est-il rÃ©gulier, c'est-Ã -dire rÃ©current et se produisant ou contribuant souvent.",
                  weightValue: 0.25
                },
                {
                  weightId: 10,
                  criteriaName: "AdaptabilitÃ©",
                  criteriaDescription: "Dans quelle mesure l'Ã©lÃ©ment/l'individu que l'attribut DÃ©couverte interroge est-il adaptable, câ€™est-Ã -dire tolÃ©rant au changement.",
                  weightValue: 0.25
                }
              ],
              stepScores: [],
              escore: 0.45
            },
            {
              stepId: 5,
              stepName: "SpÃ©cificitÃ©",
              stepRef: 1,
              formQuestions: [
                {
                  questionId: 16,
                  questionText: "Quels sont les enjeux qui sont Ã  la fois connus et acceptÃ©s ?",
                  answerText: "Caractéristiques de la méthodologie\n                        Classique",
                  questionRef: "Spec_3",
                  criterias: [
                    {
                      criteriaId: 44,
                      criteriaName: "PrÃ©cision",
                      criteriaValue: 2,
                      score: 0
                    },
                    {
                      criteriaId: 43,
                      criteriaName: "ClartÃ©",
                      criteriaValue: 2,
                      score: 0
                    },
                    {
                      criteriaId: 45,
                      criteriaName: "Rigueur",
                      criteriaValue: 2,
                      score: 0
                    }
                  ],
                  brainstormings: []
                },
                {
                  questionId: 19,
                  questionText: "Quel est le minimum attendu pour considérer le projet comme réussi ?",
                  answerText: "Caractéristiques de la méthodologie\n                        Classique",
                  questionRef: "Spec_4",
                  criterias: [
                    {
                      criteriaId: 53,
                      criteriaName: "PrÃ©cision",
                      criteriaValue: 2,
                      score: 0
                    },
                    {
                      criteriaId: 52,
                      criteriaName: "ClartÃ©",
                      criteriaValue: 2,
                      score: 0
                    },
                    {
                      criteriaId: 54,
                      criteriaName: "Rigueur",
                      criteriaValue: 2,
                      score: 0
                    }
                  ],
                  brainstormings: []
                },
                {
                  questionId: 18,
                  questionText: "Quel est le produit final du projet ?",
                  answerText: "Caractéristiques de la méthodologie\n                        Classique",
                  questionRef: "Spec_1",
                  criterias: [
                    {
                      criteriaId: 51,
                      criteriaName: "Rigueur",
                      criteriaValue: 1,
                      score: 0
                    },
                    {
                      criteriaId: 50,
                      criteriaName: "PrÃ©cision",
                      criteriaValue: 2,
                      score: 0
                    },
                    {
                      criteriaId: 49,
                      criteriaName: "ClartÃ©",
                      criteriaValue: 3,
                      score: 0
                    }
                  ],
                  brainstormings: []
                },
                {
                  questionId: 17,
                  questionText: "Quels sont les motivations du projet liÃ©es Ã  lâ€™environnement ?",
                  answerText: "Caractéristiques de la méthodologie\n                        Classique",
                  questionRef: "Spec_2",
                  criterias: [
                    {
                      criteriaId: 47,
                      criteriaName: "PrÃ©cision",
                      criteriaValue: 2,
                      score: 0
                    },
                    {
                      criteriaId: 46,
                      criteriaName: "ClartÃ©",
                      criteriaValue: 2,
                      score: 0
                    },
                    {
                      criteriaId: 48,
                      criteriaName: "Rigueur",
                      criteriaValue: 2,
                      score: 0
                    }
                  ],
                  brainstormings: []
                }
              ],
              stepWeights: [
                {
                  weightId: 13,
                  criteriaName: "PrÃ©cision",
                  criteriaDescription: "Dans quelle mesure la spÃ©cification qui rÃ©pond Ã  la ou aux questions dÃ©clenchÃ©es par l'attribut de dÃ©couverte est-elle prÃ©cise, câ€™est-Ã -dire exactement exprimÃ©e et formulÃ©e.",
                  weightValue: 0.25
                },
                {
                  weightId: 12,
                  criteriaName: "ClartÃ©",
                  criteriaDescription: "Dans quelle mesure la spÃ©cification qui rÃ©pond Ã  la ou aux questions dÃ©clenchÃ©es par l'attribut de dÃ©couverte est-elle claire, c'est-Ã -dire bien dÃ©finie et simple.",
                  weightValue: 0.5
                },
                {
                  weightId: 14,
                  criteriaName: "Rigueur",
                  criteriaDescription: "Dans quelle mesure la spÃ©cification qui rÃ©pond Ã  la ou aux questions dÃ©clenchÃ©es par l'attribut de dÃ©couverte est-elle approfondie, c'est-Ã -dire exhaustive et suffisamment dÃ©taillÃ©e.",
                  weightValue: 0.25
                }
              ],
              stepScores: [],
              escore: 0.4125
            },
            {
              stepId: 6,
              stepName: "Certitude",
              stepRef: 2,
              formQuestions: [
                {
                  questionId: 20,
                  questionText: "Jusquâ€™Ã  quel point lâ€™utilitÃ© du produit dans son pÃ©rimÃ¨tre business paraÃ®t-elle claire ?",
                  answerText: "Caractéristiques de la méthodologie\n                        Classique",
                  questionRef: "Unc_2",
                  criterias: [
                    {
                      criteriaId: 55,
                      criteriaName: "ComplÃ©tude",
                      criteriaValue: 2,
                      score: 0
                    },
                    {
                      criteriaId: 56,
                      criteriaName: "ClartÃ©",
                      criteriaValue: 2,
                      score: 0
                    }
                  ],
                  brainstormings: []
                },
                {
                  questionId: 21,
                  questionText: "Les exigences sont-elles complÃ¨tes ?",
                  answerText: "Caractéristiques de la méthodologie\n                        Classique",
                  questionRef: "Unc_1",
                  criterias: [
                    {
                      criteriaId: 57,
                      criteriaName: "ComplÃ©tude",
                      criteriaValue: 2,
                      score: 0
                    },
                    {
                      criteriaId: 58,
                      criteriaName: "ClartÃ©",
                      criteriaValue: 2,
                      score: 0
                    }
                  ],
                  brainstormings: []
                },
                {
                  questionId: 22,
                  questionText: "A quel degrÃ© sont et seront disponibles le management et les commanditaires/sponsors du projet ? ",
                  answerText: "Caractéristiques de la méthodologie\n                        Classique",
                  questionRef: "Unc_3",
                  criterias: [
                    {
                      criteriaId: 60,
                      criteriaName: "ClartÃ©",
                      criteriaValue: 2,
                      score: 0
                    },
                    {
                      criteriaId: 59,
                      criteriaName: "ComplÃ©tude",
                      criteriaValue: 2,
                      score: 0
                    }
                  ],
                  brainstormings: []
                }
              ],
              stepWeights: [
                {
                  weightId: 15,
                  criteriaName: "ComplÃ©tude",
                  criteriaDescription: "Dans quelle mesure l'Ã©lÃ©ment que l'attribut de dÃ©couverte interroge est-il exhaustif câ€™est-Ã -dire complet, offrant une vue d'ensemble holistique.",
                  weightValue: 0.5
                },
                {
                  weightId: 16,
                  criteriaName: "ClartÃ©",
                  criteriaDescription: "Dans quelle mesure la rÃ©ponse Ã  la ou aux questions qui dÃ©clenche l'attribut DÃ©couverte est-elle claire, c'est-Ã -dire sans Ã©quivoque, non conflictuelle ou cohÃ©rente.",
                  weightValue: 0.5
                }
              ],
              stepScores: [],
              escore: 0.4
            }
          ],
          predictibilityAnalysis: {
            predictibilityAnalysisId: 2,
            isFinished: false,
            predictibilityAnalysisIteration: 2,
            executionPlan: {
              executionPlanId: 2,
              isFinished: false,
              chooseMethod: [
                "Cascade",
                "Cycle en V",
                "Spirale",
                "Cycle en Y",
                "Kanban",
                "Scrum",
                "XP",
                "Scrumban",
                "Lean",
                "Dad",
                "Safe",
                "Less",
                "Nexux",
                "Scrum of Scrums"
              ],
              "countVotes": 0,
              "executionPlanIteration": 1,
              "allMethods": [
                {
                  name: "Cascade",
                  votes: 0
                },
                {
                  name: "Cycle en V",
                  votes: 0
                },
                {
                  name: "Spirale",
                  votes: 0
                },
                {
                  name: "Cycle en Y",
                  votes: 0
                },
                {
                  name: "Kanban",
                  votes: 0
                },
                {
                  name: "Scrum",
                  votes: 0
                },
                {
                  name: "XP",
                  votes: 0
                },
                {
                  name: "Scrumban",
                  votes: 0
                },
                {
                  name: "Lean",
                  votes: 0
                },
                {
                  name: "Dad",
                  votes: 0
                },
                {
                  name: "Safe",
                  votes: 0
                },
                {
                  name: "Less",
                  votes: 0
                },
                {
                  name: "Nexux",
                  votes: 0
                },
                {
                  name: "Scrum of Scrums",
                  votes: 0
                }
              ],
              predictibilityResults: [
                {
                  name: "AGILE",
                  value: 0
                },
                {
                  name: "HYBRID",
                  value: 0.6
                },
                {
                  name: "CLASSIC",
                  value: 0
                }
              ]
            }
          }
        }
      ]
    }
  }
}
