const n = 20;
const arr = [];
var swap_val = 0;
var moves = [], swaps = [];

init();
function init() {
    stepIndx = 0, moves = [];
    document.querySelector(".description h3").textContent = "description";
    document.querySelector(".description h3").style.color = "black";

    for (let i = 1; i < n; i++)
        arr[i] = Math.ceil(350 * Math.random() + 10);
    arr[0] = 0;

    showBars();
    const copy_arr = [...arr];
    QuickSort(copy_arr);
}

/*  Step by Step animation */

function stepByStep() {
    if (stepIndx == moves.length) return;

    swap_val = animate([moves[stepIndx]], swap_val);
    stepIndx += 1;
}

/* play animation */

function quick_sort() {
    swap_val = animate(moves, 0);
}

function animate(moves, swap_val) {
    if (moves.length == 0) return swap_val;

    const [i, j, pivot, swap1, swap2] = moves.shift();
    const swapSound = document.getElementById("swap-sound");
    let description = "", description_color = "red";

    // swap1 -> true : swap(i,j)
    if (swap1 === true) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swapSound.play();
        swap_val += 1;
        description = "j ++";
    }

    // swap2 -> true : swap(i+1,pivot)
    else if (swap2 === true) {
        [arr[i + 1], arr[pivot]] = [arr[pivot], arr[i + 1]];
        swapSound.play();
        swap_val += 1;
        description = "partition complete !";
        //pivot = (i+1);
    }

    else {
        if (arr[j] <= arr[pivot]) description = "A[j] <= A[p] : swap( A[i+1], A[j] )";
        else description = "A[j] > A[p] : j++";
    }

    if (j == pivot && swap2 == false) description = "{ j == p } : swap( A[i+1] , A[p] )";

    const descriptElement = document.querySelector(".description h3");
    descriptElement.textContent = description;
    descriptElement.style.color = description_color;

    if (swap2 == false) showBars(moves, i, j, pivot);
    else showBars(moves, i, j, i + 1);

    document.getElementById('count').innerText = swap_val;

    setTimeout(function () {
        animate(moves, swap_val);
    }, 1000);

    return swap_val;
}

/* showBars function */
function showBars(indices, i, j, p) {

    const container = document.getElementById("container");
    container.innerHTML = "";

    for (let k = 0; k < n; k++) {
        const barContainer = document.createElement("div");
        barContainer.classList.add("bar-container");

        const bar = document.createElement("div");
        bar.style.height = arr[k] + "px";
        bar.classList.add("bar");

        const valueText = document.createElement("div");
        if (k > 0) {
            valueText.textContent = arr[k];
            valueText.classList.add("value-text");
        }

        if (k == i) {
            bar.style.backgroundColor = "#FFB52E";
            bar.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.5)";
            valueText.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.12)";
        }

        if (indices && k == j) {
            bar.style.backgroundColor = "#FF5C5C";
            bar.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.5)";
            valueText.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.12)";
        }

        if (k == p) {
            bar.style.backgroundColor = "#E983D8";
            bar.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.5)";
            valueText.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.12)";

            const pointer = document.createElement("div");
            pointer.textContent = "p";
            pointer.classList.add("pointer");
            barContainer.appendChild(pointer);
        }

        if (k == i || k == j) {
            const pointer = document.createElement("div");
            if (k == i && k == j) pointer.textContent = "i j";
            else {
                if (k == i) pointer.textContent = "i";
                if (k == j) pointer.textContent = "j";
            }
            pointer.classList.add("pointer");
            barContainer.appendChild(pointer);
        }

        barContainer.appendChild(bar);
        barContainer.appendChild(valueText);
        container.appendChild(barContainer);
    }
}

/* Quicksort Algorithm */

function QuickSort(arr) {
    moves = [];
    quickSort(1, arr.length - 1, arr);

    function quickSort(l, r, arr) {
        if (l >= r) return;
        let p = partition(l, r, arr);
        quickSort(l, p - 1, arr);
        quickSort(p + 1, r, arr);
    }

    function partition(l, r, arr) {
        let pivot = arr[r], i = l - 1;

        for (let j = l; j < r; j++) {
            moves.push([i, j, r, false, false]);
            if (arr[j] <= pivot) {
                i += 1;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                moves.push([i, j, r, true, false]);
            }
        }

        [arr[i + 1], arr[r]] = [arr[r], arr[i + 1]];
        moves.push([i, r, r, false, false]);
        moves.push([i, r, r, false, true]);
        return i + 1;
    }
}

/* MergeSort Algorithm */

function MergeSort(arr) {
    const swaps = [];
    mergeSort(0, arr.length - 1, arr);

    function mergeSort(l, r, arr) {
        if (l == r) return;

        let mid = l + (r - l) / 2;
        mergeSort(l, mid, arr);
        mergeSort(mid + 1, r, arr);
        merge(l, mid, r, arr);
    }

    function merge(l, mid, r, arr) {
        let temp = [], i = l, j = mid + 1, k = 0;
        while (i <= mid && j <= r) {
            if (arr[i] <= arr[j]) temp[k++] = arr[i++];
            else temp[k++] = arr[j++];
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= r) temp[k++] = arr[j++];

        for (let i = l; i <= r; i++) {
            arr[i] = temp[i - l];
        }
    }
}

/* night mode button */

document.addEventListener('DOMContentLoaded', function () {
    // Get references to the button and body element
    const nightModeButton = document.getElementById('night-mode-button');
    const body = document.body;

    // Add a click event listener to toggle night mode
    nightModeButton.addEventListener('click', function () {
        body.classList.toggle('night-mode');
    });
});
