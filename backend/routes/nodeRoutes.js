const router = require("express").Router();
const Node = require('../models/nodeModel');

router.post("/register", async (req,res) => {

    try{
        let { customer_name ,customer_email, port_name, recieving_list,distribution_list} = req.body;

        if(!customer_name || !customer_email || !port_name){
            return res.status(400).send({ msg : "Please fill required data"});
        }
    
        const exsistingEmail = await Node.findOne({customer_email});
        if(exsistingEmail){
            return res.status(400).send({ msg : "Email address already exsist"});
        }
    
        const exsistingname = await Node.findOne({port_name});
        if(exsistingname){
            return res.status(400).send({ msg : "Username already exsist"});
        }
        
        if(!recieving_list)  recieving_list = new Array();
        if(!distribution_list) distribution_list = new Array();
    
        const recieved_item = [];
        const supplied_item = [];
        const current_quantity = 0;
    
        const newNode = new Node({
        customer_name,
        customer_email,
        port_name,
        recieving_list,
        distribution_list,
        recieved_item,
        supplied_item,
        current_quantity
        });
    
        const savednode = await newNode.save();
        res.json(savednode);
    
    }catch (err){
        return res.status(500).json({ error: err.message });
    }
    
});

router.put("/update/points", async (req,res) => {
 try{
  let { _id, recievinglist } = req.body;
  if(!_id){
    return res.status(400).send({ msg : "Insufficien info"});
}
if(!recievinglist){
  return res.status(400).send({ msg : "Insufficien info"});
}

let getNode = await Node.findById({_id});
 
if(!getNode){
  return res.status(400).json({ msg : "enter valid id to be updated"});
}

    recievinglist.forEach(async (ele) => {
      
   const y = await Node.findOne({port_name : ele});
   if(!y){
     return res.status(400).send({ msg : "enter vaild recieving node"});
   }
   getNode.recieving_list.unshift({
     port_name : ele
   });

  });

 await getNode.save();
res.json(getNode);  

 } catch (err){
  return res.status(500).json({ error: err.message });
 }  
});

router.get('/nodesList', function(req, res) {
  Node.find({}, function(err, nodes) {
    var userMap = {};

    nodes.forEach(function(user) {
      userMap[user.port_name] = user._id;
    });

    res.send(userMap);  
  });
});



module.exports = router;