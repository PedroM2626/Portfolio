export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics?: string[];
  created_at: string;
}

export interface ProjectItem {
  id: number;
  name: string;
  image: string;
  date: string;
  tech: string[];
  category?: string;
  description: string;
  demoVideo: string;
  github: string;
  live: string;
}

import { EXCLUDED_REPOS, NAME_OVERRIDES, DESCRIPTION_OVERRIDES, TECH_OVERRIDES } from "./projects.config";

function normalize(name: string): string {
  return name.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function isMLRelated(repo: GitHubRepo): boolean {
  const text = `${repo.name} ${repo.description ?? ""}`.toLowerCase();
  const keywords = [
    "machine learning",
    "deep learning",
    "ml",
    "ai",
    "nlp",
    "vision",
    "cv",
    "pytorch",
    "tensorflow",
    "scikit-learn",
    "xgboost",
    "lstm",
    "transformer",
    "dataset",
    "notebook",
  ];
  const byKeyword = keywords.some((k) => text.includes(k));
  const byLanguage =
    (repo.language ?? "").toLowerCase() === "python" ||
    (repo.language ?? "").toLowerCase() === "jupyter notebook";
  const byTopics =
    Array.isArray(repo.topics) &&
    repo.topics.some((t) =>
      ["machine-learning", "deep-learning", "ai", "ml", "nlp", "cv"].includes(
        t.toLowerCase(),
      ),
    );
  return byKeyword || byLanguage || !!byTopics;
}

export async function fetchUserRepos(
  username: string,
  token?: string,
): Promise<GitHubRepo[]> {
  const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }
  const repos = (await res.json()) as GitHubRepo[];
  return repos;
}

export function mapRepoToProject(repo: GitHubRepo, index: number): ProjectItem {
  const norm = normalize(repo.name);
  const nameOverride = NAME_OVERRIDES[norm];
  const descriptionOverride = DESCRIPTION_OVERRIDES[norm];
  const tech: string[] = [];
  const lang = repo.language;
  if (lang) tech.push(lang);
  // naive tech inference from description
  const d = (repo.description ?? "").toLowerCase();
  if (d.includes("pytorch")) tech.push("PyTorch");
  if (d.includes("tensorflow")) tech.push("TensorFlow");
  if (d.includes("scikit") || d.includes("scikit-learn")) tech.push("Scikit-Learn");
  if (d.includes("transformer") || d.includes("transformers")) tech.push("Transformers");
  if (d.includes("huggingface")) tech.push("Hugging Face");
  if (d.includes("keras")) tech.push("Keras");
  if (d.includes("xgboost")) tech.push("XGBoost");
  if (d.includes("lightgbm")) tech.push("LightGBM");
  if (d.includes("opencv")) tech.push("OpenCV");
  if (d.includes("pandas")) tech.push("Pandas");
  if (d.includes("numpy")) tech.push("NumPy");
  if (d.includes("spacy")) tech.push("spaCy");
  if (d.includes("nltk")) tech.push("NLTK");
  if (d.includes("prophet")) tech.push("Prophet");
  if (d.includes("statsmodels")) tech.push("Statsmodels");
  // topics inference
  if (Array.isArray(repo.topics)) {
    const t = repo.topics.map((x) => x.toLowerCase());
    if (t.includes("pytorch")) tech.push("PyTorch");
    if (t.includes("tensorflow")) tech.push("TensorFlow");
    if (t.includes("scikit-learn")) tech.push("Scikit-Learn");
    if (t.includes("transformers")) tech.push("Transformers");
    if (t.includes("huggingface")) tech.push("Hugging Face");
    if (t.includes("keras")) tech.push("Keras");
    if (t.includes("xgboost")) tech.push("XGBoost");
    if (t.includes("lightgbm")) tech.push("LightGBM");
    if (t.includes("opencv")) tech.push("OpenCV");
    if (t.includes("pandas")) tech.push("Pandas");
    if (t.includes("numpy")) tech.push("NumPy");
    if (t.includes("spacy")) tech.push("spaCy");
    if (t.includes("nltk")) tech.push("NLTK");
    if (t.includes("prophet")) tech.push("Prophet");
    if (t.includes("statsmodels")) tech.push("Statsmodels");
  }
  const manualTech = TECH_OVERRIDES[norm] ?? [];
  const mergedTech = Array.from(new Set([...tech, ...manualTech]));

  return {
    id: 100000 + index,
    name: nameOverride ?? repo.name,
    image: "/placeholder.svg",
    date: new Date(repo.created_at).getFullYear().toString(),
    tech: mergedTech.length ? mergedTech : ["Python"],
    category: "ai-ml",
    description: descriptionOverride ?? repo.description ?? "Projeto de IA/ML",
    demoVideo: "",
    github: repo.html_url,
    live: "",
  };
}

export async function loadMLProjectsFromGitHub(): Promise<ProjectItem[]> {
  const username = import.meta.env.VITE_GITHUB_USERNAME as string;
  const token = (import.meta.env.VITE_GITHUB_TOKEN as string) || undefined;
  if (!username) return [];
  try {
    const repos = await fetchUserRepos(username, token);
    const mlRepos = repos
      .filter(isMLRelated)
      .filter((r) => !EXCLUDED_REPOS.map(normalize).includes(normalize(r.name)));
    return mlRepos.map((r, i) => mapRepoToProject(r, i));
  } catch (e) {
    console.error("Erro ao carregar projetos do GitHub:", e);
    return [];
  }
}
