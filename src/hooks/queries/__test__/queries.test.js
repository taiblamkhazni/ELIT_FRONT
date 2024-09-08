/**
 * @file queries.test.js
 * @brief This file contains tests for MenuTitle component.
 */
import { deleteFileApi } from "hooks/apis/FileApi";
import { getUsersApi } from "hooks/apis/UserApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";

import { renderHook } from "@testing-library/react";

import {
  AddComment,
  addFilesToProjectByIdQuery,
  addNewProject,
  deleteColabProjectApiQuery,
  DeleteCommentByCommentIdQuery,
  deleteFileById,
  deleteProject,
  getUsers,
  ModifyQuestionMultiQuery,
  postVotePlanExecutionQuery,
  ValidateCommentQuery,
  validateProject,
} from "../queries";

jest.mock("react-query");
jest.mock("hooks/apis/ProjetApi");
jest.mock("hooks/apis/UserApi");
jest.mock("utils/Swal/SwalComponents");
jest.mock('hooks/apis/FileApi');
jest.mock('react-query');
deleteFileApi.mockImplementation(() => Promise.resolve({ status: 200 }));


/**
 * @brief Tests the addNewProject function.
 */
describe("addNewProject", () => {
  it("should invalidate projectsNewApi query and show success message on success", async () => {
    const mockQueryClient = { invalidateQueries: jest.fn() };
    useQueryClient.mockReturnValue(mockQueryClient);
    useMutation.mockImplementation((mutationFn, { onSuccess }) => {
      const mockMutate = async () => {
        await mutationFn();
        onSuccess();
      };
      return { mutate: mockMutate };
    });
    SwalWithBootstrapButtons.fire.mockResolvedValue({});

    const { result } = renderHook(() => addNewProject());
    const { mutate } = result.current;

    await mutate();

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith([
      "projectsNewApi",
    ]);
    expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
      confirmButtonColor: "#3085d6",
      text: "Votre projet a été enregistré avec succès !",
    });
  });
});

/**
 * @brief Tests the deleteProject function.
 */
describe("deleteProject", () => {
  it("should invalidate projectsNewApi query and show success message on success", async () => {
    const mockQueryClient = { invalidateQueries: jest.fn() };

    useQueryClient.mockReturnValue(mockQueryClient);
    useMutation.mockImplementation((mutationFn, { onSuccess }) => {
      const mockMutate = async () => {
        await mutationFn();
        onSuccess();
      };
      return { mutate: mockMutate };
    });
    SwalWithBootstrapButtons.fire.mockResolvedValue({});

    const { result } = renderHook(() => deleteProject());
    const { mutate } = result.current;

    await mutate();

    expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith(
      "Projet supprimé!",
      "Votre projet a été supprimé."
    );
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith([
      "projectsNewApi",
    ]);
  });
});

/**
 * @brief Tests the validateProject function.
 */
describe("validateProject", () => {
  it("should invalidate projects query and show success message on success", async () => {
    const mockQueryClient = { invalidateQueries: jest.fn() };

    useQueryClient.mockReturnValue(mockQueryClient);
    useMutation.mockImplementation((mutationFn, { onSuccess }) => {
      const mockMutate = async (args) => {
        await mutationFn(args);
        onSuccess();
      };
      return { mutate: mockMutate };
    });
    SwalWithBootstrapButtons.fire.mockResolvedValue({});

    const { result } = renderHook(() => validateProject());
    const { mutate } = result.current;

    const projectId = "project-id";

    await mutate([projectId]);

    expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith(
      "Projet confirmé",
      "Le projet a été confirmé avec succès."
    );
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith([
      "projects",
    ]);
  });
});

/**
 * @brief Tests the deleteColabProjectApiQuery function.
 */
describe("deleteColabProjectApiQuery", () => {
  it("should invalidate getMethodesPlanExecution query on success", async () => {
    const mockQueryClient = { invalidateQueries: jest.fn() };

    useQueryClient.mockReturnValue(mockQueryClient);
    useMutation.mockImplementation((mutationFn, { onSuccess }) => {
      const mockMutate = async (args) => {
        await mutationFn(args);
        onSuccess();
      };
      return { mutate: mockMutate };
    });

    const { result } = renderHook(() => deleteColabProjectApiQuery());
    const { mutate } = result.current;

    const projectId = "project-id";
    const collabId = "collab-id";

    await mutate([projectId, collabId]);

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith([
      "getMethodesPlanExecution",
    ]);
  });
});

/**
 * @brief Tests the getUsers function.
 */
describe("getUsers", () => {
  it("should call getUsersApi with the correct parameters", async () => {
    const mockData = [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
    ];

    useQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => getUsers());

    expect(useQuery).toHaveBeenCalledWith("users", getUsersApi, {
      staleTime: 100000,
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockData);
  });
});

/**
 * @brief Tests the deleteFileById function.
 */
describe('deleteFileById', () => {
  it('should invalidate projectsById query and show success message on success', async () => {
      const mockQueryClient = { invalidateQueries: jest.fn() };

      useQueryClient.mockReturnValue(mockQueryClient);
      useMutation.mockImplementation((mutationFn, { onSuccess }) => {
          const mockMutate = async ([attachmentId, projectId]) => {
              await mutationFn([attachmentId, projectId]);
              onSuccess();
          };
          return { mutate: mockMutate };
      });
      SwalWithBootstrapButtons.fire.mockResolvedValue({});

      const { result } = renderHook(() => deleteFileById());
      const { mutate } = result.current;


      const attachmentId = 'attachment-id';
      const projectId = 'project-id';

      await mutate([attachmentId, projectId]);

      expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith(
          'Fichier supprimé!',
          'Ce fichier a été supprimé.'
      );
      expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith(['projectsById']);
  });
});

/**
 * @brief Tests the addFilesToProjectByIdQuery function.
 */
describe("addFilesToProjectByIdQuery", () => {
  it("should invalidate addFilesToProjectByIdQuery query on success", async () => {
    const mockQueryClient = { invalidateQueries: jest.fn() };

    useQueryClient.mockReturnValue(mockQueryClient);
    useMutation.mockImplementation((mutationFn, { onSuccess }) => {
      const mockMutate = async ([projectId, formData]) => {
        await mutationFn([projectId, formData]);
        onSuccess();
      };
      return { mutate: mockMutate };
    });

    const { result } = renderHook(() => addFilesToProjectByIdQuery());
    const { mutate } = result.current;

    const projectId = "project-id";
    const formData = "";

    await mutate([projectId, formData]);

    expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
      text: "Ces fichiers ont été ajoutés avec succès.",
    });

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith([
      "projectsById",
    ]);
  });
});

/**
 * @brief Tests the DeleteCommentByCommentIdQuery function.
 */
describe("DeleteCommentByCommentIdQuery", () => {
  it("should show success message on success", async () => {
    const mockQueryClient = { invalidateQueries: jest.fn() };

    useQueryClient.mockReturnValue(mockQueryClient);
    useMutation.mockImplementation((mutationFn, { onSuccess }) => {
      const mockMutate = async (args) => {
        await mutationFn(args);
        onSuccess();
      };
      return { mutate: mockMutate };
    });

    const { result } = renderHook(() => DeleteCommentByCommentIdQuery());
    const { mutate } = result.current;
    const projectId = "project-id";
    const payload = {};
    await mutate([payload, projectId]);

    expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
      text: "Votre commentaire a été supprimé.",
    });
  });
});

/**
 * @brief Tests the AddComment function.
 */
describe("AddComment", () => {
  it("should show success message on success", async () => {
    const mockQueryClient = { invalidateQueries: jest.fn() };

    useQueryClient.mockReturnValue(mockQueryClient);
    useMutation.mockImplementation((mutationFn, { onSuccess }) => {
      const mockMutate = async (args) => {
        await mutationFn(args);
        onSuccess();
      };
      return { mutate: mockMutate };
    });

    const { result } = renderHook(() => AddComment());
    const { mutate } = result.current;
    const projectId = "project-id";
    const payload = {};

    await mutate([payload, projectId]);

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith([
      "getBrainstorming",
    ]);
  });
});

/**
 * @brief Tests the ValidateCommentQuery function.
 */
describe("ValidateCommentQuery", () => {
  it("should show success message on success", async () => {
    const mockQueryClient = { invalidateQueries: jest.fn() };

    useQueryClient.mockReturnValue(mockQueryClient);
    useMutation.mockImplementation((mutationFn, { onSuccess }) => {
      const mockMutate = async (args) => {
        await mutationFn(args);
        onSuccess();
      };
      return { mutate: mockMutate };
    });

    const { result } = renderHook(() => ValidateCommentQuery());
    const { mutate } = result.current;

    const brainstormingId = 1;
    const payload = "payload";

    await mutate([brainstormingId, payload]);

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith([
      "getBrainstorming",
    ]);
  });
});

/**
 * @brief Tests the ModifyQuestionMultiQuery function.
 */
describe("ModifyQuestionMultiQuery", () => {
  it("should show success message on success", async () => {
    const mockQueryClient = { invalidateQueries: jest.fn() };

    useQueryClient.mockReturnValue(mockQueryClient);
    useMutation.mockImplementation((mutationFn, { onSuccess }) => {
      const mockMutate = async (args) => {
        await mutationFn(args);
        onSuccess();
      };
      return { mutate: mockMutate };
    });

    const { result } = renderHook(() => ModifyQuestionMultiQuery());
    const { mutate } = result.current;

    const projectId = "project-id";
    const payload = {};

    await mutate([payload, projectId]);

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith([
      "getBrainstorming",
    ]);
  });
});

/**
 * @brief Tests the postVotePlanExecutionQuery function.
 */
describe("postVotePlanExecutionQuery", () => {
  it("should show success message on success", async () => {
    const mockQueryClient = { invalidateQueries: jest.fn() };

    useQueryClient.mockReturnValue(mockQueryClient);
    useMutation.mockImplementation((mutationFn, { onSuccess }) => {
      const mockMutate = async (args) => {
        await mutationFn(args);
        onSuccess();
      };
      return { mutate: mockMutate };
    });

    const { result } = renderHook(() => postVotePlanExecutionQuery());
    const { mutate } = result.current;

    await mutate();

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith([
      "getMethodesPlanExecution",
    ]);
  });
});
