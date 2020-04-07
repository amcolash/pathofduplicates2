import React from 'react';
import './App.css';

import Card from './Card';
import Settings from './Settings';

export default class App extends React.Component {
  state = {
    user: window.localStorage.getItem('user') || '',
    league: window.localStorage.getItem('league') || 'delirium',
    poesessid: window.localStorage.getItem('poesessid') || '',
  };

  render() {
    const { user, league, poesessid } = this.state;

    return (
      <div className="App">
        <Card>
          <Settings
            user={user}
            league={league}
            poesessid={poesessid}
            onValueChanged={(user, league, poesessid) => {
              this.setState({ user, league, poesessid });
              window.localStorage.setItem('user', user);
              window.localStorage.setItem('league', league);
              window.localStorage.setItem('poesessid', poesessid);
            }}
          />
        </Card>
      </div>
    );
  }
}
