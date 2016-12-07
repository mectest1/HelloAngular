(function(){
	angular.module('customFilters', [])
			.filter('unique', function(){
				return function (data, propertyName){
					var retval = data;
					if(angular.isArray(data) && angular.isString(propertyName)){
						retval = [];
						var keys = {};
						//
						for(var i = 0; i < data.length; ++i){
							var val = data[i][propertyName];
							if(angular.isUndefined(keys[val])){
								keys[val] = true;
								retval.push(val);
							}
						}
					}else{
						//return data;
					}
					return retval;
				};
	});
})();