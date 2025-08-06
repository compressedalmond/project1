const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");


generateBtn.addEventListener("click", generatePalette);

paletteContainer.addEventListener("click",function(e) {
    if(e.target.classList.contains("copy-btn")){
        const hexValue = e.target.previousElementSibling.textContent;

        navigator.clipboard
        .writeText(hexValue)
        .then(()=>showCopySucess(e.target))
        .catch((err)=>console.log(err));
    } else if (e.target.classList.contains("color")) {
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;
        navigator.clipboard
        .writeText(hexValue)
        .then(()=>showCopySucess(e.target.nextElementSibling.querySelector(".copy-btn")))
        .catch((err)=>console.log(err));

    }
    else if (e.target.classList.contains("lock-btn")) { 
        const lockIcon = e.target;
        const colorBox = lockIcon.closest(".color-box");
        colorBox.classList.toggle("locked");

        if (colorBox.classList.contains("locked")) {
            lockIcon.classList.remove("fa-lock-open");
            lockIcon.classList.add("fa-lock");
        } else {
            lockIcon.classList.remove("fa-lock");
            lockIcon.classList.add("fa-lock-open");
        }
}});

function showCopySucess(element){
    element.classList.remove("far","fa-copy");
    element.classList.add("fas","fa-check");

    element.style.color= "#48bb78";

    setTimeout(()=>{
        element.classList.remove("fas","fa-check");
        element.classList.add("far","fa-copy");
        element.style.color="";
    },1500);
}

function generatePalette() {
    const colorBoxes= document.querySelectorAll(".color-box");
    const colors=[];

    colorBoxes.forEach((box)=>{
        if(box.classList.contains("locked")){
            const hex = box.querySelector(".hex-value").textContent;
            colors.push(hex);
        } else{
            colors.push(generateRandomColor());
        }
    });

    updatePaletteDisplay(colors);
}
function generateRandomColor() {
    const letters ="0123456789ABCDEF";
    let color = "#";

    for(let i =0; i<6;i++){
        color +=letters[Math.floor(Math.random()*16)];
    }
    return color;
}

function updatePaletteDisplay(colors){
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach((box,index)=>{
        if(box.classList.contains("locked")) return;

        const color=colors[index];
        const colorDiv=box.querySelector(".color");
        const hexValue=box.querySelector(".hex-value");

        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;
    });
}

generatePalette();