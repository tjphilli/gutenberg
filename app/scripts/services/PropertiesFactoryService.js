// Service to store and retrieve application wide data
app.factory('Properties',['Property',
	function(Property){
		var templates = {
			leading: {
				name: 'Leading',
				'property-name':'line-height',
				value: '1',
				inc: 1,
				micro_inc: 0.05,
				slider: {
	    			floor: 0,
	    			ceiling: 4,
	    			precision: 2,
	    			step: 0.05
	    		}
			},
			size: {
				name: 'Size',
				'property-name':'font-size',
				value: '16',
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
				unit:'px',
				inc: 50,
				micro_inc: 1,
				slider: {
	    			floor: 300,
	    			ceiling: 900,
	    			precision: 0,
	    			step: 1
	    		}
			}
		};
		this.create = function(name) {
			switch(name) {
				case "leading":
					return new Property(templates.leading);
	    		case "size":
					return new Property(templates.size);
				case "width":
					return new Property(templates.width);
				
			}
		}
		this.getAvailable = function() {
			var obj = {};
			for(var property in templates) {
				obj[property] = templates[property]['name']
			}
			return obj;
		}
		return this;
	}
]);