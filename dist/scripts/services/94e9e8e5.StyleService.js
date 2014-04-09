// Service to store and retrieve application wide data
app.factory('Style', ['Properties', 'Property', function(Properties, Property){
	var Style = {
		style: 'p{color: red !important}',
		getElement: function() {
			return this.element;
		},
		setStyle: function(rule) {
			this.style = rule;
		}
	}

	return Style;
}]);