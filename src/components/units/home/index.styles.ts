import styled from "@emotion/styled";
import Link from "next/link";

// 지도 선택 버튼
export const Container = styled.article`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  padding: 1rem;
  background-color: #e4f5ffff;
`;

export const Card = styled.div`
  position: relative;
  width: 40rem;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 12rem;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const Description = styled.p`
  color: #4b5563;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

export const Button = styled(Link)`
  display: inline-block;
  width: 100%;
  text-align: center;
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  padding: 0.75rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background-color: #1e40af;
  }
`;
