Gutenberg
=========

Gutenberg is an experimental type tester to introduce traditional designers to web typography, and strengthen front-end developers knowledge of the power and history of type.

## Currently Supported Properties:
- font-size
- line-height
- letter-spcing
- columns
- width (containing element)
- font-family
- text-align
- text-decoration
- text-transform
- font-weight
- font-style
- word-spacing
- color
- background-color (page)

## Future Supported Properties:
- p:first (drop caps)
- text-shadow


## Far Future Supported Properties
- text-indent
- quotes
- word-wrap
- white-space
- text-rendering
- webkit-font-smoothing
- font-variant

# Gutenberg API

You can make a get request to the Gutenberg api at: `http://gutenberg.io/api/`

Options are includes as simple paramaters, the order of the parameters does not matter. Therefore `http://gutenberg.io/api/hipster/4` is the same as `http://gutenberg.io/api/4/hipster`.

Format of requests: `http://gutenberg.io/api/:source/:number/:type`

Where `:source` can be `lorem`, `hipster`, `bacon`, `random`.  Where `:number` can be `1-99`. Where `:type` can be `json` or `html`. 
