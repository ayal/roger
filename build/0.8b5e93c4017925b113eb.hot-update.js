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
					percentPosition: true
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
									var toset = {};
									console.log('list', list);

									_.each(list, function (u) {
													$.getJSON('https://ajax.googleapis.com/ajax/services/feed/load?num=100&v=1.0&q=' + encodeURIComponent(u) + '&callback=?', function (x) {
																	var toset = {};

																	_.each(_.filter(x.responseData.feed.entries, function (x) {
																					var days = (new Date() - new Date(x.publishedDate)) / 1000 / 60 / 60 / 24;
																					if (days <= 1000) {
																									return true;
																					}
																	}), function (e, i) {
																					if (e) {
																									toset[u + '_' + e] = _react2.default.createElement(Square, { href: e.link, name: e.title, text: e.title, more: e,
																													getimgsrc: function getimgsrc(x) {
																																	return $($('<div>' + x.content + '</div>').find('img')).attr('src') || console.warn('no image', x);
																													}, key: u });
																									that.setState(toset);
																					}
																	});
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
																	{ className: 'my-gallery-class', elementType: 'div', options: masonryOptions, disableImagesLoaded: false },
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
													//   return null;
									}

									return _react2.default.createElement(
													'div',
													{ className: 'square' },
													_react2.default.createElement(
																	'a',
																	{ href: this.props.href, target: '_blank' },
																	_react2.default.createElement('img', { src: src }),
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
					_react2.default.createElement(_reactRouter.Route, { path: '/peachy/', component: App })
	), document.getElementById('content'));

/***/ }
])