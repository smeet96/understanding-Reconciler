const data = { h1: "To do list", input: "", button: "Submit", h2: "To do items", li: [] };
// [type, value || children, handlers]
function virtualDom() {
    return [
        ["h1", data["h1"]],
        [
            "div",
            [
                ["input", data["input"], onInputChange],
                ["button", data["button"], onBtnClick]
            ]
        ],
        [
            "div",
            [
                ["h2", data["h2"]],
                ["ul", data["li"].map(element => ["li", element])]
            ]
        ]
    ];
};

function renderDom () {
    const children = virtualDom().map(renderDomElement);

    document.body.replaceChildren(...children);
}

function renderDomElement (item) {
const [type,value,handler] = item
const newElement = document.createElement(type)

if(Array.isArray(value)){
value.forEach((subElement) => {
    newElement.appendChild(renderDomElement(subElement));
})
}else{
    //individual element
    newElement.value = value
    newElement.textContent = value
    newElement.oninput = handler
    newElement.onclick = handler
}
return newElement;
}

function onInputChange (e) {
    data['input'] = e.target.value
}
function onBtnClick () {
    data["li"].push(data["input"]);
    renderDom()
}
renderDom()