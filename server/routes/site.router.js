const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET sites by orgaization_id
 */
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const query = `SELECT * FROM "site" WHERE "organization_id" = $1`;
  const queryValue = [req.params.id];
  pool
    .query(query, queryValue)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;
