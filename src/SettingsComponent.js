import React from 'react';
import './SettingsComponent.css';

export default function SettingsComponent(props) {
  const { user, league, poesessid, onValueChanged } = props;

  return (
    <div>
      <form>
        <div className="inputItem">
          <label>User</label>
          <input type="text" spellCheck="false" value={user} onChange={(e) => onValueChanged(e.target.value, league, poesessid)} />
          <div className="break"></div>
          <span>What is my username?</span>
        </div>

        <div className="inputItem">
          <label>League</label>
          <select value={league} onChange={(e) => onValueChanged(user, e.target.value, poesessid)}>
            <option value="delirium">Delirium</option>
            <option value="todo">TODO</option>
          </select>
          <div className="break"></div>
          <span>What is my league?</span>
        </div>

        <div className="inputItem">
          <label>POESESSID</label>
          <input type="password" spellCheck="false" value={poesessid} onChange={(e) => onValueChanged(user, league, e.target.value)} />
          <div className="break"></div>
          <span>What is my POESESSID?</span>
        </div>
      </form>
    </div>
  );
}
