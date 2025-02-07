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
let input_choiceName = document.getElementsByClassName("choice-name")
let input_choiceDesc = document.getElementsByClassName("choice-description")
let input_price = document.getElementsByClassName("price")

let deployBtn = document.getElementById('btn-success')
let updateBtn = document.getElementById('btn-warning')
let render_active = false
let update_active = false

updateIdData()


function renderData(){
    get(child(ref(db), "EmployeeSet/"))
    .then((snapshot)=>{
        if(snapshot.exists()){
            let dataArray = Object.values(snapshot.val())
            
            dataArray.forEach((package_element, index)=>{

                let package_info = ``
                let choice_select = ``
                let choice_name = ``
                let choice_descripttion = ``
                let choice_price = ``

                let select_id = "select-"+ index
                    
               // Lấy giá trị trong object tạo thành mảng
                Object.values(package_element.choices).forEach((choice_element,index)=>{
                    choice_select += `<option value="${index + 1}">${index + 1}</option>`
                    if(index == 0){
                        choice_name = choice_element.name
                        choice_descripttion = choice_element.description
                        choice_price = choice_element.price
                    } 
                })

                package_info += `
                    <tr>
                        <th 
                            scope="row" 
                            class="package-id"
                        >${package_element.id}</th>
                        <td>
                            <input 
                                type="text" 
                                class="form-control input package-name" 
                                placeholder="" value="${package_element.name}">   
                        </td>
                        <td>
                            <textarea 
                                class="textarea package-description" 
                                rows="1" 
                                cols="25" 
                    
                                >${package_element.description}
                            </textarea>
                        </td>
                        <td>
                            <input 
                                type="url" 
                                class="form-control input package-url" 
                                placeholder=""
                                value="${package_element.image}">
                        </td>
                        <td style="display: flex;">
                              <select class="form-select select-choices" id="${select_id}">
                                    ${choice_select}
                                    <option value="add">Thêm</option>
                                </select>  
                        </td>
                        <td>
                            <input 
                                type="text" 
                                class="form-control input choice-name" 
                                placeholder=""
                                value="${choice_name}">
                        </td>
                        <td><textarea class="textarea choice-description" rows="1" cols="25" >${choice_descripttion}</textarea></td>
                        <td>
                            <input 
                                type="text" 
                                class="form-control input price" 
                                placeholder=""
                                value="${choice_price}"
                                >
                         
                        </td>
                        <td><input class="form-check-input check-package-delete hidden" type="checkbox" value="" ></td>
                    </tr>
                `
                package_list.innerHTML += package_info             
            
        
            })
            
            for(let i = 0; i < select_choices.length; i++){ 
                select_choices[i].addEventListener('change', ()=>{
                    if(select_choices[i].value == "add"){
                        input_choiceName[i].attributes.placeholder.value = "Nhập vào đây"
                        input_price[i].attributes.placeholder.value  = "Nhập vào đây"

                        input_choiceName[i].value = ""
                        input_choiceDesc[i].value  = ""
                        input_price[i].value  = ""

                        render_active = true

                        deployBtn.addEventListener("click",()=>{
                            if(render_active){
                                addChoiceData(i + 1,input_choiceName[i].value,input_choiceDesc[i].value,input_price[i].value)
                                render_active = false
                                location.reload()
                            }
                        })
                    } else {
                        let choice_index = select_choices[i].selectedIndex// Lấy giá trị index của từng select, -1 vì cái đầu tiên là hướng dẫn
                        input_choiceName[i].value =  Object.values(dataArray[i].choices)[choice_index].name// Truyền giá trị tương ứng vào name
                        input_choiceDesc[i].value = Object.values(dataArray[i].choices)[choice_index].description // Truyền giá trị tương ứng vào description
                        input_price[i].value = Object.values(dataArray[i].choices)[choice_index].price// Truyền giá trị tương ứng vào price
                    }
                })


                updateBtn.addEventListener('click',()=>{ 
                    updateData(i)
                    update_active = true
                })
            }

            if(update_active){
                update_active = false
                location.reload()
            }
           
          
            
        }
         else {
            alert("Chưa có dữ liệu")
        }
    })
    .catch((error)=>{
        console.log("co loi" + error)
    }) 
}

function addChoiceData(id, choiceName, choiceDescription, choicePrice){
    push(ref(db, 'EmployeeSet/' + id + "/choices/"),{
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


function updateData(index){
    update(ref(db, 'EmployeeSet/' + (index + 1) + '/'),{
        description: input_desc[index].value,
        image: input_image[index].value,
        name:input_package[index].value,
    })
    .then(()=>{
        console.log("Data big updated successfully")
    })
    .catch((error)=>{
        alert("Unsuccessfully");
        console.log(error)
    })

    get(child(ref(db), "EmployeeSet/" + (index + 1) + "/choices/"))
    .then((snapshot)=>{
        if(snapshot.exists()){
            let select_choices_key= Object.keys(snapshot.val())
            console.log(select_choices[index].selectedIndex)
                update(ref(db, 'EmployeeSet/' + (index + 1) + "/choices/" + select_choices_key[select_choices[index].selectedIndex]),{            
                    name: input_choiceName[index].value, 
                    description: input_choiceDesc[index].value, 
                    price:[input_price[index].value]
                })
                    .then(()=>{
                        console.log("Data updated successfully")
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


function updateIdData(){
    get(child(ref(db), "EmployeeSet/"))
    .then((snapshot)=>{
        if(snapshot.exists()){

            let arrayOfKey = Object.keys(snapshot.val())
            let dataObject = snapshot.val()
            let newDataObject = []
            console.log(arrayOfKey)
            console.log(dataObject)

            for(let i = 0; i < arrayOfKey.length; i++){
                newDataObject.push(dataObject[arrayOfKey[i]])
                newDataObject[i].id = i + 1
                // delete dataObject[arrayOfKey[i]]
                // console.log(dataObject)
            }
            console.log(newDataObject)
            set(ref(db, 'EmployeeSet/'),newDataObject)
            .then(()=>{
                alert("Data updated successfully")
            })
            .catch((error)=>{
                alert("Unsuccessfully");
                console.log(error)
            })

            renderData()
        }
         else {
            alert("Chưa có dữ liệu")
        }
    })
    .catch((error)=>{
        console.log("co loi" + error)
    })

    
}