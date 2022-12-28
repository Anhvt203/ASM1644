class ToyModel {
    constructor(id,name, price, picture) {
        this._id = id;
        this.name = name;
        this.price = price;
        this.picture = picture;
}

getUserStats(){
    return `
    id: ${this._id}
    Name: ${this.name}
    Price: ${this.price}
    Picture: ${this.picture}
    `;
}
}

module.exports = ToyModel;