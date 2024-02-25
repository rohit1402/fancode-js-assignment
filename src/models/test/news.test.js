const { expect } = require('chai');
const sinon = require('sinon');
const mysql = require('../../lib/mysql');
const {
    createNews,
    getNewsByTour,
    getNewsByMatch,
    getNewsBySport,
} = require('../news');

describe('News Database Functions', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('createNews', () => {
        it('should insert news into the database', async () => {
            const queryStub = sinon.stub(mysql, 'query').resolves('Mocked query result');

            const result = await createNews('Test Title', 'Test Description', 1, 2);

            expect(queryStub.calledOnce).to.be.true;
            expect(queryStub.calledWith(
                'insert into news (title, description, matchId, tourId) VALUES (?, ?, ?, ?)',
                ['Test Title', 'Test Description', 1, 2]
            )).to.be.true;
            expect(result).to.equal('Mocked query result');
        });
    });

    describe('getNewsByTour', () => {
        it('should fetch news by tour ID', async () => {
            const queryStub = sinon.stub(mysql, 'query').resolves('Mocked query result');

            const result = await getNewsByTour(1);

            expect(queryStub.calledOnce).to.be.true;
            expect(queryStub.calledWith('select title, description from news where tourId = ?;', [1])).to.be.true;
            expect(result).to.equal('Mocked query result');
        });
    });

    describe('getNewsByMatch', () => {
        it('should fetch news by match ID', async () => {
            const queryStub = sinon.stub(mysql, 'query').resolves('Mocked query result');

            const result = await getNewsByMatch(1);

            expect(queryStub.calledOnce).to.be.true;
            expect(queryStub.calledWith('select title, description from news where matchId = ?;', [1])).to.be.true;
            expect(result).to.equal('Mocked query result');
        });
    });

    describe('getNewsBySport', () => {
        it('should fetch news by sport ID', async () => {
            const queryStub = sinon.stub(mysql, 'query').resolves('Mocked query result');

            const result = await getNewsBySport(1);

            expect(queryStub.calledOnce).to.be.true;
            expect(queryStub.calledWith(
                'select n.title AS title, n.description AS description ' +
                'from news n left join matches m on n.matchId = m.id left join tours t on n.tourId = t.id ' +
                'where t.sportId = ?;',
                [1]
            )).to.be.true;
            expect(result).to.equal('Mocked query result');
        });
    });
});
