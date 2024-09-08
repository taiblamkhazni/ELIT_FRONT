/**
 * @file UserApi.test.js
 * @brief Ce fichier contient des tests pour le composant UserApi.
 */
import { Snackbar } from "utils/Snackbar/Snackbar";
import { SwalSnackBarError, SwalSnackBarSuccess, SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";

import { axiosApi, axiosApiFormData, axiosBlobApi } from "../axios";
import {
  deleteAvatarByUserId,
  getAvatarByUserIdApi,
  getUserById,
  getUsersApi,
  getUsersByKeywordApi,
  updateAvatarByUserId,
  updatePasswordByUserId,
  updateUserInfosByUserId,
} from "../UserApi";

jest.mock("../axios");
jest.mock("utils/Snackbar/Snackbar");
describe("when users list is fetched successfully", () => {
  let mockedDataUsersList;
  beforeEach(() => {
    mockedDataUsersList = [
      {
        userId: "1",
        userFirstName: "test 1st name",
        userLastName: "test last name",
        username: "tester",
        userEmail: "test@test.com",
        userJob: "Développeur Full stack",
      },
      {
        userId: "2",
        userFirstName: "2nd first name",
        userLastName: "2nd last name",
        username: "tester 2",
        userEmail: "2@2.com",
        userJob: "Project manager",
      },
    ];
  });

  it("should return users list", async () => {
    axiosApi.mockResolvedValueOnce({ data: mockedDataUsersList });
    const result = await getUsersApi();
    expect(result).toEqual(mockedDataUsersList);
  });

  it("should handle errors", async () => {
    const mockError = new Error("Request failed");
    console.log = jest.fn();
    axiosApi.mockRejectedValueOnce(mockError);

    try {
      await getUsersApi();
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });
});

describe("when user data is fetched successfully", () => {
  let mockedDataUser;
  beforeEach(() => {
    mockedDataUser = {
      userId: "1",
      userFirstName: "John",
      userLastName: "Doe",
      username: "user",
      userEmail: "user@user.com",
      userJob: "Développeur front",
    };
  });

  const userId = "1";
  it("should return data or userId=1", async () => {
    axiosApi.mockResolvedValueOnce({ data: mockedDataUser });
    const result = await getUserById(userId);
    expect(result).toEqual(mockedDataUser);
  });

  it("should handle errors", async () => {
    const mockError = new Error("Request failed");
    axiosApi.mockRejectedValueOnce(mockError);

    try {
      await getUserById(userId);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });
});

describe("when user list by key is fetched successfully", () => {
  let mockedDataUsersList;
  beforeEach(() => {
    mockedDataUsersList = [
      {
        userId: "1",
        userFirstName: "test 1st name",
        userLastName: "test last name",
        username: "tester",
        userEmail: "test@test.com",
        userJob: "Développeur Full stack",
      },
      {
        userId: "2",
        userFirstName: "2nd first name",
        userLastName: "2nd last name",
        username: "tester 2",
        userEmail: "2@2.com",
        userJob: "Project manager",
      },
    ];
  });
  let keyword = "test";
  it("should return users list", async () => {
    axiosApi.mockResolvedValueOnce({ data: mockedDataUsersList });
    const result = await getUsersByKeywordApi(keyword);
    expect(result).toEqual(mockedDataUsersList);
  });

  it("should handle errors", async () => {
    const mockError = new Error("Request failed");
    axiosApi.mockRejectedValueOnce(mockError);

    try {
      await getUsersByKeywordApi(keyword);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });
});

describe("updateAvatarByUserId function", () => {
  const userId = "123";
  const formData = new FormData();

  beforeEach(() => {
    axiosApiFormData.mockClear();
  });

  it("should call axiosApiFormData with the correct arguments and return the response data", async () => {
    const mockedResponse = { data: { success: true } };
    axiosApiFormData.mockResolvedValueOnce(mockedResponse);

    const result = await updateAvatarByUserId(userId, formData);

    expect(axiosApiFormData).toHaveBeenCalledWith({
      endpoint: `/user/avatar/${userId}`,
      method: "PUT",
      body: formData,
    });

    expect(result).toEqual(mockedResponse.data);
  });

  it("should throw an error and call console.error and SwalWithBootstrapButtons.fire when an error occurs", async () => {
    const mockError = new Error("Request failed");
    axiosApiFormData.mockRejectedValueOnce(mockError);
    console.error = jest.fn();

    try {
      await updateAvatarByUserId(userId, formData);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
    expect(Snackbar).toHaveBeenCalledWith(
      "error",
      "Une erreur est survenue lors de l'enregistrement de votre photo !"
    );
    expect(Snackbar).toHaveBeenCalledTimes(1);
  });
});

describe("deleteAvatarByUserId function", () => {
  const userId = "123";
  const formData = new FormData();

  beforeEach(() => {
    axiosApiFormData.mockClear();
  });

  it("should call axiosApiFormData with the correct arguments and return the response data", async () => {
    const mockedResponse = { data: { success: true } };
    axiosApiFormData.mockResolvedValueOnce(mockedResponse);

    const result = await deleteAvatarByUserId(userId, formData);

    expect(axiosApiFormData).toHaveBeenCalledWith({
      endpoint: `/user/avatar/${userId}`,
      method: "DELETE",
      body: formData,
    });

    expect(result).toEqual(mockedResponse.data);
  });

  it("should throw an error and call console.error and SwalWithBootstrapButtons.fire when an error occurs", async () => {
    const mockError = new Error("Request failed");
    axiosApiFormData.mockRejectedValueOnce(mockError);
    console.error = jest.fn();

    try {
      await deleteAvatarByUserId(userId, formData);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
    expect(Snackbar).toHaveBeenCalledWith(
      "error",
      "Une erreur est survenue, votre photo n'a pas été supprimée !"
    );
    expect(Snackbar).toHaveBeenCalledTimes(1);
  });
});

describe("when user information is updated successfully", () => {
  let mockedData;
  const userId = "123";
  const formData = { name: "test name", email: "test@test.com" };

  beforeEach(() => {
    mockedData = { message: "User information updated successfully" };
  });

  it("should return a success message", async () => {
    axiosApiFormData.mockResolvedValueOnce({ data: mockedData });

    const result = await updateUserInfosByUserId(userId, formData);
    expect(result).toEqual(mockedData);
  });

  it("should handle errors", async () => {
    const mockError = new Error("Request failed");
    axiosApiFormData.mockRejectedValueOnce(mockError);

    try {
      await updateUserInfosByUserId(userId, formData);
    } catch (error) {
      expect(error).toEqual(mockError);
      expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
        title: "Oops...",
        text: "Une erreur de mettre à jour de informations d'utilisateur du utilisateur est survenue!",
      });
    }
  });
});

describe("updatePasswordByUserId", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update user password and show success message", async () => {
    const userId = "1";
    const formData = { oldPassword: "oldPassword", newPassword: "newPassword" };
    const resData = { data: "success", status: 200 };
    axiosApiFormData.mockResolvedValueOnce(resData);
    const fireSpy = jest.spyOn(SwalSnackBarSuccess, "fire");

    const result = await updatePasswordByUserId(userId, formData);

    expect(result).toEqual(resData.data);
    expect(axiosApiFormData).toHaveBeenCalledTimes(1);
    expect(axiosApiFormData).toHaveBeenCalledWith({
      endpoint: `/user/password/${userId}`,
      method: "PUT",
      body: formData,
    });
    expect(fireSpy).toHaveBeenCalledWith({
      text: "success",
    });
  });

  it("should handle error and show error message", async () => {
    const userId = "1";
    const formData = { oldPassword: "oldPassword", newPassword: "newPassword" };
    const mockError = { response: { data: "error", status: 400 } };
    axiosApiFormData.mockRejectedValueOnce(mockError);
    const fireSpy = jest.spyOn(SwalSnackBarError, "fire");

    try {
      await updatePasswordByUserId(userId, formData);
    } catch (error) {
      expect(error).toEqual(mockError);
      expect(axiosApiFormData).toHaveBeenCalledTimes(1);
      expect(axiosApiFormData).toHaveBeenCalledWith({
        endpoint: `/user/password/${userId}`,
        method: "PUT",
        body: formData,
      });
      expect(fireSpy).toHaveBeenCalledWith({
        text: "Une erreur est survenue, votre nouveau mot de passe n’a pas été enregistré.",
      });
    }
  });
});

describe("getAvatarByUserIdApi", () => {
  const mockedUserId = 1;

  it("should return null when the avatar file size is zero", async () => {
    const mockedBlob = new Blob([""], { type: "image/png" });
    const mockedResponse = { status: 200, data: mockedBlob };

    axiosBlobApi.mockResolvedValueOnce(mockedResponse);

    const result = await getAvatarByUserIdApi(mockedUserId);

    expect(result).toBe(null);
  });

  it("should throw an error when the API call fails", async () => {
    const mockedError = new Error("Request failed");
    axiosBlobApi.mockRejectedValueOnce(mockedError);

    try {
      await getAvatarByUserIdApi(mockedUserId);
    } catch (error) {
      expect(error).toEqual(mockedError);
    }
  });
});
