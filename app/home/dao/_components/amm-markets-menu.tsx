"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { selectionFeedback } from "@tauri-apps/plugin-haptics";
import { BachIcon, SolanaIcon } from "@/lib/components/token-icons";
import { openUrl } from "@tauri-apps/plugin-opener";

interface TokenIconProps {
  symbol: string;
  size?: number;
}

const TokenIcon = ({ symbol, size = 24 }: TokenIconProps) => {
  const getTokenIcon = () => {
    switch (symbol.toUpperCase()) {
      case "SOL":
        return <SolanaIcon size={size} />;
      case "BACH":
        return <BachIcon size={size} />;
      case "USDC":
        return (
          <Avatar
            sx={{
              width: size,
              height: size,
              bgcolor: "#2775ca",
              fontSize: size * 0.4,
              fontWeight: "bold",
            }}
          >
            $
          </Avatar>
        );
      case "USDT":
        return (
          <Avatar
            sx={{
              width: size,
              height: size,
              bgcolor: "#26a17b",
              fontSize: size * 0.4,
              fontWeight: "bold",
            }}
          >
            ₮
          </Avatar>
        );
      case "BONK":
        return (
          <Avatar
            sx={{
              width: size,
              height: size,
              bgcolor: "#ff6b35",
              fontSize: size * 0.3,
              fontWeight: "bold",
            }}
          >
            🐕
          </Avatar>
        );
      case "PEPE":
        return (
          <Avatar
            sx={{
              width: size,
              height: size,
              bgcolor: "#0d9488",
              fontSize: size * 0.3,
              fontWeight: "bold",
            }}
          >
            🐸
          </Avatar>
        );
      case "WIF":
        return (
          <Avatar
            sx={{
              width: size,
              height: size,
              bgcolor: "#8b5cf6",
              fontSize: size * 0.35,
              fontWeight: "bold",
            }}
          >
            W
          </Avatar>
        );
      case "RAY":
        return (
          <Avatar
            sx={{
              width: size,
              height: size,
              bgcolor: "#00d4aa",
              fontSize: size * 0.35,
              fontWeight: "bold",
            }}
          >
            R
          </Avatar>
        );
      case "JUP":
        return (
          <Avatar
            sx={{
              width: size,
              height: size,
              bgcolor: "#ff8c42",
              fontSize: size * 0.35,
              fontWeight: "bold",
            }}
          >
            J
          </Avatar>
        );
      case "ORCA":
        return (
          <Avatar
            sx={{
              width: size,
              height: size,
              bgcolor: "#00c2ff",
              fontSize: size * 0.3,
              fontWeight: "bold",
            }}
          >
            🐋
          </Avatar>
        );
      case "POPCAT":
        return (
          <Avatar
            sx={{
              width: size,
              height: size,
              bgcolor: "#f59e0b",
              fontSize: size * 0.3,
              fontWeight: "bold",
            }}
          >
            🐱
          </Avatar>
        );
      case "BOME":
        return (
          <Avatar
            sx={{
              width: size,
              height: size,
              bgcolor: "#10b981",
              fontSize: size * 0.35,
              fontWeight: "bold",
            }}
          >
            B
          </Avatar>
        );
      case "MEME":
        return (
          <Avatar
            sx={{
              width: size,
              height: size,
              bgcolor: "#ef4444",
              fontSize: size * 0.35,
              fontWeight: "bold",
            }}
          >
            M
          </Avatar>
        );
      case "FLOKI":
        return (
          <Avatar
            sx={{
              width: size,
              height: size,
              bgcolor: "#f97316",
              fontSize: size * 0.35,
              fontWeight: "bold",
            }}
          >
            F
          </Avatar>
        );
      case "SHIB":
        return (
          <Avatar
            sx={{
              width: size,
              height: size,
              bgcolor: "#f59e0b",
              fontSize: size * 0.3,
              fontWeight: "bold",
            }}
          >
            🐕
          </Avatar>
        );
      case "DOGE":
        return (
          <Avatar
            sx={{
              width: size,
              height: size,
              bgcolor: "#eab308",
              fontSize: size * 0.3,
              fontWeight: "bold",
            }}
          >
            🐶
          </Avatar>
        );
      case "SRM":
        return (
          <Avatar
            sx={{
              width: size,
              height: size,
              bgcolor: "#6366f1",
              fontSize: size * 0.35,
              fontWeight: "bold",
            }}
          >
            S
          </Avatar>
        );
      default:
        return (
          <Avatar
            sx={{
              width: size,
              height: size,
              bgcolor: "#6b7280",
              fontSize: size * 0.35,
              fontWeight: "bold",
            }}
          >
            {symbol.charAt(0)}
          </Avatar>
        );
    }
  };

  return getTokenIcon();
};

interface MarketItemProps {
  baseToken: string;
  quoteToken: string;
  platform?: string;
  onClick: () => void;
}

const MarketItem = ({
  baseToken,
  quoteToken,
  platform,
  onClick,
}: MarketItemProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minWidth: 80,
      mx: 0.5,
      my: 1,
    }}
  >
    <Tooltip title={`View ${baseToken}/${quoteToken} on Solscan`} arrow>
      <IconButton
        sx={{
          width: 56,
          height: 56,
          bgcolor: "#fff",
          color: "#9932CC",
          boxShadow: "0 2px 12px rgba(153, 50, 204, 0.15)",
          border: "1px solid rgba(153, 50, 204, 0.1)",
          "&:hover": {
            bgcolor: "#f5f6fa",
            boxShadow: "0 4px 16px rgba(153, 50, 204, 0.25)",
            transform: "translateY(-2px)",
          },
          transition: "all 0.3s ease",
          position: "relative",
          overflow: "visible",
        }}
        onClick={onClick}
      >
        <Stack direction="row" spacing={-0.5} alignItems="center">
          <Box sx={{ position: "relative", zIndex: 2 }}>
            <TokenIcon symbol={baseToken} size={20} />
          </Box>
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              ml: "-4px !important",
            }}
          >
            <TokenIcon symbol={quoteToken} size={18} />
          </Box>
        </Stack>
      </IconButton>
    </Tooltip>
    <Typography
      variant="caption"
      sx={{
        mt: 1,
        color: "#666",
        fontWeight: 500,
        fontSize: "0.7rem",
        textAlign: "center",
        lineHeight: 1.2,
      }}
    >
      {`${baseToken}/${quoteToken}`}
    </Typography>
    {platform && (
      <Typography
        variant="caption"
        sx={{
          color: "#9932CC",
          fontWeight: 600,
          fontSize: "0.6rem",
          textAlign: "center",
          lineHeight: 1,
          textTransform: "uppercase",
        }}
      >
        {platform}
      </Typography>
    )}
  </Box>
);

export default function AMMMarketsMenu() {
  const handleMarketClick = async (tokenAddress: string) => {
    await selectionFeedback();
    const solscanUrl = `https://solscan.io/account/${tokenAddress}`;
    await openUrl(solscanUrl);
  };

  const markets = [
    {
      id: "CwrELqpzvWAsSAk3fts9yb5f1bYftG1EtFtfxQ3knvw9",
      base: "BACH",
      quote: "SOL",
      platform: "orca",
    },
    {
      id: "CwrELqpzvWAsSAk3fts9yb5f1bYftG1EtFtfxQ3knvw9",
      base: "BACH",
      quote: "USDC",
      platform: "orca",
    },
    {
      id: "CwrELqpzvWAsSAk3fts9yb5f1bYftG1EtFtfxQ3knvw9",
      base: "BACH",
      quote: "USDT",
      platform: "jupiter",
    },
    {
      id: "CwrELqpzvWAsSAk3fts9yb5f1bYftG1EtFtfxQ3knvw9",
      base: "BACH",
      quote: "BONK",
      platform: "raydium",
    },
    {
      id: "CwrELqpzvWAsSAk3fts9yb5f1bYftG1EtFtfxQ3knvw9",
      base: "BACH",
      quote: "PEPE",
      platform: "jupiter",
    },
    {
      id: "CwrELqpzvWAsSAk3fts9yb5f1bYftG1EtFtfxQ3knvw9",
      base: "BACH",
      quote: "WIF",
      platform: "raydium",
    },
    {
      id: "CwrELqpzvWAsSAk3fts9yb5f1bYftG1EtFtfxQ3knvw9",
      base: "BACH",
      quote: "RAY",
      platform: "raydium",
    },
    {
      id: "CwrELqpzvWAsSAk3fts9yb5f1bYftG1EtFtfxQ3knvw9",
      base: "BACH",
      quote: "RAY",
      platform: "raydium",
    },
    {
      id: "CwrELqpzvWAsSAk3fts9yb5f1bYftG1EtFtfxQ3knvw9",
      base: "BACH",
      quote: "JUP",
      platform: "jupiter",
    },
    {
      id: "CwrELqpzvWAsSAk3fts9yb5f1bYftG1EtFtfxQ3knvw9",
      base: "BACH",
      quote: "ORCA",
      platform: "orca",
    },
    {
      id: "CwrELqpzvWAsSAk3fts9yb5f1bYftG1EtFtfxQ3knvw9",
      base: "BACH",
      quote: "POPCAT",
      platform: "jupiter",
    },
    {
      id: "CwrELqpzvWAsSAk3fts9yb5f1bYftG1EtFtfxQ3knvw9",
      base: "BACH",
      quote: "BOME",
      platform: "raydium",
    },
    {
      id: "CwrELqpzvWAsSAk3fts9yb5f1bYftG1EtFtfxQ3knvw9",
      base: "BACH",
      quote: "MEME",
      platform: "jupiter",
    },
    {
      id: "CwrELqpzvWAsSAk3fts9yb5f1bYftG1EtFtfxQ3knvw9",
      base: "BACH",
      quote: "FLOKI",
      platform: "jupiter",
    },
    {
      id: "CwrELqpzvWAsSAk3fts9yb5f1bYftG1EtFtfxQ3knvw9",
      base: "BACH",
      quote: "SHIB",
      platform: "jupiter",
    },
    {
      id: "CwrELqpzvWAsSAk3fts9yb5f1bYftG1EtFtfxQ3knvw9",
      base: "BACH",
      quote: "DOGE",
      platform: "jupiter",
    },
    {
      id: "CwrELqpzvWAsSAk3fts9yb5f1bYftG1EtFtfxQ3knvw9",
      base: "BACH",
      quote: "SRM",
      platform: "raydium",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 480,
        px: 2,
        mb: 3,
      }}
    >
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: 3,
          p: 3,
          boxShadow: "0 2px 16px rgba(153, 50, 204, 0.08)",
          border: "1px solid rgba(153, 50, 204, 0.05)",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: "#333",
            fontWeight: 600,
            mb: 2,
            textAlign: "center",
          }}
        >
          Markets
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            px: 1,
            py: 2,
            minHeight: 130,
            alignItems: "flex-start",
            "&::-webkit-scrollbar": {
              height: 6,
            },
            "&::-webkit-scrollbar-track": {
              bgcolor: "rgba(153, 50, 204, 0.1)",
              borderRadius: 3,
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "rgba(153, 50, 204, 0.3)",
              borderRadius: 3,
              "&:hover": {
                bgcolor: "rgba(153, 50, 204, 0.5)",
              },
            },
          }}
        >
          {markets.map((market, index) => (
            <MarketItem
              key={index}
              baseToken={market.base}
              quoteToken={market.quote}
              platform={market.platform}
              onClick={() => handleMarketClick(market.id)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
