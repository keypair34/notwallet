"use client";

import { ONRAMPER_KEY } from "@/lib/crate/generated";
import { useSearchParams } from "next/navigation";

export default function Content() {
  const searchParams = useSearchParams();
  const address = searchParams.get("address");

  const onramperParams = {
    apiKey: ONRAMPER_KEY,
    wallets: `solana:${address}`,
    redirectAtCheckout: "true",
    onlyCryptoNetworks: "solana",
    mode: "buy",
    hideTopBar: "true",
    themeName: "light",
    containerColor: "f5f6fa",
    primaryColor: "9932cc",
    secondaryColor: "ad5ad7",
    cardColor: "f6f7f9",
    primaryTextColor: "222222",
    secondaryTextColor: "6b6f80",
    primaryBtnTextColor: "ffffff",
    borderRadius: "0.5",
    wgBorderRadius: "0.82",
  };

  const url = new URLSearchParams(onramperParams);
  const iframeSrc = `https://buy.onramper.com?${url.toString()}`;

  return (
    <iframe
      src={iframeSrc}
      height="630px"
      width="100%"
      allow="accelerometer; autoplay; camera; gyroscope; payment; microphone"
    />
  );
}
