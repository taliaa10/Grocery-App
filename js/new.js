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



let addStoreTextbox = document.getElementById('store-name-textbox')
let addAddressTextbox = document.getElementById('store-address-textbox')

let storeAccordion = document.getElementById('store-accordion')

let groceryItemTextbox = document.getElementById('grocery-item-textbox')
let groceryCategoryTextbox = document.getElementById('grocery-category-textbox')

let addStoreBtn = document.getElementById('add-store-btn')


// let storesRef = database.ref('stores')

// let stores = []

// 0) Display stores

// 1) Get user input from view

// 2) New store object and add to state

// 3) Prepare UI to update