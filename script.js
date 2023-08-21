const rainbow = [
  "#660000", "#990000", "#CC0000", "#FF0000", "#FF3333", "#FF6666", "#FF9999", "#FFCC99", "#FFB266", "#FF9933", "#FF8000", "#CC6600", "#994C00", "#663300", 
  "#666600", "#999900", "#CCCC00", "#FFFF00", "#FFFF33", "#FFFF66", "#FFFF99", "#CCFF99", "#B2FF66", "#99FF33", "#80FF00", "#66CC00", "#4C9900", "#336600",
  "#006600", "#009900", "#00CC00", "#00FF00", "#33FF33", "#66FF66", "#99FF99", "#99FFCC", "#66FFB2", "#33FF99", "#00FF80", "#00CC66", "#00994C", "#006633",
  "#006666", "#009999", "#00CCCC", "#00FFFF", "#33FFFF", "#66FFFF", "#99FFFF", "#99CCFF", "#66B2FF", "#3399FF", "#0080FF", "#0066CC", "#004C99", "#003366", 
  "#000066", "#000099", "#0000CC", "#0000FF", "#3333FF", "#6666FF", "#9999FF", "#CC99FF", "#B266FF", "#9933FF", "#7F00FF", "#6600CC", "#4C0099", "#330066", 
  "#660066", "#990099", "#CC00CC", "#FF00FF", "#FF33FF", "#FF66FF", "#FF99FF", "#FF99CC", "#FF66B2", "#FF3399", "#FF007F", "#CC0066", "#99004C", "#660033" ]


const grayscale = 
["#000000", "#101010",  "#202020", "#303030", "#404040", "#505050", "#606060", "#707070", "#808080", "#909090", "#A0A0A0", "#B0B0B0", "#C0C0C0", "#D0D0D0", "#E0E0E0", 
 "#FFFFFF", "#E0E0E0", "#D0D0D0", "#C0C0C0", "#B0B0B0", "#A0A0A0", "#909090", "#808080", "#707070", "#606060", "#505050", "#404040", "#303030", "#202020", "#101010", ];



const grid = document.querySelector("#grid-container");
const gridlines = document.querySelector("#gridlines");
const sliderInput = document.querySelector("#slider-input");
const sliderOutput = document.querySelector("#grid-size");
const modes = document.querySelectorAll(".mode");


let gridSize = 50;
let paint =  getComputedStyle(document.documentElement).getPropertyValue("--classic-color");
let canvas = getComputedStyle(document.documentElement).getPropertyValue("--classic-canvas");
let gridItems = [];
let index = 0;
let mode = "classic";



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
      // div.addEventListener("mouseover", classicMode );
      div.addEventListener("mouseover", colorChange );
    }
  }
  
  // console.log( div.classList.contains?("gridlines"));
  if( document.querySelector(".row-item") ){
    document.querySelector("#gridlines").checked = true;
  } else {
    document.querySelector("#gridlines").checked = false;
  }
}


const resetGrid = (e) => {
  e.preventDefault();
  e.stopPropagation();
  background = canvas;
  gridItems = [...document.querySelectorAll(".row-item")]
  gridItems.forEach( (div) => div.style.backgroundColor = "" );
}


const toggleGridLines = (e) => {
  e.preventDefault();
  e.stopPropagation();
  gridItems = [...document.querySelectorAll(".row-item")]
  gridItems.forEach( (div) => div.classList.toggle("gridlines") );
}


const classicMode = (div) => { div.target.style.backgroundColor = paint; };

const randomMode = (div) => {
  let color = `rgb(${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1})`;
  div.target.style.backgroundColor = color;
};

const rainbowMode = (div) => {
  if (index >= rainbow.length) index = 0;
  div.target.style.backgroundColor = rainbow[index++];
};

const grayscaleMode = (div) => {
  if (index >= grayscale.length) index = 0;
  div.target.style.backgroundColor = grayscale[index++];
}

const colorChange = (div) => { 
  switch (mode){
    case "classic" :
      return classicMode(div);
      // break;
    case "rainbow" :
      return rainbowMode(div);
      // break;
    case "grayscale" :
      return grayscaleMode(div);
      // break; 
    case "random" :
      return randomMode(div);
      // break;
    default:
      break;
  }
};


sliderInput.addEventListener("input", (e) => {
  e.preventDefault();
  e.stopPropagation();
  slider.value = e.target.value;
  gridSize = slider.value;
  sliderOutput.textContent = `${slider.value}x${slider.value}`;
  createGrid(gridSize);
})

modes.forEach( (m) => {
  m.addEventListener("change", (e) => {
    e.preventDefault();
    e.stopPropagation();
    mode = e.target.id;
  }) 
});  

gridlines.addEventListener("change", toggleGridLines);


createGrid(gridSize);