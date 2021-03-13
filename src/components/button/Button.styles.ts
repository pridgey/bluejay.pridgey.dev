import Styled from "styled-components";

export const StyledButton = Styled.button<{
  Margin: string;
  Type: "Primary" | "Secondary";
}>`
    color: ${(p) => (p.Type === "Primary" ? "#fdfcfe" : "#86A5F5")};
    background-color: ${(p) =>
      p.Type === "Primary" ? "#86A5F5" : "transparent"};
    border: 1px solid #86A5F5;
    padding: 10px 15px;
    font-family: "Catamaran", sans-serif;
    border-radius: 15px;
    font-weight: 800;
    font-size: 16px;
    cursor: pointer;
    white-space: nowrap;
    text-transform: uppercase;
    margin: ${(p) => p.Margin};

    &:hover {
        background-color: ${(p) =>
          p.Type === "Primary" ? "#3964d4" : "#86A5F5"};
        border: 1px solid ${(p) =>
          p.Type === "Primary" ? "#3964d4" : "#86A5F5"};
        color: #fdfcfe;
        transition: all 0.3s;
    }
`;
