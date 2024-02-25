const News = require('../models/news');

const createNews = async (data) => {
    const {
        description, title, matchId, tourId,
    } = data;

    if (!description) {
        throw new Error('Missing required parameter: description');
    }

    if (!title) {
        throw new Error('Missing required parameter: title');
    }

    if (!matchId && !tourId) {
        throw new Error('Missing required parameter: matchId or tourId');
    }

    return News.createNews(title, description, matchId, tourId);
}

const getNewsByMatch = async (matchId) => {
    if (!matchId) {
        throw new Error('Missing required parameter: matchId');
    }

    return News.getNewsByMatch(matchId);
}

const getNewsByTour = async (tourId) => {
    if (!tourId) {
        throw new Error('Missing required parameter: tourId');
    }

    return News.getNewsByTour(tourId);
}

const getNewsBySport = async (sportId) => {
    if (!sportId) {
        throw new Error('Missing required parameter: sportId');
    }

    return News.getNewsBySport(sportId);
}

module.exports = {
    createNews: createNews,
    getNewsByMatch: getNewsByMatch,
    getNewsByTour: getNewsByTour,
    getNewsBySport: getNewsBySport,
}