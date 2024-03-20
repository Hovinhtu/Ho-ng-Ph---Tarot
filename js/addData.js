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

let add_button = document.getElementById("btn-primary")

add_button.addEventListener('click',()=>{
   let package_info = ``

   package_info += `
                    <tr>
                        <th 
                            scope="row" 
                            class="package-id"
                        >${input_id.length + 1}</th>
                        <td>
                            <input 
                                type="text" 
                                class="form-control input package-name" 
                                placeholder="Nhập vào đây">   
                        </td>
                        <td>
                            <textarea 
                                class="textarea package-description" 
                                rows="1" 
                                cols="25" 
                                placeholder="Nhập vào đây">
                            </textarea>
                        </td>
                        <td>
                            <input 
                                type="url" 
                                class="form-control input package-url" 
                                placeholder="Nhập vào đây">
                        </td>
                        <td style="display: flex;">
                              <select class="form-select select-choices" id="select-${input_id.length + 1}">
                                    <option value="add">Thêm</option>
                                </select>  
                        </td>
                        <td>
                            <input 
                                type="text" 
                                class="form-control input choice-name" 
                                placeholder="Nhập vào đây">
                        </td>
                        <td><textarea class="textarea choice-description" rows="1" cols="25"  placeholder="Nhập vào đây"></textarea></td>
                        <td><input type="text" class="form-control input price" placeholder="Nhập vào đây"></td>
                        <td><input class="form-check-input check-package-delete hidden" type="checkbox" value="" ></td>
                    </tr>
                `
    package_list.innerHTML += package_info

})
