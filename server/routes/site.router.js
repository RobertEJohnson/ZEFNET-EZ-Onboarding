const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET sites by orgaization_id
 */

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const query = `SELECT * FROM "site" WHERE "organization_id" = $1`
    const queryValue = [
        req.params.id
     ]
    pool.query(query, queryValue)
    .then((result) => {
        res.send(result.rows)
    })  
    .catch((error)=>{
    res.sendStatus(500)
    console.log(error);

    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    });
});

/**
 * POST new site
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const queryString = `INSERT INTO "site"
    ("address", "first_name", "second_name", "email", "phone", "organization_id")
    VALUES($1, $2, $3, $4, $5, $6);`
    const postValues = [
        req.body.address,
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.phone,
        req.body.organization_id
    ]
    pool.query(queryString, postValues)
    .then(()=>{res.sendStatus(201)})
    .catch((error)=>{
     res.sendStatus(500)
     console.log( 'error on POST /api/site/', error);
   })
});

module.exports = router;

