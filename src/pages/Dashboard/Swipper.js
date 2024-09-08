/**
 * @file Swipper
 * @brief This component displays a list of features with icons and descriptions.
 * It includes features such as multicriteria analysis, brainstorming and voting, collaboration and decision-making assistance, and artificial intelligence.
 */

import { Link  } from "react-router-dom";
import { t } from "utils/translationUtils";

import { Box, Typography } from '@mui/material'; // Importing MUI components
import { styled } from '@mui/system'; // Importing styled utility from MUI

import aiDecisionSupport from '../../assets/images/IA-details.png';
import collaborativeAnalysis from '../../assets/images/Illus-details.png';

const SolutionsSection = styled(Box)`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const SolutionCard = styled(Box)`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  width: 100%;
  text-align: left;
`;

const SolutionImage = styled('img')`
  width: 200px;
  height: 200px;
  margin-right: 20px;
`;

// Custom styled anchor tag
const CustomLink = styled(Link)`
  display: inline-block;
  textDecoration: none;
  color: #1976d2;
  border: none;
  cursor: pointer;
  fontSize: 0.875rem;
  fontWeight: 500;
  lineHeight: 1.75;
  textTransform: uppercase;
  borderRadius: 4px;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    backgroundColor: #f5f5f5;
  }
`;

export default () => {
  return (
    <>
      <Typography variant="h5" gutterBottom>{t('dashboard.swipper.title')}</Typography>
      <SolutionsSection>
        <SolutionCard>
          <SolutionImage id="image-analyse-collaborative" src={collaborativeAnalysis} alt="Collaborative Analysis" />
          <Box>
            <Typography id="texte-ac-titre" variant="h6" gutterBottom>{t('dashboard.swipper.collaborativeAnalysis')}</Typography>
            <Typography id="texte-ac-description" variant="body2" paragraph>
              {t('dashboard.swipper.collaborativeAnalysisDescription')}
            </Typography>
            <CustomLink id="texte-ac-en-savoir-plus" to="/learn-more-collab">{t('dashboard.swipper.more')}</CustomLink>
          </Box>
        </SolutionCard>
        <SolutionCard style={{marginLeft: '20px'}}>
          <SolutionImage id="image-ia" src={aiDecisionSupport} alt="AI Decision Support" />
          <Box>
            <Typography id="texte-ia-titre" variant="h6" gutterBottom>{t('dashboard.swipper.aiSupport')}</Typography>
            <Typography id="texte-ia-description" variant="body2" paragraph>
              {t('dashboard.swipper.aiSupportDescription')}
            </Typography>
            <CustomLink id="texte-ia-en-savoir-plus" to="/learn-more-collab">{t('dashboard.swipper.more')}</CustomLink>
          </Box>
        </SolutionCard>
      </SolutionsSection>
    </>
  );
};
