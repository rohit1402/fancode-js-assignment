const request = require('supertest');
const express = require('express');
const newsRoutes = require('../news');
const NewsController = require('../../controllers/news');

jest.mock('../../controllers/news', () => ({
    createNews: jest.fn(),
    getNewsByMatch: jest.fn(),
    getNewsByTour: jest.fn(),
    getNewsBySport: jest.fn(),
}));

const app = express();
app.use(express.json());
newsRoutes(app);

const dummyNews = [
    {
        title: 'Test title 1',
        description: 'Test description 1',
    },
    {
        title: 'Test title 2',
        description: 'Test description 2',
    },
]

describe('News Routes', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('POST /news', () => {
        it('should create news and return 200 status', async () => {
            const createNewsMock = NewsController.createNews;
            createNewsMock.mockResolvedValue({ insertId: 1 });

            const response = await request(app)
                .post('/news')
                .send({
                    description: 'Test description',
                    title: 'Test title',
                    matchId: 1,
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('News created successfully');
            expect(response.body.newsId).toBe(1);
            expect(createNewsMock).toHaveBeenCalledWith({
                description: 'Test description',
                title: 'Test title',
                matchId: 1,
            });
        });

        it('should create news and return 200 status', async () => {
            const createNewsMock = NewsController.createNews;
            createNewsMock.mockResolvedValue({ insertId: 1 });

            const response = await request(app)
                .post('/news')
                .send({
                    description: 'Test description with tour',
                    title: 'Test title with tour',
                    tourId: 1,
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('News created successfully');
            expect(response.body.newsId).toBe(1);
            expect(createNewsMock).toHaveBeenCalledWith({
                description: 'Test description with tour',
                title: 'Test title with tour',
                tourId: 1,
            });
        });

        it('should throw errors when data is missing', async () => {
            const createNewsMock = NewsController.createNews;
            createNewsMock.mockRejectedValue(new Error('Test error'));

            const response = await request(app)
                .post('/news')
                .send({
                    description: 'Test description',
                    title: '',
                    matchId: 1,
                });

            expect(response.status).toBe(500);
        });
    });

    describe('GET /news/match/:matchId', () => {
        it('should get news by match ID', async () => {
            const getNewsByMatchMock = NewsController.getNewsByMatch;
            getNewsByMatchMock.mockResolvedValue(dummyNews);

            const response = await request(app).get('/news/match/1');

            expect(response.status).toBe(200);
            expect(response.body).toStrictEqual(dummyNews);
            expect(getNewsByMatchMock).toHaveBeenCalledWith('1');
        });

        it('should throw errors when no match ID defined', async () => {
            const getNewsByMatchMock = NewsController.getNewsByMatch;
            getNewsByMatchMock.mockRejectedValue(new Error('Test error'));
      
            const response = await request(app).get('/news/match/null');
      
            expect(response.status).toBe(500);
        });
    });

    describe('GET /news/tour/:tourId', () => {
        it('should get news by tour ID', async () => {
            const getNewsByTourMock = NewsController.getNewsByTour;
            getNewsByTourMock.mockResolvedValue(dummyNews);

            const response = await request(app).get('/news/tour/1');

            expect(response.status).toBe(200);
            expect(response.body).toStrictEqual(dummyNews);
            expect(getNewsByTourMock).toHaveBeenCalledWith('1');
        });

        it('should throw errors when no tour ID defined', async () => {
            const getNewsByTourMock = NewsController.getNewsByTour;
            getNewsByTourMock.mockRejectedValue(new Error('Test error'));
      
            const response = await request(app).get('/news/tour/null');
      
            expect(response.status).toBe(500);
        });
    });

    describe('GET /news/sport/:sportId', () => {
        it('should get news by sport ID', async () => {
            const getNewsBySporthMock = NewsController.getNewsBySport;
            getNewsBySporthMock.mockResolvedValue(dummyNews);

            const response = await request(app).get('/news/sport/1');

            expect(response.status).toBe(200);
            expect(response.body).toStrictEqual(dummyNews);
            expect(getNewsBySporthMock).toHaveBeenCalledWith('1');
        });

        it('should throw errors when no sport ID defined', async () => {
            const getNewsBySportMock = NewsController.getNewsBySport;
            getNewsBySportMock.mockRejectedValue(new Error('Test error'));
      
            const response = await request(app).get('/news/sport/null');
      
            expect(response.status).toBe(500);
        });
    });
});
