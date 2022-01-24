const cards = [
    {
      id: "card1",
      title: "Task1",
    },
    {
      id: "card2",
      title: "Task2",
    },
    {
      id: "card3",
      title: "Task3",
    },
  ];
  
  const data = {
    lists: {
      list1: {
        id: "list1",
        title: "ToDo",
        cards,
      },
    },
    listIds: ["list1"],
  };
  
  export default data;
  