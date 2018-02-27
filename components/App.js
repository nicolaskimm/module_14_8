var GIPHY_API_URL = "https://api.giphy.com/v1/";
var GIPHY_PUB_KEY = "GtgLu5ELTHPKs15fyDS8H5sjZ62RZT2P";

App = React.createClass({

  getInitialState() {
    return {
      loading: false,
      searchingText: "",
      gif: {}
    };
  },

  handleSearch: function(searchingText) {  
    this.setState ({
      loading: true
    });
    this.getGif (searchingText, function(gif) {  
      this.setState ({  
        loading: false, 
        gif: gif,  
        searchingText: searchingText 
      });
    }.bind (this));
	},
	
	handleChange: function (event) {
    var searchingText = event.target.value;
    this.setState ({searchingText: searchingText});

    if (searchingText.length > 2) {
      this.props.onSearch (searchingText);
    }
  },

  handleKeyUp: function(event) {
    if (event.keyCode === 13) {
      this.props.onSearch(this.state.searchingText);
    }
  },

	render: function() {
		var styles = {fontSize: '1.5em', width: '90%', maxWidth: '350px'};

    return <input
             type="text"
             onChange={this.handleChange}
             onKeyUp={this.handleKeyUp}
             placeholder="Tutaj wpisz wyszukiwaną frazę"
             style={styles}
             value={this.state.searchTerm}
            />
  },

  getGif: function(searchingText, callback) { 
		var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText; 
    var xhr = new XMLHttpRequest();  
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status === 200) {
           var data = JSON.parse(xhr.responseText).data; 
            var gif = {  
                url: data.fixed_width_downsampled_url,
                sourceUrl: data.url
            };
            callback(gif);  
        }
    };
    xhr.send();
	},

	render: function() {
    var styles = {
      margin: "0 auto",
      textAlign: "center",
      width: "80%"
    };
    return (
      <div style={styles}>
        <h1>Gif Searcher</h1>
        <p>
          Find a gif on <a href="http://giphy.com">giphy</a> Hit enter in order
          to download them
        </p>
        <Search onSearch={this.handleSearch} />
        <Gif
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
});

var app = React.createElement(App);
ReactDOM.render(app, document.getElementById("app"));