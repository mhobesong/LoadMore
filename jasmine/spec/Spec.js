var fadeViewer = null;
describe("Load More", function() {
	beforeEach(function() {
	});

	afterEach(function() {
		document.querySelector('a.loadmore-link')?
			document.querySelector('a.loadmore-link').remove():'';
	});

	it("should load function", function(done) {
		expect(typeof LoadMore == 'function').toEqual(true);
		done();
	});

	it("should pull first page", function(done) {
		var lm = new LoadMore({
			id:'test',
			endpoint: 'apiFirstCallMock.txt',
			data:{},
			callback:function(response){
				expect(response.data).toEqual([1,2,3,4,5,6,7,8,9,10]);
				expect(response.page).toEqual(1);
				done();
			}
		});
	});

	it("should add load more link at end of list element", function(done) {
		var lm = new LoadMore({
			id:'list',
			endpoint: 'apiFirstCallMock.txt',
			data:{},
			callback:function(response){	
				expect(document.querySelectorAll('a.loadmore-link').length > 0).toEqual(true);
				done();
			}
		});
	});

	it("should remove Load more link when returned data array less than pageSize", function(done) {
		var lm = new LoadMore({
			id:'list',
			endpoint: 'apiFirstCallMock2.txt',
			data:{},
			pageSize:10,
			callback:function(response){	
				expect(document.querySelectorAll('a.loadmore-link').length == 0).toEqual(true);
				done();
			}
		});
	});

	it("should add more on clicking Load more", function(done) {
		var count = 0;
		window.calls = 0;
		var lm = new LoadMore({
			id:'list',
			endpoint: 'apiFirstCallMock.txt',
			data:{},
			callback:function(response){	
				window.calls++;
			}
		});

		document.querySelector('.loadmore-link[data-target=list]').click();

		setTimeout(function(){
			expect(2).toEqual(window.calls);
			done();
		}, 300);
	});

	it("should add class to the readmore button", function(done) {
		var count = 0;
		window.calls = 0;
		var lm = new LoadMore({
			id:'list',
			endpoint: 'apiFirstCallMock.txt',
			data:{},
			cssClass: 'test-class',
			callback:function(response){	
				expect(document.querySelector('.loadmore-link.test-class[data-target=list]')).not.toEqual(null);
				done();
			}
		});
	});

	it("should pass LoadMore object to callback", function(done) {
		var count = 0;
		window.calls = 0;
		var lm = new LoadMore({
			id:'list',
			endpoint: 'apiFirstCallMock.txt',
			data:{},
			cssClass: 'test-class',
			callback:function(response,lm){	
				expect(lm.id).toEqual('list');
				expect(lm.endpoint).toEqual('apiFirstCallMock.txt');
				done();
			}
		});
	});
});

	it("should set link label", function(done) {
		var lm = new LoadMore({
			id:'list',
			endpoint: 'apiFirstCallMock.txt',
			data:{},
			label:'Get more',
			pageSize:10,
			callback:function(response){	
				expect(document.querySelector('a.loadmore-link').innerHTML).toEqual('Get more');
				done();
			}
		});
	});

