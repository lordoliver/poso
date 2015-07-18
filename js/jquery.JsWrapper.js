
// 
// jQuery.JsWrapper.single
// Copyright (c) 2011
// by Oliver Schiessl - www.alax.de
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and 
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all copies or substantial portions 
// of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
// TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
// CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
// DEALINGS IN THE SOFTWARE.
//
// Usage:
// -------------------------------------- 
//<html>
//  <head>
//    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.pack.js"></script>
//    <script type="text/javascript" src="path to JsWrapper"></script>
//    ... no additional script needed ...
//  </head>
//  <body>
//    ...
//    <div url="http://url to your js file" class="jsWrapper"></div>
//    ...
//    <span url="http://url to your js file" class="jsWrapper"></span>
//    ...
//  </body>
//</html>
// --------------------------------------



(function ( $ ) {
	$.fn.JsWrapper = function(){
	var that = this;
	this.stack = this.toArray();
	var oldWrite = document.write;
	this.wrapRecurse = function(e){
		if (this.readyState && (this.readyState != "complete" && this.readyState != "loaded")) return;
		if (that.stack.length>0) that.wrap();
		else document.write = oldWrite; 
	};
	this.wrap = function(){ // recursion needed because one after the other logic
		var $this = $(this.stack.shift());
		
		document.write = function(t) {
			$this.append(t);
		}

		// observers only don't make problems with native injection
		var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = $this.attr('url');
		
	    if(script.addEventListener) {
	    	script.addEventListener("load",this.wrapRecurse,false);
    	}else if(script.readyState) {
    		script.onreadystatechange = this.wrapRecurse;
    	}
		$this.get(0).appendChild(script);
		
	}
	if (this.stack.length>0) that.wrap();
}
$(function(){ $('.jsWrapper').JsWrapper(); });
	
} )( jQuery );
