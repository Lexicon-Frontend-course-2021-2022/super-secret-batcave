/* ============================================================================
 * Backend
 * ========================================================================= */
require('dotenv').config();

const PORT = process.env.PORT || 9090;
const DB_URI = process.env.DB_URI;

/* ============================================================================
 * Express
 * ========================================================================= */
const express = require('express');
const backend = express();
backend.use(express.json());

backend.use(express.static('./frontend/public'));

/* ============================================================================
 * Endpoints
 * ========================================================================= */

// API Create/login user
backend.use('/api/register', require('./backend/routes/register'));
backend.use('/api/login', require('./backend/routes/login.js'));

// Gatekeeper checks for correct jwt-token and secures these pages
const gatekeeper = require('./backend/helpers/gatekeeper');
backend.use('/secure', gatekeeper, express.static('./frontend/secure'));

/* ============================================================================
 * Start express server 
 * ========================================================================= */
backend.listen(PORT, () => console.log(`Express started on port ${PORT}`));

/* ============================================================================
 * Connect to mongodb
 * ========================================================================= */
const mongoose = require('mongoose');

mongoose.connect(DB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  () => {
    console.log(`Connected to db '${DB_URI}'`);
  }
);

