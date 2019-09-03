
class User {
    constructor(name, age) {
        this.name = name 
        this.age = age 
        this.userId = ''
        this.hobbies = [] 
    }

    addHobby(hobby) {
        // validate the hobby so that you are not 
        // adding duplicates 
        this.hobbies.push(hobby)
    }
}