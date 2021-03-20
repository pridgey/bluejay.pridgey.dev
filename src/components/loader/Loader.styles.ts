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
    background-color: #0a0808;
    border-radius: 20px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const generateKeyframePositions = () => {
  const positionsArray: string[] = [];
  const positions = Math.round(2 + Math.random() * 4);

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
  Angle: number;
  HSLArray: string[];
  Duration: number;
}>`
    width: 700px;
    height: 50px;
    border-radius: 20px;
    background: linear-gradient(${(p) => p.Angle}deg, ${(p) =>
  p.HSLArray.join(", ")});
    background-size: 600% 600%;
    animation: ${Flow} ${(p) => p.Duration}s ease infinite;
`;
