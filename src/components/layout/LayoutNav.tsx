import { useAuth } from "@/hooks/useAuth";

import Link from "next/link";
import AuthButton from "@/components/layout/ui/auth";
import { Button } from "@mui/material";

import * as S from "./layout.styles";

export default function LayoutNav() {
  const { user } = useAuth();

  return (
    <S.Nav>
      {user !== null && (
        <Link href="/new">
          <Button variant="contained">방 내놓기</Button>
        </Link>
      )}
      <AuthButton />
    </S.Nav>
  );
}
