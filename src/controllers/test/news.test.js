const { expect } = require('chai');
const sinon = require('sinon');
const News = require('../../models/news');
const {
    createNews,
    getNewsByMatch,
    getNewsByTour,
    getNewsBySport,
} = require('../news');

const dummyNews = [
    {
        title: 'Test title 1',
        description: 'Test description 1',
    },
    {
        title: 'Test title 2',
        description: 'Test description 2',
    },
];

describe('News Service', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('createNews', () => {
        it('should create news with valid data', async () => {
            const data = {
                description: 'Test description',
                title: 'Test title',
                matchId: 1,
            };

            // Mock the createNews method of the News module
            const createNewsStub = sinon.stub(News, 'createNews').resolves('Mocked createNews result');

            const result = await createNews(data);

            expect(createNewsStub.calledOnce).to.be.true;
            expect(createNewsStub.calledWith('Test title', 'Test description', 1, undefined)).to.be.true;
            expect(result).to.equal('Mocked createNews result');
        });

        it('should throw an error with missing description parameter', async () => {
            try {
                await createNews({});
            } catch (err) {
                expect(err.message).to.equal('Missing required parameter: description');
            }
        });

        it('should throw an error with missing title parameter', async () => {
            try {
                await createNews({ description: 'Test description' });
            } catch (err) {
                expect(err.message).to.equal('Missing required parameter: title');
            }
        });
    });

    describe('getNewsByMatch', () => {
        it('should get news by match ID', async () => {
            // Mock the getNewsByMatch method of the News module
            const getNewsByMatchStub = sinon.stub(News, 'getNewsByMatch').resolves(dummyNews);

            const result = await getNewsByMatch(1);

            expect(getNewsByMatchStub.calledOnce).to.be.true;
            expect(getNewsByMatchStub.calledWith(1)).to.be.true;
            expect(result).to.equal(dummyNews);
        });

        it('should throw an error with missing match ID', async () => {
            try {
                await getNewsByMatch();
            } catch (err) {
                expect(err.message).to.equal('Missing required parameter: matchId');
            }
        });
    });

    describe('getNewsByTour', () => {
        it('should get news by tour ID', async () => {
            // Mock the getNewsByTour method of the News module
            const getNewsByTourStub = sinon.stub(News, 'getNewsByTour').resolves(dummyNews);

            const result = await getNewsByTour(1);

            expect(getNewsByTourStub.calledOnce).to.be.true;
            expect(getNewsByTourStub.calledWith(1)).to.be.true;
            expect(result).to.equal(dummyNews);
        });

        it('should throw an error with missing tour ID', async () => {
            try {
                await getNewsByTour();
            } catch (err) {
                expect(err.message).to.equal('Missing required parameter: tourId');
            }
        });
    });

    describe('getNewsBySport', () => {
        it('should get news by sport ID', async () => {
            // Mock the getNewsBySport method of the News module
            const getNewsBySportStub = sinon.stub(News, 'getNewsBySport').resolves(dummyNews);

            const result = await getNewsBySport(1);

            expect(getNewsBySportStub.calledOnce).to.be.true;
            expect(getNewsBySportStub.calledWith(1)).to.be.true;
            expect(result).to.equal(dummyNews);
        });

        it('should throw an error with missing sport ID', async () => {
            try {
                await getNewsBySport();
            } catch (err) {
                expect(err.message).to.equal('Missing required parameter: sportId');
            }
        });
    });
});
