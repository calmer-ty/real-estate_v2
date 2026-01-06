"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, MenuItem, useMediaQuery } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import * as S from "./styles";

import type { User } from "firebase/auth";
interface IUserMenuProps {
  user: User;
  onLogout: () => void;
}

export default function UserMenu({ user, onLogout }: IUserMenuProps) {
  //   const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl) && user != null;
  // 미디어 쿼리: 480px 이하인지 확인
  const isSmallScreen = useMediaQuery("(max-width: 480px)");

  useEffect(() => {
    if (user === null) {
      setAnchorEl(null); // 로그아웃 상태에서 anchorEl 초기화
    }
  }, [user]);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <S.UserMenu>
      <div className="infoText">
        <em>Welcome,</em> <strong>{isSmallScreen ? user?.displayName?.[0] : user?.displayName}</strong>
      </div>
      {/* 화살표 */}
      <S.ArrowButton onClick={handleOpen} sx={{ minWidth: "36px" }}>
        {isSmallScreen ? <></> : <KeyboardArrowDownIcon />}
      </S.ArrowButton>
      {/* 유저 메뉴 */}
      <Menu id="user-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ "aria-labelledby": "basic-button" }}>
        <MenuItem onClick={handleClose}>
          <Link href={"/list"}>내 매물 보기</Link>
        </MenuItem>
        <MenuItem onClick={onLogout}>로그아웃</MenuItem>
      </Menu>
    </S.UserMenu>
  );
}
