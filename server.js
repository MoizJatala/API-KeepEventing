const express = require('express')
const app = express()
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
const registeredRoutes = require('./routes/regRoute.js');
const caterinRoute = require('./routes/caterRoute.js');
const hallRoute = require('./routes/hallRoute.js');
const dressRoute = require('./routes/dressRoute.js');
const salonRoute = require('./routes/salonRoute.js');
const vehicleRoute = require('./routes/vehicleRoute.js');
const feedbackRoute = require('./routes/feedbackRoute.js');
const orderRoute = require('./routes/orderRoute.js')
app.use(express.urlencoded({ extended: true }));

// Register the registered routes
app.use(express.json());
app.use('/registered', registeredRoutes);
app.use('/catering', caterinRoute);
app.use('/hall', hallRoute);
app.use('/dress', dressRoute);
app.use('/salon', salonRoute);
app.use('/vehicle', vehicleRoute);
app.use('/feedback', feedbackRoute);
app.use('/order',orderRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});





