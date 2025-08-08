import { openUrl } from "@tauri-apps/plugin-opener";
import { selectionFeedback } from "@tauri-apps/plugin-haptics";

export const openExplorer = async (address: string) => {
  await selectionFeedback();
  const url = `https://explorer.solana.com/address/${address}`;
  openUrl(url);
};
