"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase/firebaseApp"; // Firebase 인증 인스턴스
import { onAuthStateChanged } from "firebase/auth";

import type { User } from "firebase/auth";

// useAuth 훅을 만들어 Firebase 인증 상태를 관리
export const useAuth = (): {
  user: User | null;
} => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser !== null) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });

    // 컴포넌트가 unmount될 때 리스너를 정리
    return () => {
      unsubscribe();
    };
  }, []);

  return { user };
};
