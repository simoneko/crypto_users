import React from 'react';
import '../styles/Person.css';

const Person = (props) => {

  const { id, nickname, email, ip, creationDate } = props.person;

  return (
    <tr>
      {/* jezeli pole 'nickname' jest puste, to wpisz '-' */}
      <td>{nickname === '' ? "-" : nickname}</td>
      <td>{email}</td>
      <td>{ip}</td>
      <td>{creationDate}</td>
      <td><button onClick={() => props.delete(id)} >X</button></td>
    </tr>
  );
}

export default Person;