/**
 * @swagger
 *  components:
 *    schemas:
 *      ProfileSchema:
 *        type: object
 *        required:
 *          - id_user
 *          - distance
 *          - raceTime
 *          - raceDate
 *        properties:
 *          id_user:
 *            type: string
 *          distance:
 *            type: string
 *          raceTime:
 *             type: string
 *          raceDate:
 *             type: Date
 *        example:
 *           id_user: 5fff200cac686c2040c4a93b
 *           distance: 103
 *           raceTime: 00:06:06
 *           raceDate: 2021-01-05T21:00:00.000+00:00
 */

const express = require("express");
const router = express.Router();
const addDataController = require("../../controllers/addDataController");
const addImgController = require("../../controllers/addImgController");
// Routes
/**
 * @swagger
 * path:
 * /api/profile/add_data:
 *   get:
 *    tags:
 *    - "/api/profile"
 *    description: Use to add data Race
 *    parameters:
 *      - name: id_user
 *        in: body
 *        description: id user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: distance
 *        in: body
 *        description: distance race
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: raceTime
 *        in: body
 *        description: Race Time
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: raceDate
 *        in: body
 *        description: Race Date
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: Successfully created Race
 * /api/profile/remove_data:
 *   post:
 *    tags:
 *    - "/api/profile"
 *    description: Use to delete data
 *    parameters:
 *      - name: id_data
 *        in: body
 *        description: Object id in mongo
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully Removed
 * /api/profile/load_data/:id_user:
 *   get:
 *    tags:
 *    - "/api/profile"
 *    description: Use to load data Races
 *    parameters:
 *      - name: id_user
 *        in: body
 *        description: id user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully Load Races
 * /api/profile/update_data:
 *   post:
 *    tags:
 *    - "/api/profile"
 *    description: Use to update data Race
 *    parameters:
 *      - name: id_data
 *        in: body
 *        description: Object id in mongo
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: distance
 *        in: body
 *        description: distance race
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: raceTime
 *        in: body
 *        description: Race Time
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: raceDate
 *        in: body
 *        description: Race Date
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully Update Race
 * /api/profile/find_week:
 *   post:
 *    tags:
 *    - "/api/profile"
 *    description: Use to Find date range 
 *    parameters:
 *      - name: id_user
 *        in: body
 *        description: id user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: startDay
 *        in: body
 *        description: Start day of range
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: endDay
 *        in: body
 *        description: End day of range
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully Get range Data Races
 * /api/profile/add_img:
 *   post:
 *    tags:
 *    - "/api/profile"
 *    description: Use to save img url in MongoDB
 *    parameters:
 *      - name: id_user
 *        in: body
 *        description: id user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: imageUrl
 *        in: body
 *        description: image Url
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully Saved
 * /api/profile/load_imgs/:id_user:
 *   get:
 *    tags:
 *    - "/api/profile"
 *    description: Use to load images user
 *    parameters:
 *      - name: id_user
 *        in: body
 *        description: id user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully Load Images
 */

router.post("/add_data", function (req, res) {
  addDataController.addNewData(
    req.body.id_user,
    req.body.distance,
    req.body.raceTime,
    req.body.raceDate,
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          error: err,
        });
        return;
      }

      if (result) {
        if (err) {
          console.log(err);
        } else {
          res.status(201).json({
            success: true,
            data: result,
          });
        }
        console.log("DATA Added");
      } else {
        res.status(400).json({
          success: "data not added",
        });
      }
    }
  );
});

router.post("/remove_data", function (req, res) {
  addDataController.removeData(req.body.id_data, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        error: err,
      });
      return;
    }

    if (result) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          success: true,
        });
      }
      console.log("Data remove");
    } else {
      res.status(400).json({
        success: "data not remove",
      });
    }
  });
});

router.get("/load_data/:id_user", function (req, res) {
  const id_user = req.params.id_user;
  console.log("data load", id_user);
  addDataController.loadAllUserData(id_user, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
      });
      return;
    }
    if (result.length != 0) {
      res.status(200).json({
        success: true,
        data: result,
      });
    } else {
      res.status(404).json({
        success: "not found remove",
      });
    }
  });
});

router.post("/update_data", function (req, res) {
  addDataController.updateData(
    req.body.id_data,
    req.body.distance,
    req.body.raceTime,
    req.body.raceDate,
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          error: err,
        });
        return;
      }

      if (result) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({
            success: true,
          });
        }
        console.log("DATA Update");
      } else {
        res.status(400).json({
          success: "Data not update",
        });
      }
    }
  );
});

router.post("/find_week", function (req, res) {
  addDataController.findWeek(
    req.body.startDay,
    req.body.endDay,
    req.body.id_user,
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          error: err,
        });
        return;
      }
      if (result) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({
            data: result,
          });
        }
        console.log("find weeks");
      } else {
        res.status(404).json({
          success: "data not found",
        });
      }
    }
  );
});
router.post("/add_img", function (req, res) {
  addImgController.addNewImage(
    req.body.id_user,
    req.body.imageUrl,
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: err,
        });
        return;
      }

      if (result) {
        if (err) {
          console.log(err);
        } else {
          res.status(201).json({
            data: result,
          });
        }
        console.log("imageUrl Added");
      } else {
        res.status(400).json({
          message: "Failed Upload",
        });
      }
    }
  );
});

router.get("/load_imgs/:id_user", function (req, res) {
  const id_user = req.params.id_user;
  console.log("imgs load", id_user);
  addImgController.loadAllImages(id_user, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
      });
      return;
    }
    if (result.length != 0) {
      res.status(200).json({
        data: result,
      });
    } else {
      res.status(404).json({
        message: "Imgs not loaded",
      });
    }
  });
});

router.post("/remove_img", function (req, res) {
  addImgController.removeImage(req.body.id_data, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        error: err,
      });
      return;
    }
    if (result) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          success: true,
        });
      }
      console.log("Data remove");
    } else {
      res.status(400).json({
        success: false,
      });
    }
  });
});

module.exports = router;
