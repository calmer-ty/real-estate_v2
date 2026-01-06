import styled from "@emotion/styled";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .selectContent {
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 3.5rem;
    padding: 0 1rem;
    border-bottom: 1px solid #ccc;
  }

  .mapContent {
    display: flex;
    width: 100%;
    height: 100%;

    @media (max-width: 480px) {
      flex-direction: column-reverse;
    }
  }
`;
