const express = require("express");
const router = express.Router();

let animalArray = [
    { id: 1, animalName: "dog" },
    { id: 2, animalName: "cat" },
    { id: 3, animalName: "hamster" },
    ];


router.get('/',function(req,res){
    let foundAnimal;
    if(Object.keys(req.query).length === 0){
        res.json(animalArray);
    }else{
        animalArray.forEach((obj)=>{
            if(obj.animalType === req.query.animalType.toLowerCase()){
                foundAnimal = obj;
            }
        });
    if(!foundAnimal){
        res.send("Please try again. Does not exist.");
    }else{
        res.json({foundAnimal});
    }
    }
});

router.get('/get-animal-array', function(req,res){
    res.json({animalArray});
});


router.get('/get-animal-by-params-id/:id',function(req,res){
    let foundAnimal;
    const {id} = req.params;
    animalArray.forEach((obj) =>{
        if(obj.id === +id){
            foundAnimal = obj.animalType;
        }
    });

    if(!foundAnimal){
        res
        .status(404)
        .json({message: "Please try again. Does not exist."})
    }else{
        res.json({foundAnimal});
    }
});


router.get('/get-animal-by-params-name/:name', function(req,res){
    let foundAnimal;
    const {name} = req.params;
    animalArray.forEach((obj) =>{
        if(obj.name === +name){
            foundAnimal = obj.animalType;
        }
    });

    if(!foundAnimal){
        res
        .status(404)
        .json({message: "Please try again. Does not exist."})
    }else{
        res.json({foundAnimal});
    }
});



router.post('/', function (req,res){
    const {id,animalType} = req.body;
    let duplicateAnimal = false;

    animalArray.forEach(function(item){
        if(item.animalType === animalType){
            duplicateAnimal = true;
        }
    })

    if(duplicateAnimal){
        res.status(422).json({
            message: "Please try again. The animal you tried to create already exists."});
        }else{
            animalArray.push({id,animalType});
            res.json({message: "animal created", animal: {id, animalType}});
        } 
});


router.put('/get-animal-by-params-id/:id', function(req,res){
    const {id} = req.params;
    const {animalType} = req.body;
    let itemFound = false;
    animalArray.forEach((item)=>{
        if(item.id === +id){
            itemFound = true;
            item.animalType = animalType;
        }
    });

    if(itemFound){
        res.json({message: `Animal with the id:${id} Updated!`});
    }else{
        res.status(404).json({message: "Please try again."});
    }
});


router.put('/get-animal-by-params-name/:name', function(req,res){
    const {name} = req.params;
    const {animalType} = req.body;
    let itemFound = false;
    animalArray.forEach((item)=>{
        if(item.name === +name){
            itemFound = true;
            item.animalType = animalType;
        }
    });

    if(itemFound){
        res.json({message: `Animal with the name:${name} Updated!`});
    }else{
        res.status(404).json({message: "Please try again."});
    }
});


router.delete('/get-animal-by-params-name/:name', function(req,res){
    const {name} = req.params;
    let itemIndex = null;
    let foundItem = false;
    animalArray.forEach(function(item,index){
        if(item.name === +name){
            itemIndex = index;
            foundItem = true;
        }
    });

    if(!foundItem){
        res.status(409).json({message: "Sorry, not found!"});
    }else{
        animalArray.splice(itemIndex,1);
        res.json({message: "Animal Deleted"});
    };
});


router.delete('/get-animal-by-params-id/:id', function(req,res){
    const {id} = req.params;
    let itemIndex = null;
    let foundItem = false;
    animalArray.forEach(function(item,index){
        if(item.id === +id){
            itemIndex = index;
            foundItem = true;
        }
    });

    if(!foundItem){
        res.status(409).json({message: "Not found!"});
    }else{
        animalArray.splice(itemIndex,1);
        res.json({message: "Animal Deleted"});
    };
});


module.exports = router;