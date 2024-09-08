import { Link } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

import newIcon from '../../assets/images/arrow-right-circle.png';
import logo from '../../assets/images/LogoElit.png';
import robot from '../../assets/images/robotNotFound.png';

/**
 * @file NotFoundPage.js
 * @brief This file contains the NotFoundPage component which renders a 404 error page.
 */

/**
 * @typedef {import('@mui/system').Theme} Theme
 */

/**
 * @brief Styled component for the container.
 */
const Container = styled(Box)`
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  textAlign: 'center',
`;

/**
 * @brief Styled component for the logo.
 */
const Logo = styled('img')({
  position: 'absolute',
  top: '20px',
  left: '20px',
  maxWidth: '100px',
});

/**
 * @brief Styled component for the robot image.
 */
const RobotImage = styled('img')({
  maxWidth: '300px',
  marginBottom: '20px',
});

/**
 * @brief Styled component for the message box.
 */
const Message = styled(Box)(({ theme }) => ({
  maxWidth: '500px',
  marginBottom: theme.spacing(4),
}));

/**
 * @brief Styled component for the home button.
 */
const HomeButton = styled(Button)`
  backgroundColor: '#248BC0',
  textTransform: 'none',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1a6fa8',
  }`;

/**
 * @brief Styled component for the icon image.
 */
const IconImage = styled('img')({
  width: '24px',
  height: '24px',
});

/**
 * @function NotFoundPage
 * @brief Component renders a 404 error page when a route is not found.
 * It displays a logo, a robot image, an error message, and a button to navigate
 * back to the homepage.
 * @returns {JSX.Element} JSX elements representing the 404 error page.
 */
const NotFoundPage = () => {
  return (
    <Container>
      <Logo id='image-logo-elit' src={logo} alt="ELiT Logo" />
      <RobotImage id='image-Robot' src={robot} alt="Robot" />
      <Message>
        <Typography id='texte-explication' variant="body1" component="p">
          Il semblerait que la page que vous demandez n'existe plus ou n'est plus disponible.
          Veuillez revenir sur la page d'accueil depuis le bouton ci-dessous.
        </Typography>
      </Message>
      <HomeButton id="lien-Revenir à l'accueil" component={Link} to="/" variant="contained" startIcon={<IconImage id='image-fleche' src={newIcon} alt="New Icon" />}>
        Revenir à l'accueil
      </HomeButton>
    </Container>
  );
};

export default NotFoundPage;
