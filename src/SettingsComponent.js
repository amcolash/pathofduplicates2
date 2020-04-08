import React from 'react';
import './SettingsComponent.css';

export default function SettingsComponent(props) {
  const { user, league, poesessid, onValueChanged, closeSettings } = props;

  return (
    <div>
      <form>
        <div className="inputItem">
          <label>Account</label>
          <input type="text" spellCheck="false" value={user} onChange={(e) => onValueChanged(e.target.value, league, poesessid)} />
          <div className="break"></div>
          <a href="/images/account.png" target="_blank">
            What is my account?
          </a>
        </div>

        <div className="inputItem">
          <label>League</label>
          <select value={league} onChange={(e) => onValueChanged(user, e.target.value, poesessid)}>
            <option value="delirium">Delirium</option>
            <option value="todo">TODO</option>
          </select>
          <div className="break"></div>
          <a href="/images/league.png" target="_blank">
            What is my league?
          </a>
        </div>

        <div className="inputItem">
          <label>POESESSID</label>
          <input type="password" spellCheck="false" value={poesessid} onChange={(e) => onValueChanged(user, league, e.target.value)} />
          <div className="break"></div>
          <a href="/images/poesessid.png" target="_blank">
            What is my POESESSID?
          </a>
        </div>

        <div className="inputItem">
          <button type="button" onClick={() => closeSettings()}>
            Done
          </button>
        </div>
      </form>
    </div>
  );
}
