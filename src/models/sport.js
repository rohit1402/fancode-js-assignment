const mysql = require('../lib/mysql');

const getAllSportsToursAndMatches = async () => {
    const statement = 'select s.name AS sportName, t.name AS tourName, m.name AS matchName, m.id AS matchId, m.startTime AS startTime, m.format AS format ' +
        'from matches m inner join tours t on m.tourId = t.id ' +
        'inner join sports s on t.sportId = s.id';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllSportsToursAndMatches: getAllSportsToursAndMatches
}