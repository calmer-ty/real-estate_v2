import { colors } from "@/commons/styles";

import styled from "@emotion/styled";

export const Container = styled.aside<{ scroll: boolean }>`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 24rem;
  padding: 1rem;
  border-right: 1px solid ${colors.outline};
  background-color: #f9f9f9;

  position: relative;
  z-index: 1;
  transition: flex 0.3s ease-in-out;
`;
export const UnMarker = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  min-width: 24rem;
  background-color: #f9f9f9;

  .inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 4rem;
    border-radius: 0.75rem;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.75rem;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);

  h3 {
    font-size: 0.95rem;
    font-weight: 600;
    color: #333;
  }

  .desc {
    font-size: 0.85rem;
    color: #666;

    &.type {
      font-weight: 500;
      color: #444;
    }
  }

  .bottom {
    h4 {
      margin-bottom: 0.3rem;

      .title {
        margin-right: 0.2rem;
        font-weight: bold;
        font-size: 0.8rem;
      }
      .date {
        font-size: 0.7rem;
        color: #666;
      }
    }
  }
`;

// export const TabButton = styled(Button)`
//   display: none;
//   position: relative;
//   color: #000;

//   .stroke {
//     width: 3.125rem;
//     height: 0.125rem;
//     margin: 0.375rem 0;
//     background-color: #dedede;
//   }
//   ${mediaQueries.tablet(css`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 0.25rem 0 1px 0;
//     border-top: 1px solid ${colors.outline};
//     background-color: #fff;
//   `)}
// `;
