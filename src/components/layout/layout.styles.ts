import styled from "@emotion/styled";
import { colors } from "@/commons/styles";

// Header
export const Header = styled.header`
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 0 1.5rem;
  border-bottom: 1px solid ${colors.outline};
  flex-shrink: 0;
  background-color: #fff;

  h1 {
    width: 1.5rem;
  }
`;
export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
