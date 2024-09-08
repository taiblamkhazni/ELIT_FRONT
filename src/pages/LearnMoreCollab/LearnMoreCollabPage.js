/**
 * @file LearnMoreCollabPage.js
 * @brief Composant Learn More.
 * @summary Learn More page component for ELIT project.
 */


/**
 * @brief Ant Design components for layout and typography.
 */
import { Breadcrumb, Col, Row, Typography } from 'antd';
/**
 * @brief Image assets used in the component.
 */
import chooseMethodImage from 'assets/images/chooseMethodImage.png'; 
import collaborateImage from 'assets/images/collaborateImage.png'; 
import formImage from 'assets/images/formImage.png'; 
/**
 * @brief Context provider for project creation.
 */
import ProjectCreationProvider from 'context/ProjectCreationProvider';
/**
 * @brief Base page layout component.
 */
import PageBase from 'pages/PageBase/PageBase';
/**
 * @brief Modal component for project creation.
 */
import ModalProjectCreation from 'pages/ProjectCreation/ModalProjectCreation/ModalProjectCreation';
/**
 * @brief React Router component for navigation.
 */
import { Link } from 'react-router-dom';
/**
 * @brief Styled-components for custom styling.
 */
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

/**
 * @brief Container component styling.
 */
const Container = styled.div`
  padding: 20px 40px;
  background-color: #F7FAFD;
`;

/**
 * @brief Step component styling.
 */
const Step = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

/**
 * @brief StepContent component styling.
 */
const StepContent = styled.div`
  flex: 1;
`;

/**
 * @brief StepImage component styling.
 */
const StepImage = styled.img`
  width: 300px;
  height: auto;
  margin-left: 20px;
`;

/**
 * @brief StepTitle component styling.
 */
const StepTitle = styled(Title)`
  font-size: 24px;
`;

/**
 * @brief LearnMoreCollabPage component.
 * @summary This component displays the Learn More page for the ELIT project.
 *          It contains detailed steps for collaborative decision-making.
 */
const LearnMoreCollabPage = () => {
    return (
        <PageBase>
            <Container>
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: <Link to="/dashboard" style={{ fontSize: "16px" }}>Accueil</Link>
                        },
                        {
                            title: <span style={{ fontSize: "16px" }}>Une analyse multicritères et collaborative</span>
                        }
                    ]}
                />
                <Title style={{ color: "#0083CA" }}>Une analyse collaborative d'aide à la décision</Title>
                <Paragraph style={{ fontSize: "18px" }}>
                    Cette solution est basée sur l'analyse des données de votre projet et la participation de votre équipe. Elle permet de faciliter une session collaborative impliquant les parties prenantes du projet pour parvenir à un consensus sur l'adoption d'une méthodologie partagée, qu'il s'agisse d'une approche traditionnelle, agile ou hybride, en utilisant des techniques comme le vote et le brainstorming.
                </Paragraph>
                <Row justify="space-between">
                    <Step>
                        <Col span={16}>
                            <StepContent>
                                <StepTitle level={2}><span style={{ color: "#0083CA" }}>1.</span> Complétez un formulaire</StepTitle>
                                <Paragraph style={{ fontSize: "18px" }}>
                                    Organiser une session collaborative, à distance ou en présentiel, avec toutes les parties prenantes du projet afin de compléter collectivement un formulaire (environ 1 heure). Les informations concernant le projet, le client contenus dans l'appel d'offre, le cahier des charges et autres documents... vous seront demandés. L'objectif est d'analyser les spécifications du projet afin d'augmenter le niveau de prévisibilité de la méthode de gestion de projet.
                                </Paragraph>
                            </StepContent>
                        </Col>
                        <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <StepImage src={formImage} alt="Complétez un formulaire" />
                        </Col>
                    </Step>
                </Row>
                <Row justify="space-between">
                    <Step>
                        <Col span={8}>
                            <StepImage src={collaborateImage} alt="Échangez avec les collaborateurs" />
                        </Col>
                        <Col span={16}>
                            <StepContent>
                                <StepTitle level={2}><span style={{ color: "#0083CA" }}>2.</span> Échangez avec les collaborateurs</StepTitle>
                                <Paragraph style={{ fontSize: "18px" }}>
                                    Impliquer les parties prenantes du projet pour parvenir à un consensus sur l'adoption d'une méthodologie partagée, qu'il s'agisse d'une approche traditionnelle, agile ou hybride, en votant sur l'interface si nécessaire en organisant un brainstorming.
                                </Paragraph>
                            </StepContent>
                        </Col>
                    </Step>
                </Row>
                <Row justify="space-between">
                    <Step>
                        <Col span={16}>
                            <StepContent>
                                <StepTitle level={2}><span style={{ color: "#0083CA" }}>3.</span> Choisissez la méthode</StepTitle>
                                <Paragraph style={{ fontSize: "18px" }}>
                                    En se basant sur la méthodologie sélectionnée lors de l'étape précédente, collaborer avec l'équipe pour choisir la méthode la mieux adaptée à votre projet, en prenant en compte toutes les données disponibles ainsi que les explications sur les différentes méthodes disponibles.
                                </Paragraph>
                            </StepContent>
                        </Col>
                        <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <StepImage src={chooseMethodImage} alt="Choisissez la méthode" />
                        </Col>
                    </Step>
                </Row>
                <Row justify="center">
                    <ProjectCreationProvider style={{ marginTop: "2rem" }}>
                        <ModalProjectCreation />
                    </ProjectCreationProvider>
                </Row>
            </Container>
        </PageBase>
    );
};

export default LearnMoreCollabPage;
