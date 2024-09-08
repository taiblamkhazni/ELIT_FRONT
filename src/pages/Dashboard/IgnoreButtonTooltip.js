/**
 * @file IgnoreButtonTooltip
 * @brief This component renders a button to ignore the tooltip and move to the next step or finish the tooltip tour.
 */

import { useCallback } from "react"; // Importing useCallback hook from React
import { ButtonNoBackground } from "components/Button/Button"; // Importing custom ButtonNoBackground component
import { Cookies } from "react-cookie"; // Importing Cookies component from react-cookie
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from React Redux
import { setStageNumberWelcomeTooltipEnd } from "reducers/welcomeTooltip/welcomeTooltipReducer"; // Importing action creator from welcomeTooltipReducer
import { t } from "utils/translationUtils"

export default () => {
  const dispatch = useDispatch(); // Creating a dispatch function to dispatch actions
  const user = useSelector((state) => state.authentificationReducer.user); // Getting the user data from Redux state
 

  // Function to handle click on the "Ignorer" button
  const handleClick = useCallback(() => {
    const cookies = new Cookies(); // Creating a new instance of Cookies
    dispatch(setStageNumberWelcomeTooltipEnd(-1)); // Dispatching action to set the final stage number
    cookies.set("isShowedTooltip_" + user.id, "yes", {
      // Setting a cookie to remember that the tooltip has been shown
      path: "/",
      maxAge: 3600 * 24 * 30,
    });
  }, [user.id, dispatch]);

  return (
    <ButtonNoBackground
      fontSize={"10px"}
      padding={"8px 12px"}
      height={"100%"}
      margin="15px 12px 0 0"
      onClick={handleClick}
    >
    {t('dashboard.ignoreButtonTooltip.ignoreButton')}
    </ButtonNoBackground>
  );
};
