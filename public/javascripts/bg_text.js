

const text = "Chimera is an experimental reading group started in Summer 2021. The participants in the group are recruited from different programs at MIT, including ACT, Media Lab, Architecture, and CMS. The participants were required to contribute at least one reading to the reading pool as a starting point of departure. Each week, the participant would receive a different reading from the pool, annotate in their own ways, and return it to us. They could see the annotations on the reading they received, without knowing who had marked those pages. After six weeks, all the readings were returned to their original contributors with layers of traces left by others. The project started from the thinking on circulation of knowledge and books, and the hope to continue the reading practices in classes, where students share their thoughts and engage in discussions. We were prompted to ask, is reading a necessarily private activity? An avid reader might be assumed of having too much eccentricity. It is often thought of as embarking on a private journey in the search of knowledge, or an escape of the complex social relations. When Jean des Esseintes retreated into his own safe haven, did he really break away from the disgusting society? There is a hint on the ideal purification of knowledge in a pristine book, untouched by others, faithfully belonging to the owner. A private property." +
    "Yet, books were not always that clean. Before the printings were made available in a large scale, books were hand-copied and passed onto others. Words were rewritten by others, and sometimes altered, either intentionally or mistakenly. Without the manuscript, we can never know what Cao Xueqin had originally written in The Dreams of Red Chamber, but with all the different hand-copied versions and the annotations on them, we can piece out parts of the lost chapters. Margin, the leftover of the codex time, when the empty space was needed to visually separate the writing blocks, still performs important functions till today. It is the space where the reader leaves their marks, where their mind dwells, much like the margins within a city. Occasionally, a book borrowed from the library might be filled with marks of its previous users, channeling the strangers across the time. A PDF or EPUB today is unlikely to receive the same treatment, unless it’s a rarely noticed book, that is only digitized through photocopying, circulating underground, in a degraded quality. Another version of the poor image." +
    "The Chimera project is an exploration of the possibility of connections, of shared intimacies, of populated margins. It is an attempt to visualize everything that’s already there. Or perhaps it’s only a tiny pleasure of encountering the non-virtual in the pandemic time. Chimera refers to the mythological creature that’s made of different animals with their distinguishable features. Biologically, it also refers to genetically mixed organisms. Here, with some surrealist undertone, it is the cascade of the knowledge building with the anonymous, the interferences and diffractions coming from the multiverses, and the curiosity about the disorder, the undesired, and the impure."

const words = text.split(' ').filter(s => s);
const divs = document.getElementById("viewport").querySelectorAll('div');
const container = document.getElementById('bg-text-container');

window.addEventListener("load", showDivs);
window.addEventListener('resize', renderText);


let i = 0;

function showDivs(){
    i++;
    let div = document.getElementById("div-" + String(i));
    if(div){
        div.style.display = "block";
        renderText();
        setTimeout("showDivs()", 100);
    }
}

function isOverlap(divA, divB, offset) {
    var boxA = divA.getBoundingClientRect(),
        boxB = divB.getBoundingClientRect();
    if (boxB.left - offset < boxA.right && boxB.top - offset < boxA.bottom
        && boxA.top < boxB.bottom + offset && boxA.left < boxB.right + offset){
        return true;
    }
}


const navHeight = document.querySelector("nav").clientHeight;
const leftMargin = 10;

function renderText(){
    document.querySelectorAll("div.bg-text").forEach(item => {
        item.remove();
    });
    let left = leftMargin, top = navHeight;
    for (let i = 0; i < words.length; i++){
        let newDiv = document.createElement("div");
        newDiv.className = "bg-text";
        newDiv.innerHTML = words[i];
        newDiv.style.position = "absolute";
        newDiv.style.top = String(top) + "px";
        newDiv.style.left = String(left) + "px";
        newDiv.style.zIndex = -1;
        newDiv.id = String(i);
        newDiv = container.appendChild(newDiv);
        left += newDiv.clientWidth;
        for(let i = 0; i<divs.length; i++){
            if (isOverlap(newDiv, divs[i], 2)){
                container.removeChild(newDiv);
                left = divs[i].getBoundingClientRect().right + Math.random()*50 + 15;
                newDiv.style.left = String(left) + "px";
                container.appendChild(newDiv);
                left += newDiv.clientWidth;
            }
        };
        if (left > document.body.clientWidth - leftMargin) {
            left = leftMargin;
            top += newDiv.clientHeight; //line height
            newDiv.style.top = String(top) + "px";
            newDiv.style.left = String(left) + "px";
            container.removeChild(newDiv);
            container.appendChild(newDiv);
            left += newDiv.clientWidth;
        };
        left += 12; //space width
    }
}
