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
    percentPosition: true,
    transitionDuration: '1.2s'
};

var list = [
    "http://nofilmschool.com/rss.xml",
    "https://www.cinema5d.com/feed/",
    "http://petapixel.com/topic/inspiration/feed/",
    "http://philipbloom.net/blog/feed/",
    "http://filmmakeriq.com/feed/",
    "http://www.comingsoon.net/feed", 
    "https://vimeo.com/theawardeocompany/videos/rss",
    "https://vimeo.com/channels/staffpicks/videos/rss",
    "http://www.premiumbeat.com/blog/feed/",
    "http://cinearchive.org/rss", 
    "https://www.youtube.com/feeds/videos.xml?channel_id=UCSpFnDQr88xCZ80N-X7t0nQ",
    "https://www.youtube.com/feeds/videos.xml?channel_id=UCYaIdC5pbkpECxXLjf0Lzaw", 
    "https://gointothestory.blcklst.com/category/infographic/feed", 
    "https://www.hurlbutvisuals.com/blog/feed/", 
];

var quotes = [
	{text: "Frankly, my dear, I don't give a damn.", name:"Gone with the Wind"},
	{text: "I'm gonna make him an offer he can't refuse.", name:"The Godfather"},
	{text: "You don't understand! I coulda had class. I coulda been a contender. I could've been somebody, instead of a bum, which is what I am.", name:"On the Waterfront"},
	{text: "Toto, I've got a feeling we're not in Kansas anymore.", name:"The Wizard of Oz"},
	{text: "Here's looking at you, kid.", name:"Casablanca"},
	{text: "Go ahead, make my day.", name:"Sudden Impact"},
	{text: "All right, Mr. DeMille, I'm ready for my close-up.", name:"Sunset Boulevard"},
	{text: "May the Force be with you.", name:"Star Wars"},
	{text: "Fasten your seatbelts. It's going to be a bumpy night.", name:"All About Eve"},
	{text: "You talkin' to me?", name:"Taxi Driver"},
	{text: "What we've got here is failure to communicate.", name:"Cool Hand Luke"},
	{text: "I love the smell of napalm in the morning.", name:"Apocalypse Now"},
	{text: "Love means never having to say you're sorry.", name:"Love Story"},
	{text: "The stuff that dreams are made of.", name:"The Maltese Falcon"},
	{text: "E.T. phone home.", name:"E.T. the Extra-Terrestrial"},
	{text: "They call me Mister Tibbs!", name:"In the Heat of the Night"},
	{text: "Rosebud.", name:"Citizen Kane"},
	{text: "Made it, Ma! Top of the world!", name:"White Heat"},
	{text: "I'm as mad as hell, and I'm not going to take this anymore!", name:"Network"},
	{text: "Louis, I think this is the beginning of a beautiful friendship.", name:"Casablanca"},
	{text: "A census taker once tried to test me. I ate his liver with some fava beans and a nice Chianti.", name:"The Silence of the Lambs"},
	{text: "Bond. James Bond.", name:"Dr. No"},
	{text: "There's no place like home.", name:"The Wizard of Oz"},
	{text: "I am big! It's the pictures that got small.", name:"Sunset Boulevard"},
	{text: "Show me the money!", name:"Jerry Maguire"},
	{text: "Why don't you come up sometime and see me?", name:"She Done Him Wrong"},
	{text: "I'm walking here! I'm walking here!", name:"Midnight Cowboy"},
	{text: "Play it, Sam. Play 'As Time Goes By.'", name:"Casablanca"},
	{text: "You can't handle the truth!", name:"A Few Good Men"},
	{text: "I want to be alone.", name:"Grand Hotel"},
	{text: "After all, tomorrow is another day!", name:"Gone with the Wind"},
	{text: "Round up the usual suspects.", name:"Casablanca"},
	{text: "I'll have what she's having.", name:"When Harry Met Sally..."},
	{text: "You know how to whistle, don't you, Steve? You just put your lips together and blow.", name:"To Have and Have Not"},
	{text: "You're gonna need a bigger boat.", name:"Jaws"},
	{text: "Badges? We ain't got no badges! We don't need no badges! I don't have to show you any stinking badges!", name:"The Treasure of the Sierra Madre"},
	{text: "I'll be back.", name:"The Terminator"},
	{text: "Today, I consider myself the luckiest man on the face of the Earth.", name:"The Pride of the Yankees"},
	{text: "If you build it, he will come.", name:"Field of Dreams"},
	{text: "Mama always said life was like a box of chocolates. You never know what you're gonna get.", name:"Forrest Gump"},
	{text: "We rob banks.", name:"Bonnie and Clyde"},
	{text: "Plastics.", name:"The Graduate"},
	{text: "We'll always have Paris.", name:"Casablanca"},
	{text: "I see dead people.", name:"The Sixth Sense"},
	{text: "Stella! Hey, Stella!", name:"A Streetcar Named Desire"},
	{text: "Oh, Jerry, don't let's ask for the moon. We have the stars.", name:"Now, Voyager"},
	{text: "Shane. Shane. Come back!", name:"Shane"},
	{text: "Well, nobody's perfect.", name:"Some Like It Hot"},
	{text: "It's alive! It's alive!", name:"Frankenstein"},
	{text: "Houston, we have a problem.", name:"Apollo 13"},
	{text: "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?", name:"Dirty Harry"},
	{text: "You had me at 'hello.'", name:"Jerry Maguire"},
	{text: "One morning I shot an elephant in my pajamas. How he got in my pajamas, I don't know.", name:"Animal Crackers"},
	{text: "There's no crying in baseball!", name:"A League of Their Own"},
	{text: "La-dee-da, la-dee-da.", name:"Annie Hall"},
	{text: "A boy's best friend is his mother.", name:"Psycho"},
	{text: "Greed, for lack of a better word, is good.", name:"Wall Street"},
	{text: "Keep your friends close, but your enemies closer.", name:"The Godfather Part II"},
	{text: "As God is my witness, I'll never be hungry again.", name:"Gone with the Wind"},
	{text: "Well, here's another nice mess you've gotten me into!", name:"Sons of the Desert"},
	{text: "Say 'hello' to my little friend!", name:"Scarface"},
	{text: "What a dump.", name:"Beyond the Forest"},
	{text: "Mrs. Robinson, you're trying to seduce me. Aren't you?", name:"The Graduate"},
	{text: "Gentlemen, you can't fight in here! This is the War Room!", name:"Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb"},
	{text: "Elementary, my dear Watson.", name:"The Adventures of Sherlock Holmes"},
	{text: "Get your stinking paws off me, you damned dirty ape.", name:"Planet of the Apes"},
	{text: "Of all the gin joints in all the towns in all the world, she walks into mine.", name:"Casablanca"},
	{text: "Here's Johnny!", name:"The Shining"},
	{text: "They're here!", name:"Poltergeist"},
	{text: "Is it safe?", name:"Marathon Man"},
	{text: "Wait a minute, wait a minute. You ain't heard nothin' yet!", name:"The Jazz Singer"},
	{text: "No wire hangers, ever!", name:"Mommie Dearest"},
	{text: "Mother of mercy, is this the end of Rico?", name:"Little Caesar"},
	{text: "Forget it, Jake, it's Chinatown.", name:"Chinatown"},
	{text: "I have always depended on the kindness of strangers.", name:"A Streetcar Named Desire"},
	{text: "Hasta la vista, baby.", name:"Terminator 2: Judgment Day"},
	{text: "Soylent Green is people!", name:"Soylent Green"},
	{text: "Open the pod bay doors, HAL.", name:"2001: A Space Odyssey"},
	{text: "Yo, Adrian!", name:"Rocky"},
	{text: "Hello, gorgeous.", name:"Funny Girl"},
	{text: "Toga! Toga!", name:"National Lampoon's Animal House"},
	{text: "Listen to them. Children of the night. What music they make.", name:"Dracula"},
	{text: "Oh, no, it wasn't the airplanes. It was Beauty killed the Beast.", name:"King Kong"},
	{text: "My precious.", name:"The Lord of the Rings: The Two Towers"},
	{text: "Attica! Attica!", name:"Dog Day Afternoon"},
	{text: "Sawyer, you're going out a youngster, but you've got to come back a star!", name:"42nd Street"},
	{text: "Listen to me, mister. You're my knight in shining armor. Don't you forget it. You're going to get back on that horse, and I'm going to be right behind you, holding on tight, and away we're gonna go, go, go!",name:"On Golden Pond"},
	
	{text: "Tell 'em to go out there with all they got and win just one for the Gipper.", name:"Knute Rockne, All American"},
	{text: "A martini. Shaken, not stirred.", name:"Goldfinger"},
	{text: "Who's on first?", name:"The Naughty Nineties"},
	{text: "Cinderella story. Outta nowhere. A former greenskeeper, now, about to become the Masters champion. It looks like a mirac...It's in the hole! It's in the hole! It's in the hole!", name:"Caddyshack"},
	{text: "Life is a banquet, and most poor suckers are starving to death!", name:"Auntie Mame"},
	{text: "I feel the need—the need for speed!", name:"Top Gun"},
	{text: "Carpe diem. Seize the day, boys. Make your lives extraordinary.", name:"Dead Poets Society"},
	{text: "Snap out of it!", name:"Moonstruck"},
	{text: "My mother thanks you. My father thanks you. My sister thanks you. And I thank you.", name:"Yankee Doodle Dandy"},
	{text: "Nobody puts Baby in a corner.", name:"Dirty Dancing"},
	{text: "I'll get you, my pretty, and your little dog too!", name:"The Wizard of Oz"},
    {text: "I'm the king of the world!", name:"Titanic"}];

var rquote = _.sample(quotes);


var getimages = function(str) {
    var urls = [];
    var rex = /<img[^>]+src="(.*?)"/gim;
    var m = null;
    while ( m = rex.exec( str ) ) {
	if (m[1].indexOf('twitt.gif') !== -1) {
	    continue;
	}
	urls.push( m[1] );
    }
    if (urls.length === 0) {
	urls.push(null);
    }
    return urls;
}


const App = React.createClass({
    mixins: [ Lifecycle, History ],
    getInitialState: function() {
        return {};
    },
    componentWillMount: function() {
	var that = this;
	
	var clist = that.state.list || [];
	window.allproms = [];
	_.each(list, function(u){
	    var okokok = null;
	    var p = new Promise(function(r){
		okokok = r;
	    })
	    allproms.push(p)
	    $.getJSON('https://ajax.googleapis.com/ajax/services/feed/load?num=100&v=1.0&q=' + encodeURIComponent(u) + '&callback=?', function(x) {
		var toset = {};
		var items = _.filter(x.responseData.feed.entries, function(x){
		    var days = (new Date() - new Date(x.publishedDate)) / 1000 / 60 / 60 / 24;
		    if (days <= 5) {
			return true;
		    }
		    else {
//			console.log('old post', u);
		    }
		});
		

		_.each(items, function(e,i){
		    var src = (
			e && e.mediaGroups && e.mediaGroups[0] && e.mediaGroups[0].contents && e.mediaGroups[0].contents[0] && 
			    e.mediaGroups[0].contents[0].thumbnails && e.mediaGroups[0].contents[0].thumbnails[0].url
		    ) || getimages(e.content)[0]
		    
		    if (e && src) {
			clist.push({date: e.publishedDate, square: <Square src={src} href={e.link} name={e.title} text={e.title} more={e} key={u + '_' + i} />});
		    }
		    else {
			!src && console.log('no src', e)
		    }
		});
		okokok();
		
	    });
	    	    
	});

	Promise.all(allproms).then(function(){
	    clist = clist.sort((a,b)=>(new Date(b.date) - new Date(a.date)));
	    that.setState({list: clist});
	})
	

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

	var name = rquote.name;
	var text = rquote.text;

	var shareurl = 'http://www.frameroger.com';
	
        return (
		<div>

		<div className="header">
		<a target="_blank" href="https://chrome.google.com/webstore/detail/frame-roger/paaokoancehdfjjlagdgnnhnnbhhdmhe?hl=en">
		<span>
		<div className="logo" />
		</span>
		<span>
		<div className="text">Internet for Filmmakers</div>
		</span>
		</a>
		<div className="right">
		<div className="w-widget w-widget-facebook mrk-share">
		<iframe src={"https://www.facebook.com/plugins/like.php?href=" + encodeURIComponent(shareurl) + "&layout=button_count&locale=en_US&action=like&show_faces=false&share=true"} scrolling="no" frameBorder="0" allowTransparency="true" ></iframe>
		    </div>
		    <div className="w-widget w-widget-twitter mrk-share mrk-twitt">
		<iframe src={"https://platform.twitter.com/widgets/tweet_button.html#url=" + encodeURIComponent(shareurl) + "&counturl=" + encodeURIComponent(shareurl) + "&text=" + encodeURIComponent("Internet for Filmmakers #frameroger") + "&count=none&size=m&dnt=true"} scrolling="no" frameBorder="0" allowTransparency="true"></iframe>
		    </div>
		    <div className="w-widget w-widget-gplus mrk-share">
		      
		<div className="g-plusone" data-href={shareurl} data-size="medium" data-annotation="bubble" data-width="120" data-recommendations="false" id="___plusone_0" ></div>
		</div>

		</div>
		</div>

		<div className="quote">
		<div className="wrap">
		<div className="text">
		{"\"" + text + "\""}
                </div>
		<div className="name">
                -{name}
            </div>
		</div>
		</div>
		
		<div className="squares">
		<Masonry className={'my-gallery-class'} elementType={'div'} options={masonryOptions} disableImagesLoaded={false} loading={()=>{$('.logo').addClass('loading'); window.clearTimeout(window.loadinglogo); window.loadinglogo = setTimeout(function(){$('.logo').removeClass('loading')},3000)}}>
		{_.map(this.state.list, x=>x.square)}
   	    </Masonry>
		</div>
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
    clicklink: function(u) {
	return (e) => {
	    e.preventDefault();
	    if (u.indexOf('?') !== -1) {
		u += '&ref=frameroger.com';
	    }
	    else {
		u += '?&ref=frameroger.com';
	    }
	    window.open(u + '');
	    ga('send', 'event', 'click-square', u, u);
	}
    },
    clicktweet: function(u) {
	return (e) => {
	    e.preventDefault();
	    window.open(u, 'share', 'height=400,width=550');
	    ga('send', 'event', 'click-tweet', u, u);
	}

    },
    render: function() {
	return (
		<div className="square">
		<a target="_blank" className="tweet" href="#" onClick={this.clicktweet("https://twitter.com/intent/tweet?text="+encodeURIComponent(this.props.name)+"&hashtags=frameroger&via=nuschooler&url="+encodeURIComponent(this.props.href)+"&original_referer=")}>
		
		</a>
		<a className="square-link" href={this.props.href} target="_blank" onClick={this.clicklink(this.props.href)} >
		<img src={this.props.src} />
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




