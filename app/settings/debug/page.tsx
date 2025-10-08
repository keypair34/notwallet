"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { getVersion } from "@tauri-apps/api/app";
import { invoke } from "@tauri-apps/api/core";
import PageChildrenTitleBar from "@/lib/components/page-children-title-bar";
import { useI18n } from "@/lib/i18n/provider";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function DebugPage() {
  const { t } = useI18n();
  const [version, setVersion] = React.useState<string | null>(null);
  const [installationId, setInstallationId] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    const fetchVersion = async () => {
      const appVersion = await getVersion();
      setVersion(appVersion);
    };
    const fetchInstallationId = async () => {
      try {
        const id = await invoke<string>("get_installation_id");
        setInstallationId(id);
      } catch (error) {
        console.error("Failed to fetch installation ID:", error);
      }
    };
    Promise.all([fetchVersion(), fetchInstallationId()]);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #FAFBFF 0%, #F8FAFF 100%)",
        background: "linear-gradient(135deg, #FAFBFF 0%, #F8FAFF 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
      }}
    >
      <PageChildrenTitleBar title={"Debug Settings"} />
      <Box sx={{ width: "100%", maxWidth: 420, px: 2 }}>
        <Card
          sx={{
            width: "100%",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(139, 92, 246, 0.08)",
            border: "1px solid rgba(139, 92, 246, 0.06)",
            overflow: "hidden",
            bgcolor: "#FFFFFF",
          }}
        >
          <List sx={{ p: 0, pb: 1 }}>
            <React.Fragment>
              <ListItem>
                <FormControl fullWidth>
                  <InputLabel id="slippage-label">Environment</InputLabel>
                  <Select labelId="slippage-label" id="slippage">
                    <MenuItem value={10}>Development</MenuItem>
                    <MenuItem value={50}>Production</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </React.Fragment>
          </List>
          <Divider sx={{ borderColor: "rgba(139, 92, 246, 0.08)", mt: 2 }} />
        </Card>
      </Box>
    </Box>
  );
}
