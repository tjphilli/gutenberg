// Service to store and retrieve application wide data
app.factory('Container', ['Properties', function(Properties){
	var Container = function(options) {
		this.properties = [];
	};
	Container.prototype.style = function() {
        var obj = {};
        for(var i =0; i < this.properties.length; i++) {
            if (this.properties[i]['applies'] == undefined) {
                obj[this.properties[i]['property-name']] = this.properties[i]['propertyValue']()
            }
        }
        return obj
    }
    Container.prototype.getProperties = function() {
        return this.properties;
    }
    Container.prototype.addProperty = function(name){
    	console.log(name);
        this.properties.unshift(Properties.create(name));
    }
    Container.prototype.removeProperty = function(name){
    	var index = 0;
    	for (var i = 0; i < this.properties.length; i++) {
    		if(this.properties[i].key === name) {
    			index = i;
    		}
    	}
        this.properties.splice(index, 1);
    }
    Container.prototype.findProperty = function(name) {
        console.log("find called");
    	for (var i = 0; i < this.properties.length; i++) {
    		if(this.properties[i].key === name) {
                console.log(this.properties[i]);
    			return this.properties[i];
    		}
    	}
    }
	Container.prototype.css = function(html){
		var style = this.style();
        var str = "";
        for(var property in style) {
            str += property + ": "+ style[property] + ";\n"  ;
        }
        if(html) {
            str = str.replace(/\n/g, "<br>")
        }
        return str;
	}
	Container.prototype.currentProperties = function(){
        var obj = {};
        for (var i= 0; i < this.properties.length; i++) {
            obj[this.properties[i]['key']] = this.properties[i]['name'];
        }
        return obj;
    }
	return Container;
}]);