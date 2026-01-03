import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation();
  const current = (i18n.language || "pt").split("-")[0] as "pt" | "en";

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant={current === "pt" ? "default" : "outline"}
        size="sm"
        onClick={() => i18n.changeLanguage("pt")}
      >
        PT
      </Button>
      <Button
        variant={current === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => i18n.changeLanguage("en")}
      >
        EN
      </Button>
    </div>
  );
};

