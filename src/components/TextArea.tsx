import styled from "styled-components";

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  outline: none;
  border-radius: 6px;
  line-height: 1.5em;
  resize: none;
  border: 1px solid var(--light-gray);

  &:hover,
  &:focus {
    border-color: var(--moderate-blue);
  }
`;
export default TextArea;
