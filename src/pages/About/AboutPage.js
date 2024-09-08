/**
 * @file AboutPage.js
 * @brief Composant About.
 * @summary About page component for ELIT project.
 */


import PageBase from 'pages/PageBase/PageBase';

import { Link, Typography } from '@mui/material';
import { styled } from '@mui/system';

import about from '../../assets/images/about.jpg';
import groupAbout from '../../assets/images/GroupAbout.png';

/**
 * @brief Styled component for the Section.
 */
const Section = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(5),
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));
/**
 * @brief Styled component for the SectionLeft.
 */
const SectionLeft = styled('div')(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
}));
/**
 * @brief Styled component for the SectionRight.
 */
const SectionRight = styled('div')(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
}));
/**
 * @brief Styled component for the TeamImage.
 */
const TeamImage = styled('img')({
  maxWidth: '100%',
  height: 'auto',
});
/**
 * @brief Styled component for the IllustrationImage.
 */
const IllustrationImage = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  paddingLeft: "40px",
});
/**
 * @brief Styled component for the ContactSection.
 */
const ContactSection = styled('div')(({ theme }) => ({
  textAlign: 'center',
  backgroundColor: '#0070AD',
  padding: theme.spacing(2),
}));

/**
 * @function AboutPage component renders the About page of the ELIT project.
 * @returns {JSX.Element} JSX elements representing the About page content.
 */
const AboutPage = () => {
  return (
    <PageBase>
      <div>
        <div style={{ padding: '20px 40px' }}>
          <Typography id='apropos-title' variant="h4" component="h1" gutterBottom>
            A propos
          </Typography>
          <Section>
            <SectionLeft>
              <TeamImage id='apropos-img-team' src={about} alt="Team" />
            </SectionLeft>
            <SectionRight>
              <Typography id='about-elit-question' variant="h5" component="h2" gutterBottom>
                Qu'est-ce que ELIT ?
              </Typography>
              <Typography id="presentation-elit-p" paragraph>
                ELIT a été développé par une équipe composée de chercheurs, d'ingénieurs et designers avec l'appui de chefs de projets expérimentés.
              </Typography>
              <Typography id="outil-elit-p" paragraph>ELIT est un outil qui propose :</Typography>
              <ul id='parcours-list'>
                <li><span style={{ fontWeight: 'bold' }}>Un parcours décisionnel</span> basé sur une analyse collaborative, des votes et des sessions de brainstorming.</li>
                <li><span style={{ fontWeight: 'bold' }}>Un parcours automatique </span>prédictif basé sur l'intelligence artificielle.</li>
              </ul>
            </SectionRight>
          </Section>
        </div>
        <Section style={{ backgroundColor: '#E2f0f9' }}>
          <SectionLeft style={{ order: '1', flex: '0 1 33%' }}>
            <IllustrationImage id='illustration-img' src={groupAbout} alt="Illustration" />
          </SectionLeft>
          <SectionRight style={{ order: '2', flex: '0 1 90%', paddingTop: "25px" }}>
            <Typography id='demarche-title' variant="h5" component="h2" gutterBottom>
              Une démarche simple, collaborative et flexible
            </Typography>
            <Typography id="methods-def-span" paragraph style={{ fontSize: '0.9rem' }}>
              <span style={{ fontWeight: 'bold' }}>L'outil ELIT peut vous aider à définir la meilleure méthodologie de gestion pour votre projet (classique, agile ou hybride).</span>
            </Typography>
            <Typography paragraph style={{ fontSize: '0.9rem' }}>
              <span style={{ fontWeight: 'bold' }}>Pour cela, vous disposez de deux parcours. Le premier basé sur un processus décisionnel collaboratif, le second sur l’utilisation d’un algorithme d’intelligence artificielle. Le seul pré-requis à la réalisation de ces parcours : renseigner les données relatives à votre projet et suivre les étapes de ces parcours.</span>
            </Typography>
          </SectionRight>
        </Section>

        <Section style={{ padding: '20px 40px' }}>
          <SectionLeft>
            <Typography variant="h5" component="h2" gutterBottom>
              Le groupe Capgemini
            </Typography>
            <Typography paragraph>
              Sogeti fait partie du groupe Capgemini, un leader mondial, responsable et multiculturel, regroupant 360 000 personnes dans près de 50 pays. Partenaire stratégique des entreprises pour <span style={{ fontWeight: 'bold' }}>la transformation de leurs activités en tirant profit de toute la puissance de la technologie,</span> le Groupe est guidé au quotidien par sa raison d’être : <span style={{ fontWeight: 'bold' }}>libérer les énergies humaines par la technologie pour un avenir inclusif et durable.</span>
            </Typography>
            <Typography paragraph>
              Fort de plus de 55 ans d’expérience et d’une grande expertise des différents secteurs d’activité, Capgemini est reconnu par ses clients pour <span style={{ fontWeight: 'bold' }}>répondre à l’ensemble de leurs besoins, de la stratégie et du design jusqu’au management des opérations, en tirant parti des innovations</span> dans les domaines en pleine expansion du <span style={{ fontWeight: 'bold' }}>cloud, de la data, de l’intelligence Artificielle, de la connectivité, des logiciels, de l’ingénierie digitale et des plateformes.</span> Le Groupe a réalisé un chiffre d’affaires de 22 milliards d’euros en 2022.
            </Typography>
          </SectionLeft>
          <SectionRight>
            <Typography variant="h5" component="h2" gutterBottom>
              SogetiLabs France
            </Typography>
            <Typography paragraph component="p">
              Organisés autour d’un ensemble de laboratoires autonomes, nous <span style={{ fontWeight: 'bold' }}>soutenons et développons des projets de Recherche & Innovation</span> dans nos 3 sites avec plus de 170 collaborateurs. Axés sur l’utilisation des nouvelles technologies au service de nos clients finaux, <span style={{ fontWeight: 'bold' }}>nous investissons pour développer nos connaissances en Data-science, Cloud computing, VR, IoT et dans les technologies du web.</span>
            </Typography>
          </SectionRight>
        </Section>
        <ContactSection>
          <Typography align="center" paragraph style={{ color: '#FFFFFF' }}>
            Vous souhaitez contacter ELIT ?<br />
            Vous avez une question ? Vous pouvez joindre nos équipes à l’adresse e-mail suivante :<br />
            <Link href="mailto:elit.global@capgemini.com" style={{ color: '#FFFFFF' }}>elit.global@capgemini.com</Link>
          </Typography>
        </ContactSection>
      </div>
    </PageBase>
  );
}

export default AboutPage;
