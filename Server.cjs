const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const userRoutes = require('./Routes/UserRoutes.cjs');
const authRoutes = require('./Routes/AuthRoutes.cjs');
const threatRoutes = require('./Routes/ThreatRoutes.cjs');
const enquiryRoutes = require('./Routes/EnquiryRoutes.cjs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(helmet());

mongoose.connect(process.env.MONGODB_CONNECTION)
    .then((db) => {
        console.log('Connected to MongoDB');
        console.log(db.connections[0].name);
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use('/', userRoutes);
app.use('/auth', authRoutes);
app.use('/threats', threatRoutes);
app.use('/enquiry', enquiryRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
