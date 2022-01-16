// Make the DOMs movable
// adapted from:
// https://www.petercollingridge.co.uk/tutorials/svg/interactive/dragging/?fbclid=IwAR16i0kQ9kNehNHqilTA1AaHXITMQJDZSR-okclR6Uxe2Zf7F3Mcs8lbBvI


// text exclusion...
// https://drafts.csswg.org/css-exclusions/
// https://chromatichq.com/insights/breaking-box-shape-outside

const draggableDOMs = document.querySelectorAll(".draggable");

var domActive = null;

function makeDraggable(element) {

    element.addEventListener('mousedown', startDrag);
    element.addEventListener('mousemove', drag);
    element.addEventListener('mouseup', endDragWRenderText);
    element.addEventListener('mouseleave', endDrag);

    // for mobile devices
    // element.addEventListener('touchstart', startDrag);
    // element.addEventListener('touchmove', drag);
    // element.addEventListener('touchend', endDrag);
    // element.addEventListener('touchleave', endDrag);
    // element.addEventListener('touchcancel', endDrag);

    function startDrag() {
        domActive = element;
        domActive.style.zIndex = 3;
    };
    function drag(event) {
        if (domActive) {
            event.preventDefault();
            let transformNow = domActive.style.transform;
            if (transformNow === ""){
                transformNow = "translate(0px, 0px)";
            }
            let xNow = parseInt(transformNow.split('(')[1]
                .split(', ')[0].split('px')[0]);
            let yNow = parseInt(transformNow.split('(')[1]
                .split(', ')[1].split('px)')[0]);
            xNow += event.movementX;
            yNow += event.movementY;
            domActive.style.transform =
                `translate(${xNow}px, ${yNow}px)`;
        }
    };
    function endDrag() {
        if (domActive){
            domActive.style.zIndex = 2;
            domActive = null;
        }
    };
    function endDragWRenderText() {
        renderText();
        endDrag();
    }
}

draggableDOMs.forEach(element => {
    makeDraggable(element);
})
