import { useContext } from "react";
import styled from "styled-components";
import Comment from "./components/Comment";
import { context, IContext } from "./context";
import ChatBox from "./components/ChatBox";
import List from "./components/List";
import ListItem from "./components/ListItem";
import Box from "./components/Box";
import Flex from "./components/Flex";
import { useViewport } from "./viewportContext";

const Container = styled.div`
  max-width: 800px;
`;

const Bar = styled.div`
  width: 4px;
  background: var(--light-gray);
`;

const App = () => {
  const { comments, createNewComment } = useContext(context) as IContext;
  const { isMobile } = useViewport();

  const actionButtonHandler = (text: string) => {
    createNewComment(text);
  };

  return (
    <Container>
      <List gap="20px">
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <Comment key={comment.id} comment={comment} parentId={comment.id} />
            {comment.replies.length > 0 ? (
              <Box margin="20px 0 0 0">
                <Flex>
                  <Flex
                    justify={isMobile ? "flex-start" : "center"}
                    style={{ width: "6%" }}
                  >
                    <Bar />
                  </Flex>
                  <Box width="94%" margin="0 0 0 auto">
                    <List gap="20px">
                      {comment.replies.map((reply) => (
                        <ListItem key={reply.id}>
                          <Comment comment={reply} parentId={comment.id} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Flex>
              </Box>
            ) : null}
          </ListItem>
        ))}
      </List>
      <div style={{ marginTop: "20px" }}>
        <ChatBox
          actionButtonText="SEND"
          actionButtonHandler={actionButtonHandler}
        />
      </div>
    </Container>
  );
};

export default App;
