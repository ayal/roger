webpackHotUpdate(0,{

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
		getInitialState: function() {
		    return {loaded:{}};
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
		bounceupdate: _.debounce(function(x){
		    x.forceUpdate();
		}).bind(this),
	        imagesLoaded: function(cb) {
	            if (this.props.disableImagesLoaded) return;
		    
		    var that = this;
		    console.log('loading images', this.props.children);
		    _.each(this.props.children, function(x){
			$('img').load(function(){
			    console.log('loaded', x.props.src);
			    that.state.loaded[x.props.src] = 1;
			    that.bounceupdate(that);
			}).attr('src', x.props.src)
		    });

		    
	/*            imagesloaded(
	                'bigwrap',
	                function(instance) {
			    this.showSquares(instance);
			    cb && cb();
	                }.bind(this)
	            );*/
	        },
		showSquares: function(inst) {
		    var loaded = this.state.loaded;
		    inst.images.forEach(function(i){

			loaded[i.img.src] = 1;
			//$(i.img).parents('.square').css({visibility:'visible', height:'auto'}).animate({opacity:1},1000);
		    });
	//	    console.log('showing', inst, loaded);
	//	    console.log(loaded);
	//	    this.setState({loaded:loaded});
	/*	    setTimeout(function(){
			this.masonry.layout();
		    },100);*/
		},
	        componentDidMount: function() {
	            this.initializeMasonry();
	            this.imagesLoaded();
	        },

	        componentDidUpdate: function() {
	            this.performLayout();
		    var that = this;
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
		    var that = this;
		    
		    var oksquares = _.filter(this.props.children, function(x){
			if(that.state.loaded[x.props.src]) {
			    return x;
			}
		    });


		    
	            return React.createElement(this.props.elementType, {
	                className: this.props.className,
	                ref: refName
	            }, oksquares);
	        }
	    })
	}

	module.exports = MasonryComponent;



/***/ }

})