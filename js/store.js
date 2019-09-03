class Store {
  constructor(name, address, groceryItems) {
    this.name = name;
    this.address = address;
    this.storeId = "";
    this.groceryItems = [];
  }

  addGroceryItem(groceryItem) {
    this.groceryItems.push(groceryItem);
  }
}
