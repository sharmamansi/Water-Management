const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
    customer_name : {
        type : String,
        required: true,
    },
    customer_email : {
        type : String,
        required: true,
        unique : true
        },
    port_name : {
        type : String,
        required: true,
        unique: true
            },
    recieving_list : [
           {
           port_name: {
              type: String,
              required:true
            }
        }
    ],
    distribution_list : [
        {
            port_name: {
              type: String,
              required:true
            }
        }
    ],
    recieved_item : [
        {
            recivedport_name : {
                type : String
            },
            quantity : {
                type :String,
                required: true
            },
            month : {
                type :String,
                required: true
            },
            year : {
                type :String,
                required: true
            }
        }
    ],
    supplied_item : [
        {
            suppliedport_name : {
                type : String
            },
            quantity : {
                type :String,
                required: true
            },
            month : {
                type :String,
                required: true
            },
            year : {
                type :String,
                required: true
            }
        }
    ],
    current_quantity : {
        type : String,
        required : true
    }
});

module.exports = Node = mongoose.model("node",nodeSchema);