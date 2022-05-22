const user = {
    name: 'Elena', 
    age: 25
}

// Приватная переменная
const user2 = {
    name: 'Igor'
}

module.exports = {
    user,
    sayHi: function(user) {
        console.log(this.user.name);
    }
};