import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ListItemView from "./list-items";
import { useRouter } from "next/navigation";
import { selectionFeedback } from "@tauri-apps/plugin-haptics";
import { useSearchParams } from "next/navigation";

export default function Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const address = searchParams.get("address");

  const handleClick = async (type: "onramper" | "stripe") => {
    await selectionFeedback();
    if (type === "onramper") {
      router.push("/wallet/buy/onramper?address=" + address);
    } else if (type === "stripe") {
      router.push("/wallet/buy/stripe?address=" + address);
    }
  };

  const onRampProviders = [
    {
      id: "onramper",
      label: "Choose the best",
      description: "Compare multiple providers and rates",
      icon: <ShoppingCartIcon />,
      action: () => handleClick("onramper"),
      hasChevron: true,
    },
    {
      id: "stripe",
      label: "Stripe",
      description: "For EU only",
      icon: <CreditCardIcon />,
      action: () => handleClick("stripe"),
      hasChevron: true,
    },
  ];
  return (
    <Box sx={{ width: "100%", maxWidth: 420, px: 2 }}>
      <Card
        sx={{
          width: "100%",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(139, 92, 246, 0.08)",
          border: "1px solid rgba(139, 92, 246, 0.06)",
          mb: 3,
          overflow: "hidden",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box sx={{ p: 3, pb: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#1F2937",
              mb: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Choose Provider
          </Typography>
        </Box>
        <List sx={{ p: 0, pb: 1 }}>
          {onRampProviders.map((item, index) => (
            <ListItemView
              key={item.id}
              item={item}
              isLast={index === onRampProviders.length - 1}
            />
          ))}
        </List>
      </Card>

      {/* Security Notice */}
      <Box
        sx={{
          textAlign: "center",
          mt: 4,
          px: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: "14px",
            color: "#6B7280",
            lineHeight: 1.6,
            bgcolor: "rgba(139, 92, 246, 0.04)",
            border: "1px solid rgba(139, 92, 246, 0.08)",
            borderRadius: "12px",
            p: 3,
          }}
        >
          💳 Choose your preferred payment method and provider to buy crypto
          <br />
          <Box
            component="span"
            sx={{
              color: "#8B5CF6",
              fontWeight: 500,
              mt: 1,
              display: "block",
            }}
          >
            Secure and trusted providers
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
