const pels = (function() {
  const switchCase = (elem, key, value) => {
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
      case '$render':
        const render = () => elem.innerHTML = value(handler.data);
        handler.renders.push(render);
        render();
        break;
    }
  };

  const $attrs = elem => {
    const attrs = [...elem.attributes].map(({name, value}) => ({
      [name]: value,
    }));

    return new Proxy(
      attrs.length ? attrs.reduce((a, b) => ({...a, ...b})) : {},
      {
        set: (obj, key, value) => {
          elem.setAttribute(key, value);
        },
        get: (obj, key) => {
          return elem.getAttribute(key);
        },
      },
    );
  };

  const handler = {
    data: {},
    queue: [],
    renders: [],
    elements: {},
    get: function(obj, prop) {
      if (prop === '$') {
        return handler.queue.pop();
      } else if (prop === '$elem') {
        return new Proxy(
          {},
          {
            get: (obj, key) => {
              return (text, attrs, name) => {
                const elem = document.createElement(key);

                elem.innerText = text;

                for (let key in attrs) {
                  const value = attrs[key];

                  elem.setAttribute(key, value);
                }

                if (name) {
                  handler.elements[name] = elem;
                }

                return elem;
              };
            },
          },
        );
      } else if (prop === '$set') {
        const elem = handler.queue.pop();

        return key => {
          handler.elements[key] = elem;
        };
      } else if (prop === '$get') {
        return key => {
          const elem = handler.elements[key];

          return new Proxy(
            {},
            {
              get: (obj, prop) => {
                if (prop == '$') {
                  return elem;
                } else if (prop == '$attrs') {
                  return $attrs(elem);
                }
              },
              set: (obj, key, value) => {
                switchCase(elem, key, value);
              },
            },
          );
        };
      } else if (prop === '$data') {
        return new Proxy(handler.data, {
          get: (obj, key) => {
            return handler.data[key];
          },
          set: (obj, key, value) => {
            handler.data[key] = value;

            for (let render of handler.renders) {
              render();
            }
          },
        });
      } else if (prop === '$attrs') {
        const elem = handler.queue.pop();

        $attrs(elem);
      } else {
        let elem = handler.queue.pop();

        elem = elem ? elem.querySelector(prop) : document.querySelector(prop);

        handler.queue.push(elem);

        return pels;
      }
    },
    set: (obj, key, value) => {
      const elem = handler.queue.pop();

      switchCase(elem, key, value);
    },
  };

  const pels = new Proxy({}, handler);

  return pels;
})();
