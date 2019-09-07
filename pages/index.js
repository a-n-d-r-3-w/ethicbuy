import { Component } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      asin: '',
      brand: ''
    }
    this.updateUrl = this.updateUrl.bind(this);
    this.search = this.search.bind(this);
  }

  updateUrl(event) {
    this.setState({ url: event.target.value });
  }

  search() {
    // Copied from https://stackoverflow.com/a/1768114
    const regex = RegExp("http[s]?://www.amazon.com/([\\w-]+/)?(dp|gp/product)/(\\w+/)?(\\w{10})");
    const match = this.state.url.match(regex);
    if (match) {
      const asin = match[4];
      this.setState({ asin })
      const infoUrl = `https://api.sellerapp.com/free_tool/product/details?product_id=${asin}`;
      fetch(infoUrl)
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          const { brand } = responseJson;
          this.setState({ brand });
        });
    } else {
      alert('No ASIN found.');
    }
  }

  render() {
    return (
      <div>
        <h1>Ethicbuy</h1>
        <input placeholder="Paste URL here" onChange={this.updateUrl} />
        <button onClick={this.search}>Search</button>
        <p>ASIN: {this.state.asin}</p>
        <p>Brand: {this.state.brand}</p>
        <style jsx>{`
          * {
            font-family: 'Arial';
          }
        `}</style>
      </div>
    );
  }
}

Index.getInitialProps = async function () {
  const res = await fetch('http://localhost:3000/api/bcorporations');
  const data = await res.json();
  return data;
}

export default Index;
