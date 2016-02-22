webpackHotUpdate(0,[
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(159);

	var _reactRouter = __webpack_require__(160);

	var _createBrowserHistory = __webpack_require__(209);

	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* jsx */
	__webpack_require__(210);

	__webpack_require__(214);

	var Trianglify = __webpack_require__(216);

	var Masonry = __webpack_require__(255)(_react2.default);

	var masonryOptions = {
					itemSelector: '.square',
					columnWidth: '.square',
					percentPosition: true,
					transitionDuration: '1.2s'
	};

	var list = ["http://nofilmschool.com/rss.xml", "https://www.cinema5d.com/feed/", "http://petapixel.com/topic/inspiration/feed/", "http://philipbloom.net/blog/feed/", "http://filmmakeriq.com/feed/", "http://www.comingsoon.net/feed"];

	var App = _react2.default.createClass({
					displayName: 'App',

					mixins: [_reactRouter.Lifecycle, _reactRouter.History],
					getInitialState: function getInitialState() {
									return {};
					},
					componentWillMount: function componentWillMount() {
									var that = this;

									_.each(list, function (u) {
													$.getJSON('https://ajax.googleapis.com/ajax/services/feed/load?num=100&v=1.0&q=' + encodeURIComponent(u) + '&callback=?', function (x) {
																	var toset = {};
																	var items = _.filter(x.responseData.feed.entries, function (x) {
																					var days = (new Date() - new Date(x.publishedDate)) / 1000 / 60 / 60 / 24;
																					if (days <= 5) {
																									return true;
																					}
																	});

																	var clist = that.state.list || [];
																	_.each(items, function (e, i) {
																					var src = $($('<div>' + e.content + '</div>').find('img')).attr('src');
																					if (e && src) {
																									clist.push({ date: e.publishedDate, square: _react2.default.createElement(Square, { src: src, href: e.link, name: e.title, text: e.title, more: e, key: u + '_' + i }) });
																					}
																	});
																	clist = clist.sort(function (a, b) {
																					return new Date(b.date) - new Date(a.date);
																	});
																	that.setState({ list: clist });
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

									return _react2.default.createElement(
													'div',
													null,
													_react2.default.createElement(
																	'div',
																	{ className: 'header' },
																	_react2.default.createElement(
																					'span',
																					null,
																					_react2.default.createElement('div', { className: 'logo' })
																	),
																	_react2.default.createElement(
																					'span',
																					null,
																					_react2.default.createElement(
																									'a',
																									{ href: '/linktostore', className: 'text' },
																									'The Internet for Filmmakers'
																					)
																	)
													),
													_react2.default.createElement(
																	'div',
																	{ className: 'squares' },
																	_react2.default.createElement(
																					Masonry,
																					{ className: 'my-gallery-class', elementType: 'div', options: masonryOptions, disableImagesLoaded: false, loading: function loading() {
																													$('.logo').addClass('loading');window.clearTimeout(window.loadinglogo);window.loadinglogo = setTimeout(function () {
																																	$('.logo').removeClass('loading');
																													}, 3000);
																									} },
																					_.map(this.state.list, function (x) {
																									return x.square;
																					})
																	)
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
					clicklink: function clicklink(u) {
									return function () {
													ga('send', 'event', 'click-square', u, u);
									};
					},
					render: function render() {
									return _react2.default.createElement(
													'div',
													{ className: 'square' },
													_react2.default.createElement(
																	'a',
																	{ className: 'square-link', href: this.props.href, target: '_blank', onClick: this.clicklink(this.props.href) },
																	_react2.default.createElement('img', { src: this.props.src }),
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

	(0, _reactDom.render)(_react2.default.createElement(
					_reactRouter.Router,
					{ history: (0, _createBrowserHistory2.default)() },
					_react2.default.createElement(_reactRouter.Route, { path: '/', component: App }),
					_react2.default.createElement(_reactRouter.Route, { path: '/index.html', component: App }),
					_react2.default.createElement(_reactRouter.Route, { path: '/roger/', component: App })
	), document.getElementById('content'));

/***/ }
])