// Service to store and retrieve application wide data
app.factory('Value', function(){
	var Value = function(init, type) {
		this.unit = '';
		this.init = init;
		this.type = type;
		if (type === 'length') {
			this.unit = 'px';
		}
		this.slider = {
			floor: 0,
			ceiling: 20,
			precision: 0,
			step: 1
		}
	};
	Value.prototype.value = function(){
		var value = this.type === 'length' ? String(this.init + this.unit) : String(this.init);
		return value;
	}
	return Value;
});