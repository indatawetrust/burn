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
