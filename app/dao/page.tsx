"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadingCard from "@/lib/components/loading-card";
import ErrorCard from "@/lib/components/error-card";
import PageTitleBar from "@/lib/components/page-title-bar";
import { useRouter } from "next/navigation";
import { selectionFeedback } from "@tauri-apps/plugin-haptics";
import DAOInfoCard from "./_components/dao-info-card";
import TreasuryCard from "./_components/treasury-card";
import ProposalsCard from "./_components/proposals-card";
import InfoCard from "./_components/info-card";

enum State {
  Loading,
  Loaded,
  Error,
}

export default function DAOPage() {
  const router = useRouter();
  const [state, setState] = React.useState(State.Loading);

  const handleBack = async () => {
    await selectionFeedback();
    router.push("/home");
  };

  // Simple initialization - just check if we can load the page
  React.useEffect(() => {
    // Minimal delay to show loading state briefly
    const timer = setTimeout(() => {
      setState(State.Loaded);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "unset",
        height: "auto",
        bgcolor: "#f5f6fa",
        pb: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <PageTitleBar
        title="DAO"
        leftAction={
          <IconButton onClick={handleBack} sx={{ color: "#fff" }}>
            <ArrowBackIcon />
          </IconButton>
        }
      />

      {state === State.Loading && <LoadingCard />}
      {state === State.Error && <ErrorCard />}

      {state === State.Loaded && (
        <Box sx={{ width: "100%", maxWidth: 480, px: 2 }}>
          <DAOInfoCard />
          <TreasuryCard />
          <ProposalsCard />
          <InfoCard />
        </Box>
      )}
    </Box>
  );
}
