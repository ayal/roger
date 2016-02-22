webpackHotUpdate(0,{

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(212)();
	// imports


	// module
	exports.push([module.id, "#content {\n  column-gap: 5px;\n  -webkit-column-gap: 5px;\n  -moz-column-gap: 5px;\n  width: 100%;\n  text-align: center;\n}\n#content .squares {\n  position: relative;\n  z-index: 1;\n}\n#content canvas {\n  position: absolute;\n  z-index: 0;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n@keyframes loading {\n  100% {\n    transform: rotateY(180deg) rotateZ(30deg) scale(0.7);\n  }\n}\n.header {\n  text-align: left;\n  margin-top: 20px;\n  font-size: 13px;\n  margin-bottom: 10px;\n}\n.header a {\n  text-decoration: none;\n  color: inherit;\n}\n.header span {\n  display: inline-block;\n  margin-left: 10px;\n}\n.header .text {\n  position: absolute;\n  top: 11px;\n  padding-bottom: 10px;\n}\n.header .logo {\n  margin: 4px;\n  width: 16px;\n  height: 16px;\n  border: 4px solid #b300ff;\n  background: white;\n}\n.header .logo.loading,\n.header .logo:hover {\n  animation: loading 1s infinite ease;\n  animation-direction: alternate;\n}\n.square {\n  /*    opacity:0;\n    visibility:hidden; \n    height:0;*/\n  width: 31%;\n  margin: 10px;\n  background: white;\n  overflow: hidden;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);\n}\n@media screen and (max-width: 991px) {\n  .square {\n    width: 46%;\n  }\n}\n@media screen and (max-width: 767px) {\n  .square {\n    width: 99%;\n  }\n}\n@media screen and (max-width: 480px) {\n  .square {\n    width: 99%;\n  }\n}\n.square .tweet {\n  background-image: url(" + __webpack_require__(270) + ");\n  background-size: 10px 10px;\n}\n.square h2 {\n  font-size: 13px;\n  margin: 4px 0;\n  font-weight: 100;\n  color: #555;\n}\n.square img {\n  width: 100%;\n}\n.square a {\n  text-decoration: none;\n  color: #555;\n}\n.square .pipe {\n  text-decoration: underline;\n  display: block;\n  margin: 10px;\n}\n.square .text {\n  padding: 0 10px 10px;\n  font-size: 11px;\n}\n.quote {\n  text-align: center;\n  margin-top: 30px;\n  margin-bottom: 50px;\n}\n.quote .wrap {\n  display: inline-block;\n}\n.quote .wrap .text {\n  background: #50e3c2;\n  color: white;\n  padding: 6px;\n  padding-bottom: 3px;\n  font-size: 25px;\n}\n@media screen and (max-width: 991px) {\n  .quote .wrap .text {\n    font-size: 22px;\n  }\n}\n@media screen and (max-width: 767px) {\n  .quote .wrap .text {\n    font-size: 20px;\n  }\n}\n@media screen and (max-width: 767px) {\n  .quote .wrap .text {\n    font-size: 18px;\n  }\n}\n.quote .wrap .name {\n  margin-top: 6px;\n  color: #50e3c2;\n  text-align: right;\n}\n", ""]);

	// exports


/***/ },

/***/ 270:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABGdBTUEAALGPC/xhBQAAAs5JREFUeAHtmMENAjEQxDhEeXQL/YFEBf5EYr2+9yjKeKw87nrdPp9b31oC97XNK/4jkADLRUiABFhOYHn9XoAEWE5gef1egARYTmB5/V6A5QI8aP9n/wspqr/IvS92jV4AxkmbSgDttKxYAjBO2lQCaKdlxRKAcdKmEkA7LSuWAIyTNpUA2mlZsQRgnLSpBNBOy4olAOOkTSWAdlpWLAEYJ20qAbTTsmIJwDhpUwmgnZYVSwDGSZtKAO20rFgCME7aVAJop2XFEoBx0qYSQDstK5YAjJM2lQDaaVmxBGCctKkE0E7LiiUA46RNJYB2WlYsARgnbSoBtNOyYgnAOGlTCaCdlhVLAMZJm0oA7bSsWAIwTtpUAminZcUSgHHSphJAOy0rlgCMkzaVANppWbEEYJy0qQTQTsuKJQDjpE0lgHZaViwBGCdtKgG007JiCcA4aVMJoJ2WFUsAxkmbSgDttKxYAjBO2lQCaKdlxRKAcdKmEkA7LSuWAIyTNpUA2mlZsQRgnLSpBNBOy4olAOOkTSWAdlpWLAEYJ20qAbTTsmIJwDhpUwmgnZYVSwDGSZtKAO20rFgCME7aVAJop2XFEoBx0qYSQDstK5YAjJM2lQDaaVmxBGCctKkE0E7LiiUA46RNJYB2WlYsARgnbSoBtNOyYgnAOGlTCaCdlhVLAMZJm0oA7bSsWAIwTtpUAminZcUSgHHSphJAOy0rlgCMkzaVANppWbEEYJy0qQTQTsuKJQDjpE0lgHZaViwBGCdtKgG007JiCcA4aVMJoJ2WFUsAxkmbSgDttKxYAjBO2lQCaKdlxRKAcdKmEkA7LSuWAIyTNpUA2mlZsQRgnLSpBNBOy4olAOOkTT1os/dFk+UmEegFmLTWgbsmwAGok45MgElrHbhrAhyAOunIBJi01oG7JsABqJOOTIBJax24awIcgDrpyASYtNaBu34BVI0Gam//u00AAAAASUVORK5CYII="

/***/ }

})