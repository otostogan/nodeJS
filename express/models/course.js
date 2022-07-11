const {v4: uuid} = require('uuid');
const fs = require('fs');
const path = require('path');

class Course {
    constructor(title, price, img){
        this.title = title;
        this.price = price;
        this.img = img;
        this.id = uuid();
    }

    toJSON(){
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        };
    }

    async save(){
        const courser = await Course.getAll();
        courser.push(this.toJSON());

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courser),
                (err)=> {
                    if(err){
                        reject(err);
                    }else{
                        resolve();
                    }
                }
            )
        })        
    }

    static getAll(){
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, data) => {
                    if(err){
                        reject(err)
                    }else{
                        resolve(JSON.parse(data));
                    };
                }
            )
        })
    }
}

module.exports = Course;