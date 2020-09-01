
const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

/**
 * GET organization
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const queryString = `SELECT * FROM "organization" WHERE "id" = $1;`;
    const queryValue = [
       req.params.id
    ]
    //console.log('in/api/organization', req.params.id)
    pool.query(queryString, queryValue)
    .then((result) => {res.send(result.rows)
    })  
    .catch((error)=>{
     res.sendStatus(500)
     console.log(error);
   })  
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;