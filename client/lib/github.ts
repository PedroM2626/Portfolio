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
  const tech: string[] = [];
  const lang = repo.language;
  if (lang) tech.push(lang);
  // naive tech inference from description
  const d = (repo.description ?? "").toLowerCase();
  if (d.includes("pytorch")) tech.push("PyTorch");
  if (d.includes("tensorflow")) tech.push("TensorFlow");
  if (d.includes("scikit")) tech.push("Scikit-Learn");
  if (d.includes("opencv")) tech.push("OpenCV");

  return {
    id: 100000 + index,
    name: repo.name,
    image: "/placeholder.svg",
    date: new Date(repo.created_at).getFullYear().toString(),
    tech: tech.length ? tech : ["Python"],
    category: "ai-ml",
    description: repo.description ?? "Projeto de IA/ML",
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
    const mlRepos = repos.filter(isMLRelated);
    return mlRepos.map((r, i) => mapRepoToProject(r, i));
  } catch (e) {
    console.error("Erro ao carregar projetos do GitHub:", e);
    return [];
  }
}
