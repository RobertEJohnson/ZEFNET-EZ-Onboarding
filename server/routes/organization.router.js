const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/", (req, res) => {});

/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, async (req, res) => {
  console.log(`req.body`, req.body);
  org = req.body;
  // Get a single connection from the pool to do the transaction
  // THIS IS IMPORTANT - won't work if you don't use the same connection!
  const connection = await pool.connect();

  try {
    await connection.query("BEGIN;");
    // This query will be executed in the conditional if no order is
    // found with the SelectOrder query. It will also return the newly created id.
    const createOrganization = `INSERT INTO organization (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING id;`;
    // This will add the product_id and order_id into the items table.
    const addOrganizationId = `UPDATE "user" SET organization_id = $1 WHERE "user".id = $2;`;

    await client.query(createOrganization, [
      org.organizationName,
      org.email,
      org.primaryNumber,
      org.organizationAddress,
    ]);
    await client.query(addOrganizationId, [org.user_id]);
    // End transaction w/ COMMIT
    await connection.query("COMMIT;");
    res.sendStatus(200);
  } catch (err) {
    console.log("Error adding organization", err);
    // Transaction failed, so send with ROLLBACK
    await connection.query("ROLLBACK");
    res.sendStatus(500);
  } finally {
    // THIS IS ALSO REALLY IMPORTANT!!!
    // Puts the connection back in the pool to be used again later.
    // FREE THE CONNECTION IN FINALLY
    connection.release();
  }
});

/**
 * PUT route template
 */
router.put("/", rejectUnauthenticated, (req, res) => {
  console.log(`put req.body`, req.body, req.organization.id);
  const organization = req.body;
  const queryText = `
      UPDATE "organization"
      SET 
      "name" = $1, 
      "email" = $2, 
      "phone" = $3, 
      "address" = $4
      WHERE 
      "id" = $5;`;
  const queryValues = [
    organization.firstName,
    organization.lastName,
    organization.email,
    organization.phoneNumber,
    req.user.id,
  ];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`***Error updating organization`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
