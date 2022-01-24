import { useState } from "react";
import "./App.css";
import List from "./components/lists/List";
import store from "./utils/store";
import StoreApi from "./utils/storeApi";
import { v4 as uuid } from "uuid";
import InputContainer from "./components/input/InputContainer";
import styled from "styled-components";

const AppContainer = styled.div`
   {
    display: flex;
    min-height: 100vh;
    background-color: bisque;
  }
`;

const AppHeader = styled.h2`
   {
    padding: 10px;
  }
`;

function App() {
  const [data, setData] = useState(store);

  const addMoreCard = (title, listId) => {
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
    };
    const list = data.lists[listId];
    list.cards = [...list.cards, newCard];

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };

  const addMoreLists = (title) => {
    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: [],
    };

    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
    };
    setData(newState);
  };

  const updateListTitle = (title, listId) => {
    const list = data.lists[listId];
    list.title = title;
    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };

  const deleteCard = (cardId, listId) => {
    const cardIndex = data.lists[listId].cards.findIndex(
      (res) => res.id === cardId
    );
    let newData = data.lists[listId].cards.splice(cardIndex, 1);
    const newState = {
      ...data,
      lists: {
        ...data.lists,
        cards: newData,
      },
    };
    setData(newState);
  };

  const updateCardTitle = (cardId, title, listId) => {
    const cards = data.lists[listId].cards;

    const cardIndex = cards.findIndex((res) => res.id === cardId);
    cards[cardIndex].title = title;
    const newState = {
      ...data,
      lists: {
        ...data.lists,
        cards: cards,
      },
    };
    setData(newState);
  };

  const updateAdjacentList = (card, listId, action) => {
    const currentlistIndex = data.listIds.indexOf(listId);
    const nextListId = data.listIds[currentlistIndex + 1];
    const prevListId = data.listIds[currentlistIndex - 1];
    const newState = {
      ...data,
      lists: {
        ...data.lists,
        cards:
          data.lists[action === "next" ? nextListId : prevListId].cards.push(
            card
          ),
      },
    };
    setData(newState);
  };
  return (
    <StoreApi.Provider
      value={{
        addMoreCard,
        addMoreLists,
        updateListTitle,
        deleteCard,
        updateCardTitle,
        updateAdjacentList,
      }}
    >
      <AppHeader>Trello Board</AppHeader>
      <AppContainer className="App">
        {data.listIds.map((listId) => {
          const list = data.lists[listId];
          return (
            <List
              list={list}
              key={listId}
              listIdsLength={data.listIds.length}
            />
          );
        })}
        <InputContainer type="lists" />
      </AppContainer>
    </StoreApi.Provider>
  );
}

export default App;
