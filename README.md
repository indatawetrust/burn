# pels
Proxy Element Selector

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

```js
burn(($, table, tr, td, th) => {
  var data = [
    {
      _id: '5aeca1c7f0cb9420f0b03695',
      picture: 'http://placehold.it/32x32',
      age: 38,
      eyeColor: 'brown',
      name: 'Elinor May',
      gender: 'female',
    },
    {
      _id: '5aeca1c7c66e051c035894a8',
      picture: 'http://placehold.it/32x32',
      age: 29,
      eyeColor: 'brown',
      name: 'Lena Dawson',
      gender: 'female',
    },
    {
      _id: '5aeca1c701e9642a56de56c4',
      picture: 'http://placehold.it/32x32',
      age: 21,
      eyeColor: 'blue',
      name: 'Robbie Quinn',
      gender: 'female',
    },
    {
      _id: '5aeca1c7c82c2cc7a9a339ca',
      picture: 'http://placehold.it/32x32',
      age: 23,
      eyeColor: 'green',
      name: 'Barron Willis',
      gender: 'male',
    },
    {
      _id: '5aeca1c7e984289a91ef1c52',
      picture: 'http://placehold.it/32x32',
      age: 20,
      eyeColor: 'blue',
      name: 'Turner Mayo',
      gender: 'male',
    },
    {
      _id: '5aeca1c7669edc8a4642d562',
      picture: 'http://placehold.it/32x32',
      age: 37,
      eyeColor: 'brown',
      name: 'Rosie Wong',
      gender: 'female',
    },
    {
      _id: '5aeca1c7ea70c87521def6ef',
      picture: 'http://placehold.it/32x32',
      age: 32,
      eyeColor: 'brown',
      name: 'Vinson Shelton',
      gender: 'male',
    },
  ];

  var _td = [];

  for (let k in data[0]) {
    _td.push(td(k).attr({style: 'border:1px solid #000'}));
  }

  return table(
    ..._td,
    ...data.map(user => {
      var _th = [];

      for (let k in user) {
        _th.push(th(user[k]).attr({style: 'border:1px solid #000'}));
      }

      return tr(..._th);
    }),
  ).attr({style: 'border:1px solid #000'});
});
```
