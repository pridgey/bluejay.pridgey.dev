import Styled, { keyframes } from "styled-components";

export const LoaderBackground = Styled.div`
    background-color: rgba(255, 255, 255, 0.6);
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LoaderCard = Styled.div`
    background-color: #f0efeb;
    -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
    border-radius: 20px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const generateKeyframePositions = () => {
  const positionsArray: string[] = [];
  const positions = Math.round(4 + Math.random() * 4);

  for (let j = 0; j <= positions; j++) {
    const percentage = Math.round((100 / positions) * j);
    const randX = Math.random() * 100;
    const randY = Math.random() * 100;
    if (percentage === 100) {
      positionsArray.push(positionsArray[0].replace("0%", "100%"));
    } else {
      positionsArray.push(
        `${percentage}%{background-position: ${randX}% ${randY}%}`
      );
    }
  }

  return positionsArray;
};

const Flow = keyframes`
    ${generateKeyframePositions().join(" ")}
`;

export const LoaderBubble = Styled.div<{
  $angle: number;
  $hSLArray: string[];
  $duration: number;
}>`
    width: 700px;
    height: 50px;
    border-radius: 20px;
    background: linear-gradient(${(p) => p.$angle}deg, ${(p) =>
  p.$hSLArray.join(", ")});
    background-size: 600% 600%;
    animation: ${Flow} ${(p) => p.$duration}s ease infinite;
    -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
`;
