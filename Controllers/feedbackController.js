const db = require("../model");
const Feedback = db.feedback;
const Op = db.Sequelize.Op;

// Create and Save a new Feedback
exports.create = (req, res) => {
  // Validate request
  if (!req.body.discription) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Feedback
  const dress = {
    discription: req.body.discription
  };

  // Save Feedback in the database
  Feedback.create(dress)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Feedback.",
      });
    });
};

// Retrieve all Feedback from the database.  using pagination
exports.findAll = (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 5; // default limit is 10
  const page = req.query.page ? parseInt(req.query.page) : 1; // default page is 1

  const offset = (page - 1) * limit; // calculate offset based on page and limit

  Feedback.findAndCountAll({
    limit: limit,
    offset: offset,
  })
    .then((data) => {
      const pages = Math.ceil(data.count / limit); // calculate the total number of pages
      res.send({ data: data.rows, pages: pages, currentPage: page });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Feedback.",
      });
    });
};

// Find a single Feedback with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Feedback.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Feedback with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Feedback with id=" + id,
      });
    });
};

// Update a Feedback by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Feedback.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Feedback was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Feedback with id=${id}. Maybe Feedback was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Feedback with id=" + id,
      });
    });
};

// Delete a Feedback with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Feedback.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Feedback was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Feedback with id=${id}. Maybe Feedback was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Feedback with id=" + id,
      });
    });
};

// Delete all Feedbacks from the database.
exports.deleteAll = (req, res) => {
  Feedback.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Feedback were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Feedbacks.",
      });
    });
};

 

/* exports.findAndCountAll = (req, res) => {
  limit : 1
  Feedback.findAndCountAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Feedback.",
      });
    });
};*/