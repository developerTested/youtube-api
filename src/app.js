import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import apiRouter from './routes/router.js';
import ApiError from './utils/apiError.js';

// Load .env file
dotenv.config();

// Get Port from .env file
export const port = process.env.PORT || 3000;
const host_name = process.env.HOST_NAME || 'localhost'

// Cors settings
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
  port: port,
};



// Initialize Express
export const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

/**
 * Routes
*/
app.get('/', function (req, res) {
  return res.json({
    success: true,
    routes: {
      '/api/': 'Home Page to get home feed',
      '/api/trending': 'Trending videos and reels',
      '/api/shopping': 'Browse products',
      '/api/music': 'Music videos, Album',
      '/api/movies': 'Browse movies',
      '/api/live': 'Live Streaming',
      '/api/gaming': 'Gaming videos, streams and video games',
      '/api/news': 'Live News Channels, News clips and videos',
      '/api/sports': 'Sports news and highlight videos',
      '/api/learning': 'Educational video and posts',
      '/api/fashion': 'Fashion page video and posts',
      '/api/channels': 'Browse Channels',
      '/api//playlist/:id': 'Get Playlist By an ID',
      '/api/channel/:id': 'Get channel by an ID',
      '/api/watch/:id': 'Video details and comments with replies',
      '/api/watch/:id/comments': 'Load more comments',
      '/api/watch/:id/suggestions': 'Load more video suggestions',
      '/api/search': 'Search videos',
    }
  })
});


app.get('/ping', (_, res) => {
  return res.send('pong 🏓')
})

app.use('/api/', apiRouter);

/**
 * Error Handing
 */
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json(new ApiError(err.statusCode || 500, "An error occurred", err.message))
})

/**
* 404 errors
*/
app.use("*", function (req, res) {
  return res.status(404).json({
    success: false,
    message: "Page not found",
  })
})
