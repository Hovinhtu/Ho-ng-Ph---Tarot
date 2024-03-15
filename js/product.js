import  data  from "./data.json" assert {type: "json"};

// fetch("./data.json")
//     .then((response)=>response.json())
//     .then((json) => console.log(json));

console.log(data);

let productList = document.getElementById("product-list");
let productItem = "";

for(let product of data){
    productItem += `
    <div class="product-item">
        <div class="product-img">
             <img src=${product.img} alt="img-here">
        </div>
        <div class="product-content">
            <p class="name">${product.name}</p>
            <p class="description" id="description">${product.description} </p>
            <span class="desc-more" id="click-for-more">Xem thêm</span>
            <p class="category">${product.category}</p>
            <ul class="price">
                <li>140K</li>
                <li>250K</li>
                <button class="btn" style="align-self: right;">Click buy!!</button>
            </ul>
        </div>
    </div>  `;
}

productList.innerHTML = productItem;




// Ui js
var clickForMore = document.getElementById("click-for-more");
var desc = document.getElementById("description");

clickForMore.addEventListener("click", function(){
    if(desc.style.display == "block"){
        desc.style.display = "-webkit-box";
    } else {
        desc.style.display = "block";
    }
});



