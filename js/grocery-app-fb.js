
$('.ui.accordion')
.accordion()

// AZAM FIREBASE WITH CLASSES

let nameTextBox = document.getElementById("store-name-textbox")
let ageTextBox = document.getElementById("store-address-textbox")
let addUserButton = document.getElementById("add-store-btn")
let userList = document.getElementById("store-accordion")

// create new node called users 
let usersRef = database.ref("users")

let users = [] 

/*
database.ref("users").child("-LkdgsP61Jx2zg5gT-_c")
.set({
    a: "a", 
    b: "b"
}) */

usersRef.on('value',(snapshot) => {
    //console.log(snapshot.val())

    users = [] 

    snapshot.forEach(item => {

        let userItem = item.val() // object 
        let user = new User(userItem.name, userItem.age)
        user.userId = item.key // unique key from firebase database 
        user.hobbies = userItem.hobbies
        users.push(user) // adding to an array 
    })

    displayUsers(users)

})




function addHobby(userId) {

    let groceryItemTextbox = document.getElementById('grocery-item-textbox')
let groceryCategoryTextbox = document.getElementById('grocery-category-textbox')
    
    console.log(userId)
    let user = users.find( u => u.userId == userId)

    let hobbyName = groceryItemTextbox.value
    let hobbyCategory = groceryCategoryTextbox.value
    console.log(groceryItemTextbox.value)

    user.addHobby(new Hobby(hobbyName, hobbyCategory))
    usersRef.child(userId).set(user)

}




function saveUser(name, age) {

    let hobby1 = new Hobby('Golf','Sports')
    let hobby2 = new Hobby('Hiking','Outdoors')

    let user = new User(name, age)
    user.addHobby(hobby1)
    user.addHobby(hobby2)
    //user.hobbies = [hobby1,hobby2]

    usersRef.push(user)

}




function displayUsers(users) {

    let userItems = users.map(user => {  

        let hobbyItems = user.hobbies.map(hobby => { 
            return `<div class="item">
            <div class="content">
                <div class="ui checkbox">
                <input type="checkbox" name="example">
                <label><div class="header">${hobby.name} - ${hobby.category}</div></label>
                </div>  
            </div>
            </div>`
        }).join('')

        console.log(hobbyItems)

        return `<div class="title store-title active">
        <i class="dropdown icon"></i>
        ${user.name} - ${user.age}
        <button class="ui icon button" style="float: right;" onclick='deleteStore("${user.userId}")'><i class="trash icon"></i></button>
      </div>
        
        

      <div class="content">

<div class="ui middle aligned selection list animated">



        ${hobbyItems}


        
      <div class="ui input">
        <input type="text" class="grocery-textboxes" id="grocery-item-textbox" placeholder="Grocery Item...">

      <div class="ui action input">
        <input type="text" class="grocery-textboxes" id="grocery-category-textbox" placeholder="Category...">

        <button onclick='addHobby("${user.userId}",this)' class="ui icon button teal"><i class="plus square icon"></i></button>
        </div>   
          
                 
                 </div>  
                 </div>  
        </div>`
    })

    userList.innerHTML = userItems.join('')
}






addUserButton.addEventListener('click',() => {
    let name = nameTextBox.value 
    let age = ageTextBox.value 
    saveUser(name, age)
})





















// // EVENT LISTENERS


// // Add store on enter
// addAddressTextbox.addEventListener('keypress', e => {
//     if (e.keyCode === 13 || e.which === 13) {
//         let name = toTitleCase(addStoreTextbox.value)
//         let address = toTitleCase(addAddressTextbox.value)
//         addStore(name, address)
//         console.log(name)
//         addStoreTextbox.value = ""
//         addAddressTextbox.value = ""
//         addStoreTextbox.focus()
//     }
// })


// // Tab from store name textbox to address on enter
// if (addStoreTextbox.value == ''){
// addStoreTextbox.addEventListener('keypress', e => {
//     if (e.keyCode === 13 || e.which === 13) {
//         addAddressTextbox.focus()
//     }
// })
// }

// // Add store on click add button
// addStoreBtn.addEventListener('click', () => {
//     let addStoreTextboxValue = toTitleCase(addStoreTextbox.value)
//     let addAddressTextboxValue = toTitleCase(addAddressTextbox.value)
//     addStore(addStoreTextboxValue, addAddressTextboxValue)
//     addStoreTextbox.value = ""
//     addAddressTextbox.value = ""
//     addStoreTextbox.focus()
// })







// function toTitleCase(str)  {
//     return str.replace(
//         /\w\S*/g,
//         function(txt) {
//             return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//         }
//     );
// }