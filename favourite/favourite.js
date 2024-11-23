let storage = localStorage;

function mycolorConversion(rgb) {
  const HEXColor = chroma(rgb).hex(); 
  const hslColor = chroma(rgb).hsl(); 

  if (isNaN(hslColor[0])) {
    return [HEXColor, null]; 
  }

  const hslString = `hsl(${Math.round(hslColor[0])}, ${Math.round(hslColor[1] * 100)}%, ${Math.round(hslColor[2] * 100)}%)`;
  return [HEXColor, hslString];
}

// Extract colors from input
function extractColors(rgb) {
  const codes = mycolorConversion(rgb); 

  const colors = {
    HEX: codes[0],
    RGB: rgb,
  };

  if (codes[1]) {
    colors.HSL = codes[1];
  }

  return colors;
}


// darkMode
let darkMode = document.querySelector("#dark");
let child2 = document.querySelectorAll(".white");


function dark1() {
  document.querySelector("body").classList.remove("bg-[#2b343c]");
    darkMode.classList.remove("border-white")
    darkMode.classList.add("border-black")
    darkMode.style.color = "black";
    child2.forEach((val)=>{
      val.style.color = "black";
    })
    document.querySelector("#favourite2").classList.remove("hidden");
    document.querySelector("#favourite1").classList.add("hidden");
    document.querySelectorAll(".binwhite").forEach((val)=>{
      val.classList.add("hidden");
    })
    document.querySelectorAll(".binblack").forEach((val)=>{
      val.classList.remove("hidden");
    })
    document.querySelectorAll(".head").forEach((val)=>{
      val.style.color = "black";
    })
}
function dark2() {
  document.querySelector("body").classList.add("bg-[#2b343c]");
    darkMode.classList.remove("border-black")
    darkMode.classList.add("border-white")
    darkMode.style.color = "white";
    child2.forEach((val)=>{
      val.style.color = "white";
    })
    document.querySelector("#favourite1").classList.remove("hidden");
    document.querySelector("#favourite2").classList.add("hidden");
    document.querySelectorAll(".binwhite").forEach((val)=>{
      val.classList.remove("hidden");
    })
    document.querySelectorAll(".binblack").forEach((val)=>{
      val.classList.add("hidden");
    })
    document.querySelectorAll(".head").forEach((val)=>{
      val.style.color = "white"
    })
}

darkMode.addEventListener('click',()=>{
  if (JSON.parse(storage.getItem("val")) === 1){
    storage.setItem("val",JSON.stringify(0));
    dark1();
  }
  else {
    storage.setItem("val",JSON.stringify(1));
    dark2();
  }
})

//displaying Content
function display(values) {
  let div = `<div class="w-full"><div class="flex justify-end items-center"><img src="../images/binblack.png" class="w-8 binblack bins"><img src="../images/binwhite.png" class="w-8 binwhite bins"></div><div class="palettes w-full h-[200px] flex justify-center mb-12 items-center border-2 rounded-xl max-sm:h-20 max-sm:mb-14" id="palette1"></div></div>` 
  let msg = `<h1 class="text-center text-3xl head max-md:text-xl max-ssm:text-[18px]">Sorry, you didn't select any palettes</h1>`;
  let mycolors = values;
  
  let main = document.querySelector("#mainContent");
  main.innerHTML = ""
  if (mycolors === null || mycolors.length === 0) {
    main.innerHTML = msg;
  }
  else {
    main.innerHTML = `
    <div class="flex justify-between items-center flex-wrap"><h1 class="text-4xl font-bold my-5 head max-md:text-xl max-ssm:text-[18px]">Palettes You Chose!</h1><button class="bg-blue-500 text-white text-2xl px-4 py-2 my-5 rounded-md max-lg:text-xl  max-ssm:text-[14px]" id="generatePDF">Download the pdf</button></div>`;
    mycolors.forEach((val,index)=>{
        main.innerHTML += div;                                                                                                                                   
        val.forEach(()=>{
          main.children[index+1].children[1].innerHTML +=  `<div class="w-[16.66%] h-full"></div>`
        })
    })
  }
  let palettes = document.querySelectorAll(".palettes");
  palettes.forEach((val,ind)=>{
    Array.from(val.children).forEach((val,index)=>{
      val.style.backgroundColor = mycolors[ind][index]
    })
    val.childNodes[0].style.borderRadius = "0.75rem 0 0 0.75rem";
    val.childNodes[val.children.length-1].style.borderRadius = "0 0.75rem 0.75rem 0";
  })

  if (JSON.parse(localStorage.getItem("colors")) === null) {
    document.querySelector(".count").innerHTML = 0;
  }
  else {
    document.querySelector(".count").innerHTML = JSON.parse(localStorage.getItem("colors")).length;
  }
  if (JSON.parse(storage.getItem("val")) === 0) {
    dark1();
  } else {
    dark2()
  }


  //pdf feature
  let mydiv = ""; 
  let mydate = new Date();
  mycolors.forEach((val,ind) => {
    let html = "";
    val.forEach((myval, index) => {
      const result = extractColors(myval);
      console.log(result)

      if (Object.keys(result).length === 3) {
        html += `
          <h4>Color ${index + 1}</h4>
          <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <div style="width: 50px; height: 50px; background-color: ${result.HEX}; border: 1px solid #ccc; margin-right: 10px;"></div>
            <div style="display: flex; align-items: center; flex-wrap: wrap;">
              <p style="font-size: 14px; margin-right: 20px">RGB Code: <strong>${result.RGB}</strong></p>
              <p style="font-size: 14px; margin-right: 20px">HEX Code: <strong>${result.HEX}</strong></p>
              <p style="font-size: 14px; margin-right: 20px">HSL Code: <strong>${result.HSL}</strong></p>
            </div>
          </div>`;
      }
      else {
        html += `
          <h4>Color ${index + 1}</h4>
          <div style="display: flex; align-items: center; margin-bottom: 10px; flex-wrap: wrap;">
            <div style="width: 50px; height: 50px; background-color: ${result.HEX}; border: 1px solid #ccc; margin-right: 10px;"></div>
            <div style="display: flex; align-items: center; flex-wrap: wrap;">
              <p style="font-size: 14px; margin-right: 20px">RGB Code: <strong>${result.RGB}</strong></p>
              <p style="font-size: 14px; margin-right: 20px">HEX Code: <strong>${result.HEX}</strong></p>
            </div>
          </div>`;
      }
    });
    mydiv += `<div style="margin: 30px 0"><h1 style="font-weight: 700; font-size: 22px;">Palette ${ind+1}</h1>${html}</div><hr>`;
  });
  
  const html1 = `
  <div id="pdfContent" style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h1 style="text-align: center; font-weight: 700; font-size: 22px;">ColorCraft</h1>
    <p style="text-align: center;">Generated on: ${mydate.toLocaleString()}</p>
    
    <h3 style="margin-top: 20px;">Palette Overview</h3>
    <div id="dispalycolor">
      ${mydiv}
    </div>
    
    <h3 style="margin-top: 20px;">Usage Tips:</h3>
    <p>
      This color palette is perfect for creating a warm, energetic website or app interface. The analogous colors blend harmoniously.
    </p>
    
    <footer style="margin-top: 30px; text-align: center; font-size: 0.9em; color: #666;">
      <p style="margin-bottom:15px">Generated with <strong>ColorCraft</strong> – <a href="https://mycolorcraft.netlify.app/" target="_blank" style="color: rgb(59 130 246)">www.colorcraftapp.com</a></p>
      <p style="margin-bottom:15px">For more palettes, visit our website!</p>
    </footer>
  </div>`;
  
  document.querySelector("#generatePDF").addEventListener("click", () => {
    const options = {
      margin: 1,
      filename: "Custom_Color_Palette.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
  
    html2pdf().set(options).from(html1).save();
  });
  


  //bin feature 
    let bins = document.querySelectorAll(".bins");
    bins.forEach((val, index) => {
      val.addEventListener("click", () => {
        let mycolors = JSON.parse(storage.getItem("colors"));
        mycolors.splice(Math.floor(index / 2), 1); 
        storage.setItem("colors", JSON.stringify(mycolors));
        display(JSON.parse(storage.getItem("colors"))); 
      });
    });
}

display(JSON.parse(storage.getItem("colors")))

