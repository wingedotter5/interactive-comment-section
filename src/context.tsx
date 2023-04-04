import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import AvatarAmyrobson from "./assets/images/avatars/image-amyrobson.png";
import AvatarJuliusomo from "./assets/images/avatars/image-juliusomo.png";
import AvatarMaxblahun from "./assets/images/avatars/image-maxblagun.png";
import AvatarRamsesmiron from "./assets/images/avatars/image-ramsesmiron.png";

export interface IUser {
  username: string;
  avatarUrl: string;
}

export interface IComment {
  author: IUser;
  createdAt: Date;
  id: string;
  repliedTo?: IUser;
  replies: IComment[];
  text: string;
  votes: number;
}

const defaultComments: IComment[] = [
  {
    id: uuidv4(),
    createdAt: new Date(),
    replies: [],
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas architecto vero incidunt libero quis illo illum reprehenderit. Hic, eius? Sint quos nemo praesentium atque corrupti excepturi mollitia dignissimos sequi officiis?",
    author: { username: "amyrobson", avatarUrl: AvatarAmyrobson },
    votes: 12,
  },
  {
    id: uuidv4(),
    createdAt: new Date(),
    replies: [
      {
        id: uuidv4(),
        repliedTo: {
          username: "maxblagun",
          avatarUrl: AvatarMaxblahun,
        },
        createdAt: new Date(),
        replies: [],
        text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas architecto vero incidunt libero quis illo illum reprehenderit. Hic, eius? Sint quos nemo praesentium atque corrupti excepturi mollitia dignissimos sequi officiis?",
        author: { username: "ramsesmiron", avatarUrl: AvatarRamsesmiron },
        votes: 4,
      },
      {
        id: uuidv4(),
        repliedTo: {
          username: "ramsesmiron",
          avatarUrl: AvatarRamsesmiron,
        },
        createdAt: new Date(),
        replies: [],
        text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas architecto vero incidunt libero quis illo illum reprehenderit. Hic, eius? Sint quos nemo praesentium atque corrupti excepturi mollitia dignissimos sequi officiis?",
        author: { username: "juliusomo", avatarUrl: AvatarJuliusomo },
        votes: 2,
      },
    ],
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas architecto vero incidunt libero quis illo illum reprehenderit. Hic, eius? Sint quos nemo praesentium atque corrupti excepturi mollitia dignissimos sequi officiis?",
    author: { username: "maxblagun", avatarUrl: AvatarMaxblahun },
    votes: 5,
  },
];

export interface IContext {
  comments: IComment[];
  currentUser: IUser;
  createNewComment: (text: string) => void;
  createNewReply: (commentId: string, repliedTo: IUser, text: string) => void;
  upVoteHandler: (commentId: string, replyId: string) => void;
  downVoteHandler: (commentId: string, replyId: string) => void;
  deleteComment: (commentId: string) => void;
  deleteReply: (commentId: string, replyId: string) => void;
  updateComment: (commentId: string, replyId: string, newText: string) => void;
}
export const context = React.createContext<IContext | null>(null);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [comments, setComments] = React.useState<IComment[]>(defaultComments);
  const [currentUser, setCurrentUser] = React.useState<IUser>({
    username: "juliusomo",
    avatarUrl: AvatarJuliusomo,
  });

  const createNewComment = (text: string) => {
    setComments((prevComments) =>
      prevComments.concat({
        id: uuidv4(),
        votes: 0,
        author: currentUser,
        text,
        createdAt: new Date(),
        replies: [],
      })
    );
  };

  const createNewReply = (
    commentId: string,
    repliedTo: IUser,
    text: string
  ) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === commentId) {
          const tag = `@${repliedTo.username}`;
          if (text.startsWith(tag)) {
            text = text.replace(tag, "");
          }
          return {
            ...comment,
            replies: comment.replies.concat({
              id: uuidv4(),
              repliedTo: repliedTo,
              votes: 0,
              author: currentUser,
              text,
              createdAt: new Date(),
              replies: [],
            }),
          };
        }
        return comment;
      });
    });
  };

  const upVoteHandler = (commentId: string, replyId: string) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === commentId) {
          if (replyId !== commentId) {
            const newReplies = comment.replies.map((reply) => {
              if (reply.id === replyId) {
                return { ...reply, votes: reply.votes + 1 };
              }
              return reply;
            });
            return { ...comment, replies: newReplies };
          }
          return { ...comment, votes: comment.votes + 1 };
        }
        return comment;
      });
    });
  };

  const downVoteHandler = (commentId: string, replyId: string) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === commentId) {
          if (replyId !== commentId) {
            const newReplies = comment.replies.map((reply) => {
              if (reply.id === replyId) {
                return { ...reply, votes: reply.votes - 1 };
              }
              return reply;
            });
            return { ...comment, replies: newReplies };
          }
          return { ...comment, votes: comment.votes - 1 };
        }
        return comment;
      });
    });
  };

  const deleteComment = (commentId: string) => {
    setComments((prevComments) => {
      return prevComments.filter((comment) => {
        if (comment.id !== commentId) {
          return comment;
        }
      });
    });
  };

  const deleteReply = (commentId: string, replyId: string) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === commentId) {
          const newReplies = comment.replies.filter(
            (reply) => reply.id !== replyId
          );
          return { ...comment, replies: newReplies };
        }
        return comment;
      });
    });
  };

  const updateComment = (
    commentId: string,
    replyId: string,
    newText: string
  ) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === commentId) {
          if (replyId !== commentId) {
            const newReplies = comment.replies.map((reply) => {
              if (reply.id === replyId) {
                const tag = `@${reply.repliedTo?.username}`;
                if (newText.startsWith(tag)) {
                  newText = newText.replace(tag, "");
                }
                return { ...reply, text: newText };
              }
              return reply;
            });
            return { ...comment, replies: newReplies };
          }
          return { ...comment, text: newText };
        }
        return comment;
      });
    });
  };

  return (
    <context.Provider
      value={{
        comments,
        currentUser,
        createNewComment,
        createNewReply,
        upVoteHandler,
        downVoteHandler,
        deleteComment,
        deleteReply,
        updateComment,
      }}
    >
      {children}
    </context.Provider>
  );
};
export default ContextProvider;
