/* jsx */
require("./style.less");
import React from 'react'
import { render } from 'react-dom'
require('lodash');
import { Router, Route, Link, History, Lifecycle } from 'react-router';
var Trianglify = require('trianglify');

var Masonry = require('react-masonry-component')(React);

var masonryOptions = {
    itemSelector: '.square',
    columnWidth: '.square',
    percentPosition: true
};

var list = ["http://nofilmschool.com/rss.xml",
	    "https://www.cinema5d.com/feed/",
	    "http://petapixel.com/topic/inspiration/feed/",
	    "http://philipbloom.net/blog/feed/",
	    "http://filmmakeriq.com/feed/",
	    "http://www.comingsoon.net/feed",
	   ];


const App = React.createClass({
    mixins: [ Lifecycle, History ],
    getInitialState: function() {
        return {};
    },
    componentWillMount: function() {
	var that = this;
	var toset = {};
	console.log('list', list)
	
	_.each(list, function(u){
	    $.getJSON('https://ajax.googleapis.com/ajax/services/feed/load?num=100&v=1.0&q=' + encodeURIComponent(u) + '&callback=?', function(x) {
		var toset = {};
		var items = _.filter(x.responseData.feed.entries, function(x){
		    var days = (new Date() - new Date(x.publishedDate)) / 1000 / 60 / 60 / 24;
		    if (days <= 5) {
			return true;
		    }
		}).sort((a,b)=>(new Date(b.publishedDate) - new Date(a.publishedDate)));
		
		console.log(items);
		
		_.each(items, function(e,i){
		    if (e) {
			console.log(u,i)
			toset[u + '_' + i] = <Square href={e.link} name={e.title} text={e.title} more={e}
			getimgsrc={(x) => { return $($('<div>' + x.content + '</div>').find('img')).attr('src') ||
					    console.warn('no image', x)}} key={u + '_' + i} />
			    that.setState(toset);
			
		    }
		});
		
	    });
	});
    },
    nav: function(k,v) {
        
    },
    routerWillLeave: function(nextLocation) {
        return null;
    },
    _nav: function(q) {
        this.history.pushState(null, '/', q);
        this.setState(q);
    },
    render: function() {
	var that = this;
	if (Object.keys(this.state).length === 0) {
	    return null;
	}

	var squares = [];
	_.each(that.state, function(v, u){
	    squares = _.union(squares, [v])
	});

        return (
		<div className="squares">
		<Masonry className={'my-gallery-class'} elementType={'div'} options={masonryOptions} disableImagesLoaded={false}>
		{squares}
   	    </Masonry>
	    </div>
        );
    }
});

const Square = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentWillMount: function() {
	var that = this;
    },
    nav: function(k,v) {
        
    },
    getImgSrcFromContent: function() {
	var src = this.props.getimgsrc && this.props.getimgsrc(this.props.more);
	return src;
    },
    render: function() {
	var src = this.getImgSrcFromContent();
	if (!src) {
	    return null;
	}
	
	return (
		<div className="square">
		<a href={this.props.href} target="_blank">
		<img src={src} />
		<div className="text">
		<h2>{this.props.name}</h2>
		</div>
		</a>
		</div>
	)
    }
});



import createBrowserHistory from 'history/lib/createBrowserHistory';

render((
	<Router history={createBrowserHistory()}>
        <Route path="/" component={App}>
        </Route>
        <Route path="/index.html" component={App}>
        </Route>
	<Route path="/roger/" component={App}>
        </Route>

    </Router>), document.getElementById('content'));




