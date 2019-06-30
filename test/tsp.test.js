/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
const mocha = require('mocha');
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
// const _ = require('lodash');
// const app = require('../src/routes/router');
const Logger = require('../logger');
const db = require('../src/utils/db');
const md5 = require('md5');
const { insertUser, autehnticateUser, getUserByEmail } = require('../src/controllers/user');
const { insertGraph, getAllGraphs } = require('../src/controllers/graph');


// Configure chai
chai.use(chaiHttp);
chai.should();

var newUser;

mocha.describe('Database test suite', () => {

  mocha.it('Connects to the database', async () => {
    try {
      await db;
      assert.ok(true);
    } catch(error) {
      // console.log(error);
      assert.ok(false);
    }
  });

  mocha.it('Inserts an User record', async () => {
    try {
      newUser = await insertUser({
        firstName: 'Dorel',
        lastName: 'Barbu',
        email: 'dorel@gmail.com',
        password: '123',
        trips: []
      });
      assert.ok(true);
    } catch(err) {
      assert.ok(false);
    }
  });

  mocha.it('Retrieves an user by email', async () => {
    try {
      const response = await getUserByEmail(newUser.email);
      assert.ok(response._id);
    } catch(error) {
      assert.ok(false);
    }
  });

  mocha.it('Logs in as a new user', async () => {
    try {
      const response = await autehnticateUser('dorel@gmail.com', md5('123'));
      assert.ok(response.isError === false);
    } catch(error) {
      assert.ok(false);
    }
  });

  mocha.it('Inserts a new user record', async () => {
    const graphData = {
      'edges': [
        {
          '1': {
            'index': 1,
            'cost': 135,
            'data': {
              'countryFrom': {
                'code': 'CZ',
                'name': 'Czechia'
              },
              'countryTo': {
                'code': 'RO',
                'name': 'Romania'
              },
              'price': 135,
              'dTime': 1561887000,
              'aTime': 1561897200,
              'flyFrom': 'PRG',
              'flyTo': 'OTP',
              'cityFrom': 'Prague',
              'cityTo': 'Bucharest',
              'distance': 1082.82,
              'aTimeUTC': 1561886400,
              'dTimeUTC': 1561879800
            }
          },
          '7': {
            'index': 7,
            'cost': 69,
            'data': {
              'countryFrom': {
                'code': 'CZ',
                'name': 'Czechia'
              },
              'countryTo': {
                'code': 'IT',
                'name': 'Italy'
              },
              'price': 69,
              'dTime': 1562137500,
              'aTime': 1562142900,
              'flyFrom': 'PRG',
              'flyTo': 'MXP',
              'cityFrom': 'Prague',
              'cityTo': 'Milan',
              'distance': 646.67,
              'aTimeUTC': 1562135700,
              'dTimeUTC': 1562130300
            }
          }
        },
        {
          '0': {
            'index': 0,
            'cost': 94,
            'data': {
              'countryFrom': {
                'code': 'RO',
                'name': 'Romania'
              },
              'countryTo': {
                'code': 'CZ',
                'name': 'Czechia'
              },
              'price': 94,
              'dTime': 1561994400,
              'aTime': 1561997700,
              'flyFrom': 'OTP',
              'flyTo': 'PRG',
              'cityFrom': 'Bucharest',
              'cityTo': 'Prague',
              'distance': 1082.82,
              'aTimeUTC': 1561990500,
              'dTimeUTC': 1561983600
            }
          }
        }
      ],
      'cityToIndex': {
        'Prague': 0,
        'Bucharest': 1,
        'Pars': 2,
        'Vienna': 3,
        'London': 4,
        'New York': 5,
        'Washington': 6,
        'Milan': 7,
        'Rome': 8,
        'Lisbon': 9
      }
    };
    try {
      insertGraph(graphData);
      assert.ok(true);
    } catch(error) {
      assert.ok(false);
    }
  });
  mocha.it('Gets all graphs', async () => {
    try {
      const graphs = await getAllGraphs();
      assert.ok(true);
    } catch(error) {
      assert.ok(false);
    }
    assert.ok(true);
  });
});

mocha.after(async () => {
  (await db).connection.db.dropCollection('users', function(err, result) {
    if(err) {
      assert.ok(false);
    } else {
      assert.ok(true);
    }
  });
  (await db).connection.db.dropCollection('graphs', function(err, result) {
    if(err) {
      assert.ok(false);
    } else {
      assert.ok(true);
    }
  });
  Logger.success('Database cleared');
});