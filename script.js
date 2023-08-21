

const grid = document.querySelector("#grid-container");
const gridlines = document.querySelector("#gridlines");
const sliderInput = document.querySelector("#slider-input");
const sliderOutput = document.querySelector("#grid-size");


let gridSize = 50;
let paint =  getComputedStyle(document.documentElement).getPropertyValue("--classic-color");
let canvas = getComputedStyle(document.documentElement).getPropertyValue("--classic-canvas");
let gridItems = [];
let index = 0;



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
      div.addEventListener("mouseover", classicMode );
    }
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


sliderInput.addEventListener("input", (e) => {
  e.preventDefault();
  e.stopPropagation();
  slider.value = e.target.value;
  gridSize = slider.value;
  sliderOutput.textContent = `${slider.value}x${slider.value}`;
  createGrid(gridSize);
})


gridlines.addEventListener("change", toggleGridLines);


createGrid(gridSize);