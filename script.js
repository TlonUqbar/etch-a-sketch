const grid = document.querySelector("#grid-container");
const gridlines = document.querySelector("#gridlines");
const sliderInput = document.querySelector("#slider-input");
const sliderOutput = document.querySelector("#grid-size");
const modes = document.querySelectorAll(".mode");
const clear = document.querySelector("#clear-canvas");

let gridSize = 50;
let paint = "rgb(130, 130, 130)";
let canvas = "rgb(30, 41, 59)";
let gridItems = [];
let index = 0;
let mode = "classic";
let rainbowColor = "";
let grayscaleColor = "";
let grayscaleDirection = "";

const createGrid = (gridSize) => {
  grid.innerHTML = "";

  // create rows
  for( let i = 1; i <= gridSize; i++ ){
    const row = document.createElement("div");
    row.id =`row-${i}`;
    row.className = "grid-row";
    grid.appendChild(row);

    // create row elements
    for( let j = 1; j <= gridSize; j++) {
      const div = document.createElement("div");
      div.classList = [`row-item ${j} gridlines`];
      div.id = `col-${j}`;
      div.style.backgroundColor = canvas;
      row.appendChild(div);
      div.addEventListener("mouseover", colorChange );
    }
  }
  // toggle the gridlines checkbox on resize
  if( document.querySelector(".row-item").classList.contains("gridlines") ){
    document.querySelector("#gridlines").checked = true;
  }
}

// clearGrid
const clearGrid = (e) => {
  e.preventDefault();
  e.stopPropagation();
  canvas = "rgb(30, 41, 59)" ;
  gridItems = [...document.querySelectorAll(".row-item")]
  gridItems.forEach( (div) => div.style.backgroundColor = canvas);
}


const toggleGridLines = (e) => {
  e.preventDefault();
  e.stopPropagation();
  gridItems = [...document.querySelectorAll(".row-item")]
  gridItems.forEach( (div) => div.classList.toggle("gridlines") );
}

const classicMode = (div) => ( div.target.style.backgroundColor = paint );

const eraserMode = (div) =>  (div.target.style.backgroundColor = canvas );

const randomMode = (div) => {
  let color = `rgb(${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1})`;
  div.target.style.backgroundColor = color;
};

const rainbowMode = (div) => {
  let red, green, blue, colorShade;
  const delta = 26;  // this is about 10%

  if ( rainbowColor == "" ) rainbowColor = "rgb(255,0,0)";
  array = rainbowColor.split("(")[1].split(")")[0];
  array = array.split(",");
  red = parseInt(array[0]);
  green = parseInt(array[1]);
  blue = parseInt(array[2]);

  if( red == 255 && blue == 0 && green < 255 ) colorShade = "mostlyRed";
  if( green == 255 && blue == 0 && red > 0) colorShade = "mostlyYellow";
  if( green == 255 && red == 0 && blue < 255) colorShade = "mostlyGreen";
  if( blue == 255 && red == 0 && green > 0 ) colorShade = "mostlyCyan";
  if( blue == 255 && green == 0 && red < 255 )  colorShade = "mostlyBlue";
  if( red == 255 && green == 0 && blue > 0) colorShade = "mostlyPurple"

  switch (colorShade) {
    case "mostlyRed" : green = ( green + delta < 255) ? green + delta : 255; break;
    case "mostlyYellow" : red = ( red - delta > 0) ? red - delta : 0; break;
    case "mostlyGreen" : blue = ( blue + delta < 255) ? blue + delta : 255; break;
    case "mostlyCyan" : green = ( green - delta > 0) ? green - delta : 0; break;
    case "mostlyBlue" : red = ( red + delta < 255) ? red + delta : 255; break;
    case "mostlyPurple" : blue = ( blue - delta > 0) ? blue - delta : 0; break;
    default : break;
  }

  rainbowColor = `rgb(${red}, ${green}, ${blue})`;
  div.target.style.backgroundColor = rainbowColor;
};

const grayscaleMode = (div) => {
  let red, green, blue, grayShade, direction;
  const delta = 13;  // the is about 5%

  if( grayscaleColor == "" ) grayscaleColor = "rgb(0,0,0)";
  if( grayscaleDirection == "" ) grayscaleDirection = "up"; 
  array = grayscaleColor.split("(")[1].split(")")[0];
  array = array.split(",");
  red = parseInt(array[0]);
  green = parseInt(array[1]);
  blue = parseInt(array[2]);

  if( grayscaleDirection == "up" ){
    red = (red + delta < 255) ? red + delta : 255; 
    green = (green + delta < 255) ? green + delta : 255;
    blue = (blue + delta < 255 ) ? blue + delta : 255;
    if(red == 255 && green == 255 && blue == 255 ) grayscaleDirection = "down";
  }else if(grayscaleDirection == "down"){
    red = (red - delta > 0) ? red - delta : 0; 
    green = (green - delta > 0) ? green - delta : 0;
    blue = (blue - delta > 0 ) ? blue - delta : 0;
    if(red == 0 && green == 0 && blue == 0 ) grayscaleDirection = "up";
  }
  grayscaleColor = `rgb(${red}, ${green}, ${blue})`;
  div.target.style.backgroundColor = grayscaleColor;
}

const lightenMode = (div) => {
  let red, green, blue, newColor;
  array = div.target.style.backgroundColor.split("(")[1].split(")")[0];
  array = array.split(",");
  red = ( parseInt(array[0])+51 < 255 ) ? parseInt(array[0])+51 : 255;
  green = ( parseInt(array[1])+51 < 255 ) ? parseInt(array[1])+51 : 255;
  blue = ( parseInt(array[2])+51 < 255 ) ? parseInt(array[2])+51 : 255;
  newColor = `rgb(${red}, ${green}, ${blue})`;
  div.target.style.backgroundColor = newColor;
}

const darkenMode = (div) => {
  let red, green, blue, newColor;
  array = div.target.style.backgroundColor.split("(")[1].split(")")[0];
  array = array.split(",");
  red = ( parseInt(array[0])-51 > 0 ) ?  parseInt(array[0])-51 : 0 ;
  green = ( parseInt(array[1])-51 > 0 ) ? parseInt(array[1])-51 : 0;
  blue = ( parseInt(array[2])-51 > 0 ) ? parseInt(array[2])-51 : 0;
  newColor = `rgb(${red}, ${green}, ${blue})`
  div.target.style.backgroundColor = newColor;
}

const colorChange = (div) => { 
  switch (mode){
    case "classic" :
      return classicMode(div);
    case "rainbow" :
      return rainbowMode(div);
    case "grayscale" :
      return grayscaleMode(div);
    case "random" :
      return randomMode(div);
    case "eraser" :
      return eraserMode(div);
    case "lighten" :
      return lightenMode(div);
    case "darken" :
      return darkenMode(div);
    default:
      break;
  }
};


const changeCanvas = (e) => {
  let current = canvas;
  e.preventDefault();
  e.stopPropagation();
  gridItems = [...document.querySelectorAll(".row-item")]
  gridItems.forEach( (div) => {
    if( div.style.backgroundColor == current ) div.style.backgroundColor = convertHEXtoRGB(e.target.value);
    canvas = convertHEXtoRGB(e.target.value);
  });
}


// Helper functions mostly for dealing with colors
function convertRGBtoHEX(colorString){
  if(colorString.startsWith("#")) return colorString;  // the string is already a HEX color

  let array = colorString.split("(")[1].split(")")[0];
  array = array.split(",");

  let hex = array.map( (x)=> { x = parseInt(x).toString(16); return (x.length==1) ? "0"+x : x; });

  return "#"+hex.join('');
}

function convertHEXtoRGB(colorString){ 
  let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorString);
  return `rgb(${parseInt(rgb[1], 16)}, ${parseInt(rgb[2], 16)}, ${parseInt(rgb[3], 16)})`;
}

// This tells me if a color is considered light, then dark color can be used for contrast
// This is how the "Color" and "Change Canvas" button have either black or white fonts
function isLightColor(colorString){
  let array = [];
  let answer;
  
  if(colorString.startsWith("#")){
    array = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorString);
    array.shift();
    array = array.map( (item) => { return parseInt(item, 16) }); 
  } else{
    array = colorString.split("(")[1].split(")")[0];
    array = array.split(",");
  }

  answer = 1 - (0.299 * array[0] + 0.587 * array[1] + 0.114 * array[2]) / 255;
  return (answer < 0.5);
}

const updateColorButton = (e) => {
  paint = e.target.value;
  picker.style.backgroundColor = paint;
  if(isLightColor(paint)){
    picker.classList.add("dark");
    picker.classList.remove("light");
  } else {
    picker.classList.add("light");
    picker.classList.remove("dark");
  }
}

const updateCanvasButton = (e) => {
  canvasPicker.style.backgroundColor = e.target.value;
  if(isLightColor( e.target.value)){
    canvasPicker.classList.add("dark");
    canvasPicker.classList.remove("light");
  } else {
    canvasPicker.classList.add("light");
    canvasPicker.classList.remove("dark");
  }
  changeCanvas(e);
}

clear.addEventListener("click", clearGrid);

gridlines.addEventListener("change", toggleGridLines);

sliderInput.addEventListener("input", (e) => {
  e.preventDefault();
  e.stopPropagation();
  slider.value = e.target.value;
  gridSize = slider.value;
  sliderOutput.textContent = `${slider.value}x${slider.value}`;
  createGrid(gridSize);
});

modes.forEach( (m) => {
  m.addEventListener("change", (e) => {
    e.preventDefault();
    e.stopPropagation();
    mode = e.target.id;
  }) 
});  

canvasPicker.addEventListener("click", (e) => {
  const inputs =  e.target.previousElementSibling;
  inputs.addEventListener("input", (e) => updateCanvasButton(e)  );
  try{
    inputs.showPicker();
  } catch (e) {
    console.log(e);
  }
});

picker.addEventListener("click", (e) => {
  const input =  e.target.previousElementSibling;
  input.addEventListener("input", (e) => { 
    updateColorButton(e);
  });
  try{
    input.showPicker();
  } catch (e) {
    console.log(e);
  }
});


createGrid(gridSize);