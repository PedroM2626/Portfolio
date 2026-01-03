export const EXCLUDED_REPOS = [
  "orb-run",
  "util-tools-discord-boot",
  "fastin-vision-chat",
  "deep-chat-discord",
  "cv-boost",
  "ml-azure-experiments",
  "ml-azure experiments",
  "collegefunctions",
  "util-tools",
  "task manager",
];

export const NAME_OVERRIDES: Record<string, string> = {
  "hackathon": "Previsão forecast",
  "chatbot-previsao-ia": "Chatbot de previsão",
  "assistente-virtual": "Assistente virtual",
};

export const DESCRIPTION_OVERRIDES: Record<string, string> = {};

export const FEATURED_REPOS: Record<string, string | undefined> = {
  "senti-pred": undefined,
  "chatbot-previsao-ia": "Chatbot de previsão",
  "assistente-virtual": "Assistente virtual",
};

export const TECH_OVERRIDES: Record<string, string[]> = {
  "senti-pred": ["Python", "Scikit-Learn", "Pandas", "NumPy", "Transformers", "Hugging Face"],
  "chatbot-previsao-ia": ["Python", "Transformers", "Hugging Face", "Flask", "Scikit-Learn"],
  "assistente-virtual": ["Python", "Transformers", "Hugging Face", "Keras", "Pandas", "NumPy"],
  "previsao-forecast": ["Python", "Prophet", "Statsmodels", "Pandas", "NumPy"]
}
