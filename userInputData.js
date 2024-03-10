
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
let input_package = document.getElementById("package-name")
let input_image = document.getElementById("url-image")
let input_desc = document.getElementById("desc")
let input_choice = document.getElementById("choice")
let input_choiceDesc = document.getElementById("choice-desc")
let input_price = document.getElementById("price")
let check_choice = document.getElementById("check-choice")

let addBtn = document.getElementById('add');
let updateBtn = document.getElementById('update');
let deleteBtn = document.getElementById('delete');
let listBtnOption = document.getElementsByClassName("btn-option");
let sendBtn = document.getElementById("send")
var indexOption = -1
let flag_id = false
let flag_checkBox = false


Array.from(listBtnOption).forEach((element, index)=>{
    element.addEventListener("click", ()=>{
        for(let i = 0; i < listBtnOption.length; i++){
            listBtnOption[i].classList.remove("active");
        }
        element.classList.add("active");
        indexOption = index;
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



function validateForm(){
        switch(indexOption){
            case 0:
                console.log(flag_checkBox)
                if(flag_checkBox){
                    console.log(flag_id)
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
                updateData()
                break
            default:
                deleteData()
        }
    
}


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
    push(ref(db, 'EmployeeSet/' + input_id.value + "/choices"),{
      name: input_choice.value, description: input_choiceDesc.value, price:[input_price.value], 
    })
    .then(()=>{
        alert("Data pushed successfully")
    })
    .catch((error)=>{
        alert("Unsuccessfully");
        console.log(error)
    })
}

function updateData(){
    update(ref(db, 'EmployeeSet/' + input_id.value),{
        choices: [{name: input_choice.value, description: input_choiceDesc.value, price:[input_price.value]}],
        description: input_desc.value,
        image: input_image.value,
        name: input_package.value,
        id: input_id.value
    })
    .then(()=>{
        alert("Data updated successfully")
    })
    .catch((error)=>{
        alert("Unsuccessfully");
        console.log(error)
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

