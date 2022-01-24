import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import storeApi from "../utils/storeApi";
import "../App.css";

const CardComponent = styled.div`
   {
    display: flex;
    width: 250px;
    border: 1px solid lightGray;
    background: #fff;
    color: #000;
    margin: 5px;
    border-radius: 5px;
    padding: 20px;
    justify-content: space-between;
  }
`;

const CardTitle = styled.div`
   {
    overflow-wrap: anywhere;
  }
`;

const IconContainer = styled.div`
   {
    margin: 10px;
  }
`;

const TitleInputContainer = styled.div`
   {
    display: flex;
  }
`;

const InputBase = styled.input`
   {
    &:focus {
      background: #ebecf0;
      border: none;
    }
    margin: 20px;
    float: left;
    border: none;
    background: #ebecf0;
  }
`;

const MoveColum = styled.div`
   {
    display: block;
  }
`;

const MoveNext = styled.div`
   {
    cursor: pointer;
    font-size: 12px;
  }
`;

const MovePrev = styled.div`
   {
    cursor: pointer;
    font-size: 12px;
  }
`;

const Card = (props) => {
  const [open, setOpen] = useState(false);
  const { card, listId, listIdsLength } = props;
  const [cardTitle, setCardTitle] = useState("");

  const { deleteCard, updateCardTitle, updateAdjacentList } =
    useContext(storeApi);

  const deleteTask = (id) => {
    deleteCard(id, listId);
  };

  const editCard = (id) => {
    setOpen(true);
  };

  const changeTitle = (e) => {
    setCardTitle(e.target.value);
  };

  const handleBlurEffect = (cardId) => {
    updateCardTitle(cardId, cardTitle, listId);
    setOpen(!open);
  };

  const moveCardToNext = (card, action) => {
    deleteCard(card.id, listId);
    updateAdjacentList(card, listId, action);
  };

  const moveCardToPrevious = (card, action) => {
    updateAdjacentList(card, listId, action);
    deleteCard(card.id, listId);
  };

  return (
    <>
      <CardComponent>
        {open ? (
          <TitleInputContainer>
            <InputBase
              autoFocus
              onChange={changeTitle}
              value={cardTitle}
              onBlur={() => handleBlurEffect(card.id)}
            ></InputBase>
          </TitleInputContainer>
        ) : (
          <CardTitle>{card.title}</CardTitle>
        )}
        <IconContainer>
          <i
            className="fa fa-edit"
            style={{ fontSize: "16px" }}
            onClick={() => editCard(card.id)}
          ></i>
          <i
            className="fa fa-trash-o"
            style={{ fontSize: "16px", marginLeft: "10px" }}
            onClick={() => deleteTask(card.id)}
          ></i>
          {listIdsLength > 1 && listId !== "list1" ? (
            <MoveColum>
              <MovePrev onClick={() => moveCardToPrevious(card, "prev")}>
                Move To Previous
              </MovePrev>
              <MoveNext onClick={() => moveCardToNext(card, "next")}>
                Move To Next
              </MoveNext>
            </MoveColum>
          ) : (
            <MoveNext onClick={() => moveCardToNext(card, "next")}>
              Move To Next
            </MoveNext>
          )}
        </IconContainer>
      </CardComponent>
    </>
  );
};

export default Card;
