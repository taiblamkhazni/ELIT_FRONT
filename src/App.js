/**
 * @file App.js
 * @brief Fichier principal de l'application qui contient toutes les routes et le rendu global.
 */
import { Suspense, useEffect } from "react";
import RequireAuth from "auth/RequiredAuth";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ROLES from "common/roles";
import AdministrationPage from "pages/Administration/AdministrationPage";
import AnalyseMulticriteres from "pages/AnalyseMulticriteres/AnalyseMulticriteresPage";
import AnalysePrevisibilite from "pages/AnalysePrevisibilite/AnalysePrevisibilitePage";
import AnalyseMulticritereIteration2 from "pages/AnalysePrevisibilite/Result/AnalyseMulticritereIteration2";
import AnalysePrevisibiliteStageProvider from "pages/AnalysePrevisibiliteStageProvider/AnalysePrevisibiliteStageProvider";
import BrainStorming from "pages/BrainStorming/BrainStormingPage";
import ConnexionPage from "pages/Connexion/ConnexionPage";
import Dashboard from "pages/Dashboard/DashboardPage";
import InscriptionPage from "pages/Inscription/InscriptionPage";
import NotFoundPage from "pages/NotFound/NotFoundPage";
import PageBase from "pages/PageBase/PageBase";
import PlanExecution from "pages/PlanExecution/PlanExecutionPage";
import Profil from "pages/Profil/ProfilPage";
import ProjectCreation from "pages/ProjectCreation/ProjectCreationPage";
import ProjectDetailPage from "pages/ProjectDetail/ProjectDetailPage";
import ProtectedRoutesProjects from "pages/ProtectedRoutesProjects/ProtectedRoutesProjects";
import ReceiveMail from "pages/ReceiveMail/ReceiveMail";
import Settings from "pages/Settings/SettingsPage";
import { Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getProjectsFetch } from "reducers/projects/projectsReducer";
import {
  getUserAvatarFetch,
  getUserInfoByIdFetch,
} from "reducers/user/userReducer";
import { setStageNumberWelcomeTooltip, setStageNumberWelcomeTooltipEnd } from "reducers/welcomeTooltip/welcomeTooltipReducer";
import ROUTES from "routes/routes";
import { ThemeProvider } from "styled-components";
import { base } from "theme/base";
import { GlobalStyles } from "theme/GlobalStyles";
import { Spinner } from "utils/Spinner";

import AccountConfirmation from "./auth/AccountConfirmation";
import ForgotPassword from "./auth/ForgotPassword";
import InvalidToken from "./auth/InvalidToken";
import PasswordReset from "./auth/PasswordReset";
import TokenExpired from "./auth/TokenExpired";
import AboutPage from "./pages/About/AboutPage";
import LearnMoreCollabPage from "./pages/LearnMoreCollab/LearnMoreCollabPage";

/**
 * @brief Enregistrement des éléments du graphique et du plugin de données.
 */
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  ArcElement,
  ChartDataLabels
);

/**
 * @brief Composant principal qui définit les routes de notre application
 * @returns Un composant React qui représente l'application entière
 */
const App = () => {
  const user = useSelector((state) => state.authentificationReducer.user);
  const isRefreshTokenValid = useSelector(
    (state) => state.authentificationReducer.isRefreshTokenValid
  );
  const dispatch = useDispatch();
  const location = useLocation()
  

  useEffect(() => {
    const cookies  = new Cookies();
    if (user && isRefreshTokenValid) {
      if (user.id) {
        dispatch(getUserInfoByIdFetch(user.id));
        const tooltipCookie = cookies.get("isShowedTooltip_" + user.id);

        dispatch(getUserAvatarFetch(user.id));
        dispatch(getProjectsFetch());

        // setup welcome tooltip
        if (tooltipCookie) {
          if (tooltipCookie === "no") {
            dispatch(setStageNumberWelcomeTooltip(0));
          } else if (tooltipCookie === "yes") {
            dispatch(setStageNumberWelcomeTooltipEnd(-1));
          }
        } else {
          dispatch(setStageNumberWelcomeTooltip(0));
          cookies.set("isShowedTooltip_" + user.id, "no", {
            path: "/",
            maxAge: 3600 * 24 * 30,
          });
        }
      }
    }
  }, [user?.id, isRefreshTokenValid, dispatch, user]);

  return (
    <ThemeProvider theme={base}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
      />
      <GlobalStyles />
      <Suspense fallback={<Spinner size={"large"} message="" />}>
        <Routes>
          {/* public routes */}
          {user && isRefreshTokenValid ? (
            <>
              <Route
                exact
                path={ROUTES.connexion}
                element={<Navigate to={ROUTES.projets} />}
              />
              <Route
                exact
                path={ROUTES.inscription}
                element={<Navigate to={ROUTES.projets} />}
              />
              <Route
                exact
                path={ROUTES.receiveMail}
                element={<Navigate to={ROUTES.projets} />}
              />
            </>
          ) : (
            <>
              <Route path={ROUTES.inscription} element={<InscriptionPage />} />
              <Route path={ROUTES.connexion} element={<ConnexionPage />} />
              <Route path={ROUTES.receiveMail} element={<ReceiveMail />} />
              <Route
                path={ROUTES.confirmAccount}
                element={<AccountConfirmation />}
              />
              <Route path={ROUTES.tokenExpired} element={<TokenExpired />} />
              <Route path={ROUTES.invalidToken} element={<InvalidToken />} />
              <Route
                path={ROUTES.forgotPassword}
                element={<ForgotPassword />}
              />
              <Route path={ROUTES.resetPassword} element={<PasswordReset />} />
            </>
          )}
          {/* user routes */}
          <Route
            element={
              <RequireAuth
                location={location}
                allowedRoles={[ROLES.user, ROLES.admin]}
              />
            }
          >
            <Route
              path="/"
              element={<Navigate to={ROUTES.dashboard} replace />}
            />
            <Route path={ROUTES.dashboard} element={<Dashboard />} />
            <Route path={ROUTES.about} element={<AboutPage />} />
            <Route path={ROUTES.LearnMoreCollab} element={<LearnMoreCollabPage />} />
            <Route path={ROUTES.settings} element={<Settings />} />
            <Route path={ROUTES.profil} element={<Profil />} />
            <Route
              element={
                <RequireAuth location={location} allowedRoles={[ROLES.user]} />
              }
            >
              <Route
                path={ROUTES.projets}
                exact
                element={<ProjectCreation />}
              />

              <Route
                path={ROUTES.projets + "/:projectId"}
              >
                <Route
                  element={
                    <PageBase>
                      <div style={{padding: "20px 40px"}}>
                      <ProtectedRoutesProjects />
                      </div>
                    </PageBase>
                  }
                >
                  <Route index element={<ProjectDetailPage />} />
                  <Route
                    path={ROUTES.analyseMulticriteres}
                    element={<AnalyseMulticriteres />}
                  />
                  <Route path={ROUTES.analysePrevisibilite}>
                    <Route element={<AnalysePrevisibiliteStageProvider />}>
                      <Route index element={<AnalysePrevisibilite />} />
                      <Route
                        path={ROUTES.iteration2}
                        element={<AnalysePrevisibilite iteration2={true} />}
                      />
                      <Route
                        path={ROUTES.brainstorming}
                        element={<BrainStorming />}
                      />
                      <Route
                        path={ROUTES.brainstormingIteration2}
                        element={<BrainStorming iteration2={true} />}
                      />
                      <Route
                        path={ROUTES.multicriteriaAnalyseIteration2}
                        element={<AnalyseMulticritereIteration2 />}
                      />
                    </Route>
                  </Route>

                  <Route
                    path={ROUTES.planExecution}
                    element={<PlanExecution />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>
          {/* admin routes */}
          <Route
            element={
              <RequireAuth location={location} allowedRoles={[ROLES.admin]} />
            }
          >
            <Route path={ROUTES.administration} element={<AdministrationPage />} />
          </Route>
          {/* catch-all 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
