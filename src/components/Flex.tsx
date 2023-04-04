import styled from "styled-components";

interface FlexProps {
  direction: string;
  justify: string;
  align: string;
  gap: string;
  margin: string;
  padding: string;
}
const Flex = styled.div<Partial<FlexProps>>`
  display: flex;
  flex-direction: ${(props) => props.direction ?? "row"};
  justify-content: ${(props) => props.justify ?? "flex-start"};
  align-items: ${(props) => props.align ?? "stretch"};
  gap: ${(props) => props.gap ?? 0};
  margin: ${(props) => props.margin ?? 0};
  padding: ${(props) => props.padding ?? 0};
`;
export default Flex;
