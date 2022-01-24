import React, { useState, useContext } from "react";
import styled from "styled-components";
import storeApi from "../../utils/storeApi";

const InputCardComponent = styled.div`
   {
    &:hover {
      background: lightGray;
    }
    width: 250px;
    height: fit-content;
    background: #ebecf0;
    color: #ccc;
    margin-top: 20px;
    margin-left: 5px;
    padding: 10px;
    border-radius: 5px;
    display: flex;
  }
`;

const TypoGraphy = styled.h4`
   {
    color: Gray;
    font-weight: bold;
  }
`;

const InputBase = styled.textarea`
   {
    width: 250px;
    border: 1px solid lightGray;
    background: #fff;
    color: #000;
    margin: 5px;
    border-radius: 5px;
    padding: 20px;
  }
`;

const Button = styled.button`
   {
    cursor: pointer;
    width: fit-content;
    heigh: 50px;
    border-radius: 5px;
    border: 1px solid gray;
    line-height: 2;
    float: left;
    margin: 10px;
    background: #5aac44;
    color: #fff;
  }
`;

const ContainerFooter = styled.div`
   {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
  }
`;
const CloseIcon = styled.i`
   {
    font-size: 16px;
    color: black;
  }
`;
const InputCardContainer = styled.div`
   {
    display: block;
  }
`;

const InputContainer = (props) => {
  const { listId, type } = props;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const { addMoreCard, addMoreLists } = useContext(storeApi);

  const handleCardInput = (e) => {
    setTitle(e.target.value);
    setOpen(true);
  };

  const onCardAdd = () => {
    if (type === "card") {
      addMoreCard(title, listId);
      setTitle("");
      setOpen(false);
    } else {
      addMoreLists(title, listId);
      setTitle("");
      setOpen(false);
    }
  };

  const closeCard = () =>{
      setOpen(false);
      setTitle("")
  }

  return (
    <>
      {open ? (
        <InputCardContainer>
          <InputBase
            onChange={(e) => handleCardInput(e)}
            type="text"
            listId={listId}
            placeholder={
              type === "card" ? "Enter title to this card" : "Enter List"
            }
            value={title}
          ></InputBase>
          <ContainerFooter>
            <Button onClick={onCardAdd}>
              {type === "card" ? "Add Card" : "Add List"}
            </Button>
            <CloseIcon
              className="fa fa-close"
              onClick={closeCard}
            ></CloseIcon>
          </ContainerFooter>
        </InputCardContainer>
      ) : (
        <InputCardComponent onClick={() => setOpen(!open)}>
          <TypoGraphy>
            {type === "card" ? "+ Add a Card" : "+ Add another list"}
          </TypoGraphy>
        </InputCardComponent>
      )}
    </>
  );
};

export default InputContainer;
