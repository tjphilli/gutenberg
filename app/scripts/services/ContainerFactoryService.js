// Service to store and retrieve application wide data
app.factory('Container', ['Properties', 'Property', function(Properties, Property){
	var Container = function(properties) {
		this.properties = [];
        if(properties != undefined) {
            for(var i = 0; i < properties.length; i++) {
                this.addProperty(properties[i]);
            }
        }
	};
	Container.prototype.style = function() {
        var obj = {};
        for(var i =0; i < this.properties.length; i++) {
            if (this.properties[i]['applies'] == undefined || this.properties[i]['applies'] == 'element') {
                obj[this.properties[i]['property-name']] = this.properties[i]['propertyValue']()
            }
        }
        return obj
    }
    Container.prototype.backgroundStyle = function() {
            var obj = {};
            for(var i =0; i < this.properties.length; i++) {
                if (this.properties[i]['applies'] == 'background') {
                    obj[this.properties[i]['property-name']] = this.properties[i]['propertyValue']()
                }
            }
            return obj;
        },
    Container.prototype.isNotEmpty = function() {
        return this.properties.length > 0;
    }
    Container.prototype.getProperties = function() {
        return this.properties;
    }
    Container.prototype.addProperty = function(name){
        console.log("Added " + name);
        this.properties.unshift(Properties.create(name));
    }
    Container.prototype.addLinkedProperty = function(name){
        var temp =  Properties.create(name);
        var property = this.findProperty(name);
        this.properties.unshift(new Property(temp[temp.linked]));
        this.properties.unshift(temp);
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
    Container.prototype.removeLinkedProperty = function(name){
        var index = 0;
        for (var i = 0; i < this.properties.length; i++) {
            if(this.properties[i].key === name) {
                index = i;
            }
        }
        if(this.propertyExists(this.properties[index].linked)) {
            this.properties.splice(index, 2);
        }
        else {
            this.properties.splice(index, 1);
        }
    }
    Container.prototype.findProperty = function(name) {
    	for (var i = 0; i < this.properties.length; i++) {
    		if(this.properties[i].key === name) {
    			return this.properties[i];
    		}
    	}
    }
    Container.prototype.getPropertyIndex = function(name) {
        for (var i = 0; i < this.properties.length; i++) {
            if(this.properties[i].key === name) {
                return i;
            }
        }
    }
    Container.prototype.propertyExists = function(name) {
        for (var i = 0; i < this.properties.length; i++) {
            if(this.properties[i].key === name) {
                return true;
            }
        }
        return false;
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