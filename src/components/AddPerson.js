import React, { Component } from 'react';
import '../styles/AddPerson.css';

class AddPerson extends Component {

  state = {
    nickname: '',
    email: '',
    ip: '',

    errors: {
      email: false,
      ip: false,
      exists: false
    }
  }

  //lista wyswietlanych bledow przy walidacji
  messages = {
    email_incorrect: "Invalid email format",
    ip_incorrect: "Invalid IP format",
    exists_incorrect: "Nickname/email already exists"
  }

  //kontrolowanie inputow formularza
  handleChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  //walidacja formularza
  formValidation = () => {
    let email = false;
    let ip = false;
    let exists = false;
    let correct = false;

    //wyrazenia regularne do sprawdzenia maila i IP
    const mailReg = /^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$/;
    const ipReg = /[0-2]{1}[0-5]{2}\.[0-2]{1}[0-5]{2}\.[0-2]{1}[0-5]{2}\.[0-2]{1}[0-5]{2}$/y;

    let findUser = this.props.find(this.state.nickname, this.state.email);

    if (mailReg.test(this.state.email)) {
      email = true;
    }

    if (ipReg.test(this.state.ip)) {
      ip = true;
    }

    if (!findUser) {
      exists = true;
    }

    //sprawdzenie, czy wszystkie pola sa poprawnie uzupelnione
    if (email && ip && exists) {
      correct = true;
    }

    return ({
      email,
      ip,
      exists,
      correct
    })

  }

  //generacja daty dodania uzytkownika
  dateGenerator = () => {
    let creationDate = Date.now(),
      hour = new Date(creationDate).getHours(),
      minutes = new Date(creationDate).getMinutes(),
      day = new Date(creationDate).getDate(),
      month = new Date(creationDate).getMonth() + 1,
      year = new Date(creationDate).getFullYear();

    if (hour < 10) hour = "0" + hour;
    if (minutes < 10) minutes = "0" + minutes;
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    //data w formacie MM.DD.YYYY HH:MM
    return month + "-" + day + "-" + year + " " + hour + ":" + minutes;
  }

  //obsluga klikniecia w przycisk dodawania uzytkownika
  handleSubmit = () => {

    const validation = this.formValidation();

    if (validation.correct) {

      const fullDate = this.dateGenerator();
      const { nickname, email, ip } = this.state;
      const add = this.props.add(nickname, email, ip, fullDate);


      if (add) {
        this.setState({
          nickname: '',
          email: '',
          ip: '',

          errors: {
            email: false,
            ip: false,
            exists: false
          }
        })
      }
    } else {
      this.setState({
        errors: {
          email: !validation.email,
          ip: !validation.ip,
          exists: !validation.exists
        }
      })
    }
  }

  render() {

    return (
      <div className="form">
        <div>
          <label htmlFor="nickname">Nickname
          <br />
            <input
              type="text"
              id="nickname"
              placeholder="Enter nickname"
              value={this.state.nickname}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label className={this.state.errors.email ? 'error' : null} htmlFor="email">Email
          <br />
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleChange}
              className={this.state.errors.email ? 'error' : null}
            />
            <span className={this.state.errors.email ? "spanError" : null} >{this.state.errors.email && this.messages.email_incorrect}</span>
          </label>
        </div>
        <div>
          <label className={this.state.errors.ip ? 'error' : null} htmlFor="ip">IP address
          <br />
            <input
              type="text"
              id="ip"
              placeholder="Enter IP addres"
              value={this.state.ip}
              onChange={this.handleChange}
              className={this.state.errors.ip ? 'error' : null}
            />
            <span className={this.state.errors.ip ? "spanError" : null} >{this.state.errors.ip && this.messages.ip_incorrect}</span>
          </label>
        </div>
        <br />
        <button onClick={this.handleSubmit} >Add user</button>
        <span className={this.state.errors.exists ? "spanError" : null} >{this.state.errors.exists && this.messages.exists_incorrect}</span>
      </div>

    );
  }
}

export default AddPerson;