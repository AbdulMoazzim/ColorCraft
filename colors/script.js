let colorPicker = new iro.ColorPicker("#picker", {
    width: (window.outerWidth * 20 / 100)
});
let hex = document.querySelector("#hex");
let rgb = document.querySelector("#rgb");
let hsl = document.querySelector("#hsl");

let hexcolor = document.querySelector("#hexcolor");
let rgbcolor = document.querySelector("#rgbacolor");
let hslcolor = document.querySelector("#hslacolor");

// Selection of type of colors

let selection = document.querySelector("#selection");
selection.addEventListener('change',()=>{
  if (selection.value === "hex") {
    hexcolor.classList.add("flex");
    hexcolor.classList.remove("hidden");
    rgbcolor.classList.remove("flex");
    rgbcolor.classList.add("hidden");
    hslcolor.classList.remove("flex");
    hslcolor.classList.add("hidden");
  }
  else if (selection.value === "rgba") {
    hexcolor.classList.remove("flex");
    hexcolor.classList.add("hidden");
    rgbcolor.classList.add("flex");
    rgbcolor.classList.remove("hidden");
    hslcolor.classList.remove("flex");
    hslcolor.classList.add("hidden");
  }
  else {
    hexcolor.classList.remove("flex");
    hexcolor.classList.add("hidden");
    rgbcolor.classList.remove("flex");
    rgbcolor.classList.add("hidden");
    hslcolor.classList.add("flex");
    hslcolor.classList.remove("hidden");
  }
})

let color1 = document.querySelector("#color1");
let color2 = document.querySelector("#color2");
let color3 = document.querySelector("#color3");
let color4 = document.querySelector("#color4");
let color5 = document.querySelector("#color5");
let color6 = document.querySelector("#color6");
let alpha1 = document.querySelector("#alpha1");
let alpha2 = document.querySelector("#alpha2");
let colorhex = document.querySelector("#colorhex");
let colorsinput = document.querySelectorAll(".colorsforhover");

colorsinput.forEach((val)=>{
  val.addEventListener("mousemove",()=>{
    val.nextElementSibling.classList.add("flex");
    val.nextElementSibling.classList.remove("hidden");
  }
)
})
colorsinput.forEach((val)=>{
  val.addEventListener("mouseleave",()=>{
    val.nextElementSibling.classList.remove("flex");
    val.nextElementSibling.classList.add("hidden");
  }
)
})

// Input Fields Validation

document.querySelector("#submit").addEventListener("click", () => {
  const isValidRange = (value, min, max) => {
    return value !== "" && Number(value) >= min && Number(value) <= max;
  };

  if (selection.value === "rgba") {
    if (!isValidRange(color1.value, 0, 255)) {
      alert("RED must be between 0 and 255");
      return;
    }
    if (!isValidRange(color2.value, 0, 255)) {
      alert("GREEN must be between 0 and 255");
      return;
    }
    if (!isValidRange(color3.value, 0, 255)) {
      alert("BLUE must be between 0 and 255");
      return;
    }
    if (alpha1.value !== "" && !isValidRange(alpha1.value, 0, 1)) {
      alert("Alpha must be between 0 and 1");
      return;
    }
    const rgbaColor = `rgba(${color1.value}, ${color2.value}, ${color3.value}, ${alpha1.value || 1})`;
    display(rgbaColor);
  } else if (selection.value === "hsla") {
    if (!isValidRange(color4.value, 0, 359)) {
      alert("HUE must be between 0 and 359");
      return;
    }
    if (!isValidRange(color5.value, 0, 100)) {
      alert("SATURATION must be between 0 and 100");
      return;
    }
    if (!isValidRange(color6.value, 0, 100)) {
      alert("LIGHTNESS must be between 0 and 100");
      return;
    }
    if (alpha2.value !== "" && !isValidRange(alpha2.value, 0, 1)) {
      alert("Alpha must be between 0 and 1");
      return;
    }
    const hslaColor = `hsla(${color4.value}, ${color5.value}%, ${color6.value}%, ${alpha2.value || 1})`;
    display(hslaColor);
  } else {
    const character = "abcdef0123456789";
    const hexValue = colorhex.value.trim().toLowerCase();
    if (hexValue.length < 4 || hexValue.length > 7) {
      alert("HEX code must be 4 to 7 characters long, including #");
      return;
    }
    if (hexValue[0] !== "#") {
      alert("HEX code must start with #");
      return;
    }
    for (let i = 1; i < hexValue.length; i++) {
      if (!character.includes(hexValue[i])) {
        alert("HEX code contains invalid characters");
        return;
      }
    }
    display(hexValue);
    events()
    
  }
});

let myhex = colorPicker.color.hexString;
let myrgb = colorPicker.color.rgbString;
let myhsl = colorPicker.color.hslString;

hex.innerHTML = myhex;
rgb.innerHTML = myrgb;
hsl.innerHTML = myhsl;

const container1 = document.getElementById("palette1");
const container2 = document.getElementById("palette2");
const container3 = document.getElementById("palette3");
const container4 = document.getElementById("palette4");
const container5 = document.getElementById("palette5");

// Conversion of hex o hsl and rgba

function mycolorConversion(hexColor){
  const rgbaColor = chroma(hexColor).rgba();
  const rgbaString = `rgba(${rgbaColor[0]}, ${rgbaColor[1]}, ${rgbaColor[2]}, ${rgbaColor[3]})`;

  const hslColor = chroma(hexColor).hsl();
  const hslString = `hsl(${Math.round(hslColor[0])}, ${Math.round(hslColor[1] * 100)}%, ${Math.round(hslColor[2] * 100)}%)`;
  return [rgbaString, hslString]
}

// palette Creation

function display(myhex) {

  const palette = chroma
    .scale([
      chroma(myhex).darken(2),
      myhex,
      chroma(myhex).brighten(2),
    ])
    .colors(6);

  const analogous = chroma
    .scale([
      chroma(myhex).set("hsl.h", "-30"),
      myhex,
      chroma(myhex).set("hsl.h", "+30"),
      chroma(myhex).set("hsl.h", "+60"),
      chroma(myhex).set("hsl.h", "-60"),
    ])
    .mode("hsl")
    .colors(6);

  const complementary = chroma
    .scale([
      myhex,
      chroma(myhex).set("hsl.h", "+180").brighten(1),
      chroma(myhex).set("hsl.h", "+180").darken(1),
      chroma(myhex).set("hsl.h", "+180").saturate(2),
      chroma(myhex).set("hsl.h", "+180").desaturate(2),
    ])
    .colors(6);

  const triadic = chroma
    .scale([
      myhex,
      chroma(myhex).set("hsl.h", "+120"),
      chroma(myhex).set("hsl.h", "-120"),
      chroma(myhex).set("hsl.h", "+120").brighten(1),
      chroma(myhex).set("hsl.h", "-120").darken(1),
    ])
    .colors(6);

  const vibrantMuted = chroma
    .scale([
      chroma(myhex).saturate(3),
      chroma(myhex).desaturate(3),
      chroma(myhex).brighten(1),
      chroma(myhex).darken(1),
      chroma(myhex).saturate(1.5).brighten(1),
      chroma(myhex).desaturate(1.5).darken(1),
    ])
    .colors(6);

  // Clear containers
  container1.innerHTML = "";
  container2.innerHTML = "";
  container3.innerHTML = "";
  container4.innerHTML = "";
  container5.innerHTML = "";


  // Display palettes
  palette.forEach((color) => {
    const colorBlock = document.createElement("div");
    colorBlock.classList.add("colorBlock");
    colorBlock.style.width = "16.66%";
    colorBlock.style.height = "100%";
    colorBlock.style.backgroundColor = color;
    colorBlock.style.position = "relative";
    colorBlock.style.zIndex = "-1";
    let rgbaAndHsl = mycolorConversion(color);
    colorBlock.innerHTML = `<div class="absolute top-10 w-full h-4/5 bg-red-300 z-10 items-start justify-center hidden flex-col p-5">
    <h1 class="text-lg">${rgbaAndHsl[0]}</h1><h1 class="text-lg">hex: ${color}</h1><h1 class="text-lg">${rgbaAndHsl[1]}</h1> 
    </div>`
    container1.appendChild(colorBlock);
  });

  analogous.forEach((color) => {
    const colorBlock = document.createElement("div");
    colorBlock.classList.add("colorBlock");
    colorBlock.style.width = "16.66%";
    colorBlock.style.height = "100%";
    colorBlock.style.backgroundColor = color;
    colorBlock.style.position = "relative";
    colorBlock.style.zIndex = "-1";
    let rgbaAndHsl = mycolorConversion(color);
    colorBlock.innerHTML = `<div class="absolute top-10 w-full h-4/5 bg-red-300 z-10 items-start justify-center hidden flex-col p-5">
    <h1 class="text-lg">${rgbaAndHsl[0]}</h1><h1 class="text-lg">hex: ${color}</h1><h1 class="text-lg">${rgbaAndHsl[1]}</h1> 
    </div>`
    container2.appendChild(colorBlock);
  });

  complementary.forEach((color) => {
    const colorBlock = document.createElement("div");
    colorBlock.classList.add("colorBlock");
    colorBlock.style.width = "16.66%";
    colorBlock.style.height = "100%";
    colorBlock.style.backgroundColor = color;
    colorBlock.style.position = "relative";
    colorBlock.style.zIndex = "-1";
    let rgbaAndHsl = mycolorConversion(color);
    colorBlock.innerHTML = `<div class="absolute top-10 w-full h-4/5 bg-red-300 z-10 items-start justify-center hidden flex-col p-5">
    <h1 class="text-lg">${rgbaAndHsl[0]}</h1><h1 class="text-lg">hex: ${color}</h1><h1 class="text-lg">${rgbaAndHsl[1]}</h1> 
    </div>`
    container3.appendChild(colorBlock);
  });

  triadic.forEach((color) => {
    const colorBlock = document.createElement("div");
    colorBlock.classList.add("colorBlock");
    colorBlock.style.width = "16.66%";
    colorBlock.style.height = "100%";
    colorBlock.style.backgroundColor = color;
    colorBlock.style.position = "relative";
    colorBlock.style.zIndex = "-1";
    let rgbaAndHsl = mycolorConversion(color);
    colorBlock.innerHTML = `<div class="absolute top-10 w-full h-4/5 bg-red-300 z-10 items-start justify-center hidden flex-col p-5">
    <h1 class="text-lg">${rgbaAndHsl[0]}</h1><h1 class="text-lg">hex: ${color}</h1><h1 class="text-lg">${rgbaAndHsl[1]}</h1> 
    </div>`
    container4.appendChild(colorBlock);
  });
  vibrantMuted.forEach((color) => {
    const colorBlock = document.createElement("div");
    colorBlock.classList.add("colorBlock");
    colorBlock.style.width = "16.66%";
    colorBlock.style.height = "100%";
    colorBlock.style.backgroundColor = color;
    colorBlock.style.position = "relative";
    colorBlock.style.zIndex = "-1";
    let rgbaAndHsl = mycolorConversion(color);
    colorBlock.innerHTML = `<div class="absolute top-10 w-full h-4/5 bg-red-300 z-10 items-start justify-center hidden flex-col p-5">
    <h1 class="text-lg">${rgbaAndHsl[0]}</h1><h1 class="text-lg">hex: ${color}</h1><h1 class="text-lg">${rgbaAndHsl[1]}</h1> 
    </div>`
    container5.appendChild(colorBlock);
  });
  let palettes = document.querySelectorAll(".palettes");
  palettes.forEach((val)=>{
    val.childNodes[0].style.borderRadius = "0.75rem 0 0 0.75rem";
    val.childNodes[palettes.length].style.borderRadius = "0 0.75rem 0.75rem 0";
  })
}


function events() {
  let palettes = document.querySelectorAll(".colorBlock");
  
  palettes.forEach((val)=>{
    console.log("Hi")
      val.addEventListener("mousemove",()=>{
        val.children[0].classList.add("flex");
        val.children[0].classList.remove("hidden");
    })
  })
  palettes.forEach((val)=>{
    console.log("Bye")
      val.addEventListener("mouseleave",()=>{
        val.children[0].classList.add("hidden");
        val.children[0].classList.remove("flex");
      })
  })
}


// Wheel to create palettes 

colorPicker.on("color:change", ()=>{
  let myhex = colorPicker.color.hexString;
  let myrgb = colorPicker.color.rgbString;
  let myhsl = colorPicker.color.hslString;

  hex.innerHTML = myhex;
  rgb.innerHTML = myrgb;
  hsl.innerHTML = myhsl;
  display(myhex);
  events();
});

display("#ffffff");
events()