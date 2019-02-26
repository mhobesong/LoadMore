# LoadMore
Simple JS script for adding 'Load more' functionality. Generates a load more button that pulled content from network on click.

### Installation:
Load the js file.
```html
<script src="loadMore.js" crossorigin="anonymous"></script>
```
### Usage example:
```javascript
var lm = new LoadMore({
  id:'list',
  endpoint: 'https://myendpont.myhost.com',
  data:{param:'something', param2:'another thing'},
  cssClass: 'test-class',
  callback:function(response){
    //What you want to do with the response.
    let ul = document.getElementByTagName('ul');
    let li = document.createElement(li);
    li.appendChild(document.createTextNode(response.item));
    ul.appendChild(li);
  }
});
```
### Parameters:
#### id
Element in which you want the 'Load More' link to be generated.
#### label
Generated link's label
#### data
Data to POST to the endpoint.
#### endpoint
URL to which the data will be sent and from which response is pulled.
#### cssClass
CSS class(es) to add to the generated link
#### callback
Function to process the returned data

