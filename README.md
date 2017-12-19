# jlg-bubble

Generates background with nice relaxing bubbles.

## Demo

[See the demo](https://jlguenego.github.io/jlg-bubble).

## Install

Download via npm: 

```
npm i jlg-bubble --save
```
Add the CSS and JS to your `index.html`.

```
<!DOCTYPE html>
<html ng-app="main">

<head>
	...
	<link rel="stylesheet" href="../src/jlg-bubble.css">
    ...
</head>

<body>
	<div jlg-bubble="cfg">
	</div>
    ...
	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular.js"></script>
	<script src="../src/jlg-bubble.js"></script>
	<script src="main.js"></script>
    ...
</body>
```


## Syntax 

It is an AngularJS module.

- Module name : `jlg-bubble`
- Directive name (attribute only): `jlg-bubble="cfg"`
- Configuration object example: 
```
{
    count: 31, // number of bubbles
    colors: ['blue', 'red', 'green', 'yellow'], // array of used colors
    opacity: 0.05, // bubble opacity
    radius: 50 // bubble minimum radius
};
```


## Authors

Maïté THOMIAS

Jean-Louis GUENEGO
