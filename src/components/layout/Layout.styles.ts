import styled from "styled-components";

export const StyledBackdrop = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: rgb(218, 215, 205);
  background: linear-gradient(
    0deg,
    rgba(88, 129, 87, 1) 0%,
    rgba(88, 129, 87, 1) 50%,
    rgba(218, 215, 205, 1) 50%,
    rgba(218, 215, 205, 1) 100%
  );
`;

export const StyledLayout = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 15% 10%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1000px) {
    padding: 10px;
  }
`;

export const StyledContent = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f0efeb;
  padding: 5px 15px;
  border-radius: 20px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
`;
