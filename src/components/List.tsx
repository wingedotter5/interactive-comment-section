import styled from "styled-components";

interface ListProps {
  gap?: string;
}
const List = styled.ul<ListProps>`
  list-style-type: none;

  > li {
    &:not(:last-child) {
      margin-bottom: ${(props) => props.gap ?? 0};
    }
  }
`;
export default List;
