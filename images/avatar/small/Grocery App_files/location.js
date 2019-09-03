class Location {
    constructor(name, address) {
        this.name = name
        this.address = address
        this.locationId = ''
        this.groceryItems = []
    }

    deleteLocation(location) {
        console.log(location)
        // locationsRef.child(location).remove()
        
    }
}