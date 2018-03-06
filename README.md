# css-settings
a settings tool for changing css properties and variables

![example gif](https://github.com/sean-codes/css-settings/blob/master/example.gif?raw=true&v=2)

# include

```html
  <script src="./CSSSettings.js"></script>
```

# example
live demo: [view demo](https://sean-codes.github.io/css-settings/demo/demo.html)

```js
new CSSettings({
    settings: [
        {
          label: 'max-width',
          style: 'max-width',
          suffix: 'px',
          input: { type: 'range', min: 200, max: 300, value: 0 },
          target: document.querySelector('.container')
        },
        {
          label: 'perspective',
          style: 'perspective',
          suffix: 'px',
          input: { type: 'range', min: 0, max: 1000, value: 300 },
          target: document.querySelector('.container')
        },
        {
          label: 'background',
          style: 'background',
          input: { type: 'text', value: '#465'},
          target: document.querySelector('.child')
        }
    ]
});
```

# setting options
```js
/**
*   A setting to be created by CSS Settings
*   @param {object} options - the options to be created / used by the setting
*   @param {string} options.label - the display label for the setting
*   @param {string} options.style - the style to update / change. Can be a CSS variable
*   @param {object} options.input - the html input element to create and its attributes (type examples: 'range', 'select', 'text')
*   @param {object} options.options - the html options to create if type: 'select' 
*   @param {HTMLElement} options.target - the html element to modify the style property of
*   @param {Function} options.create - a function to run after the input element is created
*   @param {Function} options.value - a function to run after the input value changes. return adjustments 
*/
```


# If you might need to do some magic to the value. 
> handy for transform translate / scale / rotate



In the `setting` define `value`.

```js
  new CSSSettings({
     settings: [
        {
           label: 'transform',
           style: 'transform',
           input: { type: 'range' value: 1 },
           target: documentr.querySelector('something'),
           value: function(value) {
              return `translateX(${value})`;
           }
        }
     ]
  });
```
