const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET organization
 */
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const queryString = `SELECT * FROM "organization" WHERE "id" = $1;`;
  const queryValue = [req.params.id];
  //console.log('in/api/organization', req.params.id)
  pool
    .query(queryString, queryValue)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    });
});

/**
 * POST route
 */
router.post("/", rejectUnauthenticated, async (req, res) => {
  console.log(`req.body`, req.body);

  const connection = await pool.connect();

  try {
    await connection.query("BEGIN;");

    const createOrganization = `INSERT INTO "organization" (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING id;`;

    const addOrganizationId = `UPDATE "user" SET organization_id = $1 WHERE "user"."id" = $2;`;

    const addZefUser = `INSERT INTO "zefnet_user" (first_name, last_name, email, phone, editor, is_primary, organization_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`;

    const result = await connection.query(createOrganization, [
      req.body.organizationName,
      req.body.email,
      req.body.primaryNumber,
      req.body.organizationAddress,
    ]);
    await connection.query(addOrganizationId, [
      result.rows[0].id,
      req.body.user_id,
    ]);
    const zefUserValues = [
      req.body.fname,
      req.body.lname,
      req.body.email,
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
 * PUT route
 */
router.put("/", rejectUnauthenticated, async (req, res) => {
  console.log(`req.body`, req.body);

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
      res.sendStatus(500);
      console.log("error on POST /api/device/", error);
    });
});

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
      res.sendStatus(500);
      console.log("error on POST /api/device/", error);
    });
});

module.exports = router;
