webpackHotUpdate(0,{

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(159);

	var _reactRouter = __webpack_require__(160);

	var _createBrowserHistory = __webpack_require__(209);

	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/* jsx */
	__webpack_require__(210);

	__webpack_require__(214);

	var Trianglify = __webpack_require__(216);

	var Masonry = __webpack_require__(255)(_react2.default);
	var masonryOptions = {
					itemSelector: '.grid-item',
					columnWidth: '.grid-item',
					percentPosition: true
	};

	window.triangles = function () {
					$(function () {
									var content = $('#content');
									var pattern = Trianglify({
													width: 300,
													height: 300,
													x_colors: 'PuRd'
									});
									content.append($('img').attr('src', pattern.png()));
					});
	};

	window.softclean = function (e, t) {
					return e.replace(/\./gim, '').replace(/"/gim, '').replace(/:/gim, '').split('ft')[0].split(' - ')[0];
	};

	window.clean = function (e, t) {
					return t ? e ? e.toLowerCase().replace(/"/gim, '').split(' - ')[0].split('ft')[0].replace(/^the\s|\sthe\s|\sand\s| ep$/gim, " ").replace(/part/gim, "pt").replace(RegExp("[^\\p{L}a-zA-Z0-9]", "gim"), "").replace("around", "round").trim(" ") : "" : e ? e.toLowerCase().replace(/^the\s|\sthe\s|\sand\s| ep$/gim, " ").replace(/\(.*?\)/gim, "").replace(/\[.*?\]/gim, "").replace(/part/gim, "pt").replace(RegExp("[^\\p{L}a-zA-Z0-9]", "gim"), "").replace("around", "round").trim(" ") : "";
	};

	var fetchFromPipe = function fetchFromPipe(tracks) {
					var hash = [];

					var vidreadiez = [];

					$.each(tracks, function (trki, trk) {
									if (!trk.name || !trk.artist) {
													console.log('no track name or artists');
													return;
									}
									var cleantrk = window.clean(trk.name);
									if (cleantrk === 'length') {
													return;
									}

									var vidready = $.Deferred();
									vidreadiez.push(vidready);

									trk.artist = trk.artist.replace(' / ', ' & ').replace(/&/gim, 'and');

									var song = cleantrk.length > 30 ? trk.name : trk.artist.toLowerCase() + ' ' + trk.name.toLowerCase();
									if (window.accurate) {
													song += ' ' + trk.album;
									}

									//	    var req = $.getJSON('https://gdata.youtube.com/feeds/api/videos?q=' + encodeURIComponent(song) + '&safeSearch=none&orderby=relevance&max-results=15&v=2&alt=json&callback=?', function(e) {
									var req = $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&safeSearch=none&max-results=15&key=AIzaSyDmfdow0Soqa6o_Vg-JG2Hcg11Bzrm2Vgk&type=video&q=' + encodeURIComponent(song) + '&callback=?', function (e) {

													/*		if (!e.feed.entry || e.feed.entry.length === 0) {
	            //					   console.log('empty. resolving');
	            vidready.resolve();
	            return;
	            }*/

													var lessgood = {};

													$.each(e.items, function (i, entry) {
																	if (vidready.state() === 'resolved') {
																					return;
																	}

																	var cleanYTitle = window.clean(entry.snippet.title);
																	var cleanartist = window.clean(trk.artist);

																	var id = entry.id.videoId;
																	var vidobj = {
																					order: trki,
																					id: id,
																					who_shared: 'takashirgb',
																					fromindie: true,
																					player: 'yt',
																					name: trk.name,
																					artist: trk.artist,
																					albums: trk.album,
																					viewCount: 0 };

																	function nogood(what, score, force) {
																					var rwhat = new RegExp(what);
																					if ((entry.snippet.title.toLowerCase().match(rwhat) || entry.snippet.description.toLowerCase().match(rwhat)) && !trk.name.toLowerCase().match(rwhat)) {

																									var already = lessgood[cleantrk];
																									if (!already || score > already.s || force) {
																													lessgood[cleantrk] = { s: score || 0, o: vidobj };
																									}

																									console.log('its a ' + what, 'srch:', song, 'you said: ', cleanartist, cleantrk, 'tube said', cleanYTitle);
																									return true;
																					}
																					return false;
																	};

																	var superclean = window.clean(entry.snippet.title, true).replace(cleantrk, '').replace(cleanartist, '').replace('new', '').replace('album', '').replace('lyrics', '').replace('hd', '').replace(/\d+p/gim, '').replace(window.clean(trk.album), '');

																	/*    if (superclean.length > 20){
	                      console.log('too many guys', 'srch:',
	                      song,
	                      'you said: ',
	                      cleanartist,
	                      cleantrk,
	                      'tube said',
	                      cleanYTitle);
	                      return;
	                	      }*/

																	if (cleanYTitle.indexOf(cleantrk.replace(/s$/gim, '')) === -1) {
																					console.log('no title.', 'srch:', song, 'you said: ', cleantrk, 'tube said', cleanYTitle);
																					return;
																	}

																	/*		    if (cleanYTitle.indexOf(cleanartist) === -1) {
	                		    var nothing = true;
	                		    $.each(entry.category,function(i, tag){
	                		    if (window.clean(tag.term).indexOf(cleanartist) !== -1){
	                		    nothing = false;
	                		    }
	                		    });
	                		    
	                		    if (nothing && cleantrk.length < 10) {
	                		    console.log('no artist.', 'srch:',
	                		    song,
	                		    'you said: ',
	                		    cleanartist,
	                		    cleantrk,
	                		    'tube said',
	                		    cleanYTitle);
	                		    return;
	                		    }
	                		    }*/

																	//nogood('version')
																	if (nogood('@ the', 2) || nogood('at the', 1) || nogood('from the basement', 1) || nogood('acoustic', 1) || nogood('thumbs') || nogood('concert') || nogood('explains') || nogood('teaser') || nogood('session', 1) || nogood('cover') || nogood('remix') || nogood('live', 1) || nogood('perform', 2) || nogood('version', 3) || nogood('philhar') || nogood('\\d{1,2}[\\.-/]\\d{1,2}', 0, true)) {
																					return;
																	}

																	/*		    if (entry.media$group.media$content[0].duration < 40) {
	                		    return;
	                		    }
	                */

																	vidready.resolve(vidobj);
																	return;
													});

													var lesskeys = _.keys(lessgood);
													if (vidready.state() !== 'resolved' && lesskeys.length) {
																	vidready.resolve(lessgood[lesskeys[0]].o);
													}

													vidready.resolve();
									});

									$.when(req).fail(function () {
													vidready.resolve();
									});

									setTimeout(function () {
													vidready.resolve();
									}, 5000);
					});
					return vidreadiez;
	};

	// term, cb
	var gettracksfromitunes = function gettracksfromitunes(t, n) {
					console.log('getting track', t, softclean(t));
					$.getJSON("https://itunes.apple.com/search?term=" + encodeURIComponent(softclean(t)) + "&limit=25&media=music&entity=musicTrack&callback=?", function (r) {
									console.log(r);
									var i = $.map(r.results, function (n) {
													return !clean(t).match(clean(n.trackName)) || "" === t.trim() || !clean(t).match(clean(n.artistName)) ? null : {
																	name: n.trackName,
																	artist: n.artistName,
																	album: n.collectionName,
																	trackNumber: n.trackNumber,
																	artwork: n.artworkUrl100.replace('100x100', '300x300')
													};
									});
									n(i);
					});
	};

	var getalbumsfromitunes = function getalbumsfromitunes(e, t) {
					$.getJSON("//itunes.apple.com/search?term=" + encodeURIComponent(e) + "&limit=25&media=music&entity=album&callback=?", function (n) {
									var r = $.map(n.results, function (t) {
													if (!clean(e).match(clean(t.artistName)) || !clean(e).match(clean(t.collectionName))) {
																	return null;
													}

													var n = null;
													try {
																	n = new Date(Date.parse(t.releaseDate)).getFullYear();
													} catch (r) {}

													return {
																	artist: t.artistName,
																	name: t.collectionName,
																	artwork: t.artworkUrl100.replace('100x100', '300x300'),
																	year: n
													};
									});

									t(r);
					});
	};

	var list = ["http://mind-exchange.com/feed", "https://www.nowness.com/rss", "https://artsponge.wordpress.com/rss", "http://picdit.net/rss", "http://thisisnthappiness.com/rss", "http://butdoesitfloat.com/rss", "http://www.haw-lin.com/rss", "http://beautifuldecay.com/rss", "http://feeds2.feedburner.com/Swissmiss", "http://feeds.feedburner.com/ucllc/fpo", "http://www.inventorymagazine.com/updates/atom.xml", "http://www.valetmag.com/distribution/rss_all.xml", "http://feeds.feedburner.com/selectism/rss", "https://www.flickr.com/services/feeds/groups_pool.gne?id=1231870@N21&lang=en-us&format=atom", "http://mosslessmagazine.com/rss", "http://www.manystuff.org/?feed=rss2", "https://www.pinterest.com/yaelrasner/feed.rss", "http://httpjasmin.tumblr.com/rss", "http://artruby.com/rss", "http://badbananas.tumblr.com/rss", "http://blackcontemporaryart.tumblr.com/rss", "http://boburu.tumblr.com/rss", "http://booooooom.tumblr.com/rss", "http://bradypus.tumblr.com/rss", "http://bremser.tumblr.com/rss", "http://bryanschutmaat.tumblr.com/rss", "http://contemporary-art-blog.com/rss", "http://cosascool.tumblr.com/rss", "http://covetarts.tumblr.com/rss", "http://darksilenceinsuburbia.tumblr.com/rss", "http://drawingdiary.tumblr.com/rss", "http://ecrcover.tumblr.com/rss", "http://eiginleiki.net/rss", "http://exhibition-ism.com/rss", "http://featureshoot.tumblr.com/rss", "http://fecalface.tumblr.com/rss", "http://floatingcosmos.tumblr.com/rss", "http://folknouveau.tumblr.com/rss", "http://foundinspirationmovingforward.tumblr.com/rss", "http://free-parking.tumblr.com/rss", "http://frntrs.tumblr.com/rss", "http://fullserving.tumblr.com/rss", "http://gh0stgums.com/rss", "http://gills.tumblr.com/rss", "http://gradientchild.tumblr.com/rss", "http://grossgaians.tumblr.com/rss", "http://haw-lin.com/rss", "http://heathwest.tumblr.com/rss", "http://heliocentrism.tumblr.com/rss", "http://hifructosemag.tumblr.com/rss", "http://highonyourmemories.tumblr.com/rss", "http://holyurl.tumblr.com/rss", "http://human-empathy.tumblr.com/rss", "http://hydeordie.com/rss", "http://hyperallergic.tumblr.com/rss", "http://iamjapanese.tumblr.com/rss", "http://iceblack.tumblr.com/rss", "http://if-you-leave.tumblr.com/rss", "http://iheartmyart.com/rss", "http://i-love-art.tumblr.com/rss", "http://inspiredbyme.tumblr.com/rss", "http://inthenewfrontier.tumblr.com/rss", "http://ipocrisia.tumblr.com/rss", "http://jennilee.tumblr.com/rss", "http://jennyannmorgan.tumblr.com/rss", "http://jesuisperdu.tumblr.com/rss", "http://jillsies.tumblr.com/rss", "http://julianminima.tumblr.com/rss", "http://juxtapozmag.tumblr.com/rss", "http://killthecollector.tumblr.com/rss", "http://kinetics.tumblr.com/rss", "http://knowinng.tumblr.com/rss", "http://krypten.tumblr.com/rss", "http://kvntrn.tumblr.com/rss", "http://la-beaute–de-pandore.tumblr.com/rss", "http://lacma.tumblr.com/rss", "http://laravissante.tumblr.com/rss", "http://lepoeteborgne.tumblr.com/rss", "http://leslieseuffert.tumblr.com/rss", "http://letselopetoday.tumblr.com/rss", "http://like-ivy.tumblr.com/rss", "http://likeafieldmouse.com/rss", "http://limboyouth.com/rss", "http://m75.tumblr.com/rss", "http://malaising.tumblr.com/rss", "http://mangopopsicle.org/rss", "http://mdme-x.tumblr.com/rss", "http://mmday.tumblr.com/rss", "http://mpdrolet.tumblr.com/rss", "http://murmansea.tumblr.com/rss", "http://museumoflatinamericanart.tumblr.com/rss", "http://museumuesum.tumblr.com/rss", "http://myampgoesto11.tumblr.com/rss", "http://mydarkenedeyes.tumblr.com/rss", "http://mydeadpony.tumblr.com/rss", "http://nattonelli.tumblr.com/rss", "http://nearlya.tumblr.com/rss", "http://netanoesporno.tumblr.com/rss", "http://neural-network.tumblr.com/rss", "http://newodor.tumblr.com/rss", "http://nopefun.com/rss", "http://nothingwritten.com/rss", "http://nyctaeus.tumblr.com/rss", "http://objectstatus.tumblr.com/rss", "http://oftheafternoon.com/rss", "http://oldhorse.tumblr.com/rss", "http://oneforeverywish.tumblr.com/rss", "http://onepainting.tumblr.com/rss", "http://oxane.tumblr.com/rss", "http://paper-journal.tumblr.com/rss", "http://partyswetzs.tumblr.com/rss", "http://photographersdirectory.tumblr.com/rss", "http://photographsonthebrain.com/rss", "http://planetaryfolklore.tumblr.com/rss", "http://pleasexcusethemess.tumblr.com/rss", "http://plotsummary.tumblr.com/rss", "http://postpatternism.tumblr.com/rss", "http://pulmonaire.tumblr.com/rss", "http://raakha.tumblr.com/rss", "http://razorshapes.tumblr.com/rss", "http://readingforms.com/rss", "http://robotscrytoo.com/rss", "http://rocketscience.tumblr.com/rss", "http://ronulicny.tumblr.com/rss", "http://roomdark.tumblr.com/rss", "http://rustybreak.tumblr.com/rss", "http://ryandonato.com/rss", "http://sculptores.tumblr.com/rss", "http://sculpture-center.tumblr.com/rss", "http://selektormagazine.tumblr.com/rss", "http://self-romance.tumblr.com/rss", "http://semihlakerta.tumblr.com/rss", "http://sensitive.tumblr.com/rss", "http://septagonstudios.tumblr.com/rss", "http://sewerscape.tumblr.com/rss", "http://sfmoma.tumblr.com/rss", "http://shanellpapp.tumblr.com/rss", "http://shootinggallery.tumblr.com/rss", "http://showslow.tumblr.com/rss", "http://smalljoke.tumblr.com/rss", "http://snowce.tumblr.com/rss", "http://somedisordered.tumblr.com/rss", "http://somethingsforyoutolookat.tumblr.com/rss", "http://somewhatreal.tumblr.com/rss", "http://sonicteeth.tumblr.com/rss", "http://spatula.tumblr.com/rss", "http://spraybeast.tumblr.com/rss", "http://staged-photography.tumblr.com/rss", "http://starbucks-fauxhemian.tumblr.com/rss", "http://stream.fm-a.dk/rss", "http://supermaxpro.tumblr.com/rss", "http://supersonicelectronic.com/rss", "http://technolowgy.tumblr.com/rss", "http://the-coven.tumblr.com/rss", "http://the-drawing-center.tumblr.com/rss", "http://the-social-collective.tumblr.com/rss", "http://thecreatorsproject.tumblr.com/rss", "http://theformdeform.tumblr.com/rss", "http://thegetty.tumblr.com/rss", "http://theglaze.tumblr.com/rss", "http://theheavycollective.com/rss", "http://theholydeer.tumblr.com/rss", "http://thejogging.tumblr.com/rss", "http://theonlymagicleftisart.com/rss", "http://thephotographicimage.tumblr.com/rss", "http://thepoeticphotographycollection.tumblr.com/rss", "http://thequandary.tumblr.com/rss", "http://thesearenicephotos.tumblr.com/rss", "http://thisisacult.org/rss", "http://timelightbox.tumblr.com/rss", "http://toutpetitlaplanete.tumblr.com/rss", "http://turbofolk.tumblr.com/rss", "http://uhohgallery.tumblr.com/rss", "http://unknowneditors.tumblr.com/rss", "http://unseentactics.tumblr.com/rss", "http://untrustyou.tumblr.com/rss", "http://upandcomingart.tumblr.com/rss", "http://victimize.tumblr.com/rss", "http://vinkelret.tumblr.com/rss", "http://visual-poetry.tumblr.com/rss", "http://visualhunt.tumblr.com/rss", "http://voodoovoodoo.tumblr.com/rss", "http://wandering-bears.tumblr.com/rss", "http://welgevormd.com/rss", "http://whitneymuseum.tumblr.com/rss", "http://wowgreat.tumblr.com/rss", "http://wvdv.tumblr.com/rss", "http://wwwalk.tumblr.com/rss", "http://zzzzoom.tumblr.com/rss", "http://www.huhmagazine.co.uk/blog/rss/feed.php", "http://superpaperqueen.tumblr.com/rss", "http://freedompoopshine.tumblr.com/rss", "http://elizamayn.tumblr.com/rss", "http://noworkonsunday.com/rss", "http://andersholmbergarkitekter.tumblr.com/rss", "http://tropical-moonlight.tumblr.com/rss", "http://antronaut.net/rss", "http://tonecon.es/rss", "http://thekiko.tumblr.com/rss", "http://thenletitbe.tumblr.com/rss", "http://www.somewhereiwouldliketolive.com/feeds/posts/default", "http://www.missmoss.co.za/feed/", "http://feeds2.feedburner.com/itsnicethat/SlXC", "http://ninebagatelles.tumblr.com/", "http://artistportfoliosites.tumblr.com/rss", "http://burnsidepacific.tumblr.com/rss", "http://eyescapemagazine.tumblr.com/rss", "http://gallery44.tumblr.com/rss", "http://hldky.tumblr.com/rss", "http://lesthetiquedelinventaire.tumblr.com/rss", "http://maciekjasik.tumblr.com/rss", "http://ninebagatelles.tumblr.com/rss", "http://thefunctionfordrift.tumblr.com/rss", "http://thewowpicture.tumblr.com/rss", "http://thisphotothat.tumblr.com/rss", "http://young-shot.com/rss"];

	var listpick = function listpick() {
					var x = new Date();
					var arr = [];
					for (var i = 0; i < 100; i++) {
									arr.push(list[(x.getMinutes() * x.getHours() + i) % list.length]);
					}
					return arr;
	};

	var feedpick = function feedpick(feed) {
					var x = new Date();
					return feed[x.getMinutes() * x.getHours() % feed.length];
	};

	var App = _react2.default.createClass({
					displayName: 'App',

					mixins: [_reactRouter.Lifecycle, _reactRouter.History],
					getInitialState: function getInitialState() {
									return {};
					},
					componentWillMount: function componentWillMount() {
									var that = this;
									var toset = {};
									var picked = listpick();

									var chosen = ['http://pitchfork.com/rss/reviews/best/tracks/'].concat(_toConsumableArray(picked));

									_.each(chosen, function (u) {
													if (u.match('pitchfork')) {
																	toset[u] = _react2.default.createElement(PitchSquare, { key: u });
													} else {
																	toset[u] = _react2.default.createElement(Square, { key: u });
													}
									});

									that.setState(toset);

									_.each(chosen, function (u) {
													$.getJSON('https://ajax.googleapis.com/ajax/services/feed/load?num=100&v=1.0&q=' + encodeURIComponent(u) + '&callback=?', function (x) {
																	var toset = {};
																	if (!x.responseData) {
																					console.warn('no response data for', u);
																					return;
																	}
																	var e = feedpick(_.filter(x.responseData.feed.entries, function (x) {
																					var days = (new Date() - new Date(x.publishedDate)) / 1000 / 60 / 60 / 24;
																					if (days <= 14) {
																									return true;
																					}
																	}));

																	if (e) {
																					if (u.match('pitchfork')) {
																									toset[u] = _react2.default.createElement(PitchSquare, { href: e.link, name: e.title, text: e.title, more: e,
																													getimgsrc: function getimgsrc(x) {
																																	return $($('<div>' + x.content + '</div>').find('img')).attr('src') || console.warn('no image', x);
																													}, key: u });
																									that.setState(toset);
																					} else {
																									toset[u] = _react2.default.createElement(Square, { href: e.link, name: e.title, text: e.title, more: e,
																													getimgsrc: function getimgsrc(x) {
																																	return $($('<div>' + x.content + '</div>').find('img')).attr('src') || console.warn('no image', x);
																													}, key: u });
																									that.setState(toset);
																					}
																	} else {
																					toset[u] = null;
																					that.setState(toset);
																	}
													});
									});
					},
					nav: function nav(k, v) {},
					routerWillLeave: function routerWillLeave(nextLocation) {
									return null;
					},
					_nav: function _nav(q) {
									this.history.pushState(null, '/', q);
									this.setState(q);
					},
					render: function render() {
									var that = this;
									if (Object.keys(this.state).length === 0) {
													return null;
									}

									var squares = [];
									_.each(that.state, function (v, u) {
													squares = _.union(squares, [v]);
									});

									return _react2.default.createElement(
													'div',
													{ className: 'squares' },
													_react2.default.createElement(
																	Masonry,
																	{ className: 'my-gallery-class', elementType: 'div', options: masonryOptions, disableImagesLoaded: true },
																	squares
													)
									);
					}
	});

	var Square = _react2.default.createClass({
					displayName: 'Square',

					getInitialState: function getInitialState() {
									return {};
					},
					componentWillMount: function componentWillMount() {
									var that = this;
					},
					nav: function nav(k, v) {},
					getImgSrcFromContent: function getImgSrcFromContent() {
									var src = this.props.getimgsrc && this.props.getimgsrc(this.props.more);
									return src;
					},
					render: function render() {
									var src = this.getImgSrcFromContent();
									if (!src) {
													return null;
									}
									return _react2.default.createElement(
													'div',
													{ className: 'square' },
													_react2.default.createElement(
																	'a',
																	{ href: this.props.href, target: '_blank' },
																	_react2.default.createElement(Pic, { src: src }),
																	_react2.default.createElement(
																					'div',
																					{ className: 'text' },
																					_react2.default.createElement(
																									'h2',
																									null,
																									this.props.name
																					)
																	)
													)
									);
					}
	});

	var Pic = _react2.default.createClass({
					displayName: 'Pic',

					getInitialState: function getInitialState() {
									return { opacity: 0 };
					},
					componentWillMount: function componentWillMount() {
									var that = this;
									$('<img />').css({ position: 'absolute', left: '-10000px' }).load(function () {
													if (!that.isMounted()) {
																	return;
													}

													that.setState({ opacity: 1, src: 'triangles.png' });
									}).attr({ src: 'triangles.png' });

									if (this.props.src) {
													$('<img />').css({ position: 'absolute', left: '-10000px' }).load(function () {
																	var img = this;
																	if (!that.isMounted()) {
																					return;
																	}

																	that.setState({ opacity: 0 });
																	setTimeout(function () {
																					that.setState({ opacity: 1, src: that.props.src, width: $(img).width(), height: $(img).height() });
																	}, 1000);
													}).attr({ src: this.props.src });
									}
					},
					componentWillUpdate: function componentWillUpdate(nprops) {
									var that = this;

									if (this.props.src !== nprops.src) {
													$('<img />').css({ position: 'absolute', left: '-10000px' }).load(function () {
																	if (!that.isMounted()) {
																					return;
																	}
																	var img = this;

																	that.setState({ opacity: 0 });
																	setTimeout(function () {
																					that.setState({ opacity: 1, src: nprops.src, width: $(img).width(), height: $(img).height() });
																	}, 1000);
													}).attr({ src: nprops.src });
									}
					},
					nav: function nav(k, v) {},
					render: function render() {
									var src = this.state.src;
									return _react2.default.createElement('img', { src: src, style: { opacity: this.state.opacity, transition: 'all 1s ease' }, ref: 'img' });
					}
	});

	var PitchSquare = _react2.default.createClass({
					displayName: 'PitchSquare',

					getInitialState: function getInitialState() {
									return {};
					},
					componentWillMount: function componentWillMount(ps) {
									ps = ps || this.props;
									var that = this;
									if (ps.name) {
													gettracksfromitunes(ps.name, function (x) {
																	console.log('from', ps.name, 'got', x);
																	var topipe = x || [{ artist: ps.name.split(': ')[0], name: ps.name.split(': ')[1], album: '' }];
																	$.when.apply($, fetchFromPipe(x)).done(function (r) {
																					console.log('from pipe!', r);
																					that.setState({ pipe: r });
																	});
																	if (x && x[0]) {
																					that.setState(x[0]);
																	} else {
																					that.setState({ artwork: 'triangles.png' });
																	}
													});
									}
					},
					componentWillReceiveProps: function componentWillReceiveProps(p) {
									this.componentWillMount(p);
					},
					nav: function nav(k, v) {},
					render: function render() {
									var link = null;
									if (this.state.pipe) {
													link = _react2.default.createElement(
																	'a',
																	{ className: 'pipe', target: '_blank', href: "https://youtube.com/watch?v=" + this.state.pipe.id },
																	'listen on youtube'
													);
									}
									var img = _react2.default.createElement(Pic, { src: this.state.artwork });
									console.log('pitchsquare', this.state.artwork);
									return _react2.default.createElement(
													'div',
													{ className: 'square pitchsquare' },
													_react2.default.createElement(
																	'a',
																	{ href: this.props.href, target: '_blank' },
																	img,
																	_react2.default.createElement(
																					'div',
																					{ className: 'text' },
																					_react2.default.createElement(
																									'h2',
																									null,
																									'~ MUZIQUE ~ ',
																									this.props.name
																					)
																	)
													),
													link
									);
					}
	});

	(0, _reactDom.render)(_react2.default.createElement(
					_reactRouter.Router,
					{ history: (0, _createBrowserHistory2.default)() },
					_react2.default.createElement(_reactRouter.Route, { path: '/', component: App }),
					_react2.default.createElement(_reactRouter.Route, { path: '/index.html', component: App }),
					_react2.default.createElement(_reactRouter.Route, { path: '/peachy/', component: App })
	), document.getElementById('content'));

/***/ },

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(212)();
	// imports


	// module
	exports.push([module.id, "body {\n  font-family: courier;\n  background: #F7CAC9;\n  overflow-x: hidden;\n  position: relative;\n  margin: 0;\n  padding: 8px;\n}\n#content {\n  column-gap: 5px;\n  -webkit-column-gap: 5px;\n  -moz-column-gap: 5px;\n  width: 100%;\n  text-align: center;\n}\n#content .squares {\n  position: relative;\n  z-index: 1;\n}\n#content canvas {\n  position: absolute;\n  z-index: 0;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n/*#content {\n    -webkit-column-count: 4;\n    -moz-column-count: 4;\n    column-count: 4;\n}\n\n@media screen and (max-width:1200px){\n    #content {\n\t-webkit-column-count: 3;\n\t-moz-column-count: 3;\n\tcolumn-count: 3;\n    }\n}\n\n@media screen and (max-width:991px){\n    #content {\n\t-webkit-column-count: 2;\n\t-moz-column-count: 2;\n\tcolumn-count: 2;\n    }\n}   \n\n@media screen and (max-width:767px){\n    #content {\n\t-webkit-column-count: 2;\n\t-moz-column-count: 2;\n\tcolumn-count: 2;\n    }\n}\n\n@media screen and (max-width:480px){\n    #content {\n\t-webkit-column-count: 1;\n\t-moz-column-count: 1;\n\tcolumn-count: 1;\n    }\n}\n*/\n.square {\n  float: left;\n  width: 33.333%;\n  /*margin: 0 0 5px;\n    width:300px;\n    display:inline-block;*/\n  background-image: linear-gradient(to right, #92A8D1, #F7CAC9);\n  border-radius: 2px;\n  overflow: hidden;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);\n}\n.square h2 {\n  font-size: 13px;\n  margin: 4px 0;\n  font-weight: 100;\n  color: #555;\n}\n.square img {\n  width: 100%;\n}\n.square a {\n  text-decoration: none;\n  color: #555;\n}\n.square .pipe {\n  text-decoration: underline;\n  display: block;\n  margin: 10px;\n}\n.square .text {\n  padding: 0 10px 10px;\n  font-size: 11px;\n}\n", ""]);

	// exports


/***/ },

/***/ 255:
/***/ function(module, exports, __webpack_require__) {

	var isBrowser = (typeof window !== 'undefined');
	var Masonry = isBrowser ? window.Masonry || __webpack_require__(256) : null;
	var imagesloaded = isBrowser ? __webpack_require__(266) : null;
	var refName = 'masonryContainer';

	function MasonryComponent(React) {
	    return React.createClass({
	        masonry: false,

	        domChildren: [],

	        displayName: 'MasonryComponent',

	        propTypes: {
	            disableImagesLoaded: React.PropTypes.bool,
	            options: React.PropTypes.object
	        },

	        getDefaultProps: function() {
	            return {
	                disableImagesLoaded: false,
	                options: {},
	                className: '',
	                elementType: 'div'
	            };
	        },

	        initializeMasonry: function(force) {
	            if (!this.masonry || force) {
	                this.masonry = new Masonry(
	                    this.refs[refName],
	                    this.props.options
	                );

	                this.domChildren = this.getNewDomChildren();
	            }
	        },

	        getNewDomChildren: function() {
	            var node = this.refs[refName];
	            var children = this.props.options.itemSelector ? node.querySelectorAll(this.props.options.itemSelector) : node.children;
	            return Array.prototype.slice.call(children);
	        },

	        diffDomChildren: function() {
	            var oldChildren = this.domChildren.filter(function(element) {
	                /*
	                 * take only elements attached to DOM
	                 * (aka the parent is the masonry container, not null)
	                 */
	                return !!element.parentNode;
	            });

	            var newChildren = this.getNewDomChildren();

	            var removed = oldChildren.filter(function(oldChild) {
	                return !~newChildren.indexOf(oldChild);
	            });

	            var domDiff = newChildren.filter(function(newChild) {
	                return !~oldChildren.indexOf(newChild);
	            });

	            var beginningIndex = 0;

	            // get everything added to the beginning of the DOMNode list
	            var prepended = domDiff.filter(function(newChild, i) {
	                var prepend = (beginningIndex === newChildren.indexOf(newChild));

	                if (prepend) {
	                    // increase the index
	                    beginningIndex++;
	                }

	                return prepend;
	            });

	            // we assume that everything else is appended
	            var appended = domDiff.filter(function(el) {
	                return prepended.indexOf(el) === -1;
	            });

	            /*
	             * otherwise we reverse it because so we're going through the list picking off the items that
	             * have been added at the end of the list. this complex logic is preserved in case it needs to be
	             * invoked 
	             * 
	             * var endingIndex = newChildren.length - 1;
	             * 
	             * domDiff.reverse().filter(function(newChild, i){
	             *     var append = endingIndex == newChildren.indexOf(newChild);
	             *     
	             *     if (append) {
	             *         endingIndex--;
	             *     }
	             *     
	             *     return append;
	             * });
	             */

	            // get everything added to the end of the DOMNode list
	            var moved = [];

	            if (removed.length === 0) {
	                moved = oldChildren.filter(function(child, index) {
	                    return index !== newChildren.indexOf(child);
	                });
	            }

	            this.domChildren = newChildren;

	            return {
	                old: oldChildren,
	                new: newChildren,
	                removed: removed,
	                appended: appended,
	                prepended: prepended,
	                moved: moved
	            };
	        },

	        performLayout: function() {
	            var diff = this.diffDomChildren();

	            if (diff.removed.length > 0) {
	                this.masonry.remove(diff.removed);
	                this.masonry.reloadItems();
	            }

	            if (diff.appended.length > 0) {
	                this.masonry.appended(diff.appended);
	                this.masonry.reloadItems();
	            }

	            if (diff.prepended.length > 0) {
	                this.masonry.prepended(diff.prepended);
	            }

	            if (diff.moved.length > 0) {
	                this.masonry.reloadItems();
	            }

	            this.masonry.layout();
	        },

	        imagesLoaded: function() {
	            if (this.props.disableImagesLoaded) return;

	            imagesloaded(
	                this.refs[refName],
	                function(instance) {
	                    this.masonry.layout();
	                }.bind(this)
	            );
	        },

	        componentDidMount: function() {
	            this.initializeMasonry();
	            this.imagesLoaded();
	        },

	        componentDidUpdate: function() {
	            this.performLayout();
	            this.imagesLoaded();
	        },

	        componentWillReceiveProps: function() {
	            this._timer = setTimeout(function() {
	                this.masonry.reloadItems();
	                this.isMounted && this.isMounted() && this.forceUpdate();
	            }.bind(this), 0);
	        },

	        componentWillUnmount: function() {
	            clearTimeout(this._timer);
	        },

	        render: function() {
	            return React.createElement(this.props.elementType, {
	                className: this.props.className,
	                ref: refName
	            }, this.props.children);
	        }
	    })
	}

	module.exports = MasonryComponent;


/***/ },

/***/ 256:
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Masonry v3.1.5
	 * Cascading grid layout library
	 * http://masonry.desandro.com
	 * MIT License
	 * by David DeSandro
	 */

	( function( window ) {
	'use strict';

	if (!window) return;

	// -------------------------- helpers -------------------------- //

	var indexOf = Array.prototype.indexOf ?
	  function( items, value ) {
	    return items.indexOf( value );
	  } :
	  function ( items, value ) {
	    for ( var i=0, len = items.length; i < len; i++ ) {
	      var item = items[i];
	      if ( item === value ) {
	        return i;
	      }
	    }
	    return -1;
	  };

	// -------------------------- masonryDefinition -------------------------- //

	// used for AMD definition and requires
	function masonryDefinition( Outlayer, getSize ) {
	  // create an Outlayer layout class
	  var Masonry = Outlayer.create('masonry');

	  Masonry.prototype._resetLayout = function() {
	    this.getSize();
	    this._getMeasurement( 'columnWidth', 'outerWidth' );
	    this._getMeasurement( 'gutter', 'outerWidth' );
	    this.measureColumns();

	    // reset column Y
	    var i = this.cols;
	    this.colYs = [];
	    while (i--) {
	      this.colYs.push( 0 );
	    }

	    this.maxY = 0;
	  };

	  Masonry.prototype.measureColumns = function() {
	    this.getContainerWidth();
	    // if columnWidth is 0, default to outerWidth of first item
	    if ( !this.columnWidth ) {
	      var firstItem = this.items[0];
	      var firstItemElem = firstItem && firstItem.element;
	      // columnWidth fall back to item of first element
	      this.columnWidth = firstItemElem && getSize( firstItemElem ).outerWidth ||
	        // if first elem has no width, default to size of container
	        this.containerWidth;
	    }

	    this.columnWidth += this.gutter;

	    this.cols = Math.floor( ( this.containerWidth + this.gutter ) / this.columnWidth );
	    this.cols = Math.max( this.cols, 1 );
	  };

	  Masonry.prototype.getContainerWidth = function() {
	    // container is parent if fit width
	    var container = this.options.isFitWidth ? this.element.parentNode : this.element;
	    // check that this.size and size are there
	    // IE8 triggers resize on body size change, so they might not be
	    var size = getSize( container );
	    this.containerWidth = size && size.innerWidth;
	  };

	  Masonry.prototype._getItemLayoutPosition = function( item ) {
	    item.getSize();
	    // how many columns does this brick span
	    var remainder = item.size.outerWidth % this.columnWidth;
	    var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
	    // round if off by 1 pixel, otherwise use ceil
	    var colSpan = Math[ mathMethod ]( item.size.outerWidth / this.columnWidth );
	    colSpan = Math.min( colSpan, this.cols );

	    var colGroup = this._getColGroup( colSpan );
	    // get the minimum Y value from the columns
	    var minimumY = Math.min.apply( Math, colGroup );
	    var shortColIndex = indexOf( colGroup, minimumY );

	    // position the brick
	    var position = {
	      x: this.columnWidth * shortColIndex,
	      y: minimumY
	    };

	    // apply setHeight to necessary columns
	    var setHeight = minimumY + item.size.outerHeight;
	    var setSpan = this.cols + 1 - colGroup.length;
	    for ( var i = 0; i < setSpan; i++ ) {
	      this.colYs[ shortColIndex + i ] = setHeight;
	    }

	    return position;
	  };

	  /**
	   * @param {Number} colSpan - number of columns the element spans
	   * @returns {Array} colGroup
	   */
	  Masonry.prototype._getColGroup = function( colSpan ) {
	    if ( colSpan < 2 ) {
	      // if brick spans only one column, use all the column Ys
	      return this.colYs;
	    }

	    var colGroup = [];
	    // how many different places could this brick fit horizontally
	    var groupCount = this.cols + 1 - colSpan;
	    // for each group potential horizontal position
	    for ( var i = 0; i < groupCount; i++ ) {
	      // make an array of colY values for that one group
	      var groupColYs = this.colYs.slice( i, i + colSpan );
	      // and get the max value of the array
	      colGroup[i] = Math.max.apply( Math, groupColYs );
	    }
	    return colGroup;
	  };

	  Masonry.prototype._manageStamp = function( stamp ) {
	    var stampSize = getSize( stamp );
	    var offset = this._getElementOffset( stamp );
	    // get the columns that this stamp affects
	    var firstX = this.options.isOriginLeft ? offset.left : offset.right;
	    var lastX = firstX + stampSize.outerWidth;
	    var firstCol = Math.floor( firstX / this.columnWidth );
	    firstCol = Math.max( 0, firstCol );
	    var lastCol = Math.floor( lastX / this.columnWidth );
	    // lastCol should not go over if multiple of columnWidth #425
	    lastCol -= lastX % this.columnWidth ? 0 : 1;
	    lastCol = Math.min( this.cols - 1, lastCol );
	    // set colYs to bottom of the stamp
	    var stampMaxY = ( this.options.isOriginTop ? offset.top : offset.bottom ) +
	      stampSize.outerHeight;
	    for ( var i = firstCol; i <= lastCol; i++ ) {
	      this.colYs[i] = Math.max( stampMaxY, this.colYs[i] );
	    }
	  };

	  Masonry.prototype._getContainerSize = function() {
	    this.maxY = Math.max.apply( Math, this.colYs );
	    var size = {
	      height: this.maxY
	    };

	    if ( this.options.isFitWidth ) {
	      size.width = this._getContainerFitWidth();
	    }

	    return size;
	  };

	  Masonry.prototype._getContainerFitWidth = function() {
	    var unusedCols = 0;
	    // count unused columns
	    var i = this.cols;
	    while ( --i ) {
	      if ( this.colYs[i] !== 0 ) {
	        break;
	      }
	      unusedCols++;
	    }
	    // fit container to columns that have been used
	    return ( this.cols - unusedCols ) * this.columnWidth - this.gutter;
	  };

	  Masonry.prototype.needsResizeLayout = function() {
	    var previousWidth = this.containerWidth;
	    this.getContainerWidth();
	    return previousWidth !== this.containerWidth;
	  };

	  return Masonry;
	}

	// -------------------------- transport -------------------------- //
	if (true) {
	  module.exports = masonryDefinition(
	    __webpack_require__(257),
	    __webpack_require__(262)
	  );
	} else if ( typeof define === 'function' && define.amd ) {
	  // AMD
	  define( [
	      'outlayer/outlayer',
	      'get-size/get-size'
	    ],
	    masonryDefinition );
	} else {
	  // browser global
	  window.Masonry = masonryDefinition(
	    window.Outlayer,
	    window.getSize
	  );
	}

	})( typeof window !== 'undefined' ? window : null );


/***/ },

/***/ 257:
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Outlayer v1.2.0
	 * the brains and guts of a layout library
	 * MIT license
	 */

	( function( window ) {
	'use strict';

	if (!window) return;

	// ----- vars ----- //

	var document = window.document;
	var console = window.console;
	var jQuery = window.jQuery;

	var noop = function() {};

	// -------------------------- helpers -------------------------- //

	// extend objects
	function extend( a, b ) {
	  for ( var prop in b ) {
	    a[ prop ] = b[ prop ];
	  }
	  return a;
	}


	var objToString = Object.prototype.toString;
	function isArray( obj ) {
	  return objToString.call( obj ) === '[object Array]';
	}

	// turn element or nodeList into an array
	function makeArray( obj ) {
	  var ary = [];
	  if ( isArray( obj ) ) {
	    // use object if already an array
	    ary = obj;
	  } else if ( obj && typeof obj.length === 'number' ) {
	    // convert nodeList to array
	    for ( var i=0, len = obj.length; i < len; i++ ) {
	      ary.push( obj[i] );
	    }
	  } else {
	    // array of single index
	    ary.push( obj );
	  }
	  return ary;
	}

	// http://stackoverflow.com/a/384380/182183
	var isElement = ( typeof HTMLElement === 'function' || typeof HTMLElement === 'object' ) ?
	  function isElementDOM2( obj ) {
	    return obj instanceof HTMLElement;
	  } :
	  function isElementQuirky( obj ) {
	    return obj && typeof obj === 'object' &&
	      obj.nodeType === 1 && typeof obj.nodeName === 'string';
	  };

	// index of helper cause IE8
	var indexOf = Array.prototype.indexOf ? function( ary, obj ) {
	    return ary.indexOf( obj );
	  } : function( ary, obj ) {
	    for ( var i=0, len = ary.length; i < len; i++ ) {
	      if ( ary[i] === obj ) {
	        return i;
	      }
	    }
	    return -1;
	  };

	function removeFrom( obj, ary ) {
	  var index = indexOf( ary, obj );
	  if ( index !== -1 ) {
	    ary.splice( index, 1 );
	  }
	}

	// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
	function toDashed( str ) {
	  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
	    return $1 + '-' + $2;
	  }).toLowerCase();
	}


	function outlayerDefinition( eventie, docReady, EventEmitter, getSize, matchesSelector, Item ) {

	// -------------------------- Outlayer -------------------------- //

	// globally unique identifiers
	var GUID = 0;
	// internal store of all Outlayer intances
	var instances = {};


	/**
	 * @param {Element, String} element
	 * @param {Object} options
	 * @constructor
	 */
	function Outlayer( element, options ) {
	  // use element as selector string
	  if ( typeof element === 'string' ) {
	    element = document.querySelector( element );
	  }

	  // bail out if not proper element
	  if ( !element || !isElement( element ) ) {
	    if ( console ) {
	      console.error( 'Bad ' + this.constructor.namespace + ' element: ' + element );
	    }
	    return;
	  }

	  this.element = element;

	  // options
	  this.options = extend( {}, this.constructor.defaults );
	  this.option( options );

	  // add id for Outlayer.getFromElement
	  var id = ++GUID;
	  this.element.outlayerGUID = id; // expando
	  instances[ id ] = this; // associate via id

	  // kick it off
	  this._create();

	  if ( this.options.isInitLayout ) {
	    this.layout();
	  }
	}

	// settings are for internal use only
	Outlayer.namespace = 'outlayer';
	Outlayer.Item = Item;

	// default options
	Outlayer.defaults = {
	  containerStyle: {
	    position: 'relative'
	  },
	  isInitLayout: true,
	  isOriginLeft: true,
	  isOriginTop: true,
	  isResizeBound: true,
	  isResizingContainer: true,
	  // item options
	  transitionDuration: '0.4s',
	  hiddenStyle: {
	    opacity: 0,
	    transform: 'scale(0.001)'
	  },
	  visibleStyle: {
	    opacity: 1,
	    transform: 'scale(1)'
	  }
	};

	// inherit EventEmitter
	extend( Outlayer.prototype, EventEmitter.prototype );

	/**
	 * set options
	 * @param {Object} opts
	 */
	Outlayer.prototype.option = function( opts ) {
	  extend( this.options, opts );
	};

	Outlayer.prototype._create = function() {
	  // get items from children
	  this.reloadItems();
	  // elements that affect layout, but are not laid out
	  this.stamps = [];
	  this.stamp( this.options.stamp );
	  // set container style
	  extend( this.element.style, this.options.containerStyle );

	  // bind resize method
	  if ( this.options.isResizeBound ) {
	    this.bindResize();
	  }
	};

	// goes through all children again and gets bricks in proper order
	Outlayer.prototype.reloadItems = function() {
	  // collection of item elements
	  this.items = this._itemize( this.element.children );
	};


	/**
	 * turn elements into Outlayer.Items to be used in layout
	 * @param {Array or NodeList or HTMLElement} elems
	 * @returns {Array} items - collection of new Outlayer Items
	 */
	Outlayer.prototype._itemize = function( elems ) {

	  var itemElems = this._filterFindItemElements( elems );
	  var Item = this.constructor.Item;

	  // create new Outlayer Items for collection
	  var items = [];
	  for ( var i=0, len = itemElems.length; i < len; i++ ) {
	    var elem = itemElems[i];
	    var item = new Item( elem, this );
	    items.push( item );
	  }

	  return items;
	};

	/**
	 * get item elements to be used in layout
	 * @param {Array or NodeList or HTMLElement} elems
	 * @returns {Array} items - item elements
	 */
	Outlayer.prototype._filterFindItemElements = function( elems ) {
	  // make array of elems
	  elems = makeArray( elems );
	  var itemSelector = this.options.itemSelector;
	  var itemElems = [];

	  for ( var i=0, len = elems.length; i < len; i++ ) {
	    var elem = elems[i];
	    // check that elem is an actual element
	    if ( !isElement( elem ) ) {
	      continue;
	    }
	    // filter & find items if we have an item selector
	    if ( itemSelector ) {
	      // filter siblings
	      if ( matchesSelector( elem, itemSelector ) ) {
	        itemElems.push( elem );
	      }
	      // find children
	      var childElems = elem.querySelectorAll( itemSelector );
	      // concat childElems to filterFound array
	      for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
	        itemElems.push( childElems[j] );
	      }
	    } else {
	      itemElems.push( elem );
	    }
	  }

	  return itemElems;
	};

	/**
	 * getter method for getting item elements
	 * @returns {Array} elems - collection of item elements
	 */
	Outlayer.prototype.getItemElements = function() {
	  var elems = [];
	  for ( var i=0, len = this.items.length; i < len; i++ ) {
	    elems.push( this.items[i].element );
	  }
	  return elems;
	};

	// ----- init & layout ----- //

	/**
	 * lays out all items
	 */
	Outlayer.prototype.layout = function() {
	  this._resetLayout();
	  this._manageStamps();

	  // don't animate first layout
	  var isInstant = this.options.isLayoutInstant !== undefined ?
	    this.options.isLayoutInstant : !this._isLayoutInited;
	  this.layoutItems( this.items, isInstant );

	  // flag for initalized
	  this._isLayoutInited = true;
	};

	// _init is alias for layout
	Outlayer.prototype._init = Outlayer.prototype.layout;

	/**
	 * logic before any new layout
	 */
	Outlayer.prototype._resetLayout = function() {
	  this.getSize();
	};


	Outlayer.prototype.getSize = function() {
	  this.size = getSize( this.element );
	};

	/**
	 * get measurement from option, for columnWidth, rowHeight, gutter
	 * if option is String -> get element from selector string, & get size of element
	 * if option is Element -> get size of element
	 * else use option as a number
	 *
	 * @param {String} measurement
	 * @param {String} size - width or height
	 * @private
	 */
	Outlayer.prototype._getMeasurement = function( measurement, size ) {
	  var option = this.options[ measurement ];
	  var elem;
	  if ( !option ) {
	    // default to 0
	    this[ measurement ] = 0;
	  } else {
	    // use option as an element
	    if ( typeof option === 'string' ) {
	      elem = this.element.querySelector( option );
	    } else if ( isElement( option ) ) {
	      elem = option;
	    }
	    // use size of element, if element
	    this[ measurement ] = elem ? getSize( elem )[ size ] : option;
	  }
	};

	/**
	 * layout a collection of item elements
	 * @api public
	 */
	Outlayer.prototype.layoutItems = function( items, isInstant ) {
	  items = this._getItemsForLayout( items );

	  this._layoutItems( items, isInstant );

	  this._postLayout();
	};

	/**
	 * get the items to be laid out
	 * you may want to skip over some items
	 * @param {Array} items
	 * @returns {Array} items
	 */
	Outlayer.prototype._getItemsForLayout = function( items ) {
	  var layoutItems = [];
	  for ( var i=0, len = items.length; i < len; i++ ) {
	    var item = items[i];
	    if ( !item.isIgnored ) {
	      layoutItems.push( item );
	    }
	  }
	  return layoutItems;
	};

	/**
	 * layout items
	 * @param {Array} items
	 * @param {Boolean} isInstant
	 */
	Outlayer.prototype._layoutItems = function( items, isInstant ) {
	  var _this = this;
	  function onItemsLayout() {
	    _this.emitEvent( 'layoutComplete', [ _this, items ] );
	  }

	  if ( !items || !items.length ) {
	    // no items, emit event with empty array
	    onItemsLayout();
	    return;
	  }

	  // emit layoutComplete when done
	  this._itemsOn( items, 'layout', onItemsLayout );

	  var queue = [];

	  for ( var i=0, len = items.length; i < len; i++ ) {
	    var item = items[i];
	    // get x/y object from method
	    var position = this._getItemLayoutPosition( item );
	    // enqueue
	    position.item = item;
	    position.isInstant = isInstant || item.isLayoutInstant;
	    queue.push( position );
	  }

	  this._processLayoutQueue( queue );
	};

	/**
	 * get item layout position
	 * @param {Outlayer.Item} item
	 * @returns {Object} x and y position
	 */
	Outlayer.prototype._getItemLayoutPosition = function( /* item */ ) {
	  return {
	    x: 0,
	    y: 0
	  };
	};

	/**
	 * iterate over array and position each item
	 * Reason being - separating this logic prevents 'layout invalidation'
	 * thx @paul_irish
	 * @param {Array} queue
	 */
	Outlayer.prototype._processLayoutQueue = function( queue ) {
	  for ( var i=0, len = queue.length; i < len; i++ ) {
	    var obj = queue[i];
	    this._positionItem( obj.item, obj.x, obj.y, obj.isInstant );
	  }
	};

	/**
	 * Sets position of item in DOM
	 * @param {Outlayer.Item} item
	 * @param {Number} x - horizontal position
	 * @param {Number} y - vertical position
	 * @param {Boolean} isInstant - disables transitions
	 */
	Outlayer.prototype._positionItem = function( item, x, y, isInstant ) {
	  if ( isInstant ) {
	    // if not transition, just set CSS
	    item.goTo( x, y );
	  } else {
	    item.moveTo( x, y );
	  }
	};

	/**
	 * Any logic you want to do after each layout,
	 * i.e. size the container
	 */
	Outlayer.prototype._postLayout = function() {
	  this.resizeContainer();
	};

	Outlayer.prototype.resizeContainer = function() {
	  if ( !this.options.isResizingContainer ) {
	    return;
	  }
	  var size = this._getContainerSize();
	  if ( size ) {
	    this._setContainerMeasure( size.width, true );
	    this._setContainerMeasure( size.height, false );
	  }
	};

	/**
	 * Sets width or height of container if returned
	 * @returns {Object} size
	 *   @param {Number} width
	 *   @param {Number} height
	 */
	Outlayer.prototype._getContainerSize = noop;

	/**
	 * @param {Number} measure - size of width or height
	 * @param {Boolean} isWidth
	 */
	Outlayer.prototype._setContainerMeasure = function( measure, isWidth ) {
	  if ( measure === undefined ) {
	    return;
	  }

	  var elemSize = this.size;
	  // add padding and border width if border box
	  if ( elemSize.isBorderBox ) {
	    measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
	      elemSize.borderLeftWidth + elemSize.borderRightWidth :
	      elemSize.paddingBottom + elemSize.paddingTop +
	      elemSize.borderTopWidth + elemSize.borderBottomWidth;
	  }

	  measure = Math.max( measure, 0 );
	  this.element.style[ isWidth ? 'width' : 'height' ] = measure + 'px';
	};

	/**
	 * trigger a callback for a collection of items events
	 * @param {Array} items - Outlayer.Items
	 * @param {String} eventName
	 * @param {Function} callback
	 */
	Outlayer.prototype._itemsOn = function( items, eventName, callback ) {
	  var doneCount = 0;
	  var count = items.length;
	  // event callback
	  var _this = this;
	  function tick() {
	    doneCount++;
	    if ( doneCount === count ) {
	      callback.call( _this );
	    }
	    return true; // bind once
	  }
	  // bind callback
	  for ( var i=0, len = items.length; i < len; i++ ) {
	    var item = items[i];
	    item.on( eventName, tick );
	  }
	};

	// -------------------------- ignore & stamps -------------------------- //


	/**
	 * keep item in collection, but do not lay it out
	 * ignored items do not get skipped in layout
	 * @param {Element} elem
	 */
	Outlayer.prototype.ignore = function( elem ) {
	  var item = this.getItem( elem );
	  if ( item ) {
	    item.isIgnored = true;
	  }
	};

	/**
	 * return item to layout collection
	 * @param {Element} elem
	 */
	Outlayer.prototype.unignore = function( elem ) {
	  var item = this.getItem( elem );
	  if ( item ) {
	    delete item.isIgnored;
	  }
	};

	/**
	 * adds elements to stamps
	 * @param {NodeList, Array, Element, or String} elems
	 */
	Outlayer.prototype.stamp = function( elems ) {
	  elems = this._find( elems );
	  if ( !elems ) {
	    return;
	  }

	  this.stamps = this.stamps.concat( elems );
	  // ignore
	  for ( var i=0, len = elems.length; i < len; i++ ) {
	    var elem = elems[i];
	    this.ignore( elem );
	  }
	};

	/**
	 * removes elements to stamps
	 * @param {NodeList, Array, or Element} elems
	 */
	Outlayer.prototype.unstamp = function( elems ) {
	  elems = this._find( elems );
	  if ( !elems ){
	    return;
	  }

	  for ( var i=0, len = elems.length; i < len; i++ ) {
	    var elem = elems[i];
	    // filter out removed stamp elements
	    removeFrom( elem, this.stamps );
	    this.unignore( elem );
	  }

	};

	/**
	 * finds child elements
	 * @param {NodeList, Array, Element, or String} elems
	 * @returns {Array} elems
	 */
	Outlayer.prototype._find = function( elems ) {
	  if ( !elems ) {
	    return;
	  }
	  // if string, use argument as selector string
	  if ( typeof elems === 'string' ) {
	    elems = this.element.querySelectorAll( elems );
	  }
	  elems = makeArray( elems );
	  return elems;
	};

	Outlayer.prototype._manageStamps = function() {
	  if ( !this.stamps || !this.stamps.length ) {
	    return;
	  }

	  this._getBoundingRect();

	  for ( var i=0, len = this.stamps.length; i < len; i++ ) {
	    var stamp = this.stamps[i];
	    this._manageStamp( stamp );
	  }
	};

	// update boundingLeft / Top
	Outlayer.prototype._getBoundingRect = function() {
	  // get bounding rect for container element
	  var boundingRect = this.element.getBoundingClientRect();
	  var size = this.size;
	  this._boundingRect = {
	    left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
	    top: boundingRect.top + size.paddingTop + size.borderTopWidth,
	    right: boundingRect.right - ( size.paddingRight + size.borderRightWidth ),
	    bottom: boundingRect.bottom - ( size.paddingBottom + size.borderBottomWidth )
	  };
	};

	/**
	 * @param {Element} stamp
	**/
	Outlayer.prototype._manageStamp = noop;

	/**
	 * get x/y position of element relative to container element
	 * @param {Element} elem
	 * @returns {Object} offset - has left, top, right, bottom
	 */
	Outlayer.prototype._getElementOffset = function( elem ) {
	  var boundingRect = elem.getBoundingClientRect();
	  var thisRect = this._boundingRect;
	  var size = getSize( elem );
	  var offset = {
	    left: boundingRect.left - thisRect.left - size.marginLeft,
	    top: boundingRect.top - thisRect.top - size.marginTop,
	    right: thisRect.right - boundingRect.right - size.marginRight,
	    bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
	  };
	  return offset;
	};

	// -------------------------- resize -------------------------- //

	// enable event handlers for listeners
	// i.e. resize -> onresize
	Outlayer.prototype.handleEvent = function( event ) {
	  var method = 'on' + event.type;
	  if ( this[ method ] ) {
	    this[ method ]( event );
	  }
	};

	/**
	 * Bind layout to window resizing
	 */
	Outlayer.prototype.bindResize = function() {
	  // bind just one listener
	  if ( this.isResizeBound ) {
	    return;
	  }
	  eventie.bind( window, 'resize', this );
	  this.isResizeBound = true;
	};

	/**
	 * Unbind layout to window resizing
	 */
	Outlayer.prototype.unbindResize = function() {
	  if ( this.isResizeBound ) {
	    eventie.unbind( window, 'resize', this );
	  }
	  this.isResizeBound = false;
	};

	// original debounce by John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/

	// this fires every resize
	Outlayer.prototype.onresize = function() {
	  if ( this.resizeTimeout ) {
	    clearTimeout( this.resizeTimeout );
	  }

	  var _this = this;
	  function delayed() {
	    _this.resize();
	    delete _this.resizeTimeout;
	  }

	  this.resizeTimeout = setTimeout( delayed, 100 );
	};

	// debounced, layout on resize
	Outlayer.prototype.resize = function() {
	  // don't trigger if size did not change
	  // or if resize was unbound. See #9
	  if ( !this.isResizeBound || !this.needsResizeLayout() ) {
	    return;
	  }

	  this.layout();
	};

	/**
	 * check if layout is needed post layout
	 * @returns Boolean
	 */
	Outlayer.prototype.needsResizeLayout = function() {
	  var size = getSize( this.element );
	  // check that this.size and size are there
	  // IE8 triggers resize on body size change, so they might not be
	  var hasSizes = this.size && size;
	  return hasSizes && size.innerWidth !== this.size.innerWidth;
	};

	// -------------------------- methods -------------------------- //

	/**
	 * add items to Outlayer instance
	 * @param {Array or NodeList or Element} elems
	 * @returns {Array} items - Outlayer.Items
	**/
	Outlayer.prototype.addItems = function( elems ) {
	  var items = this._itemize( elems );
	  // add items to collection
	  if ( items.length ) {
	    this.items = this.items.concat( items );
	  }
	  return items;
	};

	/**
	 * Layout newly-appended item elements
	 * @param {Array or NodeList or Element} elems
	 */
	Outlayer.prototype.appended = function( elems ) {
	  var items = this.addItems( elems );
	  if ( !items.length ) {
	    return;
	  }
	  // layout and reveal just the new items
	  this.layoutItems( items, true );
	  this.reveal( items );
	};

	/**
	 * Layout prepended elements
	 * @param {Array or NodeList or Element} elems
	 */
	Outlayer.prototype.prepended = function( elems ) {
	  var items = this._itemize( elems );
	  if ( !items.length ) {
	    return;
	  }
	  // add items to beginning of collection
	  var previousItems = this.items.slice(0);
	  this.items = items.concat( previousItems );
	  // start new layout
	  this._resetLayout();
	  this._manageStamps();
	  // layout new stuff without transition
	  this.layoutItems( items, true );
	  this.reveal( items );
	  // layout previous items
	  this.layoutItems( previousItems );
	};

	/**
	 * reveal a collection of items
	 * @param {Array of Outlayer.Items} items
	 */
	Outlayer.prototype.reveal = function( items ) {
	  var len = items && items.length;
	  if ( !len ) {
	    return;
	  }
	  for ( var i=0; i < len; i++ ) {
	    var item = items[i];
	    item.reveal();
	  }
	};

	/**
	 * hide a collection of items
	 * @param {Array of Outlayer.Items} items
	 */
	Outlayer.prototype.hide = function( items ) {
	  var len = items && items.length;
	  if ( !len ) {
	    return;
	  }
	  for ( var i=0; i < len; i++ ) {
	    var item = items[i];
	    item.hide();
	  }
	};

	/**
	 * get Outlayer.Item, given an Element
	 * @param {Element} elem
	 * @param {Function} callback
	 * @returns {Outlayer.Item} item
	 */
	Outlayer.prototype.getItem = function( elem ) {
	  // loop through items to get the one that matches
	  for ( var i=0, len = this.items.length; i < len; i++ ) {
	    var item = this.items[i];
	    if ( item.element === elem ) {
	      // return item
	      return item;
	    }
	  }
	};

	/**
	 * get collection of Outlayer.Items, given Elements
	 * @param {Array} elems
	 * @returns {Array} items - Outlayer.Items
	 */
	Outlayer.prototype.getItems = function( elems ) {
	  if ( !elems || !elems.length ) {
	    return;
	  }
	  var items = [];
	  for ( var i=0, len = elems.length; i < len; i++ ) {
	    var elem = elems[i];
	    var item = this.getItem( elem );
	    if ( item ) {
	      items.push( item );
	    }
	  }

	  return items;
	};

	/**
	 * remove element(s) from instance and DOM
	 * @param {Array or NodeList or Element} elems
	 */
	Outlayer.prototype.remove = function( elems ) {
	  elems = makeArray( elems );

	  var removeItems = this.getItems( elems );
	  // bail if no items to remove
	  if ( !removeItems || !removeItems.length ) {
	    return;
	  }

	  this._itemsOn( removeItems, 'remove', function() {
	    this.emitEvent( 'removeComplete', [ this, removeItems ] );
	  });

	  for ( var i=0, len = removeItems.length; i < len; i++ ) {
	    var item = removeItems[i];
	    item.remove();
	    // remove item from collection
	    removeFrom( item, this.items );
	  }
	};

	// ----- destroy ----- //

	// remove and disable Outlayer instance
	Outlayer.prototype.destroy = function() {
	  // clean up dynamic styles
	  var style = this.element.style;
	  style.height = '';
	  style.position = '';
	  style.width = '';
	  // destroy items
	  for ( var i=0, len = this.items.length; i < len; i++ ) {
	    var item = this.items[i];
	    item.destroy();
	  }

	  this.unbindResize();

	  delete this.element.outlayerGUID;
	  // remove data for jQuery
	  if ( jQuery ) {
	    jQuery.removeData( this.element, this.constructor.namespace );
	  }

	};

	// -------------------------- data -------------------------- //

	/**
	 * get Outlayer instance from element
	 * @param {Element} elem
	 * @returns {Outlayer}
	 */
	Outlayer.data = function( elem ) {
	  var id = elem && elem.outlayerGUID;
	  return id && instances[ id ];
	};


	// -------------------------- create Outlayer class -------------------------- //

	/**
	 * create a layout class
	 * @param {String} namespace
	 */
	Outlayer.create = function( namespace, options ) {
	  // sub-class Outlayer
	  function Layout() {
	    Outlayer.apply( this, arguments );
	  }
	  // inherit Outlayer prototype, use Object.create if there
	  if ( Object.create ) {
	    Layout.prototype = Object.create( Outlayer.prototype );
	  } else {
	    extend( Layout.prototype, Outlayer.prototype );
	  }
	  // set contructor, used for namespace and Item
	  Layout.prototype.constructor = Layout;

	  Layout.defaults = extend( {}, Outlayer.defaults );
	  // apply new options
	  extend( Layout.defaults, options );
	  // keep prototype.settings for backwards compatibility (Packery v1.2.0)
	  Layout.prototype.settings = {};

	  Layout.namespace = namespace;

	  Layout.data = Outlayer.data;

	  // sub-class Item
	  Layout.Item = function LayoutItem() {
	    Item.apply( this, arguments );
	  };

	  Layout.Item.prototype = new Item();

	  // -------------------------- declarative -------------------------- //

	  /**
	   * allow user to initialize Outlayer via .js-namespace class
	   * options are parsed from data-namespace-option attribute
	   */
	  docReady( function() {
	    var dashedNamespace = toDashed( namespace );
	    var elems = document.querySelectorAll( '.js-' + dashedNamespace );
	    var dataAttr = 'data-' + dashedNamespace + '-options';

	    for ( var i=0, len = elems.length; i < len; i++ ) {
	      var elem = elems[i];
	      var attr = elem.getAttribute( dataAttr );
	      var options;
	      try {
	        options = attr && JSON.parse( attr );
	      } catch ( error ) {
	        // log error, do not initialize
	        if ( console ) {
	          console.error( 'Error parsing ' + dataAttr + ' on ' +
	            elem.nodeName.toLowerCase() + ( elem.id ? '#' + elem.id : '' ) + ': ' +
	            error );
	        }
	        continue;
	      }
	      // initialize
	      var instance = new Layout( elem, options );
	      // make available via $().data('layoutname')
	      if ( jQuery ) {
	        jQuery.data( elem, namespace, instance );
	      }
	    }
	  });

	  // -------------------------- jQuery bridge -------------------------- //

	  // make into jQuery plugin
	  if ( jQuery && jQuery.bridget ) {
	    jQuery.bridget( namespace, Layout );
	  }

	  return Layout;
	};

	// ----- fin ----- //

	// back in global
	Outlayer.Item = Item;

	return Outlayer;

	}

	// -------------------------- transport -------------------------- //
	if (true) {
	  // CommonJS
	  module.exports = outlayerDefinition(
	    __webpack_require__(258),
	    __webpack_require__(259),
	    __webpack_require__(261),
	    __webpack_require__(262),
	    __webpack_require__(264),
	    __webpack_require__(265)
	  );
	} else if ( typeof define === 'function' && define.amd ) {
	  // AMD
	  define( [
	      'eventie/eventie',
	      'doc-ready/doc-ready',
	      'eventEmitter/EventEmitter',
	      'get-size/get-size',
	      'matches-selector/matches-selector',
	      './item'
	    ],
	    outlayerDefinition );
	} else {
	  // browser global
	  window.Outlayer = outlayerDefinition(
	    window.eventie,
	    window.docReady,
	    window.EventEmitter,
	    window.getSize,
	    window.matchesSelector,
	    window.Outlayer.Item
	  );
	}

	})( typeof window !== 'undefined' ? window : null );


/***/ },

/***/ 258:
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * eventie v1.0.5
	 * event binding helper
	 *   eventie.bind( elem, 'click', myFn )
	 *   eventie.unbind( elem, 'click', myFn )
	 * MIT license
	 */

	/*jshint browser: true, undef: true, unused: true */
	/*global define: false, module: false */

	( function( window ) {
	'use strict';

	if (!window) return;

	var docElem = document.documentElement;

	var bind = function() {};

	function getIEEvent( obj ) {
	  var event = window.event;
	  // add event.target
	  event.target = event.target || event.srcElement || obj;
	  return event;
	}

	if ( docElem.addEventListener ) {
	  bind = function( obj, type, fn ) {
	    obj.addEventListener( type, fn, false );
	  };
	} else if ( docElem.attachEvent ) {
	  bind = function( obj, type, fn ) {
	    obj[ type + fn ] = fn.handleEvent ?
	      function() {
	        var event = getIEEvent( obj );
	        fn.handleEvent.call( fn, event );
	      } :
	      function() {
	        var event = getIEEvent( obj );
	        fn.call( obj, event );
	      };
	    obj.attachEvent( "on" + type, obj[ type + fn ] );
	  };
	}

	var unbind = function() {};

	if ( docElem.removeEventListener ) {
	  unbind = function( obj, type, fn ) {
	    obj.removeEventListener( type, fn, false );
	  };
	} else if ( docElem.detachEvent ) {
	  unbind = function( obj, type, fn ) {
	    obj.detachEvent( "on" + type, obj[ type + fn ] );
	    try {
	      delete obj[ type + fn ];
	    } catch ( err ) {
	      // can't delete window object properties
	      obj[ type + fn ] = undefined;
	    }
	  };
	}

	var eventie = {
	  bind: bind,
	  unbind: unbind
	};

	// ----- module definition ----- //
	if ( true ) {
	  // CommonJS
	  module.exports = eventie;
	} else if ( typeof define === 'function' && define.amd ) {
	  // AMD
	  define( eventie );
	} else {
	  // browser global
	  window.eventie = eventie;
	}

	})( typeof window !== 'undefined' ? window : null );


/***/ },

/***/ 259:
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * docReady v1.0.3
	 * Cross browser DOMContentLoaded event emitter
	 * MIT license
	 */

	/*jshint browser: true, strict: true, undef: true, unused: true*/
	/*global define: false, require: false, module: false */

	( function( window ) {
	'use strict';

	if (!window) return;

	var document = window.document;
	// collection of functions to be triggered on ready
	var queue = [];

	function docReady( fn ) {
	  // throw out non-functions
	  if ( typeof fn !== 'function' ) {
	    return;
	  }

	  if ( docReady.isReady ) {
	    // ready now, hit it
	    fn();
	  } else {
	    // queue function when ready
	    queue.push( fn );
	  }
	}

	docReady.isReady = false;

	// triggered on various doc ready events
	function init( event ) {
	  // bail if IE8 document is not ready just yet
	  var isIE8NotReady = event.type === 'readystatechange' && document.readyState !== 'complete';
	  if ( docReady.isReady || isIE8NotReady ) {
	    return;
	  }
	  docReady.isReady = true;

	  // process queue
	  for ( var i=0, len = queue.length; i < len; i++ ) {
	    var fn = queue[i];
	    fn();
	  }
	}

	function defineDocReady( eventie ) {
	  eventie.bind( document, 'DOMContentLoaded', init );
	  eventie.bind( document, 'readystatechange', init );
	  eventie.bind( window, 'load', init );

	  return docReady;
	}

	// transport
	if ( true ) {
	  module.exports = defineDocReady( __webpack_require__(260) );
	} else if ( typeof define === 'function' && define.amd ) {
	  // AMD
	  // if RequireJS, then doc is already ready
	  docReady.isReady = typeof requirejs === 'function';
	  define( [ 'eventie/eventie' ], defineDocReady );
	} else {
	  // browser global
	  window.docReady = defineDocReady( window.eventie );
	}

	})( typeof window !== 'undefined' ? window : null );


/***/ },

/***/ 260:
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * eventie v1.0.5
	 * event binding helper
	 *   eventie.bind( elem, 'click', myFn )
	 *   eventie.unbind( elem, 'click', myFn )
	 * MIT license
	 */

	/*jshint browser: true, undef: true, unused: true */
	/*global define: false, module: false */

	( function( window ) {
	'use strict';

	if (!window) return;

	var docElem = document.documentElement;

	var bind = function() {};

	function getIEEvent( obj ) {
	  var event = window.event;
	  // add event.target
	  event.target = event.target || event.srcElement || obj;
	  return event;
	}

	if ( docElem.addEventListener ) {
	  bind = function( obj, type, fn ) {
	    obj.addEventListener( type, fn, false );
	  };
	} else if ( docElem.attachEvent ) {
	  bind = function( obj, type, fn ) {
	    obj[ type + fn ] = fn.handleEvent ?
	      function() {
	        var event = getIEEvent( obj );
	        fn.handleEvent.call( fn, event );
	      } :
	      function() {
	        var event = getIEEvent( obj );
	        fn.call( obj, event );
	      };
	    obj.attachEvent( "on" + type, obj[ type + fn ] );
	  };
	}

	var unbind = function() {};

	if ( docElem.removeEventListener ) {
	  unbind = function( obj, type, fn ) {
	    obj.removeEventListener( type, fn, false );
	  };
	} else if ( docElem.detachEvent ) {
	  unbind = function( obj, type, fn ) {
	    obj.detachEvent( "on" + type, obj[ type + fn ] );
	    try {
	      delete obj[ type + fn ];
	    } catch ( err ) {
	      // can't delete window object properties
	      obj[ type + fn ] = undefined;
	    }
	  };
	}

	var eventie = {
	  bind: bind,
	  unbind: unbind
	};

	// ----- module definition ----- //
	if ( true ) {
	  // CommonJS
	  module.exports = eventie;
	} else if ( typeof define === 'function' && define.amd ) {
	  // AMD
	  define( eventie );
	} else {
	  // browser global
	  window.eventie = eventie;
	}

	})( typeof window !== 'undefined' ? window : null );


/***/ },

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * EventEmitter v4.2.0 - git.io/ee
	 * Oliver Caldwell
	 * MIT license
	 * @preserve
	 */

	(function () {
		// Place the script in strict mode
		'use strict';

		/**
		 * Class for managing events.
		 * Can be extended to provide event functionality in other classes.
		 *
		 * @class EventEmitter Manages event registering and emitting.
		 */
		function EventEmitter() {}

		// Shortcuts to improve speed and size

		// Easy access to the prototype
		var proto = EventEmitter.prototype;

		/**
		 * Finds the index of the listener for the event in it's storage array.
		 *
		 * @param {Function[]} listeners Array of listeners to search through.
		 * @param {Function} listener Method to look for.
		 * @return {Number} Index of the specified listener, -1 if not found
		 * @api private
		 */
		function indexOfListener(listeners, listener) {
			var i = listeners.length;
			while (i--) {
				if (listeners[i].listener === listener) {
					return i;
				}
			}

			return -1;
		}

		/**
		 * Returns the listener array for the specified event.
		 * Will initialise the event object and listener arrays if required.
		 * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
		 * Each property in the object response is an array of listener functions.
		 *
		 * @param {String|RegExp} evt Name of the event to return the listeners from.
		 * @return {Function[]|Object} All listener functions for the event.
		 */
		proto.getListeners = function getListeners(evt) {
			var events = this._getEvents();
			var response;
			var key;

			// Return a concatenated array of all matching events if
			// the selector is a regular expression.
			if (typeof evt === 'object') {
				response = {};
				for (key in events) {
					if (events.hasOwnProperty(key) && evt.test(key)) {
						response[key] = events[key];
					}
				}
			}
			else {
				response = events[evt] || (events[evt] = []);
			}

			return response;
		};

		/**
		 * Takes a list of listener objects and flattens it into a list of listener functions.
		 *
		 * @param {Object[]} listeners Raw listener objects.
		 * @return {Function[]} Just the listener functions.
		 */
		proto.flattenListeners = function flattenListeners(listeners) {
			var flatListeners = [];
			var i;

			for (i = 0; i < listeners.length; i += 1) {
				flatListeners.push(listeners[i].listener);
			}

			return flatListeners;
		};

		/**
		 * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
		 *
		 * @param {String|RegExp} evt Name of the event to return the listeners from.
		 * @return {Object} All listener functions for an event in an object.
		 */
		proto.getListenersAsObject = function getListenersAsObject(evt) {
			var listeners = this.getListeners(evt);
			var response;

			if (listeners instanceof Array) {
				response = {};
				response[evt] = listeners;
			}

			return response || listeners;
		};

		/**
		 * Adds a listener function to the specified event.
		 * The listener will not be added if it is a duplicate.
		 * If the listener returns true then it will be removed after it is called.
		 * If you pass a regular expression as the event name then the listener will be added to all events that match it.
		 *
		 * @param {String|RegExp} evt Name of the event to attach the listener to.
		 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
		 * @return {Object} Current instance of EventEmitter for chaining.
		 */
		proto.addListener = function addListener(evt, listener) {
			var listeners = this.getListenersAsObject(evt);
			var listenerIsWrapped = typeof listener === 'object';
			var key;

			for (key in listeners) {
				if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
					listeners[key].push(listenerIsWrapped ? listener : {
						listener: listener,
						once: false
					});
				}
			}

			return this;
		};

		/**
		 * Alias of addListener
		 */
		proto.on = proto.addListener;

		/**
		 * Semi-alias of addListener. It will add a listener that will be
		 * automatically removed after it's first execution.
		 *
		 * @param {String|RegExp} evt Name of the event to attach the listener to.
		 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
		 * @return {Object} Current instance of EventEmitter for chaining.
		 */
		proto.addOnceListener = function addOnceListener(evt, listener) {
			return this.addListener(evt, {
				listener: listener,
				once: true
			});
		};

		/**
		 * Alias of addOnceListener.
		 */
		proto.once = proto.addOnceListener;

		/**
		 * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
		 * You need to tell it what event names should be matched by a regex.
		 *
		 * @param {String} evt Name of the event to create.
		 * @return {Object} Current instance of EventEmitter for chaining.
		 */
		proto.defineEvent = function defineEvent(evt) {
			this.getListeners(evt);
			return this;
		};

		/**
		 * Uses defineEvent to define multiple events.
		 *
		 * @param {String[]} evts An array of event names to define.
		 * @return {Object} Current instance of EventEmitter for chaining.
		 */
		proto.defineEvents = function defineEvents(evts) {
			for (var i = 0; i < evts.length; i += 1) {
				this.defineEvent(evts[i]);
			}
			return this;
		};

		/**
		 * Removes a listener function from the specified event.
		 * When passed a regular expression as the event name, it will remove the listener from all events that match it.
		 *
		 * @param {String|RegExp} evt Name of the event to remove the listener from.
		 * @param {Function} listener Method to remove from the event.
		 * @return {Object} Current instance of EventEmitter for chaining.
		 */
		proto.removeListener = function removeListener(evt, listener) {
			var listeners = this.getListenersAsObject(evt);
			var index;
			var key;

			for (key in listeners) {
				if (listeners.hasOwnProperty(key)) {
					index = indexOfListener(listeners[key], listener);

					if (index !== -1) {
						listeners[key].splice(index, 1);
					}
				}
			}

			return this;
		};

		/**
		 * Alias of removeListener
		 */
		proto.off = proto.removeListener;

		/**
		 * Adds listeners in bulk using the manipulateListeners method.
		 * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
		 * You can also pass it a regular expression to add the array of listeners to all events that match it.
		 * Yeah, this function does quite a bit. That's probably a bad thing.
		 *
		 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
		 * @param {Function[]} [listeners] An optional array of listener functions to add.
		 * @return {Object} Current instance of EventEmitter for chaining.
		 */
		proto.addListeners = function addListeners(evt, listeners) {
			// Pass through to manipulateListeners
			return this.manipulateListeners(false, evt, listeners);
		};

		/**
		 * Removes listeners in bulk using the manipulateListeners method.
		 * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
		 * You can also pass it an event name and an array of listeners to be removed.
		 * You can also pass it a regular expression to remove the listeners from all events that match it.
		 *
		 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
		 * @param {Function[]} [listeners] An optional array of listener functions to remove.
		 * @return {Object} Current instance of EventEmitter for chaining.
		 */
		proto.removeListeners = function removeListeners(evt, listeners) {
			// Pass through to manipulateListeners
			return this.manipulateListeners(true, evt, listeners);
		};

		/**
		 * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
		 * The first argument will determine if the listeners are removed (true) or added (false).
		 * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
		 * You can also pass it an event name and an array of listeners to be added/removed.
		 * You can also pass it a regular expression to manipulate the listeners of all events that match it.
		 *
		 * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
		 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
		 * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
		 * @return {Object} Current instance of EventEmitter for chaining.
		 */
		proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
			var i;
			var value;
			var single = remove ? this.removeListener : this.addListener;
			var multiple = remove ? this.removeListeners : this.addListeners;

			// If evt is an object then pass each of it's properties to this method
			if (typeof evt === 'object' && !(evt instanceof RegExp)) {
				for (i in evt) {
					if (evt.hasOwnProperty(i) && (value = evt[i])) {
						// Pass the single listener straight through to the singular method
						if (typeof value === 'function') {
							single.call(this, i, value);
						}
						else {
							// Otherwise pass back to the multiple function
							multiple.call(this, i, value);
						}
					}
				}
			}
			else {
				// So evt must be a string
				// And listeners must be an array of listeners
				// Loop over it and pass each one to the multiple method
				i = listeners.length;
				while (i--) {
					single.call(this, evt, listeners[i]);
				}
			}

			return this;
		};

		/**
		 * Removes all listeners from a specified event.
		 * If you do not specify an event then all listeners will be removed.
		 * That means every event will be emptied.
		 * You can also pass a regex to remove all events that match it.
		 *
		 * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
		 * @return {Object} Current instance of EventEmitter for chaining.
		 */
		proto.removeEvent = function removeEvent(evt) {
			var type = typeof evt;
			var events = this._getEvents();
			var key;

			// Remove different things depending on the state of evt
			if (type === 'string') {
				// Remove all listeners for the specified event
				delete events[evt];
			}
			else if (type === 'object') {
				// Remove all events matching the regex.
				for (key in events) {
					if (events.hasOwnProperty(key) && evt.test(key)) {
						delete events[key];
					}
				}
			}
			else {
				// Remove all listeners in all events
				delete this._events;
			}

			return this;
		};

		/**
		 * Emits an event of your choice.
		 * When emitted, every listener attached to that event will be executed.
		 * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
		 * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
		 * So they will not arrive within the array on the other side, they will be separate.
		 * You can also pass a regular expression to emit to all events that match it.
		 *
		 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
		 * @param {Array} [args] Optional array of arguments to be passed to each listener.
		 * @return {Object} Current instance of EventEmitter for chaining.
		 */
		proto.emitEvent = function emitEvent(evt, args) {
			var listeners = this.getListenersAsObject(evt);
			var listener;
			var i;
			var key;
			var response;

			for (key in listeners) {
				if (listeners.hasOwnProperty(key)) {
					i = listeners[key].length;

					while (i--) {
						// If the listener returns true then it shall be removed from the event
						// The function is executed either with a basic call or an apply if there is an args array
						listener = listeners[key][i];
						response = listener.listener.apply(this, args || []);
						if (response === this._getOnceReturnValue() || listener.once === true) {
							this.removeListener(evt, listener.listener);
						}
					}
				}
			}

			return this;
		};

		/**
		 * Alias of emitEvent
		 */
		proto.trigger = proto.emitEvent;

		/**
		 * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
		 * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
		 *
		 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
		 * @param {...*} Optional additional arguments to be passed to each listener.
		 * @return {Object} Current instance of EventEmitter for chaining.
		 */
		proto.emit = function emit(evt) {
			var args = Array.prototype.slice.call(arguments, 1);
			return this.emitEvent(evt, args);
		};

		/**
		 * Sets the current value to check against when executing listeners. If a
		 * listeners return value matches the one set here then it will be removed
		 * after execution. This value defaults to true.
		 *
		 * @param {*} value The new value to check for when executing listeners.
		 * @return {Object} Current instance of EventEmitter for chaining.
		 */
		proto.setOnceReturnValue = function setOnceReturnValue(value) {
			this._onceReturnValue = value;
			return this;
		};

		/**
		 * Fetches the current value to check against when executing listeners. If
		 * the listeners return value matches this one then it should be removed
		 * automatically. It will return true by default.
		 *
		 * @return {*|Boolean} The current value to check for or the default, true.
		 * @api private
		 */
		proto._getOnceReturnValue = function _getOnceReturnValue() {
			if (this.hasOwnProperty('_onceReturnValue')) {
				return this._onceReturnValue;
			}
			else {
				return true;
			}
		};

		/**
		 * Fetches the events object and creates one if required.
		 *
		 * @return {Object} The events storage object.
		 * @api private
		 */
		proto._getEvents = function _getEvents() {
			return this._events || (this._events = {});
		};

		// Expose the class either via AMD, CommonJS or the global object
		if (true) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return EventEmitter;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}
		else if (typeof module !== 'undefined' && module.exports){
			module.exports = EventEmitter;
		}
		else {
			this.EventEmitter = EventEmitter;
		}
	}.call(this));


/***/ },

/***/ 262:
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * getSize v1.1.8
	 * measure size of elements
	 * MIT license
	 */

	/*jshint browser: true, strict: true, undef: true, unused: true */
	/*global define: false, exports: false, require: false, module: false */

	( function( window, undefined ) {
	'use strict';

	if (!window) return;

	// -------------------------- helpers -------------------------- //

	var getComputedStyle = window.getComputedStyle;
	var getStyle = getComputedStyle ?
	  function( elem ) {
	    return getComputedStyle( elem, null );
	  } :
	  function( elem ) {
	    return elem.currentStyle;
	  };

	// get a number from a string, not a percentage
	function getStyleSize( value ) {
	  var num = parseFloat( value );
	  // not a percent like '100%', and a number
	  var isValid = value.indexOf('%') === -1 && !isNaN( num );
	  return isValid && num;
	}

	// -------------------------- measurements -------------------------- //

	var measurements = [
	  'paddingLeft',
	  'paddingRight',
	  'paddingTop',
	  'paddingBottom',
	  'marginLeft',
	  'marginRight',
	  'marginTop',
	  'marginBottom',
	  'borderLeftWidth',
	  'borderRightWidth',
	  'borderTopWidth',
	  'borderBottomWidth'
	];

	function getZeroSize() {
	  var size = {
	    width: 0,
	    height: 0,
	    innerWidth: 0,
	    innerHeight: 0,
	    outerWidth: 0,
	    outerHeight: 0
	  };
	  for ( var i=0, len = measurements.length; i < len; i++ ) {
	    var measurement = measurements[i];
	    size[ measurement ] = 0;
	  }
	  return size;
	}



	function defineGetSize( getStyleProperty ) {

	// -------------------------- box sizing -------------------------- //

	var boxSizingProp = getStyleProperty('boxSizing');
	var isBoxSizeOuter;

	/**
	 * WebKit measures the outer-width on style.width on border-box elems
	 * IE & Firefox measures the inner-width
	 */
	( function() {
	  if ( !boxSizingProp ) {
	    return;
	  }

	  var div = document.createElement('div');
	  div.style.width = '200px';
	  div.style.padding = '1px 2px 3px 4px';
	  div.style.borderStyle = 'solid';
	  div.style.borderWidth = '1px 2px 3px 4px';
	  div.style[ boxSizingProp ] = 'border-box';

	  var body = document.body || document.documentElement;
	  body.appendChild( div );
	  var style = getStyle( div );

	  isBoxSizeOuter = getStyleSize( style.width ) === 200;
	  body.removeChild( div );
	})();


	// -------------------------- getSize -------------------------- //

	function getSize( elem ) {
	  // use querySeletor if elem is string
	  if ( typeof elem === 'string' ) {
	    elem = document.querySelector( elem );
	  }

	  // do not proceed on non-objects
	  if ( !elem || typeof elem !== 'object' || !elem.nodeType ) {
	    return;
	  }

	  var style = getStyle( elem );

	  // if hidden, everything is 0
	  if ( style.display === 'none' ) {
	    return getZeroSize();
	  }

	  var size = {};
	  size.width = elem.offsetWidth;
	  size.height = elem.offsetHeight;

	  var isBorderBox = size.isBorderBox = !!( boxSizingProp &&
	    style[ boxSizingProp ] && style[ boxSizingProp ] === 'border-box' );

	  // get all measurements
	  for ( var i=0, len = measurements.length; i < len; i++ ) {
	    var measurement = measurements[i];
	    var value = style[ measurement ];
	    value = mungeNonPixel( elem, value );
	    var num = parseFloat( value );
	    // any 'auto', 'medium' value will be 0
	    size[ measurement ] = !isNaN( num ) ? num : 0;
	  }

	  var paddingWidth = size.paddingLeft + size.paddingRight;
	  var paddingHeight = size.paddingTop + size.paddingBottom;
	  var marginWidth = size.marginLeft + size.marginRight;
	  var marginHeight = size.marginTop + size.marginBottom;
	  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
	  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

	  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

	  // overwrite width and height if we can get it from style
	  var styleWidth = getStyleSize( style.width );
	  if ( styleWidth !== false ) {
	    size.width = styleWidth +
	      // add padding and border unless it's already including it
	      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
	  }

	  var styleHeight = getStyleSize( style.height );
	  if ( styleHeight !== false ) {
	    size.height = styleHeight +
	      // add padding and border unless it's already including it
	      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
	  }

	  size.innerWidth = size.width - ( paddingWidth + borderWidth );
	  size.innerHeight = size.height - ( paddingHeight + borderHeight );

	  size.outerWidth = size.width + marginWidth;
	  size.outerHeight = size.height + marginHeight;

	  return size;
	}

	// IE8 returns percent values, not pixels
	// taken from jQuery's curCSS
	function mungeNonPixel( elem, value ) {
	  // IE8 and has percent value
	  if ( getComputedStyle || value.indexOf('%') === -1 ) {
	    return value;
	  }
	  var style = elem.style;
	  // Remember the original values
	  var left = style.left;
	  var rs = elem.runtimeStyle;
	  var rsLeft = rs && rs.left;

	  // Put in the new values to get a computed value out
	  if ( rsLeft ) {
	    rs.left = elem.currentStyle.left;
	  }
	  style.left = value;
	  value = style.pixelLeft;

	  // Revert the changed values
	  style.left = left;
	  if ( rsLeft ) {
	    rs.left = rsLeft;
	  }

	  return value;
	}

	return getSize;

	}

	// transport
	if ( true ) {
	  // CommonJS for Component
	  module.exports = defineGetSize( __webpack_require__(263) );
	} else if ( typeof define === 'function' && define.amd ) {
	  // AMD for RequireJS
	  define( [ 'get-style-property/get-style-property' ], defineGetSize );
	} else {
	  // browser global
	  window.getSize = defineGetSize( window.getStyleProperty );
	}

	})( typeof window !== 'undefined' ? window : null );


/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * getStyleProperty v1.0.4
	 * original by kangax
	 * http://perfectionkills.com/feature-testing-css-properties/
	 * MIT license
	 */

	/*jshint browser: true, strict: true, undef: true */
	/*global define: false, exports: false, module: false */

	( function( window ) {

	'use strict';

	var prefixes = 'Webkit Moz ms Ms O'.split(' ');
	var docElemStyle = document.documentElement.style;

	function getStyleProperty( propName ) {
	  if ( !propName ) {
	    return;
	  }

	  // test standard property first
	  if ( typeof docElemStyle[ propName ] === 'string' ) {
	    return propName;
	  }

	  // capitalize
	  propName = propName.charAt(0).toUpperCase() + propName.slice(1);

	  // test vendor specific properties
	  var prefixed;
	  for ( var i=0, len = prefixes.length; i < len; i++ ) {
	    prefixed = prefixes[i] + propName;
	    if ( typeof docElemStyle[ prefixed ] === 'string' ) {
	      return prefixed;
	    }
	  }
	}

	// transport
	if ( true ) {
	  // AMD
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return getStyleProperty;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if ( typeof exports === 'object' ) {
	  // CommonJS for Component
	  module.exports = getStyleProperty;
	} else {
	  // browser global
	  window.getStyleProperty = getStyleProperty;
	}

	})( window );


/***/ },

/***/ 264:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * matchesSelector v1.0.3
	 * matchesSelector( element, '.selector' )
	 * MIT license
	 */

	/*jshint browser: true, strict: true, undef: true, unused: true */
	/*global define: false, module: false */

	( function( ElemProto ) {

	  'use strict';

	  var matchesMethod = ( function() {
	    // check for the standard method name first
	    if ( ElemProto.matches ) {
	      return 'matches';
	    }
	    // check un-prefixed
	    if ( ElemProto.matchesSelector ) {
	      return 'matchesSelector';
	    }
	    // check vendor prefixes
	    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

	    for ( var i=0, len = prefixes.length; i < len; i++ ) {
	      var prefix = prefixes[i];
	      var method = prefix + 'MatchesSelector';
	      if ( ElemProto[ method ] ) {
	        return method;
	      }
	    }
	  })();

	  // ----- match ----- //

	  function match( elem, selector ) {
	    return elem[ matchesMethod ]( selector );
	  }

	  // ----- appendToFragment ----- //

	  function checkParent( elem ) {
	    // not needed if already has parent
	    if ( elem.parentNode ) {
	      return;
	    }
	    var fragment = document.createDocumentFragment();
	    fragment.appendChild( elem );
	  }

	  // ----- query ----- //

	  // fall back to using QSA
	  // thx @jonathantneal https://gist.github.com/3062955
	  function query( elem, selector ) {
	    // append to fragment if no parent
	    checkParent( elem );

	    // match elem with all selected elems of parent
	    var elems = elem.parentNode.querySelectorAll( selector );
	    for ( var i=0, len = elems.length; i < len; i++ ) {
	      // return true if match
	      if ( elems[i] === elem ) {
	        return true;
	      }
	    }
	    // otherwise return false
	    return false;
	  }

	  // ----- matchChild ----- //

	  function matchChild( elem, selector ) {
	    checkParent( elem );
	    return match( elem, selector );
	  }

	  // ----- matchesSelector ----- //

	  var matchesSelector;

	  if ( matchesMethod ) {
	    // IE9 supports matchesSelector, but doesn't work on orphaned elems
	    // check for that
	    var div = document.createElement('div');
	    var supportsOrphans = match( div, 'div' );
	    matchesSelector = supportsOrphans ? match : matchChild;
	  } else {
	    matchesSelector = query;
	  }

	  // transport
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return matchesSelector;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof exports === 'object' ) {
	    module.exports = matchesSelector;
	  }
	  else {
	    // browser global
	    window.matchesSelector = matchesSelector;
	  }

	})( Element.prototype );


/***/ },

/***/ 265:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Outlayer Item
	 */

	( function( window ) {
	'use strict';

	if (!window) return;

	// ----- get style ----- //

	var getComputedStyle = window.getComputedStyle;
	var getStyle = getComputedStyle ?
	  function( elem ) {
	    return getComputedStyle( elem, null );
	  } :
	  function( elem ) {
	    return elem.currentStyle;
	  };


	// extend objects
	function extend( a, b ) {
	  for ( var prop in b ) {
	    a[ prop ] = b[ prop ];
	  }
	  return a;
	}

	function isEmptyObj( obj ) {
	  for ( var prop in obj ) {
	    return false;
	  }
	  prop = null;
	  return true;
	}

	// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
	function toDash( str ) {
	  return str.replace( /([A-Z])/g, function( $1 ){
	    return '-' + $1.toLowerCase();
	  });
	}

	// -------------------------- Outlayer definition -------------------------- //

	function outlayerItemDefinition( EventEmitter, getSize, getStyleProperty ) {

	// -------------------------- CSS3 support -------------------------- //

	var transitionProperty = getStyleProperty('transition');
	var transformProperty = getStyleProperty('transform');
	var supportsCSS3 = transitionProperty && transformProperty;
	var is3d = !!getStyleProperty('perspective');

	var transitionEndEvent = {
	  WebkitTransition: 'webkitTransitionEnd',
	  MozTransition: 'transitionend',
	  OTransition: 'otransitionend',
	  transition: 'transitionend'
	}[ transitionProperty ];

	// properties that could have vendor prefix
	var prefixableProperties = [
	  'transform',
	  'transition',
	  'transitionDuration',
	  'transitionProperty'
	];

	// cache all vendor properties
	var vendorProperties = ( function() {
	  var cache = {};
	  for ( var i=0, len = prefixableProperties.length; i < len; i++ ) {
	    var prop = prefixableProperties[i];
	    var supportedProp = getStyleProperty( prop );
	    if ( supportedProp && supportedProp !== prop ) {
	      cache[ prop ] = supportedProp;
	    }
	  }
	  return cache;
	})();

	// -------------------------- Item -------------------------- //

	function Item( element, layout ) {
	  if ( !element ) {
	    return;
	  }

	  this.element = element;
	  // parent layout class, i.e. Masonry, Isotope, or Packery
	  this.layout = layout;
	  this.position = {
	    x: 0,
	    y: 0
	  };

	  this._create();
	}

	// inherit EventEmitter
	extend( Item.prototype, EventEmitter.prototype );

	Item.prototype._create = function() {
	  // transition objects
	  this._transn = {
	    ingProperties: {},
	    clean: {},
	    onEnd: {}
	  };

	  this.css({
	    position: 'absolute'
	  });
	};

	// trigger specified handler for event type
	Item.prototype.handleEvent = function( event ) {
	  var method = 'on' + event.type;
	  if ( this[ method ] ) {
	    this[ method ]( event );
	  }
	};

	Item.prototype.getSize = function() {
	  this.size = getSize( this.element );
	};

	/**
	 * apply CSS styles to element
	 * @param {Object} style
	 */
	Item.prototype.css = function( style ) {
	  var elemStyle = this.element.style;

	  for ( var prop in style ) {
	    // use vendor property if available
	    var supportedProp = vendorProperties[ prop ] || prop;
	    elemStyle[ supportedProp ] = style[ prop ];
	  }
	};

	 // measure position, and sets it
	Item.prototype.getPosition = function() {
	  var style = getStyle( this.element );
	  var layoutOptions = this.layout.options;
	  var isOriginLeft = layoutOptions.isOriginLeft;
	  var isOriginTop = layoutOptions.isOriginTop;
	  var x = parseInt( style[ isOriginLeft ? 'left' : 'right' ], 10 );
	  var y = parseInt( style[ isOriginTop ? 'top' : 'bottom' ], 10 );

	  // clean up 'auto' or other non-integer values
	  x = isNaN( x ) ? 0 : x;
	  y = isNaN( y ) ? 0 : y;
	  // remove padding from measurement
	  var layoutSize = this.layout.size;
	  x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
	  y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

	  this.position.x = x;
	  this.position.y = y;
	};

	// set settled position, apply padding
	Item.prototype.layoutPosition = function() {
	  var layoutSize = this.layout.size;
	  var layoutOptions = this.layout.options;
	  var style = {};

	  if ( layoutOptions.isOriginLeft ) {
	    style.left = ( this.position.x + layoutSize.paddingLeft ) + 'px';
	    // reset other property
	    style.right = '';
	  } else {
	    style.right = ( this.position.x + layoutSize.paddingRight ) + 'px';
	    style.left = '';
	  }

	  if ( layoutOptions.isOriginTop ) {
	    style.top = ( this.position.y + layoutSize.paddingTop ) + 'px';
	    style.bottom = '';
	  } else {
	    style.bottom = ( this.position.y + layoutSize.paddingBottom ) + 'px';
	    style.top = '';
	  }

	  this.css( style );
	  this.emitEvent( 'layout', [ this ] );
	};


	// transform translate function
	var translate = is3d ?
	  function( x, y ) {
	    return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
	  } :
	  function( x, y ) {
	    return 'translate(' + x + 'px, ' + y + 'px)';
	  };


	Item.prototype._transitionTo = function( x, y ) {
	  this.getPosition();
	  // get current x & y from top/left
	  var curX = this.position.x;
	  var curY = this.position.y;

	  var compareX = parseInt( x, 10 );
	  var compareY = parseInt( y, 10 );
	  var didNotMove = compareX === this.position.x && compareY === this.position.y;

	  // save end position
	  this.setPosition( x, y );

	  // if did not move and not transitioning, just go to layout
	  if ( didNotMove && !this.isTransitioning ) {
	    this.layoutPosition();
	    return;
	  }

	  var transX = x - curX;
	  var transY = y - curY;
	  var transitionStyle = {};
	  // flip cooridinates if origin on right or bottom
	  var layoutOptions = this.layout.options;
	  transX = layoutOptions.isOriginLeft ? transX : -transX;
	  transY = layoutOptions.isOriginTop ? transY : -transY;
	  transitionStyle.transform = translate( transX, transY );

	  this.transition({
	    to: transitionStyle,
	    onTransitionEnd: {
	      transform: this.layoutPosition
	    },
	    isCleaning: true
	  });
	};

	// non transition + transform support
	Item.prototype.goTo = function( x, y ) {
	  this.setPosition( x, y );
	  this.layoutPosition();
	};

	// use transition and transforms if supported
	Item.prototype.moveTo = supportsCSS3 ?
	  Item.prototype._transitionTo : Item.prototype.goTo;

	Item.prototype.setPosition = function( x, y ) {
	  this.position.x = parseInt( x, 10 );
	  this.position.y = parseInt( y, 10 );
	};

	// ----- transition ----- //

	/**
	 * @param {Object} style - CSS
	 * @param {Function} onTransitionEnd
	 */

	// non transition, just trigger callback
	Item.prototype._nonTransition = function( args ) {
	  this.css( args.to );
	  if ( args.isCleaning ) {
	    this._removeStyles( args.to );
	  }
	  for ( var prop in args.onTransitionEnd ) {
	    args.onTransitionEnd[ prop ].call( this );
	  }
	};

	/**
	 * proper transition
	 * @param {Object} args - arguments
	 *   @param {Object} to - style to transition to
	 *   @param {Object} from - style to start transition from
	 *   @param {Boolean} isCleaning - removes transition styles after transition
	 *   @param {Function} onTransitionEnd - callback
	 */
	Item.prototype._transition = function( args ) {
	  // redirect to nonTransition if no transition duration
	  if ( !parseFloat( this.layout.options.transitionDuration ) ) {
	    this._nonTransition( args );
	    return;
	  }

	  var _transition = this._transn;
	  // keep track of onTransitionEnd callback by css property
	  for ( var prop in args.onTransitionEnd ) {
	    _transition.onEnd[ prop ] = args.onTransitionEnd[ prop ];
	  }
	  // keep track of properties that are transitioning
	  for ( prop in args.to ) {
	    _transition.ingProperties[ prop ] = true;
	    // keep track of properties to clean up when transition is done
	    if ( args.isCleaning ) {
	      _transition.clean[ prop ] = true;
	    }
	  }

	  // set from styles
	  if ( args.from ) {
	    this.css( args.from );
	    // force redraw. http://blog.alexmaccaw.com/css-transitions
	    var h = this.element.offsetHeight;
	    // hack for JSHint to hush about unused var
	    h = null;
	  }
	  // enable transition
	  this.enableTransition( args.to );
	  // set styles that are transitioning
	  this.css( args.to );

	  this.isTransitioning = true;

	};

	var itemTransitionProperties = transformProperty && ( toDash( transformProperty ) +
	  ',opacity' );

	Item.prototype.enableTransition = function(/* style */) {
	  // only enable if not already transitioning
	  // bug in IE10 were re-setting transition style will prevent
	  // transitionend event from triggering
	  if ( this.isTransitioning ) {
	    return;
	  }

	  // make transition: foo, bar, baz from style object
	  // TODO uncomment this bit when IE10 bug is resolved
	  // var transitionValue = [];
	  // for ( var prop in style ) {
	  //   // dash-ify camelCased properties like WebkitTransition
	  //   transitionValue.push( toDash( prop ) );
	  // }
	  // enable transition styles
	  // HACK always enable transform,opacity for IE10
	  this.css({
	    transitionProperty: itemTransitionProperties,
	    transitionDuration: this.layout.options.transitionDuration
	  });
	  // listen for transition end event
	  this.element.addEventListener( transitionEndEvent, this, false );
	};

	Item.prototype.transition = Item.prototype[ transitionProperty ? '_transition' : '_nonTransition' ];

	// ----- events ----- //

	Item.prototype.onwebkitTransitionEnd = function( event ) {
	  this.ontransitionend( event );
	};

	Item.prototype.onotransitionend = function( event ) {
	  this.ontransitionend( event );
	};

	// properties that I munge to make my life easier
	var dashedVendorProperties = {
	  '-webkit-transform': 'transform',
	  '-moz-transform': 'transform',
	  '-o-transform': 'transform'
	};

	Item.prototype.ontransitionend = function( event ) {
	  // disregard bubbled events from children
	  if ( event.target !== this.element ) {
	    return;
	  }
	  var _transition = this._transn;
	  // get property name of transitioned property, convert to prefix-free
	  var propertyName = dashedVendorProperties[ event.propertyName ] || event.propertyName;

	  // remove property that has completed transitioning
	  delete _transition.ingProperties[ propertyName ];
	  // check if any properties are still transitioning
	  if ( isEmptyObj( _transition.ingProperties ) ) {
	    // all properties have completed transitioning
	    this.disableTransition();
	  }
	  // clean style
	  if ( propertyName in _transition.clean ) {
	    // clean up style
	    this.element.style[ event.propertyName ] = '';
	    delete _transition.clean[ propertyName ];
	  }
	  // trigger onTransitionEnd callback
	  if ( propertyName in _transition.onEnd ) {
	    var onTransitionEnd = _transition.onEnd[ propertyName ];
	    onTransitionEnd.call( this );
	    delete _transition.onEnd[ propertyName ];
	  }

	  this.emitEvent( 'transitionEnd', [ this ] );
	};

	Item.prototype.disableTransition = function() {
	  this.removeTransitionStyles();
	  this.element.removeEventListener( transitionEndEvent, this, false );
	  this.isTransitioning = false;
	};

	/**
	 * removes style property from element
	 * @param {Object} style
	**/
	Item.prototype._removeStyles = function( style ) {
	  // clean up transition styles
	  var cleanStyle = {};
	  for ( var prop in style ) {
	    cleanStyle[ prop ] = '';
	  }
	  this.css( cleanStyle );
	};

	var cleanTransitionStyle = {
	  transitionProperty: '',
	  transitionDuration: ''
	};

	Item.prototype.removeTransitionStyles = function() {
	  // remove transition
	  this.css( cleanTransitionStyle );
	};

	// ----- show/hide/remove ----- //

	// remove element from DOM
	Item.prototype.removeElem = function() {
	  this.element.parentNode.removeChild( this.element );
	  this.emitEvent( 'remove', [ this ] );
	};

	Item.prototype.remove = function() {
	  // just remove element if no transition support or no transition
	  if ( !transitionProperty || !parseFloat( this.layout.options.transitionDuration ) ) {
	    this.removeElem();
	    return;
	  }

	  // start transition
	  var _this = this;
	  this.on( 'transitionEnd', function() {
	    _this.removeElem();
	    return true; // bind once
	  });
	  this.hide();
	};

	Item.prototype.reveal = function() {
	  delete this.isHidden;
	  // remove display: none
	  this.css({ display: '' });

	  var options = this.layout.options;
	  this.transition({
	    from: options.hiddenStyle,
	    to: options.visibleStyle,
	    isCleaning: true
	  });
	};

	Item.prototype.hide = function() {
	  // set flag
	  this.isHidden = true;
	  // remove display: none
	  this.css({ display: '' });

	  var options = this.layout.options;
	  this.transition({
	    from: options.visibleStyle,
	    to: options.hiddenStyle,
	    // keep hidden stuff hidden
	    isCleaning: true,
	    onTransitionEnd: {
	      opacity: function() {
	        // check if still hidden
	        // during transition, item may have been un-hidden
	        if ( this.isHidden ) {
	          this.css({ display: 'none' });
	        }
	      }
	    }
	  });
	};

	Item.prototype.destroy = function() {
	  this.css({
	    position: '',
	    left: '',
	    right: '',
	    top: '',
	    bottom: '',
	    transition: '',
	    transform: ''
	  });
	};

	return Item;

	}

	// -------------------------- transport -------------------------- //
	if (true) {
	  // CommonJS
	  module.exports = outlayerItemDefinition(
	    __webpack_require__(261),
	    __webpack_require__(262),
	    __webpack_require__(263)
	  );
	} else if ( typeof define === 'function' && define.amd ) {
	  // AMD
	  define( [
	      'eventEmitter/EventEmitter',
	      'get-size/get-size',
	      'get-style-property/get-style-property'
	    ],
	    outlayerItemDefinition );
	} else {
	  // browser global
	  window.Outlayer = {};
	  window.Outlayer.Item = outlayerItemDefinition(
	    window.EventEmitter,
	    window.getSize,
	    window.getStyleProperty
	  );
	}

	})( typeof window !== 'undefined' ? window : null );


/***/ },

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * imagesLoaded v3.1.8
	 * JavaScript is all like "You images are done yet or what?"
	 * MIT License
	 */

	( function( window, factory ) { 'use strict';
	  // universal module definition

	  /*global define: false, module: false, require: false */

	  if ( true ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      __webpack_require__(267),
	      __webpack_require__(268)
	    );
	  } else if ( typeof define === 'function' && define.amd ) {
	    // AMD
	    define( [
	      'eventEmitter/EventEmitter',
	      'eventie/eventie'
	    ], function( EventEmitter, eventie ) {
	      return factory( window, EventEmitter, eventie );
	    });
	  } else {
	    // browser global
	    window.imagesLoaded = factory(
	      window,
	      window.EventEmitter,
	      window.eventie
	    );
	  }

	})( window,

	// --------------------------  factory -------------------------- //

	function factory( window, EventEmitter, eventie ) {

	'use strict';

	var $ = window.jQuery;
	var console = window.console;
	var hasConsole = typeof console !== 'undefined';

	// -------------------------- helpers -------------------------- //

	// extend objects
	function extend( a, b ) {
	  for ( var prop in b ) {
	    a[ prop ] = b[ prop ];
	  }
	  return a;
	}

	var objToString = Object.prototype.toString;
	function isArray( obj ) {
	  return objToString.call( obj ) === '[object Array]';
	}

	// turn element or nodeList into an array
	function makeArray( obj ) {
	  var ary = [];
	  if ( isArray( obj ) ) {
	    // use object if already an array
	    ary = obj;
	  } else if ( typeof obj.length === 'number' ) {
	    // convert nodeList to array
	    for ( var i=0, len = obj.length; i < len; i++ ) {
	      ary.push( obj[i] );
	    }
	  } else {
	    // array of single index
	    ary.push( obj );
	  }
	  return ary;
	}

	  // -------------------------- imagesLoaded -------------------------- //

	  /**
	   * @param {Array, Element, NodeList, String} elem
	   * @param {Object or Function} options - if function, use as callback
	   * @param {Function} onAlways - callback function
	   */
	  function ImagesLoaded( elem, options, onAlways ) {
	    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
	    if ( !( this instanceof ImagesLoaded ) ) {
	      return new ImagesLoaded( elem, options );
	    }
	    // use elem as selector string
	    if ( typeof elem === 'string' ) {
	      elem = document.querySelectorAll( elem );
	    }

	    this.elements = makeArray( elem );
	    this.options = extend( {}, this.options );

	    if ( typeof options === 'function' ) {
	      onAlways = options;
	    } else {
	      extend( this.options, options );
	    }

	    if ( onAlways ) {
	      this.on( 'always', onAlways );
	    }

	    this.getImages();

	    if ( $ ) {
	      // add jQuery Deferred object
	      this.jqDeferred = new $.Deferred();
	    }

	    // HACK check async to allow time to bind listeners
	    var _this = this;
	    setTimeout( function() {
	      _this.check();
	    });
	  }

	  ImagesLoaded.prototype = new EventEmitter();

	  ImagesLoaded.prototype.options = {};

	  ImagesLoaded.prototype.getImages = function() {
	    this.images = [];

	    // filter & find items if we have an item selector
	    for ( var i=0, len = this.elements.length; i < len; i++ ) {
	      var elem = this.elements[i];
	      // filter siblings
	      if ( elem.nodeName === 'IMG' ) {
	        this.addImage( elem );
	      }
	      // find children
	      // no non-element nodes, #143
	      var nodeType = elem.nodeType;
	      if ( !nodeType || !( nodeType === 1 || nodeType === 9 || nodeType === 11 ) ) {
	        continue;
	      }
	      var childElems = elem.querySelectorAll('img');
	      // concat childElems to filterFound array
	      for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
	        var img = childElems[j];
	        this.addImage( img );
	      }
	    }
	  };

	  /**
	   * @param {Image} img
	   */
	  ImagesLoaded.prototype.addImage = function( img ) {
	    var loadingImage = new LoadingImage( img );
	    this.images.push( loadingImage );
	  };

	  ImagesLoaded.prototype.check = function() {
	    var _this = this;
	    var checkedCount = 0;
	    var length = this.images.length;
	    this.hasAnyBroken = false;
	    // complete if no images
	    if ( !length ) {
	      this.complete();
	      return;
	    }

	    function onConfirm( image, message ) {
	      if ( _this.options.debug && hasConsole ) {
	        console.log( 'confirm', image, message );
	      }

	      _this.progress( image );
	      checkedCount++;
	      if ( checkedCount === length ) {
	        _this.complete();
	      }
	      return true; // bind once
	    }

	    for ( var i=0; i < length; i++ ) {
	      var loadingImage = this.images[i];
	      loadingImage.on( 'confirm', onConfirm );
	      loadingImage.check();
	    }
	  };

	  ImagesLoaded.prototype.progress = function( image ) {
	    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
	    // HACK - Chrome triggers event before object properties have changed. #83
	    var _this = this;
	    setTimeout( function() {
	      _this.emit( 'progress', _this, image );
	      if ( _this.jqDeferred && _this.jqDeferred.notify ) {
	        _this.jqDeferred.notify( _this, image );
	      }
	    });
	  };

	  ImagesLoaded.prototype.complete = function() {
	    var eventName = this.hasAnyBroken ? 'fail' : 'done';
	    this.isComplete = true;
	    var _this = this;
	    // HACK - another setTimeout so that confirm happens after progress
	    setTimeout( function() {
	      _this.emit( eventName, _this );
	      _this.emit( 'always', _this );
	      if ( _this.jqDeferred ) {
	        var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
	        _this.jqDeferred[ jqMethod ]( _this );
	      }
	    });
	  };

	  // -------------------------- jquery -------------------------- //

	  if ( $ ) {
	    $.fn.imagesLoaded = function( options, callback ) {
	      var instance = new ImagesLoaded( this, options, callback );
	      return instance.jqDeferred.promise( $(this) );
	    };
	  }


	  // --------------------------  -------------------------- //

	  function LoadingImage( img ) {
	    this.img = img;
	  }

	  LoadingImage.prototype = new EventEmitter();

	  LoadingImage.prototype.check = function() {
	    // first check cached any previous images that have same src
	    var resource = cache[ this.img.src ] || new Resource( this.img.src );
	    if ( resource.isConfirmed ) {
	      this.confirm( resource.isLoaded, 'cached was confirmed' );
	      return;
	    }

	    // If complete is true and browser supports natural sizes,
	    // try to check for image status manually.
	    if ( this.img.complete && this.img.naturalWidth !== undefined ) {
	      // report based on naturalWidth
	      this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
	      return;
	    }

	    // If none of the checks above matched, simulate loading on detached element.
	    var _this = this;
	    resource.on( 'confirm', function( resrc, message ) {
	      _this.confirm( resrc.isLoaded, message );
	      return true;
	    });

	    resource.check();
	  };

	  LoadingImage.prototype.confirm = function( isLoaded, message ) {
	    this.isLoaded = isLoaded;
	    this.emit( 'confirm', this, message );
	  };

	  // -------------------------- Resource -------------------------- //

	  // Resource checks each src, only once
	  // separate class from LoadingImage to prevent memory leaks. See #115

	  var cache = {};

	  function Resource( src ) {
	    this.src = src;
	    // add to cache
	    cache[ src ] = this;
	  }

	  Resource.prototype = new EventEmitter();

	  Resource.prototype.check = function() {
	    // only trigger checking once
	    if ( this.isChecked ) {
	      return;
	    }
	    // simulate loading on detached element
	    var proxyImage = new Image();
	    eventie.bind( proxyImage, 'load', this );
	    eventie.bind( proxyImage, 'error', this );
	    proxyImage.src = this.src;
	    // set flag
	    this.isChecked = true;
	  };

	  // ----- events ----- //

	  // trigger specified handler for event type
	  Resource.prototype.handleEvent = function( event ) {
	    var method = 'on' + event.type;
	    if ( this[ method ] ) {
	      this[ method ]( event );
	    }
	  };

	  Resource.prototype.onload = function( event ) {
	    this.confirm( true, 'onload' );
	    this.unbindProxyEvents( event );
	  };

	  Resource.prototype.onerror = function( event ) {
	    this.confirm( false, 'onerror' );
	    this.unbindProxyEvents( event );
	  };

	  // ----- confirm ----- //

	  Resource.prototype.confirm = function( isLoaded, message ) {
	    this.isConfirmed = true;
	    this.isLoaded = isLoaded;
	    this.emit( 'confirm', this, message );
	  };

	  Resource.prototype.unbindProxyEvents = function( event ) {
	    eventie.unbind( event.target, 'load', this );
	    eventie.unbind( event.target, 'error', this );
	  };

	  // -----  ----- //

	  return ImagesLoaded;

	});


/***/ },

/***/ 267:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * EventEmitter v4.2.11 - git.io/ee
	 * Unlicense - http://unlicense.org/
	 * Oliver Caldwell - http://oli.me.uk/
	 * @preserve
	 */

	;(function () {
	    'use strict';

	    /**
	     * Class for managing events.
	     * Can be extended to provide event functionality in other classes.
	     *
	     * @class EventEmitter Manages event registering and emitting.
	     */
	    function EventEmitter() {}

	    // Shortcuts to improve speed and size
	    var proto = EventEmitter.prototype;
	    var exports = this;
	    var originalGlobalValue = exports.EventEmitter;

	    /**
	     * Finds the index of the listener for the event in its storage array.
	     *
	     * @param {Function[]} listeners Array of listeners to search through.
	     * @param {Function} listener Method to look for.
	     * @return {Number} Index of the specified listener, -1 if not found
	     * @api private
	     */
	    function indexOfListener(listeners, listener) {
	        var i = listeners.length;
	        while (i--) {
	            if (listeners[i].listener === listener) {
	                return i;
	            }
	        }

	        return -1;
	    }

	    /**
	     * Alias a method while keeping the context correct, to allow for overwriting of target method.
	     *
	     * @param {String} name The name of the target method.
	     * @return {Function} The aliased method
	     * @api private
	     */
	    function alias(name) {
	        return function aliasClosure() {
	            return this[name].apply(this, arguments);
	        };
	    }

	    /**
	     * Returns the listener array for the specified event.
	     * Will initialise the event object and listener arrays if required.
	     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	     * Each property in the object response is an array of listener functions.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @return {Function[]|Object} All listener functions for the event.
	     */
	    proto.getListeners = function getListeners(evt) {
	        var events = this._getEvents();
	        var response;
	        var key;

	        // Return a concatenated array of all matching events if
	        // the selector is a regular expression.
	        if (evt instanceof RegExp) {
	            response = {};
	            for (key in events) {
	                if (events.hasOwnProperty(key) && evt.test(key)) {
	                    response[key] = events[key];
	                }
	            }
	        }
	        else {
	            response = events[evt] || (events[evt] = []);
	        }

	        return response;
	    };

	    /**
	     * Takes a list of listener objects and flattens it into a list of listener functions.
	     *
	     * @param {Object[]} listeners Raw listener objects.
	     * @return {Function[]} Just the listener functions.
	     */
	    proto.flattenListeners = function flattenListeners(listeners) {
	        var flatListeners = [];
	        var i;

	        for (i = 0; i < listeners.length; i += 1) {
	            flatListeners.push(listeners[i].listener);
	        }

	        return flatListeners;
	    };

	    /**
	     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @return {Object} All listener functions for an event in an object.
	     */
	    proto.getListenersAsObject = function getListenersAsObject(evt) {
	        var listeners = this.getListeners(evt);
	        var response;

	        if (listeners instanceof Array) {
	            response = {};
	            response[evt] = listeners;
	        }

	        return response || listeners;
	    };

	    /**
	     * Adds a listener function to the specified event.
	     * The listener will not be added if it is a duplicate.
	     * If the listener returns true then it will be removed after it is called.
	     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addListener = function addListener(evt, listener) {
	        var listeners = this.getListenersAsObject(evt);
	        var listenerIsWrapped = typeof listener === 'object';
	        var key;

	        for (key in listeners) {
	            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
	                listeners[key].push(listenerIsWrapped ? listener : {
	                    listener: listener,
	                    once: false
	                });
	            }
	        }

	        return this;
	    };

	    /**
	     * Alias of addListener
	     */
	    proto.on = alias('addListener');

	    /**
	     * Semi-alias of addListener. It will add a listener that will be
	     * automatically removed after its first execution.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addOnceListener = function addOnceListener(evt, listener) {
	        return this.addListener(evt, {
	            listener: listener,
	            once: true
	        });
	    };

	    /**
	     * Alias of addOnceListener.
	     */
	    proto.once = alias('addOnceListener');

	    /**
	     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	     * You need to tell it what event names should be matched by a regex.
	     *
	     * @param {String} evt Name of the event to create.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.defineEvent = function defineEvent(evt) {
	        this.getListeners(evt);
	        return this;
	    };

	    /**
	     * Uses defineEvent to define multiple events.
	     *
	     * @param {String[]} evts An array of event names to define.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.defineEvents = function defineEvents(evts) {
	        for (var i = 0; i < evts.length; i += 1) {
	            this.defineEvent(evts[i]);
	        }
	        return this;
	    };

	    /**
	     * Removes a listener function from the specified event.
	     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to remove the listener from.
	     * @param {Function} listener Method to remove from the event.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeListener = function removeListener(evt, listener) {
	        var listeners = this.getListenersAsObject(evt);
	        var index;
	        var key;

	        for (key in listeners) {
	            if (listeners.hasOwnProperty(key)) {
	                index = indexOfListener(listeners[key], listener);

	                if (index !== -1) {
	                    listeners[key].splice(index, 1);
	                }
	            }
	        }

	        return this;
	    };

	    /**
	     * Alias of removeListener
	     */
	    proto.off = alias('removeListener');

	    /**
	     * Adds listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	     * You can also pass it a regular expression to add the array of listeners to all events that match it.
	     * Yeah, this function does quite a bit. That's probably a bad thing.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addListeners = function addListeners(evt, listeners) {
	        // Pass through to manipulateListeners
	        return this.manipulateListeners(false, evt, listeners);
	    };

	    /**
	     * Removes listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be removed.
	     * You can also pass it a regular expression to remove the listeners from all events that match it.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to remove.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeListeners = function removeListeners(evt, listeners) {
	        // Pass through to manipulateListeners
	        return this.manipulateListeners(true, evt, listeners);
	    };

	    /**
	     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	     * The first argument will determine if the listeners are removed (true) or added (false).
	     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be added/removed.
	     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	     *
	     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
	        var i;
	        var value;
	        var single = remove ? this.removeListener : this.addListener;
	        var multiple = remove ? this.removeListeners : this.addListeners;

	        // If evt is an object then pass each of its properties to this method
	        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
	            for (i in evt) {
	                if (evt.hasOwnProperty(i) && (value = evt[i])) {
	                    // Pass the single listener straight through to the singular method
	                    if (typeof value === 'function') {
	                        single.call(this, i, value);
	                    }
	                    else {
	                        // Otherwise pass back to the multiple function
	                        multiple.call(this, i, value);
	                    }
	                }
	            }
	        }
	        else {
	            // So evt must be a string
	            // And listeners must be an array of listeners
	            // Loop over it and pass each one to the multiple method
	            i = listeners.length;
	            while (i--) {
	                single.call(this, evt, listeners[i]);
	            }
	        }

	        return this;
	    };

	    /**
	     * Removes all listeners from a specified event.
	     * If you do not specify an event then all listeners will be removed.
	     * That means every event will be emptied.
	     * You can also pass a regex to remove all events that match it.
	     *
	     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeEvent = function removeEvent(evt) {
	        var type = typeof evt;
	        var events = this._getEvents();
	        var key;

	        // Remove different things depending on the state of evt
	        if (type === 'string') {
	            // Remove all listeners for the specified event
	            delete events[evt];
	        }
	        else if (evt instanceof RegExp) {
	            // Remove all events matching the regex.
	            for (key in events) {
	                if (events.hasOwnProperty(key) && evt.test(key)) {
	                    delete events[key];
	                }
	            }
	        }
	        else {
	            // Remove all listeners in all events
	            delete this._events;
	        }

	        return this;
	    };

	    /**
	     * Alias of removeEvent.
	     *
	     * Added to mirror the node API.
	     */
	    proto.removeAllListeners = alias('removeEvent');

	    /**
	     * Emits an event of your choice.
	     * When emitted, every listener attached to that event will be executed.
	     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	     * So they will not arrive within the array on the other side, they will be separate.
	     * You can also pass a regular expression to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {Array} [args] Optional array of arguments to be passed to each listener.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.emitEvent = function emitEvent(evt, args) {
	        var listenersMap = this.getListenersAsObject(evt);
	        var listeners;
	        var listener;
	        var i;
	        var key;
	        var response;

	        for (key in listenersMap) {
	            if (listenersMap.hasOwnProperty(key)) {
	                listeners = listenersMap[key].slice(0);
	                i = listeners.length;

	                while (i--) {
	                    // If the listener returns true then it shall be removed from the event
	                    // The function is executed either with a basic call or an apply if there is an args array
	                    listener = listeners[i];

	                    if (listener.once === true) {
	                        this.removeListener(evt, listener.listener);
	                    }

	                    response = listener.listener.apply(this, args || []);

	                    if (response === this._getOnceReturnValue()) {
	                        this.removeListener(evt, listener.listener);
	                    }
	                }
	            }
	        }

	        return this;
	    };

	    /**
	     * Alias of emitEvent
	     */
	    proto.trigger = alias('emitEvent');

	    /**
	     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {...*} Optional additional arguments to be passed to each listener.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.emit = function emit(evt) {
	        var args = Array.prototype.slice.call(arguments, 1);
	        return this.emitEvent(evt, args);
	    };

	    /**
	     * Sets the current value to check against when executing listeners. If a
	     * listeners return value matches the one set here then it will be removed
	     * after execution. This value defaults to true.
	     *
	     * @param {*} value The new value to check for when executing listeners.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.setOnceReturnValue = function setOnceReturnValue(value) {
	        this._onceReturnValue = value;
	        return this;
	    };

	    /**
	     * Fetches the current value to check against when executing listeners. If
	     * the listeners return value matches this one then it should be removed
	     * automatically. It will return true by default.
	     *
	     * @return {*|Boolean} The current value to check for or the default, true.
	     * @api private
	     */
	    proto._getOnceReturnValue = function _getOnceReturnValue() {
	        if (this.hasOwnProperty('_onceReturnValue')) {
	            return this._onceReturnValue;
	        }
	        else {
	            return true;
	        }
	    };

	    /**
	     * Fetches the events object and creates one if required.
	     *
	     * @return {Object} The events storage object.
	     * @api private
	     */
	    proto._getEvents = function _getEvents() {
	        return this._events || (this._events = {});
	    };

	    /**
	     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
	     *
	     * @return {Function} Non conflicting EventEmitter class.
	     */
	    EventEmitter.noConflict = function noConflict() {
	        exports.EventEmitter = originalGlobalValue;
	        return EventEmitter;
	    };

	    // Expose the class either via AMD, CommonJS or the global object
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return EventEmitter;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	    else if (typeof module === 'object' && module.exports){
	        module.exports = EventEmitter;
	    }
	    else {
	        exports.EventEmitter = EventEmitter;
	    }
	}.call(this));


/***/ },

/***/ 268:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * eventie v1.0.6
	 * event binding helper
	 *   eventie.bind( elem, 'click', myFn )
	 *   eventie.unbind( elem, 'click', myFn )
	 * MIT license
	 */

	/*jshint browser: true, undef: true, unused: true */
	/*global define: false, module: false */

	( function( window ) {

	'use strict';

	var docElem = document.documentElement;

	var bind = function() {};

	function getIEEvent( obj ) {
	  var event = window.event;
	  // add event.target
	  event.target = event.target || event.srcElement || obj;
	  return event;
	}

	if ( docElem.addEventListener ) {
	  bind = function( obj, type, fn ) {
	    obj.addEventListener( type, fn, false );
	  };
	} else if ( docElem.attachEvent ) {
	  bind = function( obj, type, fn ) {
	    obj[ type + fn ] = fn.handleEvent ?
	      function() {
	        var event = getIEEvent( obj );
	        fn.handleEvent.call( fn, event );
	      } :
	      function() {
	        var event = getIEEvent( obj );
	        fn.call( obj, event );
	      };
	    obj.attachEvent( "on" + type, obj[ type + fn ] );
	  };
	}

	var unbind = function() {};

	if ( docElem.removeEventListener ) {
	  unbind = function( obj, type, fn ) {
	    obj.removeEventListener( type, fn, false );
	  };
	} else if ( docElem.detachEvent ) {
	  unbind = function( obj, type, fn ) {
	    obj.detachEvent( "on" + type, obj[ type + fn ] );
	    try {
	      delete obj[ type + fn ];
	    } catch ( err ) {
	      // can't delete window object properties
	      obj[ type + fn ] = undefined;
	    }
	  };
	}

	var eventie = {
	  bind: bind,
	  unbind: unbind
	};

	// ----- module definition ----- //

	if ( true ) {
	  // AMD
	  !(__WEBPACK_AMD_DEFINE_FACTORY__ = (eventie), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if ( typeof exports === 'object' ) {
	  // CommonJS
	  module.exports = eventie;
	} else {
	  // browser global
	  window.eventie = eventie;
	}

	})( window );


/***/ }

})