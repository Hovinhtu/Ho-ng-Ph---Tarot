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

import {getDatabase, ref, set, child, push, update} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const db = getDatabase();

let package_list = document.getElementById("package-list")
let input_id = document.getElementsByClassName("package-id")
let input_package = document.getElementsByClassName("package-name")
let input_desc = document.getElementsByClassName("package-description")
let input_image = document.getElementsByClassName("package-url")
let select_choices = document.getElementsByClassName("select-choices")
let input_choiceName = document.getElementsByClassName("choice-name")
let input_choiceDesc = document.getElementsByClassName("choice-description")
let input_price = document.getElementsByClassName("price")

let add_button = document.getElementById("btn-primary")
let deployBtn = document.getElementById('btn-success')

add_button.addEventListener('click',()=>{
   let package_info = document.createElement("tr")
   let package_index = input_id.length + 1
   package_info.innerHTML = `
                    
                        <th 
                            scope="row" 
                            class="package-id"
                        >${package_index}</th>
                        <td>
                            <input 
                                type="text" 
                                class="form-control input package-name" 
                                placeholder="Nhập vào đây"
         
                                >   
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
                                placeholder="Nhập vào đây"
                                >
                        </td>
                        <td style="display: flex;">
                              <select class="form-select select-choices" id="select-${package_index}">
                                    <option value="1">1</option>
                                    <option value="add">Thêm</option>
                                </select>  
                        </td>
                        <td>
                            <input 
                                type="text" 
                                class="form-control input choice-name" 
                                placeholder="Nhập vào đây"
                                >
                        </td>
                        <td>
                            <textarea 
                                class="textarea choice-description" 
                                rows="1" 
                                cols="25"></textarea>
                        </td>
                        <td>
                            <input 
                                type="text" 
                                class="form-control input price" 
                                placeholder="Nhập vào đây"
                                >
                        </td>
                        <td><input class="form-check-input check-package-delete hidden" type="checkbox" value="" ></td>
                    
                `
                package_list.appendChild(package_info)

                for(let i = 0; i < input_id.length; i++){   
                    select_choices[i].addEventListener('change', ()=>{
                        if(select_choices[i].value == "add"){
                            input_choiceName[i].attributes.placeholder.value = "Nhập vào đây"
                            input_choiceDesc[i].attributes.placeholder.value  = "Nhập vào đây"
                            input_price[i].attributes.placeholder.value  = "Nhập vào đây"
                            
                            input_choiceName[i].value = ""
                            input_choiceDesc[i].value  = ""
                            input_price[i].value  = ""
                            deployBtn.addEventListener("click",()=>{
                                addChoiceData(i+1, input_choiceName[i].value, input_choiceDesc[i].value, input_price[i].value)    
                            })
                        } 
                       
                })
               
                }
                deployBtn.addEventListener("click",()=>{
                    let i = package_index - 1
                    addData(package_index, input_package[i].value, input_desc[i].value, input_image[i].value)
                    addChoiceData(package_index, input_choiceName[i].value, input_choiceDesc[i].value, input_price[i].value)    
                })



    })

    function addData(id, name, description, image){
        set(ref(db, 'EmployeeSet/' + id),{
            description: description,
            image: image,
            name: name,
            id: id
        })
        .then(()=>{
            alert("Data added successfully")
        })
        .catch((error)=>{
            alert("Unsuccessfully");
            console.log(error)
        })
    
        
    }
    

    function addChoiceData(id, choiceName, choiceDescription, choicePrice){
        const newKey = push(child(ref(db), 'EmployeeSet/' + id + "/choices")).key;
        update(ref(db, 'EmployeeSet/' + id + "/choices/" + newKey),{
          name: choiceName, 
          description: choiceDescription,
          price: choicePrice
        })
        .then(()=>{
            alert("Data pushed successfully")
        })
        .catch((error)=>{
            alert("Unsuccessfully");
            console.log(error)
        })
    }