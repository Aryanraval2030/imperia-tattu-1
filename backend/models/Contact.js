import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({

  name: {

    type: String,

    required: [true, 'Please provide your name'],

    trim: true

  },

  email: {

    type: String,

    required: [true, 'Please provide your email'],

    match: [

      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,

      'Please provide a valid email'

    ]

  },

  phone: {

    type: String

  },

  tattooIdea: {

    type: String,

    required: [true, 'Please provide your tattoo idea or message']

  },

  message: {

    type: String

  }

}, { timestamps: true });

export default mongoose.model('Contact', ContactSchema);