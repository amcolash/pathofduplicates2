import React from 'react';
import { Settings } from 'react-feather';

import './App.css';
import Card from './Card';
import Duplicates from './Duplicates';
import SettingsComponent from './SettingsComponent';

export default class App extends React.Component {
  state = {
    user: window.localStorage.getItem('user') || '',
    league: window.localStorage.getItem('league') || 'delirium',
    poesessid: window.localStorage.getItem('poesessid') || '',
    showSettings: false,
  };

  componentDidMount() {
    const { user, poesessid } = this.state;
    this.setState({ showSettings: user.length === 0 || poesessid.length === 0 });
  }

  render() {
    const { user, league, poesessid, showSettings } = this.state;

    return (
      <div className="App">
        <Settings className="settingsIcon" onClick={() => this.setState({ showSettings: !this.state.showSettings })} />
        <Card>
          <h2>Path of Duplicates 2</h2>
          <br />
          {showSettings ? (
            <SettingsComponent
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
          ) : (
            <Duplicates user={user} league={league} poesessid={poesessid} />
          )}
        </Card>
      </div>
    );
  }
}
