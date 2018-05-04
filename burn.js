var COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var DEFAULT_PARAMS = /=[^,]+/mg;
var FAT_ARROWS = /=>.*$/mg;

function getParameterNames(fn) {
  var code = fn.toString()
    .replace(COMMENTS, '')
    .replace(FAT_ARROWS, '')
    .replace(DEFAULT_PARAMS, '');

  var result = code.slice(code.indexOf('(') + 1, code.indexOf(')'))
    .match(/([^\s,]+)/g);

  return result === null
    ? []
    : result;
}

var burn = function (f) {
	
  let params = getParameterNames(f)
  const elements = {}
    
  params = params.map(elem => {
  	console.log(elem)
    if (elem == '$') {
    	return {
      	get: key => elements[key],
        actions: {}
      }
    } else {
    	return (...item) => {
			
      	const _elem = document.createElement(elem)

        item.map(item => {
          if (item instanceof Element) {
            _elem.appendChild(item)
          } else {
            switch (typeof i) {
              case 'object':
                _elem.innerHTML = JSON.stringify(item)
                break
              default:
                _elem.innerHTML = item
                break
            }
          }
        })
        
        _elem.on = (event, listener) => {
        	_elem.addEventListener(event, listener)
       		
          return _elem
        }
        
        _elem.attr = attrs => {
        	for (let k in attrs) {
          	const v = attrs[k]
            _elem.setAttribute(k, v)
          }
          return _elem
        }
        
        _elem.set = key => {
        	elements[key] = _elem
       		
          return _elem
        }
        
        return _elem
      }
    }
  
  })
  
  return f(...params)
  
}    switch (typeof i) {
              case 'object':
                _elem.innerHTML = JSON.stringify(item)
                break
              default:
                _elem.innerHTML = item
                break
            }
          }
        })
        
        _elem.on = (event, listener) => {
        	_elem.addEventListener(event, listener)
       		
          return _elem
        }
        
        _elem.attr = attrs => {
        	for (let k in attrs) {
          	const v = attrs[k]
            _elem.setAttribute(k, v)
          }
          return _elem
        }
        
        _elem.set = key => {
        	elements[key] = _elem
       		
          return _elem
        }
        
        return _elem
      }
    }
  
  })
  
  return f(...params)
  
}
