import React, { Component } from "react";
import "./styles.css";

const CardList = (props) => (
  <div>
    {props.profiles.map((profile) => (
      <Card key={profile.shortUrl} {...profile} />
    ))}
  </div>
);

class Card extends Component {
  render() {
    const profile = this.props;
    return (
      <div className="url-profile">
        <div className="info">
          <div className="longUrl">{profile.longUrl}</div>
          <div className="shortUrl">
            <a href={"https://" + profile.longUrl}>{profile.shortUrl}</a>
          </div>
        </div>
      </div>
    );
  }
}

class Form extends Component {
  state = { longUrl: "", shortUrl: require("shortid").generate() };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ longUrl: "", shortUrl: require("shortid").generate() });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.longUrl}
          onChange={(event) => this.setState({ longUrl: event.target.value })}
          placeholder="Type in a Url"
          required
        />
        <button>Shorten Me</button>
      </form>
    );
  }
}

export default class App extends Component {
  state = {
    profiles: []
  };
  addNewProfile = (profileData) => {
    this.setState((prevState) => ({
      profiles: [...prevState.profiles, profileData]
    }));
  };
  render() {
    return (
      <div>
        <div className="header">URL SHORTNER APP</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}
