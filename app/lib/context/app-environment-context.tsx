"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { store } from "../store/store";
import { error } from "@tauri-apps/plugin-log";
import {
  AirdropEnvironment,
  KEY_AIRDROP_ENVIRONMENT,
} from "@app/lib/crate/generated";

type AirdropEnvironmentContextType = {
  environment: AirdropEnvironment;
  setEnvironment: (environment: AirdropEnvironment) => void;
};

const AirdropEnvironmentContext = createContext<AirdropEnvironmentContextType>({
  environment: "production",
  setEnvironment: () => {},
});

export function AirdropEnvironmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [environment, setEnvironment] =
    useState<AirdropEnvironment>("production");

  const init = async () => {
    try {
      const environment = await store().get<AirdropEnvironment>(
        KEY_AIRDROP_ENVIRONMENT,
      );
      if (environment) setEnvironment(environment);
    } catch (e) {
      error(`AppLockProvider: ${e}`);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <AirdropEnvironmentContext.Provider value={{ environment, setEnvironment }}>
      {children}
    </AirdropEnvironmentContext.Provider>
  );
}

/// Define application environment.
/// Support local and production.
export function useAirdropEnvironment() {
  return useContext(AirdropEnvironmentContext);
}
