const db = require("../model");
const Registered = db.registered;
const Catering = db.catering;
const Op = db.Sequelize.Op;

// Create and Save a new Registeration
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Registeration
  const registered = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone ,
    address: req.body.address,
    CNIC: req.body.CNIC,
    password: req.body.password,
  };

  // Save Registeration in the database
  Registered.create(registered)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Registeration.",
      });
    });
};

// Retrieve all Registeration from the database.
exports.findAll = (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10; // default limit is 10
  const page = req.query.page ? parseInt(req.query.page) : 1; // default page is 1

  const offset = (page - 1) * limit; // calculate offset based on page and limit

  const email = req.query.email;
  var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  Registered.findAndCountAll(
    { 
    limit: limit,
    offset: offset,
    where: condition }
    )
    .then((data) => {
      const pages = Math.ceil(data.count / limit); // calculate the total number of pages
      res.send({data: data.rows, pages: pages, currentPage: page});
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registeration.",
      });
    });
};

// Find a single Registeration with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Registered.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Registeration with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Registeration with id=" + id,
      });
    });
};

// Update a Registeration by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Registered.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Registeration was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Registeration with id=${id}. Maybe Registeration was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Registeration with id=" + id,
      });
    });
};

// Delete a Registeration with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Registered.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Registeration was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Registeration with id=${id}. Maybe Registeration was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Registeration with id=" + id,
      });
    });
};

// Delete all Registeration from the database.
exports.deleteAll = (req, res) => {
  Registered.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Registeration were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Registeration.",
      });
    });
};

// READ ALL Caterings of a particular id user
exports.findALLCaterings = (req, res) => {
  Registered.findAll({ where: { id: req.params.id },
    include: [Catering] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registered-Catering.",
      });
    });
};

// READ ALL Halls of a particular id user
exports.findALLHalls = (req, res) => {
  Registered.findAll({ where: { id: req.params.id },
    include: [db.hall] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registered-halls.",
      });
    });
};

// READ ALL dress of a particular id user
exports.findALLDress = (req, res) => {
  Registered.findAll({ where: { id: req.params.id },
    include: [db.dress] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registered-dresses.",
      });
    });
};

// READ ALL Salons of a particular id user
exports.findALLSalons = (req, res) => {
  
  Registered.findAll({ where: { id: req.params.id },
    include: [db.salon] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registered-Salons.",
      });
    });
};

// READ ALL vehicles of a particular id user
exports.findALLVehicles = (req, res) => {
  Registered.findAll({ where: { id: req.params.id },
    include: [db.vehicle] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registered-Vehicles.",
      });
    });
};

// READ ALL FeedBack of a particular id user
exports.findALLFeedback = (req, res) => {
  Registered.findAll({ where: { id: req.params.id },
    include: [db.hall] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Registered-Feedback.",
      });
    });
};

