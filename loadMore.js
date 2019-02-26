function LoadMore(){
	this.id = arguments[0].id?arguments[0].id:'';
	this.callback = arguments[0].callback?arguments[0].callback:function(){};
	this.endpoint = arguments[0].endpoint?arguments[0].endpoint:'';
	this.label = arguments[0].label?arguments[0].label:'Load more';
	this.pageSize = arguments[0].pageSize?arguments[0].pageSize:10;
	this.data = arguments[0].data?arguments[0].data:{};
	this.cssClass = arguments[0].cssClass?arguments[0].cssClass:'';
	addLoadMoreLink(this.id, this.next.bind(this), this.cssClass, this.label);
	this.next();

	function addLoadMoreLink(id,next,cssClass,label)
	{
		var listElement = document.querySelector('#'+id);

		if (listElement){
			//var link = '<a class="loadmore-link" data-target="'+id+'" href="javascript:">Load more</a>';
			var link = document.createElement('a');
			link.setAttribute('class','loadmore-link ' + cssClass);
			link.setAttribute('data-target',id);
			link.setAttribute('href','javascript:');
			var text = document.createTextNode(label);
			link.appendChild(text);
			link.onclick = function(){
				next();
			};

			listElement.appendChild(link);	
		}
	};
}

LoadMore.prototype.page = -1;

LoadMore.prototype.id = 0;

LoadMore.prototype.callback = null;

LoadMore.prototype.next = function(){
	this.sendData(this.endpoint, this.data);
};

LoadMore.prototype.sendData = function(url, data) {
	this.page++;
	this.data.page = this.page;
	var XHR = new XMLHttpRequest();
	var urlEncodedData = "";
	var urlEncodedDataPairs = [];
	var name;

	// Turn the data object into an array of URL-encoded key/value pairs.
	for(name in data) {
		urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
	}

	// Combine the pairs into a single string and replace all %-encoded spaces to 
	// the '+' character; matches the behaviour of browser form submissions.
	urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

	// Define what happens on successful data submission
	XHR.addEventListener('load', function(event) {
		var response = JSON.parse(XHR.responseText);

		if (response.data.length < this.pageSize){
			document.querySelector('a.loadmore-link[data-target='+this.id+']').remove();	
		}

		this.callback(response, this);
	}.bind(this));

	// Define what happens in case of error
	XHR.addEventListener('error', function(event) {
		console.error('Oops! Something goes wrong.');
	});

	// Set up our request
	XHR.open('POST', url);

	// Add the required HTTP header for form data POST requests
	XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	// Finally, send our data.
	XHR.send(urlEncodedData);
}
