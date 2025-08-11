"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Content from "./_components/content";
import { useRouter } from "next/navigation";
import { selectionFeedback } from "@tauri-apps/plugin-haptics";

export default function Page() {
  const router = useRouter();

  const handleBack = async () => {
    await selectionFeedback();
    router.back();
  };

  return (
    <React.Suspense>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "linear-gradient(135deg, #FAFBFF 0%, #F8FAFF 100%)",
          background: "linear-gradient(135deg, #FAFBFF 0%, #F8FAFF 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pb: 8,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 420,
            px: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 2,
            }}
          >
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              sx={{
                minWidth: 0,
                px: 2,
                py: 1,
                fontSize: "16px",
                fontWeight: 500,
                color: "#8B5CF6",
                borderRadius: "12px",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "rgba(139, 92, 246, 0.08)",
                },
              }}
            >
              Back
            </Button>
            <Typography
              variant="h5"
              sx={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#1F2937",
                letterSpacing: "-0.02em",
              }}
            >
              Buy Crypto
            </Typography>
            <Box sx={{ width: 80 }} /> {/* Spacer for center alignment */}
          </Box>
        </Box>

        <Box sx={{ width: "100%", maxWidth: 480, alignItems: "center" }}>
          <Content />
        </Box>
      </Box>
    </React.Suspense>
  );
}
