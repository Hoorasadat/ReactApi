import React from 'react';

const Card = (props) => {
    const {
        // id, // robofriends
        name, phone, email,
        image
    } = props;
    const photo = require (`${image}`);
    return (
        <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
            <img
                src={photo}
                // src={`https://robohash.org/${id}`} // robofriends
                alt="Nothing availabble"
                className="mw5"
            />
            <div>
                <h2>{name}</h2>
                <p>{phone}</p>
                <p>{email}</p>
            </div>
        </div>
    );
}

export default Card;
