const { cloudinary } = require('./utils/cloudinary');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
var cors = require('cors');

const { typeDefs, resolvers } = require('./schemas');
// const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: authMiddleware
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(express.json({ limit: '50mb' }));

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//======================================================================
// Image upload in progress.
app.use(cors());

app.post('/api/upload', async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'prime-asset',
    });
    console.log(uploadResponse);
    res.json(uploadResponse.public_id);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});
//======================================================================

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

startServer();