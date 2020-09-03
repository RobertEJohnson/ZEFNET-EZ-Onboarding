const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {rejectUnauthenticated} = require("../modules/authentication-middleware");

router.get('/:id', rejectUnauthenticated, (req,res)=>{
    const queryString = `SELECT * FROM breaker WHERE site_id = $1`;
    pool.query(queryString, [req.params.id])
        .then(result=>{
    
            res.send(result.rows)
        })
        .catch(error=>{
            console.log('Error getting breakers from database:', error)
            res.sendStatus(500);
        })
})

module.exports = router;
