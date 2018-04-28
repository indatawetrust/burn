const pels = (function(){
  const handler = {
    queue: [],
    get: function(obj, prop) {
    	if (prop === '$') {
      	return handler.queue.pop();
      } else if (prop === '$attrs') {
      	const elem = handler.queue.pop();
        
        return new Proxy([...elem.attributes]
                .map(({name, value}) => ({
                  [name]: value
                }))
                .reduce((a,b) => ({...a,...b})), {
                	set: (obj, key, value) => {
                  	elem.setAttribute(key, value);
                  }
                });
      } else {
      	let elem = handler.queue.pop();
        
        elem = elem
        ? elem.querySelector(prop)
        : document.querySelector(prop);
        	
        handler.queue.push(elem)
        
        return pels
      }
    }
  };

  const pels = new Proxy({}, handler);

  return pels
})();
