/**
 * @file AuthProvider.test.js
 * @brief Ce fichier contient les tests pour la partie autnetification
 */
import axios from "axios";
import useAuth from "hooks/useAuth/useAuth";

import { render, waitFor } from "@testing-library/react";

import { AuthProvider } from "../AuthProvider"
const mockDispatch = jest.fn();
jest.mock("axios");
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/",
  }),
  useNavigate: () => mockedUsedNavigate,
}));
let login;
let register;
let registerAgain;
let logout;
let setTokens;
const TestingComponent = () => {
  const { registerUser, loginUser, logoutUser, setAuthTokens } = useAuth();
  login = () => { loginUser({ email: "email@test.co" }) };
  register = () => { registerUser({ firstname: "test", lastname: "test1", email: "email@test.co", password: "1234Azerty!?" }, "register") };
  registerAgain = () => { registerUser({ firstname: "test" }, "registerAgain") };
  logout = () => logoutUser();
  setTokens = (tokens) => waitFor(() => setAuthTokens(tokens));

  return <></>;
};
const tokenJson =
  '{"refresh-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c","access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"}';
beforeEach(() => {

  Storage.prototype.getItem = jest.fn(() => tokenJson);
})
/**
 * @brief test unitaire pour l'authentification d'un user
 */
describe("Auth provider", () => {
  it("Auth provider Login user", async () => {

    const payload = { data: tokenJson }
    await waitFor(() => axios.mockResolvedValueOnce(payload));
    render(
      <AuthProvider>
        <TestingComponent />
      </AuthProvider>
    );

    await waitFor(() => login());
    expect(axios).toHaveBeenCalled();

  });
  /**
   * cas d'erreur 401
   */
  it("Auth provider Login user on Error 401", async () => {

    const payload = { response: { status: 401 } }
    await waitFor(() => axios.mockRejectedValue(payload));
    render(
      <AuthProvider>
        <TestingComponent />
      </AuthProvider>
    );
    await waitFor(() => login());
    expect(axios).toHaveBeenCalled();
  });
  /**
   * Cas d'erreur 403
   */
  it("Auth provider Login user on Error 403", async () => {

    const payload = { response: { status: 403 } }
    await waitFor(() => axios.mockRejectedValue(payload));
    render(
      <AuthProvider>
        <TestingComponent />
      </AuthProvider>
    );
    await waitFor(() => login());
    expect(axios).toHaveBeenCalled();
  });
  /**
   * cas d'erreur 500
   */
  it("Auth provider Login user on Error 500", async () => {

    const payload = { response: { status: 500 } }
    await waitFor(() => axios.mockRejectedValue(payload));
    render(
      <AuthProvider>
        <TestingComponent />
      </AuthProvider>
    );
    await waitFor(() => login());
    expect(axios).toHaveBeenCalled();
  });
  /**
   * register user
   */
  it("Auth provider Register user", async () => {

    const payload = { status: 201 }
    await waitFor(() => axios.mockResolvedValueOnce(payload));
    render(
      <AuthProvider>
        <TestingComponent />
      </AuthProvider>
    );
    await waitFor(() => register());
    expect(axios).toHaveBeenCalledTimes(1);

  });
  /**
 * cas de registre encore un utilisateur
 */
it("Auth provider Register Again User", async () => {
  const payload = { status: 201 }
  await waitFor(() => axios.mockResolvedValueOnce(payload));

  render(
      <AuthProvider>
          <TestingComponent />
      </AuthProvider>
  );

  await waitFor(() => registerAgain());  // Utilisez registerAgain ici
  expect(axios).toHaveBeenCalledTimes(1);
});

  /**
   * register error
   */
  it("Auth provider Register user Error", async () => {

    await waitFor(() => axios.mockRejectedValue());
    render(
      <AuthProvider>
        <TestingComponent />
      </AuthProvider>
    );

    await waitFor(() => register());
    expect(axios).toHaveBeenCalledTimes(1);

  });
  /**
   * cas de register error 409
   */
  it("Auth provider Register user on Error 409", async () => {

    const payload = { response: { status: 409 } }
    await waitFor(() => axios.mockRejectedValue(payload));
    render(
      <AuthProvider>
        <TestingComponent />
      </AuthProvider>
    );

    await waitFor(() => register());
    expect(axios).toHaveBeenCalledTimes(1);

  });
  /**
   * cas Logout de user
   */
  it("Auth provider Logout User", async () => {

    const payload = { status: 200 }
    await waitFor(() => axios.mockResolvedValueOnce(payload));

    render(
      <AuthProvider>
        <TestingComponent />
      </AuthProvider>
    );
    await waitFor(() => logout());
  });
  /**
   * set du token user
   */
  it("Auth provider Set Tokens User", async () => {

    const payload = { status: 200 }
    await waitFor(() => axios.mockResolvedValueOnce(payload));

    render(
      <AuthProvider>
        <TestingComponent />
      </AuthProvider>
    );

    setTokens(tokenJson);

  });
});

