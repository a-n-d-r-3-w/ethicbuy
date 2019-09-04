import { Component } from 'react';
import { bcorporations } from './data/bcorporations';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
    this.updateUrl = this.updateUrl.bind(this);
    this.search = this.search.bind(this);
  }

  updateUrl(event) {
    this.setState({ url: event.target.value });
  }

  search() {
    alert(this.state.url);
  }

  render() {
    return (
      <div>
        <h1>Ethicbuy</h1>
        <input placeholder="Paste URL here" onChange={this.updateUrl} />
        <button onClick={this.search}>Search</button>
        <style jsx>{`
          * {
            font-family: 'Arial';
          }
        `}</style>
      </div>
    );
  }
}

export default Index;
