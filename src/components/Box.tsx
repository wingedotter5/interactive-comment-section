import styled from "styled-components";

interface BoxProps {
  margin: string;
  padding: string;
  width: string;
  height: string;
}

const Box = styled.div<Partial<BoxProps>>`
  margin: ${(props) => props.margin ?? 0};
  padding: ${(props) => props.padding ?? 0};
  width: ${(props) => props.width ?? null};
  height: ${(props) => props.height ?? null};
`;
export default Box;
