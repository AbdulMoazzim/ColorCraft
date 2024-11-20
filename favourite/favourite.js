let storage = localStorage;

// darkMode
let darkMode = document.querySelector("#dark");
let child2 = document.querySelectorAll(".white");
let child4 = document.querySelectorAll(".blackbd");


function dark1() {
  document.querySelector("body").classList.remove("bg-[#2b343c]");
    darkMode.classList.remove("border-white")
    darkMode.classList.add("border-black")
    darkMode.style.color = "black";
    child2.forEach((val)=>{
      val.style.color = "black";
    })
    child4.forEach((val)=>{
      val.classList.remove("border-white");
      val.classList.add("border-black");
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
    child4.forEach((val)=>{
      val.classList.remove("border-black");
      val.classList.add("border-white");
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
  let div = `<div class="w-full"><div class="flex justify-end items-center"><img src="../images/binblack.png" class="w-8 binblack bins"><img src="../images/binwhite.png" class="w-8 binwhite bins"></div><div class="palettes w-full h-[200px] flex justify-center mb-12 items-center border-2 border-black rounded-xl blackbd max-sm:h-20 max-sm:mb-14" id="palette1"></div></div>` 
  let msg = `<h1 class="text-center text-3xl head max-md:text-xl max-ssm:text-[18px]">Sorry, you didn't select any palettes</h1>`;
  let mycolors = values;
  
  let arr = mycolors.map((val)=>{
  return val.map((myval)=>{
    return myval.split(":")[2]
  })
  })
  
  let main = document.querySelector("#mainContent");
  main.innerHTML = ""
  if (mycolors === null || mycolors.length === 0) {
    main.innerHTML = msg;
  }
  else {
    main.innerHTML = `
    <div class="flex justify-between items-center my-5"><h1 class="text-4xl font-bold head max-md:text-xl max-ssm:text-[18px]">Palettes You Chose!</h1><button class="bg-blue-500 text-white text-2xl px-4 py-2 rounded-md max-lg:text-xl  max-ssm:text-[14px]">Download the pdf</button></div>`;
    arr.forEach((val,index)=>{
        main.innerHTML += div;                                                                                                                                   
        arr[index].forEach(()=>{
          main.children[index+1].children[1].innerHTML +=  `<div class="w-[16.66%] h-full"></div>`
        })
    })
  }
  let palettes = document.querySelectorAll(".palettes");
  palettes.forEach((val,ind)=>{
    Array.from(val.children).forEach((val,index)=>{
      val.style.backgroundColor = arr[ind][index]
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



