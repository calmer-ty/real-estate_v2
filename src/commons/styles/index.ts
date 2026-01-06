import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";

// 미디어 쿼리 믹스인 정의
export const mediaQueries = {
  mobile: (styles: SerializedStyles) => css`
    @media screen and (max-width: 480px) {
      ${styles}
    }
  `,
  tablet: (styles: SerializedStyles) => css`
    @media screen and (max-width: 768px) {
      ${styles}
    }
  `,
  desktop: (styles: SerializedStyles) => css`
    @media screen and (max-width: 1024px) {
      ${styles}
    }
  `,
  largeDesktop: (styles: SerializedStyles) => css`
    @media screen and (max-width: 1280px) {
      ${styles}
    }
  `,
  extraLargeDesktop: (styles: SerializedStyles) => css`
    @media screen and (max-width: 1690px) {
      ${styles}
    }
  `,
  h800: (styles: SerializedStyles) => css`
    @media screen and (max-height: 800px) {
      ${styles}
    }
  `,
};

// colors
export const colors = {
  primary: "#1976d2",
  primaryHover: "#f6fafd",

  hover: "#ddd",
  cover: "rgba(0, 0, 0, 0.1)",
  blur: "#eee",
  normal: "#666",
  outline: "#eee",
  background: "#fff",
};
