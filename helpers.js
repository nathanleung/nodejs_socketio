define(function(){
	function stepFunctionForAccuracyValue(value, isIncreasing){
		var start = value;
		if(isIncreasing){
			start ++;
		}else{
			start --;
		}
		if(start === 20){
			isIncreasing = false;
		}
		if(start === 0){
			isIncreasing = true;
		}
		return {value: start, isIncreasing: isIncreasing};
	}

	return { stepFunctionForAccuracyValue:stepFunctionForAccuracyValue}
 
});