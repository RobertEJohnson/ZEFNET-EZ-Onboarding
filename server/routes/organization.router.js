const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET organization to get all info about organization by id
 */
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const queryString = `SELECT * FROM "organization" WHERE "id" = $1;`;
  const queryValue = [req.params.id];
  pool
    .query(queryString, queryValue)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in get Organization", error);
      res.sendStatus(500);
    });
});

/**
 * POST route posts a new organization with a name, email, phone, and address
 * also updates user to associate organization with primary user
 * also posts primary user to zefnet user table
 */
router.post("/", rejectUnauthenticated, async (req, res) => {

  const connection = await pool.connect();

  try {
    await connection.query("BEGIN;");

    const createOrganization = `INSERT INTO "organization" (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING id;`;

    const addOrganizationId = `UPDATE "user" SET organization_id = $1 WHERE "user"."id" = $2;`;

    const addZefUser = `INSERT INTO "zefnet_user" (first_name, last_name, email, phone, editor, is_primary, organization_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`;

    const result = await connection.query(createOrganization, [
      req.body.organizationName,
      req.body.organizationEmail,
      req.body.primaryNumber,
      req.body.organizationAddress,
    ]);
    await connection.query(addOrganizationId, [
      result.rows[0].id,
      req.body.user_id,
    ]);
    const zefUserValues = [
      req.body.first_name,
      req.body.last_name,
      req.body.userEmail,
      req.body.phone,
      req.body.editor,
      req.body.primary,
      result.rows[0].id,
    ];
    await connection.query(addZefUser, zefUserValues);

    await connection.query("COMMIT;");
    res.send(result.rows[0]);
  } catch (err) {
    console.log("Error adding organization", err);

    await connection.query("ROLLBACK");
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

/**
 * PUT route updates an organization's name, email, phone, and/or address.
 */
router.put("/", rejectUnauthenticated, async (req, res) => {

  const connection = await pool.connect();

  try {
    await connection.query("BEGIN;");

    const updateOrganization = `UPDATE "organization"
            SET 
            "name" = $1, 
            "email" = $2, 
            "phone" = $3, 
            "address" = $4
            WHERE 
            "id" = $5;`;

    await connection.query(updateOrganization, [
      req.body.organizationName,
      req.body.email,
      req.body.primaryNumber,
      req.body.organizationAddress,
      req.body.id,
    ]);

    await connection.query("COMMIT;");
    res.sendStatus(200);
  } catch (err) {
    console.log("Error updating organization", err);

    await connection.query("ROLLBACK");
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

/**
 * Submit Organization (PUT) route
 * this switches an organization's status to "submitted"
 */
router.put("/submit/:id", rejectUnauthenticated, (req, res) => {
  const queryString = `UPDATE "organization"
    SET "status" = 'submitted'
    WHERE id = $1;`;
  const postValues = [req.params.id];
  pool
    .query(queryString, postValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error on POST /api/device/", error);
      res.sendStatus(500);
    });
});

module.exports = router;
