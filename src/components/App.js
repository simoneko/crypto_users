/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import '../styles/App.css';
import AddPerson from './AddPerson';
import PersonList from './PersonList';

class App extends Component {

  //counter do inkrementacji id uzytkownikow
  counter = 5;

  //lista uzytkownikow
  state = {
    persons: [
      {
        id: 0,
        nickname: "Randomowicz",
        email: "randomowicz@o2.pl",
        ip: "255.111.222.000",
        creationDate: "05-02-2019 20:12"
      },
      {
        id: 1,
        nickname: "Loremiarz",
        email: "loremiarz@gmail.com",
        ip: "255.111.100.121",
        creationDate: "06-03-2019 11:02"
      },
      {
        id: 2,
        nickname: "Lutnik",
        email: "lutnik@tlen.pl",
        ip: "232.111.111.121",
        creationDate: "06-01-2019 18:19"
      },
      {
        id: 3,
        nickname: "Wilczur",
        email: "wilczek@maly.pl",
        ip: "128.111.128.121",
        creationDate: "05-28-2019 10:05"
      },
      {
        id: 4,
        nickname: "Kapturek",
        email: "zielony@przezlas.pl",
        ip: "255.111.222.121",
        creationDate: "06-01-2019 20:12"
      },
    ]
  }

  //dodawanie uzytkownika do listy
  addPerson = (nickname, email, ip, fullDate) => {
    const person = {
      id: this.counter,
      nickname,
      email,
      ip,
      creationDate: fullDate
    }
    this.counter++;

    this.setState(prevState => ({
      persons: [...prevState.persons, person]
    }))

    return true;
  }

  //kasowanie pojedynczego uzytkownika
  deletePerson = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      let persons = [...this.state.persons];
      persons = persons.filter(person => person.id !== id);
      this.setState({
        persons
      })
    }
  }

  //kasowanie wszystkich uzytkownikow
  deleteAll = () => {
    if (confirm("Are you sure you want to delete every user?")) {
      this.setState({
        persons: []
      })
    }
  }

  //sprawdzenie, czy uzytkownik o podanym nickname/email juz istnieje
  findUser = (nick, mail) => {
    const findNick = (this.state.persons.filter(person => person.nickname === nick));
    const findMail = (this.state.persons.filter(person => person.email === mail))
    //jezeli istnieje - zwroc true
    if (((findNick.length > 0) && (nick !== "")) || (findMail.length > 0)) return true
    else return false;
  }

  // sortowanie kolumn w tablicy
  sortColumn = (key) => {
    const data = this.state.persons;
    data.sort((a, b) => a[key].localeCompare(b[key]));
    this.setState({
      persons: data
    })
  }


  render() {
    return (
      <div className="App">
        <h1>Crypto users</h1>
        <AddPerson
          add={this.addPerson}
          find={this.findUser}
        />
        <br />
        <PersonList
          list={this.state.persons}
          delete={this.deletePerson}
          deleteAll={this.deleteAll}
          sortColumn={this.sortColumn}
        />
      </div>
    );
  }
}

export default App;
