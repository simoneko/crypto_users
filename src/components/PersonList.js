import React from 'react';
import Person from './Person';
import '../styles/PersonList.css';

const PersonList = (props) => {

  //mapowanie listy uzytkownikow wg. stanu glownego komponentu App
  const personsList = props.list.map(person => <Person key={person.id} person={person} delete={props.delete} />)

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {/* dodanie sortowania po kliknieciu na kolumne */}
            <th onClick={() => props.sortColumn('nickname')} >Nickname</th>
            <th onClick={() => props.sortColumn('email')} >Email</th>
            <th>IP address</th>
            <th onClick={() => props.sortColumn('creationDate')} >Creation date</th>
            {/* jezeli nie ma zadnego uzytkownika, to nie wyswietlaj przycisku usuwania calej listy */}
            <th>{personsList.length > 0 && <button onClick={props.deleteAll} >X</button>}</th>
          </tr>
        </thead>
        <tbody>
          {personsList}
        </tbody>
      </table>
    </div>
  );
}

export default PersonList;