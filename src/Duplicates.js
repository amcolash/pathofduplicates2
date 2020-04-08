import React, { Fragment } from 'react';
import axios from 'axios';
import { Loader } from 'react-feather';

import './Duplicates.css';

export default class Duplicates extends React.Component {
  state = { data: undefined, error: undefined, loading: false };

  getData() {
    this.setState({ loading: true });

    const { user, league, poesessid } = this.props;
    const server = `${window.location.protocol}//${window.location.hostname}:9050`;

    axios
      .get(`${server}/poe`, { params: { user, league, poesessid } })
      .then((res) => {
        this.filterDuplicates(res.data);
      })
      .catch((err) => {
        console.error(err);
        this.setState({ error: true });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  filterDuplicates(data) {
    const count = {};
    data.forEach((item) => {
      const name = item.typeLine + item.name;
      if (!count[name]) count[name] = { count: 1, item, tabs: { [item.inventoryId]: 1 } };
      else {
        count[name].count++;
        if (!count[name].tabs[item.inventoryId]) count[name].tabs[item.inventoryId] = 1;
        else count[name].tabs[item.inventoryId]++;
      }
    });

    const duplicates = [];
    Object.keys(count).forEach((k) => {
      if (count[k].count > 1) duplicates.push(count[k]);
    });

    this.setState({ data: duplicates });
  }

  render() {
    const { data, error, loading } = this.state;

    return (
      <div className="duplicates">
        {error ? (
          <div className="error">
            Error Occurred
            <br />
            Either your entered information is incorrect, or your account is being rate-limited. Please check your credentials and retry in
            a moment.
          </div>
        ) : data ? (
          <div className="results">
            {data.map((dupe) => (
              <div className="item" key={dupe.item.id}>
                <img src={dupe.item.icon} className="icon" alt="icon" />
                <div>
                  <span>{dupe.item.typeLine}</span>
                  <br />
                  {dupe.item.name ? (
                    <Fragment>
                      <span>{dupe.item.name}</span>
                      <br />
                    </Fragment>
                  ) : null}
                  {Object.keys(dupe.tabs).map((k) => (
                    <Fragment key={k}>
                      <span>
                        {k}: {dupe.tabs[k]}
                      </span>
                      <br />
                    </Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <button disabled={loading} onClick={() => this.getData()}>
            <span>Find Duplicates</span>
            {loading ? <Loader className="loader" /> : null}
          </button>
        )}
      </div>
    );
  }
}
