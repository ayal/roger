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

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/* jsx */
	__webpack_require__(210);

	__webpack_require__(214);

	var Trianglify = __webpack_require__(216);

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

	var list = ['https://artsponge.wordpress.com/rss', 'http://picdit.net/rss', 'http://thisisnthappiness.com/rss', 'butdoesitfloat.com/rss', 'http://www.haw-lin.com/rss', 'http://beautifuldecay.com/', 'http://feeds2.feedburner.com/Swissmiss', 'http://feeds.feedburner.com/ucllc/fpo', 'http://www.inventorymagazine.com/updates/atom.xml', 'http://www.valetmag.com/distribution/rss_all.xml', 'http://feeds.feedburner.com/selectism/rss', 'https://www.flickr.com/services/feeds/groups_pool.gne?id=1231870@N21&lang=en-us&format=atom', 'http://mosslessmagazine.com/rss', 'http://www.manystuff.org/?feed=rss2'];
	var kaka = ['https://www.pinterest.com/yaelrasner/feed.rss', 'http://httpjasmin.tumblr.com/', 'http://artruby.com/rss', 'http://badbananas.tumblr.com/rss', 'http://blackcontemporaryart.tumblr.com/rss', 'http://boburu.tumblr.com/rss', 'http://booooooom.tumblr.com/rss', 'http://bradypus.tumblr.com/rss', 'http://bremser.tumblr.com/rss', 'http://bryanschutmaat.tumblr.com/rss', 'http://contemporary-art-blog.com/rss', 'http://cosascool.tumblr.com/rss', 'http://covetarts.tumblr.com/rss', 'http://darksilenceinsuburbia.tumblr.com/rss', 'http://drawingdiary.tumblr.com/rss', 'http://ecrcover.tumblr.com/rss', 'http://eiginleiki.net/rss', 'http://exhibition-ism.com/rss', 'http://featureshoot.tumblr.com/rss', 'http://fecalface.tumblr.com/rss', 'http://floatingcosmos.tumblr.com/rss', 'http://folknouveau.tumblr.com/rss', 'http://foundinspirationmovingforward.tumblr.com/rss', 'http://free-parking.tumblr.com/rss', 'http://frntrs.tumblr.com/rss', 'http://fullserving.tumblr.com/rss', 'http://gh0stgums.com/rss', 'http://gills.tumblr.com/rss', 'http://gradientchild.tumblr.com/rss', 'http://grossgaians.tumblr.com/rss', 'http://haw-lin.com/rss', 'http://heathwest.tumblr.com/rss', 'http://heliocentrism.tumblr.com/rss', 'http://hifructosemag.tumblr.com/rss', 'http://highonyourmemories.tumblr.com/rss', 'http://holyurl.tumblr.com/rss', 'http://human-empathy.tumblr.com/rss', 'http://hydeordie.com/rss', 'http://hyperallergic.tumblr.com/rss', 'http://iamjapanese.tumblr.com/rss', 'http://iceblack.tumblr.com/rss', 'http://if-you-leave.tumblr.com/rss', 'http://iheartmyart.com/rss', 'http://i-love-art.tumblr.com/rss', 'http://inspiredbyme.tumblr.com/rss', 'http://inthenewfrontier.tumblr.com/rss', 'http://ipocrisia.tumblr.com/rss', 'http://jennilee.tumblr.com/rss', 'http://jennyannmorgan.tumblr.com/rss', 'http://jesuisperdu.tumblr.com/rss', 'http://jillsies.tumblr.com/rss', 'http://julianminima.tumblr.com/rss', 'http://juxtapozmag.tumblr.com/rss', 'http://killthecollector.tumblr.com/rss', 'http://kinetics.tumblr.com/rss', 'http://knowinng.tumblr.com/rss', 'http://krypten.tumblr.com/rss', 'http://kvntrn.tumblr.com/rss', 'http://la-beaute–de-pandore.tumblr.com/rss', 'http://lacma.tumblr.com/rss', 'http://laravissante.tumblr.com/rss', 'http://lepoeteborgne.tumblr.com/rss', 'http://leslieseuffert.tumblr.com/rss', 'http://letselopetoday.tumblr.com/rss', 'http://like-ivy.tumblr.com/rss', 'http://likeafieldmouse.com/rss', 'http://limboyouth.com/rss', 'http://m75.tumblr.com/rss', 'http://malaising.tumblr.com/rss', 'http://mangopopsicle.org/rss', 'http://mdme-x.tumblr.com/rss', 'http://mmday.tumblr.com/rss', 'http://mpdrolet.tumblr.com/rss', 'http://murmansea.tumblr.com/rss', 'http://museumoflatinamericanart.tumblr.com/rss', 'http://museumuesum.tumblr.com/rss', 'http://myampgoesto11.tumblr.com/rss', 'http://mydarkenedeyes.tumblr.com/rss', 'http://mydeadpony.tumblr.com/rss', 'http://nattonelli.tumblr.com/rss', 'http://nearlya.tumblr.com/rss', 'http://netanoesporno.tumblr.com/rss', 'http://neural-network.tumblr.com/rss', 'http://newodor.tumblr.com/rss', 'http://nopefun.com/rss', 'http://nothingwritten.com/rss', 'http://nyctaeus.tumblr.com/rss', 'http://objectstatus.tumblr.com/rss', 'http://oftheafternoon.com/rss', 'http://oldhorse.tumblr.com/rss', 'http://oneforeverywish.tumblr.com/rss', 'http://onepainting.tumblr.com/rss', 'http://oxane.tumblr.com/rss', 'http://paper-journal.tumblr.com/rss', 'http://partyswetzs.tumblr.com/rss', 'http://photographersdirectory.tumblr.com/rss', 'http://photographsonthebrain.com/rss', 'http://planetaryfolklore.tumblr.com/rss', 'http://pleasexcusethemess.tumblr.com/rss', 'http://plotsummary.tumblr.com/rss', 'http://postpatternism.tumblr.com/rss', 'http://pulmonaire.tumblr.com/rss', 'http://raakha.tumblr.com/rss', 'http://razorshapes.tumblr.com/rss', 'http://readingforms.com/rss', 'http://robotscrytoo.com/rss', 'http://rocketscience.tumblr.com/rss', 'http://ronulicny.tumblr.com/rss', 'http://roomdark.tumblr.com/rss', 'http://rustybreak.tumblr.com/rss', 'http://ryandonato.com/rss', 'http://sculptores.tumblr.com/rss', 'http://sculpture-center.tumblr.com/rss', 'http://selektormagazine.tumblr.com/rss', 'http://self-romance.tumblr.com/rss', 'http://semihlakerta.tumblr.com/rss', 'http://sensitive.tumblr.com/rss', 'http://septagonstudios.tumblr.com/rss', 'http://sewerscape.tumblr.com/rss', 'http://sfmoma.tumblr.com/rss', 'http://shanellpapp.tumblr.com/rss', 'http://shootinggallery.tumblr.com/rss', 'http://showslow.tumblr.com/rss', 'http://smalljoke.tumblr.com/rss', 'http://snowce.tumblr.com/rss', 'http://somedisordered.tumblr.com/rss', 'http://somethingsforyoutolookat.tumblr.com/rss', 'http://somewhatreal.tumblr.com/rss', 'http://sonicteeth.tumblr.com/rss', 'http://spatula.tumblr.com/rss', 'http://spraybeast.tumblr.com/rss', 'http://staged-photography.tumblr.com/rss', 'http://starbucks-fauxhemian.tumblr.com/rss', 'http://stream.fm-a.dk/rss', 'http://supermaxpro.tumblr.com/rss', 'http://supersonicelectronic.com/rss', 'http://technolowgy.tumblr.com/rss', 'http://the-coven.tumblr.com/rss', 'http://the-drawing-center.tumblr.com/rss', 'http://the-social-collective.tumblr.com/rss', 'http://thecreatorsproject.tumblr.com/rss', 'http://theformdeform.tumblr.com/rss', 'http://thegetty.tumblr.com/rss', 'http://theglaze.tumblr.com/rss', 'http://theheavycollective.com/rss', 'http://theholydeer.tumblr.com/rss', 'http://thejogging.tumblr.com/rss', 'http://theonlymagicleftisart.com/rss', 'http://thephotographicimage.tumblr.com/rss', 'http://thepoeticphotographycollection.tumblr.com/rss', 'http://thequandary.tumblr.com/rss', 'http://thesearenicephotos.tumblr.com/rss', 'http://thisisacult.org/rss', 'http://thisisnthappiness.com/rss', 'http://timelightbox.tumblr.com/rss', 'http://toutpetitlaplanete.tumblr.com/rss', 'http://turbofolk.tumblr.com/rss', 'http://uhohgallery.tumblr.com/rss', 'http://unknowneditors.tumblr.com/rss', 'http://unseentactics.tumblr.com/rss', 'http://untrustyou.tumblr.com/rss', 'http://upandcomingart.tumblr.com/rss', 'http://victimize.tumblr.com/rss', 'http://vinkelret.tumblr.com/rss', 'http://visual-poetry.tumblr.com/rss', 'http://visualhunt.tumblr.com/rss', 'http://voodoovoodoo.tumblr.com/rss', 'http://wandering-bears.tumblr.com/rss', 'http://welgevormd.com/rss', 'http://whitneymuseum.tumblr.com/rss', 'http://wowgreat.tumblr.com/rss', 'http://wvdv.tumblr.com/rss', 'http://wwwalk.tumblr.com/rss', 'http://zzzzoom.tumblr.com/rss', 'http://artruby.com/rss', 'http://badbananas.tumblr.com/rss', 'http://blackcontemporaryart.tumblr.com/rss', 'http://boburu.tumblr.com/rss', 'http://booooooom.tumblr.com/rss', 'http://bradypus.tumblr.com/rss', 'http://bremser.tumblr.com/rss', 'http://bryanschutmaat.tumblr.com/rss', 'http://contemporary-art-blog.com/rss', 'http://cosascool.tumblr.com/rss', 'http://covetarts.tumblr.com/rss', 'http://darksilenceinsuburbia.tumblr.com/rss', 'http://drawingdiary.tumblr.com/rss', 'http://ecrcover.tumblr.com/rss', 'http://eiginleiki.net/rss', 'http://exhibition-ism.com/rss', 'http://featureshoot.tumblr.com/rss', 'http://fecalface.tumblr.com/rss', 'http://floatingcosmos.tumblr.com/rss', 'http://folknouveau.tumblr.com/rss', 'http://foundinspirationmovingforward.tumblr.com/rss', 'http://free-parking.tumblr.com/rss', 'http://frntrs.tumblr.com/rss', 'http://fullserving.tumblr.com/rss', 'http://gh0stgums.com/rss', 'http://gills.tumblr.com/rss', 'http://gradientchild.tumblr.com/rss', 'http://grossgaians.tumblr.com/rss', 'http://haw-lin.com/rss', 'http://heathwest.tumblr.com/rss', 'http://heliocentrism.tumblr.com/rss', 'http://hifructosemag.tumblr.com/rss', 'http://highonyourmemories.tumblr.com/rss', 'http://holyurl.tumblr.com/rss', 'http://human-empathy.tumblr.com/rss', 'http://hydeordie.com/rss', 'http://hyperallergic.tumblr.com/rss', 'http://iamjapanese.tumblr.com/rss', 'http://iceblack.tumblr.com/rss', 'http://if-you-leave.tumblr.com/rss', 'http://iheartmyart.com/rss', 'http://i-love-art.tumblr.com/rss', 'http://inspiredbyme.tumblr.com/rss', 'http://inthenewfrontier.tumblr.com/rss', 'http://ipocrisia.tumblr.com/rss', 'http://jennilee.tumblr.com/rss', 'http://jennyannmorgan.tumblr.com/rss', 'http://jesuisperdu.tumblr.com/rss', 'http://jillsies.tumblr.com/rss', 'http://julianminima.tumblr.com/rss', 'http://juxtapozmag.tumblr.com/rss', 'http://killthecollector.tumblr.com/rss', 'http://kinetics.tumblr.com/rss', 'http://knowinng.tumblr.com/rss', 'http://krypten.tumblr.com/rss', 'http://kvntrn.tumblr.com/rss', 'http://la-beaute–de-pandore.tumblr.com/rss', 'http://lacma.tumblr.com/rss', 'http://laravissante.tumblr.com/rss', 'http://lepoeteborgne.tumblr.com/rss', 'http://leslieseuffert.tumblr.com/rss', 'http://letselopetoday.tumblr.com/rss', 'http://like-ivy.tumblr.com/rss', 'http://likeafieldmouse.com/rss', 'http://limboyouth.com/rss', 'http://m75.tumblr.com/rss', 'http://malaising.tumblr.com/rss', 'http://mangopopsicle.org/rss', 'http://mdme-x.tumblr.com/rss', 'http://mmday.tumblr.com/rss', 'http://mpdrolet.tumblr.com/rss', 'http://murmansea.tumblr.com/rss', 'http://museumoflatinamericanart.tumblr.com/rss', 'http://museumuesum.tumblr.com/rss', 'http://myampgoesto11.tumblr.com/rss', 'http://mydarkenedeyes.tumblr.com/rss', 'http://mydeadpony.tumblr.com/rss', 'http://nattonelli.tumblr.com/rss', 'http://nearlya.tumblr.com/rss', 'http://netanoesporno.tumblr.com/rss', 'http://neural-network.tumblr.com/rss', 'http://newodor.tumblr.com/rss', 'http://nopefun.com/rss', 'http://nothingwritten.com/rss', 'http://nyctaeus.tumblr.com/rss', 'http://objectstatus.tumblr.com/rss', 'http://oftheafternoon.com/rss', 'http://oldhorse.tumblr.com/rss', 'http://oneforeverywish.tumblr.com/rss', 'http://onepainting.tumblr.com/rss', 'http://oxane.tumblr.com/rss', 'http://paper-journal.tumblr.com/rss', 'http://partyswetzs.tumblr.com/rss', 'http://photographersdirectory.tumblr.com/rss', 'http://photographsonthebrain.com/rss', 'http://planetaryfolklore.tumblr.com/rss', 'http://pleasexcusethemess.tumblr.com/rss', 'http://plotsummary.tumblr.com/rss', 'http://postpatternism.tumblr.com/rss', 'http://pulmonaire.tumblr.com/rss', 'http://raakha.tumblr.com/rss', 'http://razorshapes.tumblr.com/rss', 'http://readingforms.com/rss', 'http://robotscrytoo.com/rss', 'http://rocketscience.tumblr.com/rss', 'http://ronulicny.tumblr.com/rss', 'http://roomdark.tumblr.com/rss', 'http://rustybreak.tumblr.com/rss', 'http://ryandonato.com/rss', 'http://sculptores.tumblr.com/rss', 'http://sculpture-center.tumblr.com/rss', 'http://selektormagazine.tumblr.com/rss', 'http://self-romance.tumblr.com/rss', 'http://semihlakerta.tumblr.com/rss', 'http://sensitive.tumblr.com/rss', 'http://septagonstudios.tumblr.com/rss', 'http://sewerscape.tumblr.com/rss', 'http://sfmoma.tumblr.com/rss', 'http://shanellpapp.tumblr.com/rss', 'http://shootinggallery.tumblr.com/rss', 'http://showslow.tumblr.com/rss', 'http://smalljoke.tumblr.com/rss', 'http://snowce.tumblr.com/rss', 'http://somedisordered.tumblr.com/rss', 'http://somethingsforyoutolookat.tumblr.com/rss', 'http://somewhatreal.tumblr.com/rss', 'http://sonicteeth.tumblr.com/rss', 'http://spatula.tumblr.com/rss', 'http://spraybeast.tumblr.com/rss', 'http://staged-photography.tumblr.com/rss', 'http://stream.fm-a.dk/rss', 'http://supermaxpro.tumblr.com/rss', 'http://supersonicelectronic.com/rss', 'http://technolowgy.tumblr.com/rss', 'http://the-coven.tumblr.com/rss', 'http://the-drawing-center.tumblr.com/rss', 'http://the-social-collective.tumblr.com/rss', 'http://thecreatorsproject.tumblr.com/rss', 'http://theformdeform.tumblr.com/rss', 'http://thegetty.tumblr.com/rss', 'http://theglaze.tumblr.com/rss', 'http://theheavycollective.com/rss', 'http://theholydeer.tumblr.com/rss', 'http://thejogging.tumblr.com/rss', 'http://theonlymagicleftisart.com/rss', 'http://thephotographicimage.tumblr.com/rss', 'http://thepoeticphotographycollection.tumblr.com/rss', 'http://thequandary.tumblr.com/rss', 'http://thesearenicephotos.tumblr.com/rss', 'http://thisisacult.org/rss', 'http://thisisnthappiness.com/rss', 'http://timelightbox.tumblr.com/rss', 'http://toutpetitlaplanete.tumblr.com/rss', 'http://turbofolk.tumblr.com/rss', 'http://uhohgallery.tumblr.com/rss', 'http://unknowneditors.tumblr.com/rss', 'http://unseentactics.tumblr.com/rss', 'http://untrustyou.tumblr.com/rss', 'http://upandcomingart.tumblr.com/rss', 'http://victimize.tumblr.com/rss', 'http://vinkelret.tumblr.com/rss', 'http://visual-poetry.tumblr.com/rss', 'http://visualhunt.tumblr.com/rss', 'http://voodoovoodoo.tumblr.com/rss', 'http://wandering-bears.tumblr.com/rss', 'http://welgevormd.com/rss', 'http://whitneymuseum.tumblr.com/rss', 'http://wowgreat.tumblr.com/rss', 'http://wvdv.tumblr.com/rss', 'http://wwwalk.tumblr.com/rss', 'http://zzzzoom.tumblr.com/rss', 'http://www.huhmagazine.co.uk/blog/rss/feed.php', 'http://superpaperqueen.tumblr.com/rss', 'http://freedompoopshine.tumblr.com/rss', 'http://elizamayn.tumblr.com/rss', 'http://noworkonsunday.com/rss', 'http://andersholmbergarkitekter.tumblr.com/rss', 'http://tropical-moonlight.tumblr.com/rss', 'http://razorshapes.tumblr.com/rss', 'http://antronaut.net/rss', 'http://tonecon.es/rss', 'http://human-empathy.tumblr.com/rss', 'http://thekiko.tumblr.com/rss', 'http://thenletitbe.tumblr.com/rss', 'http://www.somewhereiwouldliketolive.com/feeds/posts/default', 'http://www.missmoss.co.za/feed/'];

	var listpick = function listpick() {
	    var x = new Date();
	    var arr = [];
	    for (var i = 0; i < 8; i++) {
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

	        var chosen = ['http://pitchfork.com/rss/reviews/best/tracks/', picked[0], 'http://www.huhmagazine.co.uk/blog/rss/feed.php', 'http://feeds2.feedburner.com/itsnicethat/SlXC'].concat(_toConsumableArray(picked.slice(1)));

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
	                    if (days < 30) {
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
	            squares
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
	            that.setState({ opacity: 1, src: 'triangles.png' });
	        }).attr({ src: 'triangles.png' });

	        if (this.props.src) {
	            $('<img />').css({ position: 'absolute', left: '-10000px' }).load(function () {
	                var img = this;
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

/***/ }
])