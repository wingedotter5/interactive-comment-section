import styled from "styled-components";
import Button from "./Button";

const ActionButton = styled(Button)`
  background: var(--moderate-blue);
  color: var(--white);
  border-radius: 6px;
  font-size: 1rem;
  padding: 0.75em 1.5em;

  &:hover {
    opacity: 0.5;
  }
`;
export default ActionButton;
