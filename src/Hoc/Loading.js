import React, { useSelector } from "react";
import styled from "styled-components";

export const Loading = (props) => {
  const { isLoading } = useSelector((state) => state.ui);
  const { children } = props;

  if (isLoading)
    return (
      <LoadingContainer>
        <h1>IS LOADING</h1>
      </LoadingContainer>
    );

  return { children };
};

const LoadingContainer = styled.div`
display:flex,
alignItems: center,
justifyContent: center,
width:100%;
height:100%;
`;
