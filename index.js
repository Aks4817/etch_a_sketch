let board_size = 16;
const board = document.querySelector('.board');

let mode = 5;            //0 for eraser         1 for black drawing           2 for warm          3 for random cold              4 for gradient
let grad_var = 0;
let color = "";

const warm = ["#FF0000", "#FFA500", "#FF7F50", "#FFD700", "#FFFF00", "#FF6347", "#FA8072", "#FFDAB9", "#FF8C00", "#A0522D"];
const cold = [
    "#00FFFF",    // Aqua
    "#00CED1",    // DarkTurquoise
    "#4169E1",    // RoyalBlue
    "#4682B4",    // SteelBlue
    "#87CEEB",    // SkyBlue
    "#B0E0E6",    // PowderBlue
    "#ADD8E6",    // LightSkyBlue
    "#87CEFA",    // LightSteelBlue
    "#1E90FF",    // DodgerBlue
    "#6495ED"     // CornflowerBlue
];

const grad = [
    "#E6E6E6",
    "#CCCCCC",
    "#B3B3B3",
    "#999999",
    "#808080",
    "#666666",
    "#4D4D4D",
    "#333333",
    "#1A1A1A",  // Near Black
    "#000000"   // Black
]

function boarding(board_size) {
    const boar = document.querySelector('.board').innerHTML = '';
    for (let i = 1; i <= board_size; i++) {
        const row = document.createElement('div');
        row.setAttribute('style', `display:flex; flex-direction:row;`)
        // row.classList.add(`row${i}`);
        for (let j = 1; j <= board_size; j++) {
            const temp = document.createElement('div');
            temp.setAttribute('style', `display:block; background-color:white; width:${600 / board_size}px; height:${600 / board_size}px;`);
            temp.setAttribute('id', `cell${i * board_size + j}`);
            // temp.classList.add(`col${j}`);
            temp.classList.add(`cell`);
            row.appendChild(temp);
        }
        board.appendChild(row);
    }
    listeners();
}
boarding(16);

function changeSize(x) {
    const sizedisplay = document.getElementById('showsize').textContent = `${x} x ${x}`;
    board_size = x;
    boarding(x);
}

function setcolor(z) {
    if (mode == 0) {
        const active_cell = document.getElementById(z).style.backgroundColor = 'white';
    }
    else if (mode == 1) {
        const active_cell = document.getElementById(z).style.backgroundColor = 'black';
    }
    else if (mode == 2) {
        const active_cell = document.getElementById(z).style.backgroundColor = warm[Math.floor(Math.random() * 10)];
    }
    else if (mode == 3) {
        const active_cell = document.getElementById(z).style.backgroundColor = cold[Math.floor(Math.random() * 10)];
    }
    else if (mode == 4) {
        const active_cell = document.getElementById(z).style.backgroundColor = grad[grad_var++];
        if (grad_var == 9) {
            grad_var = 0;
        }

    }
    else {
        const active_cell = document.getElementById(z).style.backgroundColor = color;

    }
}

function listeners() {

    const slider = document.getElementById('sizeslider')
    slider.onchange = (e) => changeSize(e.target.value)


    const cells = document.querySelectorAll('.cell');
    cells.forEach((cel) => {

        cel.addEventListener('mouseover', () => {
            setcolor(cel.id);
        });
    });

    const settings = document.querySelectorAll('.pen');
    settings.forEach((set) => {
        set.addEventListener('click', () => {
            document.getElementById(mode).style.backgroundColor = '#ededed';
            mode = set.id;
            set.style.backgroundColor = "grey";
            if (set.id == 5) {
                set.addEventListener('input', () => {
                    color = set.value;
                    console.log(color);
                })

            }
        });
    });

    document.querySelector('.clearAll').addEventListener('click', () => { 
        boarding(board_size); 
    });

}
