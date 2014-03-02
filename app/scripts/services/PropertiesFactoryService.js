// Service to store and retrieve application wide data
app.factory('Properties',['Property',
	function(Property){
		var templates = {
			leading: {
				name: 'Leading',
				'property-name':'line-height',
				value: '1',
				type: 'number',
				inc: 1,
				micro_inc: 0.05,
				slider: {
	    			floor: 0,
	    			ceiling: 4,
	    			precision: 2,
	    			step: 0.05
	    		}
			},
			columns: {
				name: 'Columns',
				'property-name':'-webkit-columns',
				value: '1',
				type: 'number',
				inc: 1,
				micro_inc: 1,
				slider: {
	    			floor: 1,
	    			ceiling: 6,
	    			precision: 1,
	    			step: 1
	    		}
			},
			size: {
				name: 'Size',
				'property-name':'font-size',
				value: '16',
				type: 'number',
				unit:'px',
				inc: 5,
				micro_inc: 1,
				slider: {
	    			floor: 4,
	    			ceiling: 72,
	    			precision: 0,
	    			step: 1
	    		}
			},
			width: {
				name: 'Container Width',
				'property-name':'width',
				value: '600',
				type: 'number',
				unit:'px',
				inc: 50,
				micro_inc: 1,
				slider: {
	    			floor: 300,
	    			ceiling: 900,
	    			precision: 0,
	    			step: 1
	    		}
			},
			tracking: {
				name: 'Tracking',
				'property-name':'letter-spacing',
				value: '0',
				type: 'number',
				unit:'px',
				inc: 5,
				micro_inc: 1,
				slider: {
	    			floor: -4,
	    			ceiling: 4,
	    			precision: 0,
	    			step: 1
	    		}
			},
			alignment: {
				name: 'Alignment',
				'property-name':'text-align',
				value: 'left',
				type: 'options',
				options: [
					{name: 'left'},
					{name: 'right'},
					{name: 'center'},
					{name: 'justify'}
				]
			},
			decoration: {
				name: 'Decoration',
				'property-name':'text-decoration',
				value: 'none',
				type: 'options',
				options: [
					{name: 'none'},
					{name: 'underline'},
					{name: 'overline'},
					{name: 'line-through'}
				]
			}
		};
		this.create = function(name) {
			return new Property(templates[name]);
		}
		this.getAvailable = function(compObj) {
			var obj = {};
			for(var property in templates) {
				if (property in compObj) {}
				else {
					obj[property] = templates[property]['name']
				}
			}
			return obj;
		}
		return this;
	}
]);