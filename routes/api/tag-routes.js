const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ["product_name", "price", "stock", "category_id"],
        through: ProductTag,
      },
    ],
  })
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("There was a server issue!");
    });
});

router.get("/:id", (req, res) => {

  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["product_name", "price", "stock", "category_id"],
        through: ProductTag,
      },
    ],
  })
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("There was a server issue!");
    });
});

router.post("/", (req, res) => {
  // create a new tag

  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((tag) => {
      res.json(tag);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("There was a server issue!");
    });
});

module.exports = router;
