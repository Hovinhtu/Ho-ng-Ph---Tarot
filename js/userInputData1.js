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

let package_list = document.getElementById("package-list")
let input_id = document.getElementsByClassName("package-id")
let input_package = document.getElementsByClassName("package-name")
let input_desc = document.getElementsByClassName("package-description")
let input_image = document.getElementsByClassName("package-url")
let select_choices = document.getElementsByClassName("select-choices")
let input_choiceDesc = document.getElementsByClassName("choice-description")
let input_price = document.getElementsByClassName("price")
let check_package_delete = document.getElementsByClassName("check-package-delete")

renderData()

function renderData(){
    get(child(ref(db), "EmployeeSet/"))
    .then((snapshot)=>{
        if(snapshot.exists()){
            Object.values(snapshot.val()).
            forEach((package_element, index)=>{

                let package_info = ``
                let choice_info = ``

                package_info += `
                    <tr>
                        <th 
                            scope="row" 
                            class="package-id"
                        >${index + 1}</th>
                        <td>
                            <input 
                                type="text" 
                                class="form-control input package-name" 
                                placeholder="${package_element.name}">   
                        </td>
                        <td>
                            <textarea 
                                class="textarea package-description" 
                                rows="1" 
                                cols="25" 
                                placeholder="${package_element.description}">
                            </textarea>
                        </td>
                        <td>
                            <input 
                                type="url" 
                                class="form-control input package-url" 
                                placeholder="${package_element.image}">
                        </td>
                        <td>
                              <select class="form-select select-choices">
                                  <option selected>Open this select menu</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>  
                        </td>
                        <td><textarea class="textarea choice-description" rows="1" cols="25"  placeholder="Recipient's username"></textarea></td>
                        <td><input type="text" class="form-control input price" placeholder="Recipient's username"></td>
                        <td><input class="form-check-input check-package-delete" type="checkbox" value="" ></td>
                    </tr>
                `


                package_list.innerHTML += package_info
                console.log(package_element.xho)
            })
        }
         else {
            alert("Chưa có dữ liệu")
        }
    })
    .catch((error)=>{
        console.log("co loi" + error)
    }) 
}