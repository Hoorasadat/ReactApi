import React from "react";
import Card from './Card';

function CardList (props){
  const { currentPageData } = props;

  const cardsArray = currentPageData.map(person => {
    return (
      <Card
        key={person.id}
        // id={person.id}
        name={person.name}
        phone={person.phone}
        email={person.email}
        image={person.image}
      />
    );
  });
  return(
    <div>
      {cardsArray}:
    </div>
  );
}

export default CardList;
