import styled from "styled-components";

interface GridItemProps {
  gridArea: string;
  justifySelf: string;
}
const GridItem = styled.div<Partial<GridItemProps>>`
  grid-area: ${(props) => props.gridArea ?? ""};
  justify-self: ${(props) => props.justifySelf ?? ""};
`;
export default GridItem;
