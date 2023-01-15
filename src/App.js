import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {
  /**
   * useState() gives us an array = [value, setValue()]
   */
  const [searchField, setSearchField] = useState('');
  const [title, setTitle] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  /**
   * useEffect takes a callback function () => {}
   * and a dependency array [].
   * 
   * The callback function holds the effects of this function component.
   * The dependency array usually holds the state values of this component.
   * 
   * The callback function is triggered only when the values inside dependency array
   * is changed.
   */
  useEffect(() => {
    /**
     * In this case, the fetch call is the side-effect
     * 
     * As we do not want this fetch call to happen only once (during componentDidMount),
     * we will pass the depency array as an empty array. Because, when there is nothing to change,
     * there is no reason for the fetch call to happen again.
     */
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    /**
     * In this case, the monsters array is filtered only when
     * the monsters array and/or searchField is changed.
     */
    const newFilteredMonsters = monsters.filter(
      (monster) => {
        return monster.name.toLocaleLowerCase().includes(searchField);
      }
    );

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const onTitleChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setTitle(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className='app-title'>{ title }</h1>

      <SearchBox
        className='monsters-search-box'
        onChangeHandler={onSearchChange}
        placeholder='Search monsters' />
      <br />
      <SearchBox
        className='title-search-box'
        onChangeHandler={onTitleChange}
        placeholder='Set title' />

      <CardList monsters={filteredMonsters} />

    </div>
  );
};

export default App;
