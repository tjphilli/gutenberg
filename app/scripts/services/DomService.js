// Service to store and retrieve application wide data
app.factory('Dom', ['Container', function(Container){
	var Dom = {
		wrapper: new Container(['size', 'leading', 'typeface']),
        elements: [],
        find: function(selector){
            for(var i=0; i < this.elements.length; i++) {
                if(this.elements[i].selector() == selector) {
                    return i;
                }
            }
        },
        moveDown: function(selector) {
            var index = this.find(selector);
            if(index != this.elements.length -1) {
                var temp = this.elements[index];
                this.elements[index] = this.elements[index+1];
                this.elements[index+1] =  temp;
            }
        },
        moveUp: function(selector) {
            var index = this.find(selector);
            if(index != 0) {
                var temp = this.elements[index];
                this.elements[index] = this.elements[index-1];
                this.elements[index-1] =  temp;
            }
        },
        deleteElement: function(selector) {
            var index = this.find(selector);
            this.elements.splice(index, 1);
        }
	}

	return Dom;
}]);