import * as pgPromise from '../../typescript/pg-promise';

const pgp: pgPromise.IMain = pgPromise();

const db: pgPromise.IDatabase<any> = pgp('connection');

const qrm = pgPromise.queryResult;

db.query('', [], qrm.one | qrm.none)
    .then(data => {
        const d1 = data.value;
        const d2 = data[0].value;
    });

db.any<number>('').then(data => {
    const a: number = data[0];
});

db.any('').then(data => {
    const a: number = data[0];
});

db.none('')
    .then(data => {
    });

db.one('', [], value => {
    return {value: 123};
}, 'this')
    .then(data => {
        const value = data.value;
    });

db.oneOrNone('')
    .then(data => {
        const value = data.value;
    });

db.many('')
    .then(data => {
        const value = data[0].ops;
    });

db.result('', [], r => {
    return r;
}, 123)
    .then(data => {
        const value = data.rows[0].name;
        const d: number = data.duration;
    });

db.result('')
    .then(data => {
        const value = data.rows[0].name;
        const d: number = data.duration;
    });

db.task(t => {
    return t.batch([
        t.one('')
    ])
        .then((data: any[]) => {
            return data;
        });
})
    .then(data => {
        const d1 = data.value;
        const d2 = data[0].value;
    });