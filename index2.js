const data = { h1: "To do list", input: "", button: "Submit", h2: "To do items", li: [] };
// [type, value || children, handlers]

let oldVirtualDom,
children;

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

function diffAlgorithm(oldVirtualDom,newVirtualDom,children) {
newVirtualDom.forEach((element,index)=> {
    if(JSON.stringify(element)!==JSON.stringify(oldVirtualDom[index])){
const [type,value,handler] = element
 if(Array.isArray(value)){
    if(type==="ul"){
     children[index].appendChild(renderDomElement(value[value.length-1]))
    }else{
    diffAlgorithm(oldVirtualDom[index][1],value,children[index].children)
    }
 }else{
 children[index].value = value;
 children[index].textContent = value;
 }
    }
})

}

function renderDom () {
    if(!oldVirtualDom){
        children = virtualDom().map(renderDomElement);
        oldVirtualDom = virtualDom();
        document.body.replaceChildren(...children);
    }else{
diffAlgorithm(oldVirtualDom,virtualDom(),children);
    }
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