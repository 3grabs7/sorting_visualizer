let unsortedArray = [];
let speed = 50;
let size = 100;

document.getElementById("speedrange").addEventListener('input', (e)=>{
    speed = (500 - e.currentTarget.value);
})

document.getElementById('sizerange').addEventListener('input', (e)=>{
    size = e.currentTarget.value;
})

document.getElementById('generatearray').addEventListener('click', () => {
    clearArray();
    generateBlocks();
})

document.getElementById('runsort').addEventListener('click', () => {
    let sortType = ""
    document.querySelectorAll('.header__list_options_button input').forEach((e)=>{
        if(e.checked) {
            sortType = e.value;
        }
    });
    
    switch (sortType) {
        case "bubble":
            bubbleSort();
            break;
        default:
            break;
    }
})

function clearArray() {
    document.querySelectorAll('.maincontainer__sortvisual__arraybar').forEach(e=>e.remove());
}

const container = document.querySelector(".maincontainer__sortvisual");

function generateBlocks() {
    const length = size;
    const numArray = [];
    for(let i = 0; i < length; i++) {
        numArray.push(Math.round(Math.random() * 1000));
    }
    //unsortedArray = [...numArray];
    for(let i = 0; i < length; i++) {   
        container.appendChild(Object.assign(document.createElement('div'), {
            classList: "maincontainer__sortvisual__arraybar", innerHTML: `${numArray[i]}`
        }))
    }
    let bars = document.querySelectorAll(".maincontainer__sortvisual__arraybar");
    bars.forEach((e, i) => e.style = `height:${numArray[i] / 10}%; width:${(100 / numArray.length) / 1.5}%;transform:translateX(${i * 0.001}px`);
  }
// Full circle transform:rotate(${-i/1.38}deg)


function swap(el1, el2) {
  return new Promise(resolve => {
    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);

    const transform1 = style1.getPropertyValue("transform");
    const transform2 = style2.getPropertyValue("transform");

    el1.style.transform = transform2;
    el2.style.transform = transform1;

    // Wait for the transition to end!
    window.requestAnimationFrame(function() {
      setTimeout(() => {
        container.insertBefore(el2, el1);
        resolve();
      }, 1);
    });
  });
}


const arraycolor = 'rgb(45, 136, 196)';
const sortedcolor = 'rgb(255, 204, 38)';
const comparecolor = 'rgb(170, 39, 39)';

async function bubbleSort() {
    let bars = document.querySelectorAll(".maincontainer__sortvisual__arraybar");
    for (let i = 0; i < bars.length - 1; i += 1) {
        for (let j = 0; j < bars.length - i - 1; j += 1) {
        bars[j].style.backgroundColor = 'rgb(170, 39, 39)';
        bars[j + 1].style.backgroundColor = 'rgb(170, 39, 39)';

        await new Promise(resolve =>
            setTimeout(() => {
            resolve();
            }, speed)
        );

        const value1 = Number(bars[j].innerHTML);
        const value2 = Number(bars[j + 1].innerHTML);

        if (value1 > value2) {
            await swap(bars[j], bars[j + 1]);
            bars = document.querySelectorAll(".maincontainer__sortvisual__arraybar");
        }

        bars[j].style.backgroundColor = 'rgb(45, 136, 196)';
        bars[j + 1].style.backgroundColor = 'rgb(45, 136, 196)';
        }

        bars[bars.length - i - 1].style.backgroundColor = 'rgb(255, 204, 38)';
    }
    document.querySelectorAll(".maincontainer__sortvisual__arraybar")
        .forEach(e=>e.style.backgroundColor = 'rgb(255, 204, 38)');
}

generateBlocks();
//bubbleSort();

