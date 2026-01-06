import styled from "@emotion/styled";
import { mediaQueries, colors } from "@/commons/styles";
import { css } from "@emotion/react";

import { Button } from "@mui/material";

export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  ${mediaQueries.mobile(css`
    .infoText {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2.25rem;
      height: 2.25rem;
      background-color: ${colors.blur};
      border-radius: 50%;
      em {
        display: none;
      }
    }
  `)}
`;
export const ArrowButton = styled(Button)`
  padding: 0;

  ${mediaQueries.mobile(css`
    position: absolute;
    width: 2.25rem;
    height: 2.25rem;
  `)}
`;
