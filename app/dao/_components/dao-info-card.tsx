"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { invoke } from "@tauri-apps/api/core";
import { GET_BACH_BALANCE } from "@/lib/commands";
import { debug } from "@tauri-apps/plugin-log";
import { selectionFeedback } from "@tauri-apps/plugin-haptics";

// BACH Token Icon Component
const BachIcon = ({ size = 24 }: { size?: number }) => (
  <img
    src="https://raw.githubusercontent.com/solana-labs/token-list/badd1dbe8c2d1e38c4f77b77f1d5fd5c60d3cccb/assets/mainnet/CTQBjyrX8pYyqbNa8vAhQfnRXfu9cUxnvrxj5PvbzTmf/bach-token-logo-Est.2022.png"
    width={size}
    height={size}
    alt="BACH Token"
    style={{ borderRadius: "50%" }}
  />
);

enum LoadingState {
  Loading,
  Loaded,
  Error,
}

export default function DAOInfoCard() {
  const [state, setState] = React.useState<LoadingState>(LoadingState.Loading);
  const [lockedBachBalance, setLockedBachBalance] = React.useState<string>("-");

  const daoTokenAddress = "9DWkPYFKcjpGVjwCjgAnYM8T6H4hssEnW27rLDtfU8y5";

  const openExplorer = async (address: string) => {
    await selectionFeedback();
    const url = `https://explorer.solana.com/address/${address}`;
    window.open(url, "_blank");
  };

  const loadDAOBalance = async () => {
    try {
      setState(LoadingState.Loading);

      const daoLockedBalance = await invoke<string>(GET_BACH_BALANCE, {
        pubkey: daoTokenAddress,
      });

      debug(`DAO locked BACH balance: ${daoLockedBalance}`);
      setLockedBachBalance(daoLockedBalance);
      setState(LoadingState.Loaded);
    } catch (error) {
      console.error("Error fetching DAO balance:", error);
      setState(LoadingState.Error);
    }
  };

  React.useEffect(() => {
    loadDAOBalance();
  }, []);

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 2,
        boxShadow: "0 2px 16px rgba(153,50,204,0.08)",
        p: 3,
        background:
          "linear-gradient(135deg, rgba(153, 50, 204, 0.85) 0%, rgba(166, 77, 255, 0.8) 100%)",
        color: "#fff",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        color="#fff"
        sx={{ mb: 2, textAlign: "center" }}
      >
        The Stable Foundation
      </Typography>

      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: 2,
          px: 2,
          py: 1.5,
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 1px 4px #9932CC11",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#9932CC",
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: "0.9rem",
            flex: 1,
          }}
        >
          {`${daoTokenAddress.slice(0, 8)}...${daoTokenAddress.slice(-8)}`}
        </Typography>
        <Tooltip title="View on Explorer" arrow>
          <IconButton
            onClick={() => openExplorer(daoTokenAddress)}
            sx={{
              color: "#9932CC",
              ml: 1,
              "&:hover": { bgcolor: "rgba(153, 50, 204, 0.1)" },
            }}
            size="small"
          >
            <OpenInNewIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Typography
        variant="subtitle2"
        sx={{
          color: "#000",
          fontFamily: "Inter, Helvetica Neue, Arial, sans-serif",
          mb: 2,
          letterSpacing: 1,
          textAlign: "center",
        }}
      >
        Locked DAO Tokens
      </Typography>

      {/* Loading State */}
      {state === LoadingState.Loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={32} sx={{ color: "#fff" }} />
        </Box>
      )}

      {/* Error State */}
      {state === LoadingState.Error && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mb: 2 }}>
            Failed to load DAO balance
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#fff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={loadDAOBalance}
          >
            Retry
          </Typography>
        </Box>
      )}

      {/* Loaded State */}
      {state === LoadingState.Loaded && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <BachIcon size={28} />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                color: "#fff",
                textShadow: "0 2px 12px #9932CC55",
                fontFamily: "Inter, Helvetica Neue, Arial, sans-serif",
                fontSize: 28,
              }}
            >
              {lockedBachBalance}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontWeight: "bold",
              }}
            >
              Locked
            </Typography>
          </Box>
        </Stack>
      )}
    </Card>
  );
}
