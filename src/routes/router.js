import { Router } from "express";

import {
  GetListByKeyword,
  GetChannelById,
  GetVideoDetails,
  getAutoCompleteSearch,
  getMoreComments,
  getMoreSuggestions,
  GetPlaylistData,
  getFeed,
  GetHomeFeed
} from "../utils/parser.js"


const apiRouter = Router();

/**
 * Heath check
 */
apiRouter.get('/ping', function (req, res, next) {
  return res.json("pong")
})

/**
 * Heath check
 */
apiRouter.get('/healthcheck', function (req, res, next) {
  return res.json("pong")
})

/**
 * Get Home page videos
 */
apiRouter.get('/', async function (req, res, next) {
  try {
    const recentUpdates = await GetHomeFeed();
    return res.status(200).json(recentUpdates);
  } catch (error) {
    next(error)
  }
});

/**
 * AutoComplete Search
 */
apiRouter.get('/autocomplete', async function (req, res, next) {
  try {

    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        error: true,
        message: "q can't be empty."
      })
    }

    const recentUpdates = await getAutoCompleteSearch(q);
    res.status(200).json(recentUpdates);
  } catch (error) {
    next(error)
  }
});

/**
 * Get Search results
 */
apiRouter.get('/search', async function (req, res, next) {

  try {

    const { q, limit } = req.query;

    if (!q) {
      return res.status(400).json({
        error: true,
        message: "q can't be empty."
      })
    }

    const searchResults = await GetListByKeyword(q, false, limit, [{ type: 'video', sortBy: 'upload_date' }]);

    return res.status(200).json(searchResults);

  } catch (error) {
    next(error)
  }

});

/**
 * Get Video details with suggestions
 */
apiRouter.get('/watch/:id', async function (req, res, next) {
  const videoId = req.params.id;

  try {
    const video = await GetVideoDetails(videoId);

    return res.status(200).json(video);
  } catch (error) {
    next(error);
  }
});

/**
 * Get Video More Comments
 */
apiRouter.post('/watch/:id/comments', async function (req, res, next) {

  try {
    const data = req.body.context;
    const comments = await getMoreComments(data);
    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});


/**
 * Get Video more suggestions
 */
apiRouter.post('/watch/:id/suggestions', async function (req, res, next) {

  try {
    const data = req.body.context;
    const suggestions = await getMoreSuggestions(data);
    return res.status(200).json(suggestions);
  } catch (error) {
    next(error);
  }
});

/**
 * Get Channel details 
 */
apiRouter.get('/channel/:id', async function (req, res, next) {

  try {
    const channelId = req.params.id;

    const channel = await GetChannelById(channelId);

    return res.status(200).json(channel);
  } catch (error) {
    next(error);
  }

});

/**
 * Get Channel details 
 */
apiRouter.get('/playlist/:id', async function (req, res, next) {

  try {
    const playlistId = req.params.id;

    const playlist = await GetPlaylistData(playlistId);

    return res.status(200).json(playlist);
  } catch (error) {
    next(error);
  }

});

/**
 * Menus
 */
apiRouter.get('/:name', async function (req, res, next) {

  try {
    const name = req.params.name;

    const contents = await getFeed(name);

    return res.status(200).json(contents);

  } catch (error) {
    next(error);
  }
});

export default apiRouter