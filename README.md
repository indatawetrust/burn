# burn

```js
burn(($, div, canvas) => {
	
  var c = null
  
  return div(
    canvas()
    .attr({ style: 'background-color:#0af' })
    .set('canvas')
    .on('mousemove', e => {
      
      c = c || $.get('canvas').getContext('2d')
      
      c.fillRect(e.clientX-15,e.clientY-15,10,10)
    
    })
  )

})
```

```js
burn(($, div, ul, li, button, a) => {
	
  var getLi = () => li(
                      +new Date()+' ',
                      a('x')
                      .attr({ 'href': '#' })
                      .on('click', e => {
                        e.target.parentElement.remove()
                      })
                    )
  
  return div(
    ul(
      getLi()
    )
    .set('list'),
    button('add')
    .on('click' , e => {
      $.get('list').appendChild(getLi())
    })
  )

})
```

[demo](http://fiddle.jshell.net/indatawetrust/vcjx1o2o/1/show/light/)
```js
burn(($, div, table, tr, td, th, textarea, button) => {
  var data = [];

  var toTable = data => {
    var _td = [];

    for (let k in data[0]) {
      _td.push(td(k).attr({style: 'border:1px solid #000'}));
    }

    return table(
      ..._td,
      ...data.map(user => {
        var _th = [];

        for (let k in user) {
          _th.push(
            th(
              typeof user[k] == 'object' ? JSON.stringify(user[k]) : user[k],
            ).attr({style: 'border:1px solid #000'}),
          );
        }

        return tr(..._th);
      }),
    ).attr({style: 'border:1px solid #000'});
  };

  return div(
    textarea().set('data').attr({placeholder: 'json data..'}),
    button('to table').on('click', e => {
      $.get('area').appendChild(toTable(JSON.parse($.get('data').value)));
    }),
    div().set('area'),
  );
});
```
