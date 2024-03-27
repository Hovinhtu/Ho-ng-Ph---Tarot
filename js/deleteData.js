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

import {getDatabase, ref, remove, get, child, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const db = getDatabase();

let delete_button = document.getElementById("btn-danger")
let deployBtn = document.getElementById('btn-success')

let check_package_delete = document.getElementsByClassName("check-package-delete")
let flag_delete_checkBox = true

delete_button.addEventListener('click',()=>{
    Array.from(check_package_delete).forEach(element => {
        flag_delete_checkBox ? element.classList.remove("hidden") : element.classList.add("hidden")
    })
    flag_delete_checkBox = !flag_delete_checkBox
})      

deployBtn.addEventListener('click',()=>{
    for(let i = 0; i < check_package_delete.length; i++){
        if(check_package_delete[i].checked){
            deleteData(i)
        }
    }
    //location.reload()
})

function deleteData(index){
    get(child(ref(db), "EmployeeSet/"))
    .then((snapshot)=>{
        if(snapshot.exists()){
            let arrayOfKey = Object.keys(snapshot.val())
            remove(ref(db, 'EmployeeSet/' + arrayOfKey[index]))
            .then(()=>{
                alert("Data deleted successfully")
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
