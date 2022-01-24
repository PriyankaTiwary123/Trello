import React from "react";
import styled from "styled-components";
import Card from "../Card";
import InputContainer from "../input/InputContainer";
import Title from "../Title";

const Tile = styled.div`
   {
    width: 300px;
    height: fit-content;
    border: 1px solid lightGray;
    background: #ebecf0;
    color: #ccc;
    margin-left: 20px;
    margin-top: 20px;
    border-radius: 10px;
  }
`;

const List = (props) => {
  const { list, listIdsLength } = props;

  return (
    <>
      <Tile>
        <Title title={list.title} listId={list.id} />
        {list.cards.map((card) => {
          return (
            <Card
              listIdsLength={listIdsLength}
              key={card.id}
              card={card}
              listId={list.id}
            />
          );
        })}
        <InputContainer listId={list.id} type="card" />
      </Tile>
    </>
  );
};

export default List;
