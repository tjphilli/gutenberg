// Service to store and retrieve application wide data
app.factory('ElementFactory', ['Container', function(Container){
	var Element = function(type, name) {
        this.name = name || "";
        this.type = type;
        this.selector = function(){
            return this.type + (this.name.length > 0 ? "." + this.name : ""); 
        }
        this.content = "";
        this.container = new Container();
    }
    this.templates = {
        p: new Element()
    }
    this.create = function(element_type, content, name) {
        var temp = new Element(element_type, name)
        temp.content = content;
        return temp;
    }
	return this;
}]);