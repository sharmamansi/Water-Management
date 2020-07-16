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

router.put("/update/recievepoints", async (req, res) => {
  try {
    let { _id, recievinglist} = req.body;
    if (!_id || !recievinglist) {
      return res.status(400).send({ msg: "Insufficien info" });
    }

    let getNode = await Node.findById({ _id });

    if (!getNode) {
      return res.status(400).json({ msg: "enter valid id to be updated" });
    }
  
   for (let i = 0; i < recievinglist.length; i++) {
        const ele = recievinglist[i];
        const y = await Node.findOne({ port_name: ele });
        if (!y) {
          return res.status(400).send({ msg: "enter vaild recieving node" });
        }
        getNode.recieving_list.push({
          port_name: ele,
        });
      }
    
    await getNode.save();
    res.json(getNode);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.put("/update/supplypoints", async (req, res) => {
  try {
    let { _id,distributionlist } = req.body;
    if (!_id || !distributionlist) {
      return res.status(400).send({ msg: "Insufficien info" });
    }

    let getNode = await Node.findById({ _id });

    if (!getNode) {
      return res.status(400).json({ msg: "enter valid id to be updated" });
    }
      
  for (let i = 0; i < distributionlist.length; i++) {
    const ele = distributionlist[i];
    const y = await Node.findOne({ port_name: ele });
    if (!y) {
      return res.status(400).send({ msg: "enter vaild recieving node" });
    }
    getNode.distribution_list.push({
      port_name: ele,
    });
  }
  
    await getNode.save();
    res.json(getNode);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.put("/update/supplyobj", async (req, res) => {
  try {
    let { _id, port_name,quantity,month,year} = req.body;
    if (!_id || !port_name || !quantity || !month || !year) {
      return res.status(400).send({ msg: "Insufficien info" });
    }

    let getNodetoEdit = await Node.findById({_id});
    let getNode = await Node.findOne({port_name});

    if (!getNode) {
      return res.status(400).json({ msg: "enter valid port name to be updated" });
    }

        getNodetoEdit.supplied_item.unshift({
        suppliedport_id : getNode._id,
        quantity ,
        month ,
        year
        }); 

    await getNodetoEdit.save();
    res.json(getNodetoEdit);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.put("/update/recievedobj", async (req, res) => {
  try {
    let { _id, port_name,quantity,month,year} = req.body;
    if (!_id || !port_name || !quantity || !month || !year) {
      return res.status(400).send({ msg: "Insufficien info" });
    }

    let getNodetoEdit = await Node.findById({_id});
    let getNode = await Node.findOne({port_name});

    if (!getNode) {
      return res.status(400).json({ msg: "enter valid port name to be updated" });
    }

        getNodetoEdit.recieved_item.unshift({
        recivedport_id : getNode._id,
        quantity ,
        month ,
        year
        }); 

    await getNodetoEdit.save();
    res.json(getNodetoEdit);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get('/nodesList', function(req, res) {
  Node.find({}, function(err, nodes) {
    res.send(nodes);  
  });
});

router.post('/nodeone', async (req, res) => {
  console.log(req.body);
  const {_id}= req.body;
  const node = await Node.findById({_id});
  res.send(node);
});


module.exports = router;