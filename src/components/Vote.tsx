import styled from "styled-components";
import IconPlus from "../assets/images/icon-plus.svg";
import IconMinus from "../assets/images/icon-minus.svg";

interface StyledComponentProps {
  vertical: boolean;
}

const StyledComponent = styled.div<StyledComponentProps>`
  width: ${(props) => (props.vertical ? "40px" : "100px")};
  padding: 0.5rem;
  border-radius: 6px;
  background: var(--very-light-gray);
  display: flex;
  flex-direction: ${(props) => (props.vertical ? "column" : "row")};
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  > button {
    color: var(--light-gray);
    border: none;
    width: 11px;
    height: 11px;
    cursor: pointer;
  }
  .up-button {
    background: url(${IconPlus}) center center no-repeat;
  }
  .down-button {
    background: url(${IconMinus}) center center no-repeat;
  }

  > span {
    color: var(--moderate-blue);
    font-weight: 500;
  }
`;

interface VoteProps extends StyledComponentProps {
  count: number;
  onDownVote: () => void;
  onUpVote: () => void;
}
const Vote = ({ count, vertical, onDownVote, onUpVote }: VoteProps) => {
  return (
    <StyledComponent vertical={vertical}>
      <button className="up-button" onClick={onUpVote} />
      <span>{count}</span>
      <button className="down-button" onClick={onDownVote} />
    </StyledComponent>
  );
};
export default Vote;
