import { Todo } from "@prisma/client";
import {
  convertCMSTodosForDB,
  decrementChapter,
  decrementStep,
  generatePreviousLink,
  incrementChapter,
  incrementStep,
} from "../app/onboarding/[teamId]/[chapterId]/[stepId]/utils";
import { describe, expect, test } from "vitest";

describe("utils: step", () => {
  test(" it should increment the step by one", () => {
    const result = incrementStep("/onboarding", 1, "1");
    expect(result).toBe("/onboarding/1/2");
  });

  test(" it should increment the step by one", () => {
    const result = incrementStep("/onboarding", 1, " 1");
    expect(result).toBe("/onboarding/1/2");
  });

  test("decrementStep", ({ expect }) => {
    // Test if the step is correctly decremented
    expect(decrementStep("/book", 2, "2")).toBe("/book/2/2");

    // Test if it returns the path to the previous step in the same chapter
    expect(decrementStep("/book", 1, "1")).toBe("/book/1/0");

    // Test edge cases
    expect(decrementStep("/book", 2, "0")).toBe("/book/2/0"); // does not allow to decrement below 0

    // Test complex base path
    expect(decrementStep("/book/subsection", 2, "3")).toBe(
      "/book/subsection/2/2"
    ); // Correctly handle a complex base path
  });

  test("should increment the chapter number and return the next chapter path", () => {
    const basePath = "/book";
    const currentChapter = "2";
    const expectedPath = "/book/3/1";

    const result = incrementChapter(basePath, { firstStepId: "1", id: 3 });

    expect(result).toEqual(expectedPath);
  });

  test("should decrement the chapter number and return the previous chapter path", () => {
    const basePath = "/book";
    const currentChapter = 2;
    const totalStepsOfPreviousChapter = "123";
    const expectedPath = "/book/1/10";

    const result = decrementChapter(
      basePath,
      currentChapter,
      totalStepsOfPreviousChapter
    );

    expect(result).toEqual(expectedPath);
  });

  test("should return the previous chapter path if isFirstStepInChapter is true", () => {
    const basePath = "/book";
    const currentChapter = 2;
    const currentStep = "1";
    const totalStepsOfPreviousChapter = "10";
    const isFirstStepInChapter = true;
    const expectedPath = "/book/1/10";

    const result = generatePreviousLink(
      isFirstStepInChapter,
      basePath,
      currentChapter,
      currentStep,
      totalStepsOfPreviousChapter
    );

    expect(result).toEqual(expectedPath);
  });

  test("should return the previous step path if isFirstStepInChapter is false", () => {
    const basePath = "/book";
    const currentChapter = 2;
    const currentStep = "2";
    const totalStepsOfPreviousChapter = "10";
    const isFirstStepInChapter = false;
    const expectedPath = "/book/2/1";

    const result = generatePreviousLink(
      isFirstStepInChapter,
      basePath,
      currentChapter,
      currentStep,
      totalStepsOfPreviousChapter
    );

    expect(result).toEqual(expectedPath);
  });

  test("should convert CMS todos to DB todos", () => {
    const cmsTodos = {
      onboardStep: {
        linkedFrom: {
          todoCollection: {
            items: [
              {
                title: "Todo 1",
                description: "Description 1",
                sys: { id: "1" },
              },
              {
                title: "Todo 2",
                description: "Description 2",
                sys: { id: "2" },
              },
            ],
          },
        },
      },
    };
    const owner = "test";
    const dbTodos: Todo[] = [
      {
        title: "Todo 1",
        body: "Description 1",
        cmsId: "1",
        owner,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: "1",
      },
    ];
    const expectedTodos = [
      {
        title: "Todo 1",
        body: "Description 1",
        cmsId: "1",
        owner,
        completed: true,
      },
      {
        title: "Todo 2",
        body: "Description 2",
        cmsId: "2",
        owner,
        completed: false,
      },
    ];

    const result = convertCMSTodosForDB(cmsTodos, owner, dbTodos);

    expect(result).toEqual(expectedTodos);
  });
});
