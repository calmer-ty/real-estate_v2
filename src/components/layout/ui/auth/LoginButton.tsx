import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginButton({ onClick }: { onClick: () => Promise<void> }) {
  return (
    <Button onClick={onClick} variant="contained" startIcon={<GoogleIcon />}>
      구글 로그인
    </Button>
  );
}
