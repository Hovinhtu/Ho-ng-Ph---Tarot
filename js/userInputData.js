
 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyD9MJ3ZRDcMU2DrG3jBSatMoDn3VpyFoK0",
   authDomain: "hoangphutarot.firebaseapp.com",
   databaseURL: "https://hoangphutarot-default-rtdb.asia-southeast1.firebasedatabase.app",
   projectId: "hoangphutarot",
   storageBucket: "hoangphutarot.appspot.com",
   messagingSenderId: "732984828498",
   appId: "1:732984828498:web:d437c2687d323f7bdab58b"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

import {getDatabase, ref, set, remove, get, child, push, update} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const db = getDatabase();

console.log(db)

let input_id = document.getElementById("id")
let input_package = document.getElementById("package-name"
)
let input_image = document.getElementById("url-image")
let input_desc = document.getElementById("desc")
let input_choice = document.getElementById("choice")
let input_choiceDesc = document.getElementById("choice-desc")
let input_price = document.getElementById("price")
let check_choice = document.getElementById("check-choice")
let list_choice1 = document.getElementById("list-choice-1")
let list_choice2 = document.getElementById("list-choice-2")
let wrap_delete = document.getElementsByClassName("wrap-delete")
let wrap = document.getElementsByClassName("wrap")
let tick_box = document.getElementsByClassName("tick-box")

let addBtn = document.getElementById('add');
let updateBtn = document.getElementById('update');
let deleteBtn = document.getElementById('delete');
let listBtnOption = document.getElementsByClassName("btn-option");
let sendBtn = document.getElementById("send")
var indexOption = -1
let flag_id = false
let flag_checkBox = false
let flag_select = false

Array.from(listBtnOption).forEach((element, index)=>{
    element.addEventListener("click", ()=>{
        for(let i = 0; i < listBtnOption.length; i++){
            listBtnOption[i].classList.remove("active");
        }
        element.classList.add("active");
        indexOption = index;
        switch (index){
            case 1:
                Array.from(wrap).forEach((element)=>{
                    element.classList.remove("hidden")
                })
                wrap_delete[0].style.display = "none";
                tick_box[0].style.visibility = "hidden";
                break
            case 2:
                Array.from(wrap).forEach((element)=>{
                    element.classList.add("hidden")
                })
                wrap_delete[0].style.display = "block"
                break
            default:
                Array.from(wrap).forEach((element)=>{
                    element.classList.remove("hidden")
                })
                wrap_delete[0].style.display = "none"
                tick_box[0].style.visibility = "visible";
        }
    })  
})


sendBtn.addEventListener("click",validateForm)
input_id.addEventListener('input', checkId)

check_choice.addEventListener('change', (e) => {
    if (e.target.checked) {
        flag_checkBox = true
    } else {
        flag_checkBox = false
    }
    console.log(flag_checkBox)
})

list_choice2.addEventListener('change',()=>{
    flag_select = true
    console.log("hello")
})

function validateForm(){
        switch(indexOption){
            case 0:
                if(flag_checkBox){
                    if(input_id.value == "" || isNaN(input_id.value) ){
                        console.log("ban can dien so vao day")
                    } else if(!flag_id) {
                        console.log("du lieu khong ton tai")
                    } else {
                        addChoiceData()
                    }
                } else {
                    if(input_id.value == "" || isNaN(input_id.value) ){
                        console.log("ban can dien so vao day")
                    } else if(flag_id) {
                        console.log("du lieu da bi trung")
                    } else {
                        addData()
                    }
                }

                break
            case 1:
                if(input_id.value == "" || isNaN(input_id.value) ){
                    console.log("ban can dien so vao day")
                } else if(!flag_id) {
                    console.log("du lieu khong ton tai")
                } else {
                    updateData()
                }
                break
            default:
                if(flag_select){
                    deleteChoiceData()
                } else {
                    deleteData()
                }
        }
    
}

// Add data
function checkId(){
    get(child(ref(db), "EmployeeSet/"))
    .then((snapshot)=>{
        if(snapshot.exists()){
            if(Object.keys(snapshot.val()).includes(input_id.value)){
                console.log("Du lieu da bi trung")
                flag_id = true
            } else {
                console.log("Du lieu khong bi trung")
                flag_id = false
            }

            if(indexOption == 1 ){// Nếu ở phần sửa sẽ đẩy hết giá trị ra màn hình
                get(child(ref(db), "EmployeeSet/"))
                .then((snapshot)=>{
                    if(snapshot.exists()){
                        if(snapshot.val()[input_id.value] != undefined){
                            input_package.value = snapshot.val()[input_id.value].name
                            input_image.value = snapshot.val()[input_id.value].image
                            input_desc.value = snapshot.val()[input_id.value].description
                            console.log(Object.values(snapshot.val()[input_id.value].choices))
                            Object.values(snapshot.val()[input_id.value].choices).forEach((element,index)=>{
                                    list_choice1.innerHTML += `<option value=${element.name}>${index}.${element.name}</option>`
                            })
                            list_choice1.addEventListener("change", function(){
                              input_choice.value = Object.values(snapshot.val()[input_id.value].choices)[list_choice1.selectedIndex - 1].name
                              input_choiceDesc.value = Object.values(snapshot.val()[input_id.value].choices)[list_choice1.selectedIndex - 1].description
                              input_price.value = Object.values(snapshot.val()[input_id.value].choices)[list_choice1.selectedIndex - 1].price
                            })
                        }
                    }
                     else {
                        console.log("Du lieu khong ton tai")
                    }
                })
                .catch((error)=>{
                    console.log("co loi" + error)
                }) 
            }
            if(indexOption == 2 ){// Nếu ở phần xóa sẽ đẩy hết giá trị ra màn hình
                get(child(ref(db), "EmployeeSet/"))
                .then((snapshot)=>{
                    if(snapshot.exists()){
                        if(snapshot.val()[input_id.value] != undefined){
                            Object.values(snapshot.val()[input_id.value].choices).forEach((element,index)=>{
                                    list_choice2.innerHTML += `<option value=${element.name}>${index}.${element.name}</option>`
                            })
                        }
                    }
                     else {
                        console.log("Du lieu khong ton tai")
                    }
                })
                .catch((error)=>{
                    console.log("co loi" + error)
                }) 
            }
        }
         else {
            console.log("Du lieu khong ton tai")
        }
    })
    .catch((error)=>{
        console.log("co loi" + error)
    }) 
}

function addData(){
    set(ref(db, 'EmployeeSet/' + input_id.value),{
      choices:[{name: input_choice.value, description: input_choiceDesc.value, price:[input_price.value]}], 
        description: input_desc.value,
        image: input_image.value,
        name: input_package.value,
        id: input_id.value
    })
    .then(()=>{
        alert("Data added successfully")
    })
    .catch((error)=>{
        alert("Unsuccessfully");
        console.log(error)
    })

    
}

function addChoiceData(){
    const newKey = push(child(ref(db), 'EmployeeSet/' + input_id.value + "/choices")).key;
    update(ref(db, 'EmployeeSet/' + input_id.value + "/choices/" + newKey),{
      name: input_choice.value, description: input_choiceDesc.value, price:[input_price.value]
    })
    .then(()=>{
        alert("Data pushed successfully")
    })
    .catch((error)=>{
        alert("Unsuccessfully");
        console.log(error)
    })
}

// Add data


// Update data
function updateData(){
    get(child(ref(db), "EmployeeSet/"))
    .then((snapshot)=>{
        if(snapshot.exists()){
            // Làm 2 cái update riêng
            // 1 cho gói lớn
            // 2 cho các gói nhỏ dựa trên lựa chọn trong phần selection
            update(ref(db, 'EmployeeSet/' + input_id.value),{
                description: (input_desc.value != "") ? input_desc.value : snapshot.val()[input_id.value].description,
                image: (input_image.value != "") ? input_image.value : snapshot.val()[input_id.value].image,
                name:(input_package.value != "") ? input_package.value : snapshot.val()[input_id.value].name,
                id: input_id.value
            })
            .then(()=>{
                alert("Data updated successfully")
            })
            .catch((error)=>{
                alert("Unsuccessfully");
                console.log(error)
            })

            update(ref(db, 'EmployeeSet/' + input_id.value + "/choices/" + Object.keys(snapshot.val()[input_id.value].choices)[list_choice2.selectedIndex - 1]),{            
                    name: input_choice.value, 
                     description: input_choiceDesc.value, 
                     price:[input_price.value]
            })
            .then(()=>{
                alert("Data updated successfully")
            })
            .catch((error)=>{
                alert("Unsuccessfully");
                console.log(error)
            })
        }
         else {
            console.log("Du lieu khong ton tai")
        }
    })
    .catch((error)=>{
        console.log("co loi" + error)
    }) 

    
}

function deleteData(){
    remove(ref(db, 'EmployeeSet/' + input_id.value))
    .then(()=>{
        alert("Data deleted successfully")
    })
    .catch((error)=>{
        alert("Unsuccessfully");
        console.log(error)
    })

}

function deleteChoiceData(){
    get(child(ref(db), "EmployeeSet/"))
    .then((snapshot)=>{
        if(snapshot.exists()){
            console.log(Object.keys(snapshot.val()[input_id.value].choices)[list_choice2.selectedIndex - 1])
            remove(ref(db, 'EmployeeSet/' + input_id.value + "/choices/" + Object.keys(snapshot.val()[input_id.value].choices)[list_choice2.selectedIndex - 1]))
            .then(()=>{
                alert("Choice Data delete successfully")
            })
            .catch((error)=>{
                alert("Unsuccessfully");
                console.log(error)
            })
        }
         else {
            console.log("Du lieu khong ton tai")
        }
    })
    .catch((error)=>{
        console.log("co loi" + error)
    }) 
}
// Push như bình thường
// Nếu sửa lựa chọn thì thay vì sửa hay xóa và thêm lựa chọn mới
// Tạo một list số thứ tự các lựa chọn khi chọn chế độ xóa
// Sửa thành text box
// Thêm danh sách lựa chọn
// Khi sửa chỉ cần nhập id dữ liệu sẽ tự fill vào nếu không có id sẽ báo id không tồn tại