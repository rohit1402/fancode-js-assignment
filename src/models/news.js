const mysql = require('../lib/mysql');

const createNews = async (title, description, matchId, tourId) => {
    const statement = 'insert into news (title, description, matchId, tourId) VALUES (?, ?, ?, ?)';
    const parameters = [title, description, matchId, tourId];
    return await mysql.query(statement, parameters);
}

const getNewsByTour = async (tourId) => {
    const statement = 'select title, description from news where tourId = ?;';
    const parameters = [ tourId ];
    return await mysql.query(statement, parameters);
}

const getNewsByMatch = async (matchId) => {
    const statement = 'select title, description from news where matchId = ?;';
    const parameters = [ matchId ];
    return await mysql.query(statement, parameters);
}

const getNewsBySport = async (sportId) => {
    const statement = 'select n.title AS title, n.description AS description ' +
        'from news n left join matches m on n.matchId = m.id left join tours t on n.tourId = t.id ' +
        'where t.sportId = ?;';
    const parameters = [ sportId ];
    return await mysql.query(statement, parameters);
}

module.exports = {
    createNews: createNews,
    getNewsByTour: getNewsByTour,
    getNewsByMatch: getNewsByMatch,
    getNewsBySport: getNewsBySport,
}