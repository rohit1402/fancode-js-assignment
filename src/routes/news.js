const News = require('../controllers/news');

module.exports = function (app) {
    app.route('/news').post(async (req, res, next) => {
        try {
            const data = req.body;
            const result = await News.createNews(data);
            return res.status(200)
                .json({
                    message: 'News created successfully',
                    newsId: result.insertId,
                });
        } catch (err) {
            return next(err);
        }
    });

    app.route('/news/match/:matchId').get(async (req, res, next) => {
        try {
            const matchId = req.params.matchId;
            const result = await News.getNewsByMatch(matchId);
            return res.json(result);
        } catch (err) {
            return next(err)
        }
    });

    app.route('/news/tour/:tourId').get(async (req, res, next) => {
        try {
            const tourId = req.params.tourId;
            const result = await News.getNewsByTour(tourId);
            return res.json(result);
        } catch (err) {
            return next(err)
        }
    });

    app.route('/news/sport/:sportId').get(async (req, res, next) => {
        try {
            const sportId = req.params.sportId;
            const result = await News.getNewsBySport(sportId);
            return res.json(result);
        } catch (err) {
            return next(err)
        }
    })
}