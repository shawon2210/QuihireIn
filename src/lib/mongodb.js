import mongoose from 'mongoose';

let connected = false;

export const connectDB = async () => {
  if (connected) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quickhire', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export const disconnectDB = async () => {
  if (!connected) {
    return;
  }

  try {
    await mongoose.disconnect();
    connected = false;
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
    throw new Error('Failed to disconnect from MongoDB');
  }
};
