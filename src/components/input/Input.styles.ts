import Styled from "styled-components";

export const StyledLabel = Styled.label`
    font-family: "Montserrat", sans-serif;
    font-weight: 800;
    font-size: 16px;
    text-transform: uppercase;

    @media (max-width: 1000px) {
        font-size: 14px;
      }
`;

export const StyledInput = Styled.input`
    width: 100%;
    background-color: #fdfcfe;
    border: 2px solid #86A5F5;
    padding: 15px 20px;
    box-sizing: border-box;
    border-radius: 15px;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    color: #0a0808;
    margin-top: 5px;

    @media (max-width: 1000px) {
        font-size: 14px;
      }
`;
