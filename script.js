const animalList = document.querySelector("#animals-list")
const cards = document.querySelectorAll(".animal-card")
const rBtn = document.querySelector("#animals-cards-arrow-right")
const lBtn = document.querySelector("#animals-cards-arrow-left")
let count = 1
let position = 0
let width, numCol

const burgerMenu = document.querySelector(".burger-menu")
const burgerBtn = document.querySelector(".burger-btn")
const burgerBtnLines = Array.from(burgerBtn.children)

const scrollbar = document.querySelector(".scrollbar")
const scrollbarDrag = scrollbar.children[0]
const scrollbarXStart = scrollbar.getBoundingClientRect().left
let x

let burgerMenuOpacity, burgerAnimDuration = .3, burgerBtnBgColor, burgerMenuY

function changeSliderSettings() {
    if (window.innerWidth >= 1600) {
        width = 400
        numCol = 4
    } else if (window.innerWidth >= 640 && window.innerWidth <= 1530) {
        toggleBurgerMenu(false)
        width = 329
        numCol = 4
    }
}
changeSliderSettings()

lBtn.addEventListener("click", () => {
    position += count * width
    console.log(position);
    position = Math.min(position, 0)
    animalList.style.marginLeft = position + "px"
})
rBtn.addEventListener("click", () => {
    position -= count * width
    console.log(position);
    position = Math.max(position, -width * (cards.length / numCol - count))
    animalList.style.marginLeft = position + "px"
})

scrollbarDrag.onmousedown = function(event) {
    let shiftX = event.clientX - scrollbarDrag.getBoundingClientRect().left;
    moveAt(event.clientX - scrollbarXStart);

    function moveAt(x) {
        scrollbarDrag.style.left = x - shiftX + 'px';
        if (scrollbarDrag.getBoundingClientRect().left < scrollbarXStart) {
            scrollbarDrag.style.left = "0px";
        } else if (scrollbarDrag.getBoundingClientRect().left > scrollbar.offsetWidth + scrollbarXStart - scrollbarDrag.offsetWidth) {
            scrollbarDrag.style.left = scrollbar.offsetWidth - scrollbarDrag.offsetWidth + "px";
        }
    }

    function onMouseMove(event) {
        moveAt(event.clientX - scrollbarXStart);
    }

    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        scrollbarDrag.onmouseup = null;
    };
  };

  scrollbarDrag.ondragstart = function() {
    return false;
  };

scrollbar.addEventListener('dragstart', () => false)

window.addEventListener("resize", () => {
    changeSliderSettings()
})

function toggleBurgerMenu(active) {
    console.log(active);
    burgerMenu.classList.toggle("active")
    if (active) {
        burgerMenu.style.display = 'block'
        burgerMenuOpacity = 1
        burgerBtnBgColor = "orange"
        burgerMenuY = 0
    } else {
        setTimeout(() => burgerMenu.style.display = "none", burgerAnimDuration * 1000)
        burgerMenuOpacity = 0
        burgerBtnBgColor = "white"
        burgerMenuY = -burgerMenu.offsetHeight
    }

    gsap.to(burgerBtnLines, {
        backgroundColor: burgerBtnBgColor
    })

    gsap.to(burgerMenu, {
        opacity: burgerMenuOpacity,
        y: burgerMenuY,
        duration: burgerAnimDuration
    })
}

burgerBtn.addEventListener('click', () => {
    if (burgerMenu.classList.contains("active")) {
        burgerMenu.style.display = "block"
        toggleBurgerMenu(true)
    } else {
        toggleBurgerMenu(false)
    }
})