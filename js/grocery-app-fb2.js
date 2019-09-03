$(".ui.labeled.icon.sidebar").sidebar("toggle");

$(".ui.accordion").accordion();

$(".ui.sticky").sticky({
  context: "#product-card",
  pushing: true
});

$(".ui.rating").rating();

let addStoreTextbox = document.getElementById("store-name-textbox");
let addAddressTextbox = document.getElementById("store-address-textbox");

let storeAccordion = document.getElementById("store-accordion");

let groceryItemTextbox = document.getElementById("grocery-item-textbox");
let groceryCategoryTextbox = document.getElementById(
  "grocery-category-textbox"
);

let addStoreBtn = document.getElementById("add-store-btn");

let storesRef = database.ref("stores");

let stores = [];

storesRef.on("value", snapshot => {
  stores = [];

  snapshot.forEach(store => {
    let storeItem = store.val();
    store.groceryItems = storeItem.groceryItems;
    let newStore = new Store(storeItem.name, storeItem.address);
    newStore.storeId = store.key;
    newStore.groceryItems.push(store.groceryItems);
    stores.push(newStore);
    console.log(newStore);
  });
  displayStores(stores);
});

function addGroceryItem(storeId, index) {
  let item = document.getElementById("grocery-item-textbox-" + index).value;

  let category = document.getElementById("grocery-category-textbox-" + index)
    .value;

  console.log(storeId);

  let newItem = new GroceryItem(item, category);

  console.log(newItem);

  let store = stores.find(store => store.storeId == storeId);
  //   console.log(storesRef.child);

  var grocRef = database.ref(`stores/${storeId}/groceryItems`);
  grocRef.push(newItem);
}

function addStore(name, address) {
  let newItem = new GroceryItem("Butter", "Food");

  let store = new Store(name, address);

  store.addGroceryItem(newItem);

  storesRef.push(store);
}

function displayStores(stores) {
  let storeItems = stores.map((store, index) => {
    /////////////////////
    // get grocery items
    let groceryItems = store.groceryItems
      .map(groceryItem => {
        let item = Object.values(groceryItem);
        let groceries = item.map(item => {
          return `
          <div class="item">
          <div class="content">
              <div class="ui checkbox">
              <input type="checkbox" name="example">
              <label><div class="header">${item.name} - ${item.category}</div></label>
              </div>  
          </div>
          </div>
          `;
        });
        return groceries;
      })
      .join("")
      .replace(/,/g, "");
    console.log(groceryItems);

    return `
    <div class="title store-title active">
        <i class="dropdown icon"></i>
        ${store.name} - ${store.address}
        <button class="ui icon button" style="float: right;" onclick='deleteStore("${store.storeId}")'><i class="trash icon"></i></button>
    </div>


      <div class="content">

<div class="ui middle aligned selection list animated">


${groceryItems}


      <div class="ui input">
        <input type="text" class="grocery-textboxes" id="grocery-item-textbox-${index}" placeholder="Grocery Item...">

      <div class="ui action input">
        <input type="text" class="grocery-textboxes" id="grocery-category-textbox-${index}" placeholder="Category...">

        <button onclick='addGroceryItem("${store.storeId}",${index})' class="ui icon button teal"><i class="plus square icon"></i></button>
      </div>   
      </div> 
    </div>
</div>`;
  });
  storeAccordion.innerHTML = storeItems.join("");
}

function deleteStore(key) {
  storesRef.child(key).remove();
  console.log(key);
}

// EVENT LISTENERS

// Add store on enter
addAddressTextbox.addEventListener("keypress", e => {
  if (e.keyCode === 13 || e.which === 13) {
    let name = toTitleCase(addStoreTextbox.value);
    let address = toTitleCase(addAddressTextbox.value);
    addStore(name, address);
    console.log(name);
    addStoreTextbox.value = "";
    addAddressTextbox.value = "";
    addStoreTextbox.focus();
  }
});

// Tab from store name textbox to address on enter
if (addStoreTextbox.value == "") {
  addStoreTextbox.addEventListener("keypress", e => {
    if (e.keyCode === 13 || e.which === 13) {
      addAddressTextbox.focus();
    }
  });
}

// Add store on click add button
addStoreBtn.addEventListener("click", () => {
  let addStoreTextboxValue = toTitleCase(addStoreTextbox.value);
  let addAddressTextboxValue = toTitleCase(addAddressTextbox.value);
  addStore(addStoreTextboxValue, addAddressTextboxValue);
  addStoreTextbox.value = "";
  addAddressTextbox.value = "";
  addStoreTextbox.focus();
});

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
