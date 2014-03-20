// Service to store and retrieve application wide data
app.factory('Property', function(){
	var Property = function(options) {
		angular.extend(this, options);
	};
	Property.prototype.className = function(){
		return this.name.replace(' ', '-').toLowerCase();
	}
	Property.prototype.propertyValue = function(){
		var str = "";
		if(this.type === 'shorthand') {
			for(var i = 0; i < this.values.length;i++) {
				str += (this.values[i]['value']() + " ");
			}
			return str;
		}
		return String( this.unit != null ? this.value + this.unit : this.value)
	}
	Property.prototype.increase = function(){
		this.value += this.inc;
	}
	Property.prototype.decrease = function(){
		this.value -= this.inc;
	}
	Property.prototype.microIncrease = function(){
		if(this.name === 'Leading') {

			this.value = parseFloat((this.value +=this.micro_inc()).toFixed(2))
		}
		else {
			this.value = parseFloat((this.value +=this.micro_inc()).toFixed(2))
		}
	}
	Property.prototype.microDecrease = function(){
		if(this.name === 'Leading') {

			this.value = parseFloat((this.value -=this.micro_inc()).toFixed(2))
		}
		this.value = parseFloat((this.value -=this.micro_inc()).toFixed(2))
	}
	return Property;
});