// Service to store and retrieve application wide data
app.factory('Selection', ['Dom', function(Dom){
	var Selection = {
		element: 'none',
		reference: Dom.elements[Dom.find(this.element)],
		getReference: function() {
			// console.log("CALLED YO");
			this.reference = Dom.elements[Dom.find(this.element)];
			return this.reference;
		},
		getElement: function() {
			return this.element;
		},
		setElement: function(name) {
			this.element = name;
		},
		isSelected: function(selector) {
			return this.element === selector;	
		}
	}

	return Selection;
}]);