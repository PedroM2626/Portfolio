import { describe, it, expect } from "vitest";
import { mapRepoToProject } from "./github";

describe("github ML mapping", () => {
  it("maps basic repo to ML project with default tech", () => {
    const project = mapRepoToProject(
      {
        name: "ml-classifier",
        description: "Simple machine learning classifier in Python",
        html_url: "https://github.com/test/ml-classifier",
        language: "Python",
        created_at: new Date("2024-01-01").toISOString(),
      },
      1,
    );
    expect(project.category).toBe("ai-ml");
    expect(project.tech).toContain("Python");
    expect(project.github).toContain("github.com");
  });
});
