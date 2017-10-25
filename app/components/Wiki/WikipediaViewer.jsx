import React from 'react';
import SearchForm from './SearchForm';
import ResultList from './ResultList';

import superagent from 'superagent';
import jsonp from 'superagent-jsonp';

export default class WikipediaViewer extends React.Component {

  constructor() {
    super();
    this.state = { results: [ '', [], [], [] ] };
  }

  handleSearch(searchTerm) {
    superagent
      .get('https://en.wikipedia.org/w/api.php')
      .query({search: searchTerm, action: 'opensearch', format: 'json'})
      .use(jsonp)
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        else {
          this.setState({results: res.body});
        }
      });
    superagent
      .get('https://pl.wikipedia.org/w/api.php')
      .query({search: searchTerm, action: 'opensearch', format: 'json'})
      .use(jsonp)
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        else {
          this.setState({results: res.body});
        }
      });
  }

  render() {
    return (
      <div id="wiki" className="flexing">
        <h2 className="app-title">Wikipedia Viewer</h2>
        <p>Let's you to view and visit any article instantly as well as visit random article from Wiki database</p>
        <SearchForm onSearch={this.handleSearch.bind(this)}/>
        <ResultList results={this.state.results}/>
      </div>
    );
  }
}
