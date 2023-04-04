import { useContext, useState } from "react";
import styled, { css } from "styled-components";

import Button from "./Button";
import Card from "./Card";
import Flex from "./Flex";
import Vote from "./Vote";
import Avatar from "./Avatar";
import ChatBox from "./ChatBox";
import Box from "./Box";
import GridItem from "./GridItem";
import { context, IComment, IContext } from "../context";

import IconReply from "../assets/images/icon-reply.svg";
import IconDelete from "../assets/images/icon-delete.svg";
import IconEdit from "../assets/images/icon-edit.svg";
import { useViewport } from "../viewportContext";
import Modal from "./Modal";
import TextArea from "./TextArea";
import ActionButton from "./ActionButton";
import { timeSince } from "../utils";
const Container = styled(Card)`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: repeat(6, auto);
  grid-template-areas:
    "vote user user user crud crud"
    "vote message message message message message";
  column-gap: 20px;

  @media screen and (max-width: 768px) {
    grid-template-rows: repeat(3, auto);
    grid-template-columns: repeat(6, auto);
    grid-template-areas: "user user user user user user" "message message message message message message" "vote vote crud crud crud crud";
    align-items: center;
    row-gap: 20px;
    column-gap: 0;
  }
`;

const User = styled.a`
  font-weight: 500;
`;

const TimeStamp = styled.span`
  color: var(--grayish-blue);
`;

const IconButtonStyles = css`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--moderate-blue);
  font-weight: bold;

  &:hover {
    opacity: 0.5;
  }
`;

const ReplyButton = styled(Button)`
  ${IconButtonStyles};
`;

const DeleteButton = styled(Button)`
  ${IconButtonStyles};
  color: var(--soft-red);

  > img {
    width: 12px;
    height: 14px;
  }
`;

const EditButton = styled(Button)`
  ${IconButtonStyles};

  > img {
    width: 14px;
    height: 14px;
  }
`;

const Message = styled.p`
  color: var(--grayish-blue);

  > span {
    color: var(--moderate-blue);
    font-weight: 500;
  }
  > span::before {
    content: "@";
  }
`;

const Tag = styled.span`
  background: var(--moderate-blue);
  color: var(--white);
  font-size: 0.75rem;
  padding: 0.25em 0.5em;
  font-weight: 500;
`;

interface CommentProps {
  comment: IComment;
  parentId: string;
}
const Comment = ({ comment, parentId }: CommentProps) => {
  const {
    currentUser,
    createNewReply,
    upVoteHandler,
    downVoteHandler,
    deleteComment,
    deleteReply,
    updateComment,
  } = useContext(context) as IContext;
  const [showReply, setShowReply] = useState<boolean>(false);
  const { isMobile } = useViewport();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const isReply = parentId !== comment.id;
  const [editingText, setEditingText] = useState<string>(
    isReply
      ? `@${comment.repliedTo?.username} ${comment.text}`
      : `${comment.text}`
  );

  const loggedIn = currentUser.username === comment.author.username;

  const actionButtonHandler = (text: string) => {
    createNewReply(parentId, comment.author, text);
    setShowReply(false);
  };

  const handleEditingTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditingText(e.target.value);
  };

  return (
    <div>
      {showModal && (
        <Modal
          open={showModal}
          onCancel={() => setShowModal(false)}
          onDelete={() =>
            isReply
              ? deleteReply(parentId, comment.id)
              : deleteComment(comment.id)
          }
        />
      )}
      <Container>
        <GridItem gridArea="vote" justifySelf="start">
          <Vote
            count={comment.votes}
            vertical={!isMobile}
            onDownVote={() => downVoteHandler(parentId, comment.id)}
            onUpVote={() => upVoteHandler(parentId, comment.id)}
          />
        </GridItem>

        <GridItem gridArea="crud" justifySelf="end">
          <Flex gap="20px">
            {loggedIn ? (
              <>
                <DeleteButton onClick={() => setShowModal(true)}>
                  <img src={IconDelete} alt="delete icon" /> Delete
                </DeleteButton>
                <EditButton
                  onClick={() => setEditing((prevEditing) => !prevEditing)}
                >
                  <img src={IconEdit} alt="edit icon" /> Edit
                </EditButton>
              </>
            ) : (
              <ReplyButton
                onClick={() => setShowReply((prevShowReply) => !prevShowReply)}
              >
                <img src={IconReply} alt="reply icon" />
                Reply
              </ReplyButton>
            )}
          </Flex>
        </GridItem>

        <GridItem gridArea="message">
          {editing ? (
            <div>
              <TextArea
                rows={3}
                value={editingText}
                onChange={handleEditingTextChange}
              />
              <ActionButton
                onClick={() => {
                  setEditing(false);
                  updateComment(parentId, comment.id, editingText);
                }}
              >
                UPDATE
              </ActionButton>
            </div>
          ) : (
            <Message>
              {comment.repliedTo?.username && (
                <span>{comment.repliedTo.username}</span>
              )}{" "}
              {comment.text}
            </Message>
          )}
        </GridItem>

        <GridItem gridArea="user">
          <Flex gap="20px" align="center">
            <Avatar
              src={comment.author.avatarUrl}
              alt={comment.author.username}
            />
            <User>{comment.author.username}</User>
            {loggedIn && <Tag>you</Tag>}
            <TimeStamp>{timeSince(comment.createdAt)}</TimeStamp>
          </Flex>
        </GridItem>
      </Container>

      {showReply ? (
        <Box margin="10px 0 0 0 ">
          <ChatBox
            defaultText={`@${comment.author.username} `}
            actionButtonText="REPLY"
            actionButtonHandler={actionButtonHandler}
          />
        </Box>
      ) : null}
    </div>
  );
};
export default Comment;
