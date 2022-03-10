const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {


  Category.findAll({
    include: {
      model: Product,
      attributes: ["product_name", "price", "stock"],
    },
  })
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("There was a server issue!");
    });
});

router.get("/:id", (req, res) => {

  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ["product_name", "price", "stock"],
    },
  })
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("There was a server issue!");
    });
});

router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("There was a server issue!");
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value

  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("There was a server issue!");
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("There was a server issue!");
    });
});

module.exports = router;
