import dataShopping from "../Data/dataShopping.json" assert {type: "json"};

// fetch("./data.json")
//     .then((response)=>response.json())
//     .then((json) => console.log(json));

var shoppingList = document.getElementById("shopping-container");
var comboItem = "";

for (var item of dataShopping) {
    comboItem += `
    <div class="combo">
        <h1 class="combo-tittle">${item.name}</h1> 
        <div class="content">
            <div class="content-description">  
            ${checkContent()}
            </div> 
            <div class="combo-shopping">
                <div class="choices">
                ${renderChoiceName()}
                </div>
                ${renderDescription()}
                ${renderCostList()}
                <div class="cartBuy">
                    <button class="button cartBtn addToCart">Thêm vào giỏ hàng</button>
                    <button class="button cartBtn buyNow">Mua ngay</button>
                </div>
            </div>               
        </div>
    </div>  `;
}

function checkContent() {
    var checkCont = ``;
    if (item.image != "" && item.description != "") {
        checkCont += `<img src=${item.image} alt="img-here"></img>
                    <p class="description-para">${item.description}</p>`
    } else if (item.image != "") {
        checkCont += `<img src=${item.image} alt="img-here"></img>`
    } else {
        checkCont += `<p class="description-para">${item.description}</p>`
    }
    return checkCont;
}

function renderChoiceName(){
    var choiceNames = "";
    for (let choice of item.choices) {
        choiceNames += `<button class="${item.id} button normalBtn btn ">${choice.name}</button>`;
    }
    return choiceNames;
}

function renderDescription(){
    var descript = ``;
    for(let desc of item.choices){
        descript += `<p class="choices-desc-combo hidden">${desc.description}</p>`
    }
    return descript;
}

function renderCostList(){
    var costLists = ``;
    var costLi = ``
    for(let pri of item.choices){
        if(pri.price != []){
            for(let i = 0; i < pri.price.length; i++){
                costLi += `<li class="cost-style">${pri.price[i] + `.000`} <span>đ</span></li>`
            }
        }        
        costLists += ` <div class="cost hidden">
                            <ul class="cost-list">
                                ${costLi}
                            </ul>
                        </div> `;
        costLi = ``;
                
    }
    return costLists;
}
shoppingList.innerHTML = comboItem;
     
// // Other combo
var listBtn = document.getElementsByClassName("btn");
var listText = document.getElementsByClassName("choices-desc-combo");
var listCost = document.getElementsByClassName("cost");
var arrayId = [];
var countItemArray = [0];

// Đếm những id hiện có
Array.from(listBtn).forEach((element, index) => {
        arrayId[index] = element.classList[0];
})
console.log(arrayId)
for(let i = 0; i < arrayId.length-1; i++){
    if(arrayId[i] != arrayId[i + 1]){
        countItemArray.push(i+1);
    }
}
console.log(countItemArray)
for(let i = 0; i < countItemArray.length; i++){
    listBtn[countItemArray[i]].classList.add("activeBtn")
    listText[countItemArray[i]].classList.remove("hidden")
    listCost[countItemArray[i]].classList.remove("hidden")
}

//Duyệt qua tất cả các nút, những nút nào có id giống nhau khi có sự kiện
//Nút có sự kiện sẽ active các nút còn lại sẽ deactive
Array.from(listBtn).forEach((element, index) => {
    element.addEventListener("click", function () {
    console.log(element.classList[0])
    for(let i = 0; i < listBtn.length; i++){
        if(listBtn[i].classList[0] == element.classList[0]){
            listBtn[i].classList.remove("activeBtn")
            listText[i].classList.add("hidden")
            listCost[i].classList.add("hidden")
        }
    }
    element.classList.add("activeBtn")
    listText[index].classList.remove("hidden")
    listCost[index].classList.remove("hidden")
})
})

var listCostStyle = document.getElementsByClassName("cost-style");

Array.from(listCostStyle).forEach((element,index)=>{
    element.addEventListener("click", ()=>{
        for(let i = 0; i < listCostStyle.length ; i++){
            listCostStyle[i].classList.remove("active")
        }
        element.classList.add("active")
    })
})

// Xử lý khi mua hàng

let addToCartListBtn = document.getElementsByClassName("addToCart")
let buyNowListBtn = document.getElementsByClassName("buyNow")
let newCountItem = countItemArray

newCountItem.push(arrayId.length)

for(let i = 0; i < addToCartListBtn.length; i++){
    addToCartListBtn[i].addEventListener('click',()=>{
        for(let j = newCountItem[i]; j < newCountItem[i+1]; j++){
            if(listBtn[j].classList.contains("activeBtn")){
                let value = listBtn[j].parentNode.parentNode.querySelector(".active")!= null ? listBtn[j].parentNode.parentNode.querySelector(".active").textContent: listBtn[j].classList[0]
                value = value.slice(0, 3)
                localStorage.setItem(listBtn[j].textContent, value)  
            }
        }
    })
}

let btnBuyCart = document.getElementById("btnBuyCart")

btnBuyCart.addEventListener('click',()=>{
    data += data
    console.log(data)
})

