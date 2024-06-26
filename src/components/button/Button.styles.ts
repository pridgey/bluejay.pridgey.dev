import Styled from "styled-components";

export const StyledButton = Styled.button<{
  $disabled: boolean;
  $margin: string;
  $type: "Primary" | "Secondary";
}>`
    color: ${(p) => (p.$type === "Primary" ? "#fdfcfe" : "#86A5F5")};
    background-color: ${(p) =>
      p.$disabled
        ? "#6a6a6b"
        : p.$type === "Primary"
        ? "#86A5F5"
        : "transparent"};
    border: 1px solid ${(p) => (p.$disabled ? "#6a6a6b" : "#86A5F5")};
    padding: 10px 15px;
    font-family: "Catamaran", sans-serif;
    border-radius: 15px;
    font-weight: 800;
    font-size: 16px;
    cursor: pointer;
    white-space: nowrap;
    text-transform: uppercase;
    margin: ${(p) => p.$margin};

    &:hover {
        background-color: ${(p) =>
          p.$type === "Primary" ? "#3964d4" : "#86A5F5"};
        border: 1px solid ${(p) =>
          p.$type === "Primary" ? "#3964d4" : "#86A5F5"};
        color: #fdfcfe;
        transition: all 0.3s;
    }

    @media (max-width: 1000px) {
      font-size: 14px;
    }
`;
