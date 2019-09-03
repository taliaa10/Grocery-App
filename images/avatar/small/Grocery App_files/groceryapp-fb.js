$('.ui.labeled.icon.sidebar')
  .sidebar('toggle')
;

$('.ui.accordion')
  .accordion()
;

$('.ui.sticky')
  .sticky({
      context: '#product-card',
      pushing: true
  })
;

$('.ui.rating')
  .rating()
;


let addLocationTextbox = document.getElementById('store-name-textbox')
let addAddressTextbox = document.getElementById('store-address-textbox')
let displayLocationssDiv = document.getElementById('display-locations-div')
let storeAccordion = document.getElementById('store-accordion')
let groceryItemTextbox = document.getElementById('grocery-item-textbox')
let groceryCategoryTextbox = document.getElementById('grocery-category-textbox')
let addStoreBtn = document.getElementById('add-store-btn')


let locationsRef = database.ref('locations')

locationsRef.on('value',(snapshot) => {
    let locations = []

    for(key in snapshot.val()) {
        let user =snapshot.val()[key]
        user.key = key
        locations.push(user)
    }
    displayLocations(locations)
})








addAddressTextbox.addEventListener('keypress', e => {
    if (e.keyCode === 13 || e.which === 13) {
        let addLocationTextboxValue = toTitleCase(addLocationTextbox.value)
        let addAddressTextboxValue = toTitleCase(addAddressTextbox.value)
        addLocation(addLocationTextboxValue, addAddressTextboxValue)
        addLocationTextbox.value = ""
        addAddressTextbox.value = ""
        addLocationTextbox.focus()
    }
})


if (addLocationTextbox.value == ''){
addLocationTextbox.addEventListener('keypress', e => {
    if (e.keyCode === 13 || e.which === 13) {
        addAddressTextbox.focus()
    }
})
}

addStoreBtn.addEventListener('click', () => {
    let addLocationTextboxValue = toTitleCase(addLocationTextbox.value)
    let addAddressTextboxValue = toTitleCase(addAddressTextbox.value)
    addLocation(addLocationTextboxValue, addAddressTextboxValue)
    addLocationTextbox.value = ""
    addAddressTextbox.value = ""
    addLocationTextbox.focus()
})




function addLocation(location, address) {
    locationsRef.push({
        name: location,
        address: address
    })
}





function displayLocations(locations) {
    let locationItems = locations.map(location => {
        return `<div class="title store-title active">
        <i class="dropdown icon"></i>
        ${location.name} - ${location.address}
        <button class="ui icon button" style="float: right;" onclick='deleteLocation("${location.key}")'><i class="trash icon"></i></button>
      </div>
      <div class="content">

                           
      </p>
<div class="ui middle aligned selection list animated">
      <div class="item">
        
        <div class="content">

        <div class="ui checkbox">
  <input type="checkbox" name="example">
  <label><div class="header">Bread - Food</div></label>
</div>
          
        </div>
      </div>
      <div class="item">
        <div class="content">
        
        <div class="ui checkbox">
  <input type="checkbox" name="example">
  <label><div class="header">Diaper - Baby</div></label>
</div>

        </div>
      </div>
      <div class="item">
        <div class="content">

        <div class="ui checkbox">
        <input type="checkbox" name="example">
        <label><div class="header">Soap - Lotion</div></label>
      </div>
      

        </div>
      </div>

      <div class="ui input">

      <input type="text" class="grocery-textboxes" id="grocery-item-textbox" placeholder="Grocery Item...">

      <div class="ui action input">
      <input type="text" class="grocery-textboxes" id="grocery-category-textbox" placeholder="Category...">
      
      <button onclick='addGroceryItem("${location.address}")' class="ui icon button teal"><i class="plus square icon"></i></button>
      </div>   
      </div> 
    </div>
</div>`
                
    })
    storeAccordion.innerHTML = locationItems.join('')
}



function deleteLocation(key) {
    locationsRef.child(key).remove()

}


function addGroceryItem(address) {
    console.log(address)
    let groceriesRef = database.ref('stores').child('Walmart').set({
        groceryName: 'bread',
        categoryName: 'food'
    })
    console.log(groceriesRef)
}







function toTitleCase(str)  {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}



// exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    
//     const email = user.email
//     console.log(email)

//   });