import React, { useContext, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import Avatar from "./Avatar";
import GridItem from "./GridItem";
import { context, IContext } from "../context";
import ActionButton from "./ActionButton";
import TextArea from "./TextArea";

const Container = styled(Card)`
  display: grid;
  grid-template: auto / auto 1fr auto;
  grid-template-areas: "avatar textarea action-button";
  gap: 0 20px;
  align-items: flex-start;

  @media screen and (max-width: 768px) {
    grid-template: repeat(2, auto) / repeat(2, auto);
    grid-template-areas: "textarea textarea" "avatar action-button";
    gap: 10px 20px;
    align-items: center;
  }
`;

interface ChatBoxProps {
  defaultText?: string;
  actionButtonText: string;
  actionButtonHandler: (text: string) => void;
}
const ChatBox = ({
  defaultText,
  actionButtonText,
  actionButtonHandler,
}: ChatBoxProps) => {
  const { currentUser } = useContext(context) as IContext;
  const [text, setText] = useState<string>(defaultText ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleClick = () => {
    actionButtonHandler(text);
    setText("");
  };

  return (
    <Container>
      <GridItem gridArea="avatar">
        <Avatar src={currentUser.avatarUrl} />
      </GridItem>

      <GridItem gridArea="textarea">
        <TextArea
          rows={3}
          placeholder="Add a comment..."
          value={text}
          onChange={handleChange}
        />
      </GridItem>

      <GridItem gridArea="action-button" justifySelf="end">
        <ActionButton onClick={handleClick}>{actionButtonText}</ActionButton>
      </GridItem>
    </Container>
  );
};
export default ChatBox;
