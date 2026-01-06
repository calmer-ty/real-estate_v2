import { Alert, Snackbar } from "@mui/material";

import type { AlertColor } from "@mui/material";
interface IBasicAlert {
  open: boolean;
  close: () => void;
  text: string;
  severity: AlertColor;
}

export default function BasicAlert({ open, close, text, severity }: IBasicAlert) {
  return (
    <Snackbar open={open} onClose={close} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <Alert onClose={close} severity={severity}>
        {text}
      </Alert>
    </Snackbar>
  );
}
