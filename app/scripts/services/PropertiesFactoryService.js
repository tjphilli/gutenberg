// Service to store and retrieve application wide data
app.factory('Properties',['Property', 'Value',
	function(Property, Value){
		this.templates = {
			leading: {
				key: 'leading',
				name: 'Leading',
				'property-name':'line-height',
				value: '1',
				type: 'number',
				inc: 1,
				micro_inc: function(){
					return Math.ceil( (1/this.dependent_int) * 100) / 100;
				},
				dependent_int: 16,
				slider: {
	    			floor: 0,
	    			ceiling: 4,
	    			precision: 2
	    		}
			},
			columns: {
				key: 'columns',
				name: 'Columns',
				'property-name':'-webkit-columns',
				value: '1',
				type: 'number',
				inc: 1,
				micro_inc: function() { return 1},
				slider: {
	    			floor: 1,
	    			ceiling: 6,
	    			precision: 1,
	    			step: 1
	    		},
	    		linked: 'columngap', 
	    		columngap: {
					key: 'columngap',
					name: 'Column Gap',
					'property-name':'-webkit-column-gap',
					value: '1',
					unit: 'px',
					type: 'number',
					inc: 20,
					micro_inc: function() { return 10},
					slider: {
		    			floor: 0,
		    			ceiling: 100,
		    			precision: 1,
		    			step: 10
		    		}
				},
			},
			size: {
				key: 'size',
				name: 'Size',
				'property-name':'font-size',
				value: '16',
				type: 'number',
				unit:'px',
				inc: 5,
				micro_inc: function() { return 1},
				slider: {
	    			floor: 0,
	    			ceiling: 100,
	    			precision: 0,
	    			step: 1
	    		}
			},
			width: {
				key: 'width',
				name: 'Container Width',
				'property-name':'width',
				value: '600',
				type: 'number',
				unit:'px',
				inc: 50,
				micro_inc: function() { return 1},
				slider: {
	    			floor: 300,
	    			ceiling: 900,
	    			precision: 0,
	    			step: 1
	    		}
			},
			tracking: {
				key: 'tracking',
				name: 'Tracking',
				'property-name':'letter-spacing',
				value: '0',
				type: 'number',
				unit:'px',
				inc: 5,
				micro_inc: function() { return 1},
				slider: {
	    			floor: -4,
	    			ceiling: 4,
	    			precision: 0,
	    			step: 1
	    		}
			},
			weight: {
				key: 'weight',
				name: 'Weight',
				'property-name':'font-weight',
				value: '600',
				type: 'options',
				options: [
					// {name: 'normal', value:'normal'},
					// {name: 'bold', value:'bold'}
					{name: '100', value:'100'},
					{name: '200', value:'200'},
					{name: '300', value:'300'},
					{name: '400', value:'400'},
					{name: '500', value:'500'},
					{name: '600', value:'600'},
					{name: '700', value:'700'},
					{name: '800', value:'800'},
					{name: '900', value:'900'}
				]
			},
			spacing: {
				key: 'spacing',
				name: 'Word Spacing',
				'property-name':'word-spacing',
				value: '0',
				unit: 'px',
				type: 'number',
				inc: 5,
				micro_inc: function() { return 1},
				slider: {
	    			floor: 0,
	    			ceiling: 20,
	    			precision: 0,
	    			step: 1
	    		}
			},
			alignment: {
				key: 'alignment',
				name: 'Alignment',
				'property-name':'text-align',
				value: 'left',
				type: 'options',
				options: [
					{name: 'left', value:'left'},
					{name: 'right', value:'right'},
					{name: 'center', value:'center'},
					{name: 'justify', value:'justify'}
				]
			},
			decoration: {
				key: 'decoration',
				name: 'Decoration',
				'property-name':'text-decoration',
				value: 'none',
				type: 'options',
				options: [
					{name: 'none', value: 'none'},
					{name: 'underline', value: 'underline'},
					{name: 'overline', value: 'overline'},
					{name: 'line-through', value: 'line-through'}
				]
			},
			transform: {
				key: 'transform',
				name: 'Case',
				'property-name':'text-transform',
				value: 'none',
				type: 'options',
				options: [
					{name: 'none', value:'none'},
					{name: 'capitalize', value:'capitalize'},
					{name: 'uppercase', value:'uppercase'},
					{name: 'lowercase', value:'lowercase'}
				]
			},
			 typeface: {
			 	key: 'typeface',
			 	name: 'Typeface',
			 	'property-name' : 'font-family',
	            value: 'Garamond',
	            type: 'options',
	            weights: function(){
	            	var arr = [];
	            	for(var i = 0; i < this.options.length; i++) {
	            		if(this.options[i].value === this.value) {
	            			for(var j = 0; j <this.options[i].weights.length; j++){
	            				arr.push({'value': this.options[i].weights[j]})
	            			}

	            		}
	            	}
	            	console.log(arr);
	            	return arr;
	            },
	            options: [
	                {name: "Times New Roman", value:'Times New Roman', weights: ['normal', 'bold']},
	                {name: "Helvetica Neue" , value: 'Helvetica Neue', weights: ['100','200', '400', '500', '600']}, 
	                {name: "Garamond", value: 'Garamond', weights: ['normal', 'bold']},
	                {name: "Freight Sans", value: 'FreightSans', weights: ['lighter','normal', 'bold']},
	                {name: "Freight Text", value: 'FreightText', weights: ['lighter','normal', 'bold']}
	            ]
	        },
	        style: {
	        	key: 'style',
			 	name: 'Style',
			 	'property-name' : 'font-style',
	            value: 'italic',
	            type: 'options',
	            options: [
	                {name: "italic", value:'italic'},
	                {name: "oblique" , value: 'oblique'}, 
	                {name: "none", value: 'none'}
	            ]
	        },
	        color: {
	        	key: 'color',
			 	name: 'Color',
			 	'property-name' : 'color',
	            value: '#333',
	            type: 'color'
	        },
	        background: {
	        	key: 'background',
			 	name: 'Page Color',
			 	'property-name' : 'background-color',
	            value: '#333',
	            type: 'color',
	            applies: 'background'
	        },
	        shadow: {
	        	key: 'shadow',
			 	name: 'Drop Shadow',
			 	'property-name' : 'text-shadow',
	            value: '3px 2px 4px #479',
				type: 'shorthand',
				values: [
					new Value(2, 'length'),
					new Value(2, 'length'),
					new Value(4, 'length'),
					new Value('#478', 'color')
				]
	        },
			dropcap: {
				key: 'dropcap',
			 	name: 'Drop Cap',
				type: 'compound',
				properties: {},
				add: ['size', 'color', 'style'],
	            applies: 'dropcap'
	        },
	        padding: {
				key: 'padding',
				name: 'padding',
				'property-name':'padding',
				value: '5',
				type: 'number',
				unit:'px',
				inc: 1,
				micro_inc: function() { return 1},
				slider: {
	    			floor: 0,
	    			ceiling: 100,
	    			precision: 0,
	    			step: 1
	    		},
	    		applies: 'element'
			}
		};
		this.compoundTemplates = {
		};
		this.create = function(name) {
			if(this.templates[name]['type'] === 'compound') {
				for(i = 0; i < this.templates[name]['add'].length; i++) {
					this.templates[name]['properties'][String(this.templates[name]['add'][i])]= this.create(this.templates[name]['add'][i]);
				}
			}
			var temp = new Property(this.templates[name]);
			console.log(temp);
			return temp;
		}
		this.getAvailable = function(compObj, container_type) {
			var obj = {};
			for(var property in this.templates) {
				if (property in compObj) {}
				else {
					console.log(this.templates[property].applies);
					if(this.templates[property].applies == 'background') {
						if(container_type == "wrapper") {
							obj[property] = this.templates[property]['name']
						}
					}
					else if (this.templates[property].applies == 'element') {
						if(container_type == "element") {
							obj[property] = this.templates[property]['name']
						}
					}
					else {
						obj[property] = this.templates[property]['name']
					}
				}
			}
			return obj;
		}
		return this;
	}
]);