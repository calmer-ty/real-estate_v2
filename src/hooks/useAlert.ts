"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { Dispatch, SetStateAction } from "react";
import type { AlertColor } from "@mui/material";

interface IUseAlertReturn {
  alertOpen: boolean;
  alertText: string;
  alertSeverity: AlertColor;
  setAlertOpen: Dispatch<SetStateAction<boolean>>;
  setAlertText: Dispatch<SetStateAction<string>>;
  setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
  alertClose: () => void;
  setRouting: Dispatch<SetStateAction<string>>;
}

export const useAlert = (): IUseAlertReturn => {
  const router = useRouter();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("info");
  const [routing, setRouting] = useState("");

  const alertClose = (): void => {
    setAlertOpen(false);
    if (routing !== "") {
      router.push(routing);
    }
  };

  return {
    alertOpen,
    alertText,
    alertSeverity,
    setAlertOpen,
    setAlertText,
    setAlertSeverity,
    alertClose,
    setRouting,
  };
};
