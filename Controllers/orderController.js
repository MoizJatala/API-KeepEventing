// Assuming you have the necessary Sequelize models and associations
const db = require("../model");
const Order = db.order;
const Registered = db.registered;
const Catering = db.catering;
const Hall = db.hall;
const Dress = db.dress;
const Salon = db.salon;
const Vehicle = db.vehicle;
const Feedback = db.feedback;
const Op = db.Sequelize.Op;

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { registeredId, itemType, itemId } = req.body;

    // Check if the registered user and item exist
    const registeredUser = await Registered.findByPk(registeredId);
    const item = await getItemById(itemType, itemId);

    if (!registeredUser || !item) {
      return res.status(404).json({ error: 'Registered user or item not found' });
    }

    // Create the order
    const order = await Order.create({
      registeredId,
      catoringId: itemType === 'catoring' ? itemId : null,
      hallId: itemType === 'hall' ? itemId : null,
      dressId: itemType === 'dress' ? itemId : null,
      salonId: itemType === 'salon' ? itemId : null,
      vehicleId: itemType === 'vehicle' ? itemId : null,
      feedbackId: itemType === 'feedback' ? itemId : null,
    }, {
      include: [
        { model: Registered },
        { model: Catering },
        { model: Hall },
        { model: Dress },
        { model: Salon },
        { model: Vehicle },
        { model: Feedback }
      ]
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create the order' });
  }
};

// Get all orders with associated registered users and items
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: Registered },
        { model: Catering },
        { model: Hall },
        { model: Dress },
        { model: Salon },
        { model: Vehicle },
        { model: Feedback }
      ]
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get an order by ID
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId, {
      include: [
        { model: Registered },
        { model: Catering },
        { model: Hall },
        { model: Dress },
        { model: Salon },
        { model: Vehicle },
        { model: Feedback }
      ]
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch the order' });
  }
};

// Update an order by ID
const updateOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedData = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order
    await order.update(updatedData);

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the order' });
  }
};

// Delete an order by ID
const deleteOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Delete the order
    await order.destroy();

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the order' });
  }
};

// Delete all orders
const deleteAllOrders = async (req, res) => {
  try {
    await Order.destroy({
      where: {},
      truncate: false
    });

    res.json({ message: 'All orders deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete all orders' });
  }
};

// Helper function to get the item by type and ID
async function getItemById(itemType, itemId) {
  let item;

  switch (itemType) {
    case 'catoring':
      item = await Catering.findByPk(itemId);
      break;
    case 'hall':
      item = await Hall.findByPk(itemId);
      break;
    case 'dress':
      item = await Dress.findByPk(itemId);
      break;
    case 'salon':
      item = await Salon.findByPk(itemId);
      break;
    case 'vehicle':
      item = await Vehicle.findByPk(itemId);
      break;
    case 'feedback':
      item = await Feedback.findByPk(itemId);
      break;
    default:
      break;
  }

  return item;
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  deleteAllOrders
};
