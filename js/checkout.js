let item_container = document.getElementById("item-container")
// Lấy tất cả các khóa trong Local Storage
const keys = Object.keys(localStorage);
let order = ``
// Kiểm tra từng khóa và lấy giá trị tương ứng
keys.forEach(key => {
    const value = localStorage.getItem(key)
    order += `
          <div class="item under">
            <div class="item-title">
              <p class="name-item">${key}</p>
              <p class="num-sell">+1000 đã bán</p>
            </div>
            <div class="count">
              <button class="btn btn-light minus">-</button>
              <span class="btn btn-primary count-num">1</span>
              <button class="btn btn-light add">+</button>
            </div>
            <p class="total-priceItem">${value}<span>.000 đ</span> </p>
          </div>
    `
  });
  item_container.innerHTML = order;

  let minusBtns = document.getElementsByClassName("minus")
  let addBtns = document.getElementsByClassName("add")
  let totalPriceItemList = document.getElementsByClassName("total-priceItem")

  let subTotalPrice = document.getElementById("subtotal-price")
  let shippingPrice = document.getElementById("shipping-price")
  let totalPrice = document.getElementById("total-price")
  let totalPriceModal = document.getElementById("total-price-modal")


  handleSubTotal()
  handleTotal()
  Array.from(minusBtns).forEach(element => {
    element.addEventListener('click', (e)=>{
      handleIncre(e)
      handleSubTotal()
      handleTotal()
    })
  })

  Array.from(addBtns).forEach(element =>{
    element.addEventListener('click',(e)=>{
      handleIncre(e)
      handleSubTotal()
      handleTotal()
    })
  })

  function handleIncre (e){
  
    if(e.target.textContent == "-"){
      if(e.target.nextElementSibling.textContent == "1"){
        e.target.parentNode.parentNode.remove()
        localStorage.removeItem(e.target.parentNode.parentNode.querySelector(".name-item").textContent)       
      } else {
        e.target.nextElementSibling.textContent = parseInt(e.target.nextElementSibling.textContent) - 1
        e.target.parentNode.parentNode.querySelector(".total-priceItem").textContent = parseInt(e.target.parentNode.parentNode.querySelector(".total-priceItem").textContent) - parseInt(localStorage.getItem(e.target.parentNode.parentNode.querySelector(".name-item").textContent)) + ".000 đ"
      }
    } 
    if(e.target.textContent == "+") {
      e.target.previousElementSibling.textContent = parseInt(e.target.previousElementSibling.textContent) + 1
      e.target.parentNode.parentNode.querySelector(".total-priceItem").textContent = parseInt(e.target.parentNode.parentNode.querySelector(".total-priceItem").textContent) + parseInt(localStorage.getItem(e.target.parentNode.parentNode.querySelector(".name-item").textContent)) + ".000 đ"
    }
  
  }


  function handleSubTotal(){
    let sum = 0
    for(let i =0; i < totalPriceItemList.length; i++){
      sum += parseInt(totalPriceItemList[i].textContent)
    }
  
    subTotalPrice.textContent = sum + ".000 đ" 
  }
  
  function handleTotal(){
    totalPrice.textContent = parseInt(subTotalPrice.textContent) + parseFloat(shippingPrice.textContent) + "00 đ" 
    totalPriceModal.textContent = totalPrice.textContent
  }



;((event) => {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()