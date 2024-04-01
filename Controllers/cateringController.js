const db = require("../model");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const Catering = db.catering;
const Op = db.Sequelize.Op;

const multer = require('multer');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/catering'); // Specify the destination directory for catering images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'catering-' + uniqueSuffix + '-' + file.originalname); // Set the filename for the uploaded image
  }
});

// Create Multer instance
const upload = multer({ storage: storage });

// Multer middleware to handle file upload
const uploadImage = upload.single('image');


// Create and Save a new Catering
exports.create = (req, res, next) => {
  // Handle the image upload using Multer middleware
  uploadImage(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred
      return next(new ErrorHandler('Image upload error', 400));
    } else if (err) {
      // An unknown error occurred
      return next(new ErrorHandler('Failed to upload image', 500));
    }

    // Continue with the Catering creation
    try {
      // Validate request
      if (!req.body.chef) {
        return next(new ErrorHandler('Content cannot be empty!', 400));
      }

      // Create a Catering object
      const catering = {
        chef: req.body.chef,
        price: req.body.price,
        time: req.body.time,
        persons: req.body.persons,
        image: req.file.filename // Get the uploaded image filename from the request
      };

      // Save Catering in the database
      Catering.create(catering)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          return next(new ErrorHandler('Some error occurred while creating the Catering', 500));
        });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler('Failed to create Catering', 500));
    }
  });
};


// Retrieve all Catering from the database.
exports.findAll = (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page) : 1; // default page is 1
  const limit = req.query.limit ? parseInt(req.query.limit) : 10; // default limit is 10
  const offset = (page - 1) * limit; // calculate offset based on page and limit

  const chef = req.query.chef;
  var condition = chef ? { chef: { [Op.like]: `%${chef}%` } } : null;

  Catering.findAndCountAll({ 
    limit: limit,
    offset: offset,
    where: condition })
    .then((data) => {
      const totalPages = Math.ceil(data.count / limit); // calculate the total number of pages
      res.send({data: data.rows, currentPage: page, totalPages: totalPages});
    })
    .catch((err) => {
      return next(new ErrorHandler("Some Error occured while reterieving Catering", 500));
    });
};

// Find a single Catering with an id
exports.findOne = (req, res, next) => {
  const id = req.params.id;

  Catering.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        return next(new ErrorHandler("Catering not found with this ID", 404));
      }
    })
    .catch((err) => {
      return next(new ErrorHandler("Error reterieving the catering with this ID", 500));
    });
};

// Update a Catering by the id in the request
exports.update = (req, res, next) => {
  const id = req.params.id;

  Catering.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Catering was updated successfully.",
        });
      } else {
        return next(new ErrorHandler("Error updating Catering with this ID", 500));
      }
    })
    .catch((err) => {
      return next(new ErrorHandler("Error reterieving the catering with this ID", 404));
    });
};

// Delete a Catering with the specified id in the request
exports.delete = (req, res, next) => {
  const id = req.params.id;

  Catering.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Catering was deleted successfully!",
        });
      } else {
        return next(new ErrorHandler("Error deleting Catering with this ID", 404));
      }
    })
    .catch((err) => {
      return next(new ErrorHandler("Error deleting the catering with this ID", 500));
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res, next) => {
  Catering.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Catering were deleted successfully!` });
    })
    .catch((err) => {
      return next(new ErrorHandler("Error deleting all caterings", 500));
    });
};


