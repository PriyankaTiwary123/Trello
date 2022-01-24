import React, { useContext, useState } from "react";
import styled from "styled-components";
import storeApi from "../utils/storeApi";

const TypoGraphy = styled.h2`
   {
    color: Gray;
    font-weight: bold;
    cursor: pointer;
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

const MoreIcon = styled.i`
   {
    font-size: 24px;
    color: black;
  }
`;

const TitleContainer = styled.div`
   {
    display: flex;
    justify-content: space-between;
    margin-left: 10px;
    margin-right: 10px;
    align-items: baseline;
  }
`;

const TitleInputContainer = styled.div`
   {
    display: flex;
  }
`;

const Title = (props) => {
  const { title, listId } = props;
  const [open, setOpen] = useState();
  const [listTitle, setListTitle] = useState("");
  const { updateListTitle } = useContext(storeApi);

  const changeTitle = (e) => {
    setListTitle(e.target.value);
  };

  const handleBlurEffect = () => {
    updateListTitle(listTitle, listId);
    setOpen(false);
  };

  return (
    <>
      {open ? (
        <TitleInputContainer>
          <InputBase
            autoFocus
            onChange={changeTitle}
            value={listTitle}
            onBlur={handleBlurEffect}
          ></InputBase>
        </TitleInputContainer>
      ) : (
        <TitleContainer>
          <TypoGraphy onClick={() => setOpen(!open)}>{title}</TypoGraphy>
          <MoreIcon className="fa fa-ellipsis-h"></MoreIcon>
        </TitleContainer>
      )}
    </>
  );
};

export default Title;
