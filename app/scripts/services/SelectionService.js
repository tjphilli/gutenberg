// Service to store and retrieve application wide data
app.factory('Selection', ['Properties', 'Property', function(Properties, Property){
	var Selection = {
		element: 'none',
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