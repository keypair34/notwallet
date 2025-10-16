"use client";

import Box from "@mui/material/Box";
import HomeView from "./_components/home-view";
import PageTitleBar from "@lib/components/page-title-bar";
import { useI18n } from "@lib/i18n/provider";
import { useLang } from "@src/LanguageContext";

export default function HomePage() {
  //const { t } = useI18n();
  const { t, lang } = useLang();

  return (
    <Box
      sx={{
        minHeight: "unset",
        bgcolor: "#f5f6fa",
        pb: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <PageTitleBar title={""} />
      <HomeView />
    </Box>
  );
}
