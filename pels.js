const pels = (function() {
  const handler = {
    queue: [],
    get: function(obj, prop) {
      if (prop === '$') {
        return handler.queue.pop();
      } else if (prop === '$elem') {
        return new Proxy(
          {},
          {
            get: (obj, key) => {
              return (text, attrs) => {
                const elem = document.createElement(key);

                elem.innerText = text;

                for (let key in attrs) {
                  const value = attrs[key];

                  elem.setAttribute(key, value);
                }

                return elem;
              };
            },
          },
        );
      } else if (prop === '$attrs') {
        const elem = handler.queue.pop();

        const attrs = [...elem.attributes].map(({name, value}) => ({
          [name]: value,
        }));

        return new Proxy(
          attrs.length ? attrs.reduce((a, b) => ({...a, ...b})) : {},
          {
            set: (obj, key, value) => {
              elem.setAttribute(key, value);
            },
          },
        );
      } else {
        let elem = handler.queue.pop();

        elem = elem ? elem.querySelector(prop) : document.querySelector(prop);

        handler.queue.push(elem);

        return pels;
      }
    },
    set: (obj, key, value) => {
      const elem = handler.queue.pop();

      switch (key) {
        case '$text':
          elem.innerText = value;
          break;
        case '$textReplace':
          elem.innerText = elem.innerText.replace(...value);
          break;
        case '$html':
          elem.innerHTML = value;
          break;
        case '$on':
          elem.addEventListener(...value);
          break;
        case '$append':
          elem.appendChild(value);
          break;
      }
    },
  };

  const pels = new Proxy({}, handler);

  return pels;
})();
