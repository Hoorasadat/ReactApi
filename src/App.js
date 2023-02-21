import React, {
    // useEffect,
    useState} from 'react';
import './App.css';
import SearchBox from './SearchBox';
import ShowCards from './ShowCards';
import { friends } from './friends';


function App() {
    const people = friends;
    // const [myFriends, setMyFriends] = useState([]);
    const [searchField, setSearchField] = useState('');

    // useEffect(() => { // robofriends
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(response => response.json())
    //     .then(users => setMyFriends(users));
    // },[])

    const onSearchChange = (event) => {
        setSearchField(event.target.value);
    }

    var filteredPeople = people.filter(person => {
        return (person.name.toLowerCase().includes(searchField.toLowerCase()))
    });

    return !people.length ?
        <h1>Loading</h1> :

        <div className = "tc">
            <h1 className='f2'>My Friends</h1>
            <SearchBox searchChange={onSearchChange}/>

            {!filteredPeople.length
                ? <h2>Nothing found!</h2>
                : <ShowCards people={filteredPeople}/>
            }
        </div>
    ;
}

export default App;
