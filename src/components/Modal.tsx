import styled from "styled-components";
import Card from "./Card";
import { useEffect, useState } from "react";

const DeleteCard = styled(Card)`
  padding: 2rem;
  max-width: 40ch;
  display: flex;
  flex-direction: column;
  gap: 20px;

  > h2 {
    color: var(--dark-blue);
  }

  > p {
    color: var(--grayish-blue);
  }

  > .buttons {
    display: grid;
    grid-template: auto / auto auto;
    gap: 20px;

    > button {
      border: none;
      outline: none;
      cursor: pointer;
      border-radius: 6px;
      color: white;
      font-size: 1rem;
      font-weight: 500;
      padding: 1em 0;

      &:hover {
        opacity: 0.5;
      }
    }

    .cancel {
      background: var(--grayish-blue);
    }
    .delete {
      background: var(--soft-red);
    }
  }
`;

const StyledComponent = styled.div`
  min-height: 100vh;
  position: fixed;
  inset: 0;
  padding: 1rem;

  display: grid;
  place-content: center;

  background: rgba(0, 0, 0, 0.5);
`;

interface ModalProps {
  open: boolean;
  onCancel: () => void;
  onDelete: () => void;
}
const Modal = ({ open, onCancel, onDelete }: ModalProps) => {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {open ? (
        <StyledComponent>
          <DeleteCard>
            <h2>Delete comment</h2>
            <p>
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone.
            </p>
            <div className="buttons">
              <button className="cancel" onClick={onCancel}>
                NO, CANCEL
              </button>
              <button className="delete" onClick={onDelete}>
                YES, DELETE
              </button>
            </div>
          </DeleteCard>
        </StyledComponent>
      ) : null}
    </>
  );
};
export default Modal;
