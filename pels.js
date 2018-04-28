const pels = (function(){
  const handler = {
    queue: [],
    get: function(obj, prop) {
    	if (prop === '$') {
      	return handler.queue.pop();
      } else {
      	let elem = handler.queue.pop();
        
        elem = elem ? elem.querySelector(prop) : document.querySelector(prop);
        	
        handler.queue.push(elem)
        
        return pels
      }
    }
  };

  const pels = new Proxy({}, handler);

  return pels
})();
