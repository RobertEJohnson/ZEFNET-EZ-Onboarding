const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/:id", rejectUnauthenticated, (req, res) => {

  console.log("in /api/add-user req.params.id:", req.params.id);
  const queryString = `SELECT * FROM "zefnet_user" WHERE "organization_id" = $1;`;
  const postValues = [req.params.id];
  pool
    .query(queryString, postValues)
    .then((result) => {
      res.send(result.rows);
      console.log(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error on POST /api/add-user/", error);
    });
});

    //console.log('in /api/add-user req.params.id:',req.params.id);
    const queryString = `SELECT * FROM "zefnet_user" WHERE "organization_id" = $1;`;
    const postValues = [
      req.params.id,
    ];
    pool
      .query(queryString, postValues)
      .then((result) => {
        res.send(result.rows);
        //console.log(result.rows);
      })
      .catch((error) => {
        res.sendStatus(500);
        console.log("error on POST /api/add-user/", error);
      });
  });


router.post("/", rejectUnauthenticated, (req, res) => {
  const queryString = `INSERT INTO "zefnet_user"
    ("first_name", "last_name", "email", "phone", "editor", "organization_id")
    VALUES($1, $2, $3, $4, $5, $6);`;
  const postValues = [
    req.body.fname,
    req.body.lname,
    req.body.email,
    req.body.phone,
    req.body.editor,
    req.body.orgId,
  ];
  pool
    .query(queryString, postValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error on POST /api/add-user/", error);
    });
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  console.log(`====> In delete params ${req.params.id}`)
  const queryString = `DELETE FROM zefnet_user WHERE id = $1;`;
  const postValues = [req.params.id];
  pool
    .query(queryString, postValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error on POST /api/add-user/", error);
    });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {
  console.log(`====> In update req.body ${req.params.zefUser_id}`)
  const queryString = `UPDATE "zefnet_user"
    SET
    "first_name" = $1, 
    "last_name" = $2, 
    "email" $3, 
    "phone" $4, 
    "editor"$5 
    WHERE
    "id" = $6;`;
  const postValues = [
    req.body.fname,
    req.body.lname,
    req.body.email,
    req.body.phone,
    req.body.editor,
    req.body.id,
  ];
  pool
    .query(queryString, postValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error on POST /api/add-user/", error);
    });
});

module.exports = router;
