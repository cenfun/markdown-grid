# markdown-grid
> Markdown Grid Generator

## Install
```sh
npm i markdown-grid
```

## Usage

```sh  
const MG = require("markdown-grid");
const mg = MG({
    "columns": [{
        "id": "index",
        "name": ""
    }, {
        "id": "name",
        "name": "Name"
    }, {
        "id": "value",
        "name": "Value"
    }],
    "rows": [{
        "index": 1,
        "name": "Tom",
        "value": "Value 1"
    }, {
        "index": 2,
        "name": "Jerry",
        "value": "Value 2"
    }]
});

console.log(mg);  

|   |Name  |Value  
|---|------|-------
|1  |Tom   |Value 1
|2  |Jerry |Value 2  
```  
|   |Name  |Value  
|---|------|-------
|1  |Tom   |Value 1
|2  |Jerry |Value 2  
## With column width:  
```sh  
const MG = require("markdown-grid");
const mg = MG({
    "columns": [{
        "id": "index",
        "name": ""
    }, {
        "id": "name",
        "name": "Name",
        "width": 15
    }, {
        "id": "value",
        "name": "Value",
        "width": 35
    }],
    "rows": [{
        "index": 1,
        "name": "Hello",
        "value": "Long Text Value"
    }, {
        "index": 2,
        "name": "Hello There",
        "value": "Long Text Value Long Text Value"
    }]
});

console.log(mg);  

|   |Name           |Value                              
|---|---------------|-----------------------------------
|1  |Hello          |Long Text Value                    
|2  |Hello There    |Long Text Value Long Text Value      
```  
|   |Name           |Value                              
|---|---------------|-----------------------------------
|1  |Hello          |Long Text Value                    
|2  |Hello There    |Long Text Value Long Text Value      
## With column align:  
```sh  
const MG = require("markdown-grid");
const mg = MG({
    "columns": [{
        "id": "left",
        "name": "Left (Default)"
    }, {
        "id": "center",
        "name": "Center",
        "width": 15,
        "align": "center"
    }, {
        "id": "right",
        "name": "Right",
        "width": 15,
        "align": "right"
    }],
    "rows": [{
        "left": "left 1",
        "center": "center 1",
        "right": "right 1"
    }, {
        "left": "left 2",
        "center": "center 2",
        "right": "right 2"
    }]
});

console.log(mg);  

|Left (Default)  |Center         |Right          
|----------------|---------------|--------------:
|left 1          |center 1       |        right 1
|left 2          |center 2       |        right 2  
```  
|Left (Default)  |Center         |Right          
|----------------|---------------|--------------:
|left 1          |center 1       |        right 1
|left 2          |center 2       |        right 2