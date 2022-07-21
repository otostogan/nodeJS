const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                courseId: {
                    required: true,
                    ref: 'Course',
                    type: Schema.Types.ObjectId,
                }
            }
        ]
    }
})

userSchema.methods.addToCart = async function (course) {
    console.log(course);
    const items = [...this.cart.items];

    const idx = items.findIndex(c => {
        return c.courseId.toString() === course._id.toString();
    });

    if (idx >= 0) {
        items[idx].count += 1;
    }else{
        items.push({
            courseId: course._id,
            count: 1
        })
    }

    this.cart = {items};

    return this.save();
}


module.exports = model('User', userSchema);