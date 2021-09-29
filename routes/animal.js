var express = require("express");
var router = express.Router();

//1. create an animal.js file in routes
//2. hook it up in app.js and make sure the path is /api/animal
//3. inside animal.js you should have a get request that returns the following

let animals = [
  {
    id: 1,
    animalType: "dog",
  },
  {
    id: 2,
    animalType: "cat",
  },
  {
    id: 3,
    animalType: "horse",
  },
];

//setting up query parameter
//if query exists, your program should return the targeted object
//if query exists, but animalType does not, please return 'Sorry, what you looking for does not exists'

/* GET home page. */
router.get("/", function (req, res, next) {
  let foundAnimal = null;

  if (Object.keys(req.query).length === 0) {
    res.json({ animals });
  } else {
    animals.forEach((item) => {
      if (item.animalType === req.query.animalType.toLocaleLowerCase()) {
        foundAnimal = item;
      }
    });

    if (!foundAnimal) {
      return res.status(404).json({
        message: "Sorry, what you looking is not found! Please check again!",
      });
    } else {
      res.json({
        message: "success",
        foundAnimal,
      });
    }
  }
});

//setting parameters /:id
//if parameter exists check for the targeted object
//if exists send the object back
//else 'sorry, what you are looking is not found

router.get("/get-animal-by-id/:id", function (req, res) {
  const { id } = req.params;
  let foundAnimal = null;

  animals.forEach(function (item) {
    if (item.id === +id) {
      foundAnimal = item;
    }
  });

  if (!foundAnimal) {
    return res
      .status(404)
      .json({ message: "Sorry, what you are looking is not found" });
  } else {
    return res.json({ foundAnimal });
  }
});

//create a POST request to create a new animal
//if there's duplicate, let the user know animal already exists
router.post("/create-new-animal", function (req, res) {
  const { id, animalType } = req.body;

  let duplicatedAnimal = false;

  animals.forEach(function (item) {
    if (item.animalType === animalType) {
      duplicatedAnimal = true;
    }
  });

  if (duplicatedAnimal) {
    res.status(409).json({
      message: "Animal already exists! Pick another one",
    });
  } else {
    animals.push({ id, animalType });
    res.json({ message: "animal created", animal: { id, animalType } });
  }
});

//create a Delete request /:id
//if id doest not match, let the user know 'not found'
router.delete("/delete-by-id/:id", function (req, res) {
  const { id } = req.params;
  let foundIndex = null;
  animals.forEach(function (item, index) {
    if (item.id === +id) {
      foundIndex = index;
    }
  });

  if (!foundIndex) {
    res.status(409).json({ message: "Sorry, not found! Try again" });
  } else {
    animals.splice(foundIndex, 1);
    res.json({ message: "Deleted!" });
  }
});

//create a PUT request /:id
//update animal by ID, if id doesnt match, let the user know 'not found'
router.put("/update-by-id/:id", function (req, res) {
  const { id } = req.params;
  const { animalType } = req.body;

  let foundAnimal = false;

  animals.forEach(function (item) {
    if (item.id === +id) {
      foundAnimal = true;
      item.animalType = animalType;
    }
  });

  if (foundAnimal) {
    res.json({ message: `Animal with the id:${id} Updated!` });
  } else {
    res.status(404).json({ message: "Not found! Please try again" });
  }
});

module.exports = router;