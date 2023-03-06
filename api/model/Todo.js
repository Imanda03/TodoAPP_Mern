import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: String,
        default: Date.now()
    },
})

const Todo = mongoose.model("todo", TodoSchema);

export default Todo;