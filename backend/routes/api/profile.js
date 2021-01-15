const express = require("express");
const router = express.Router();
const addDataController = require("../../controllers/addDataController");
const addImgController = require("../../controllers/addImgController");

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

  router.post("/add_img", function (req, res) {
    addImgController.addNewImage(
      req.body.id_user,
      req.body.imageUrl,
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
          console.log("imageUrl Added");
        } else {
          res.status(400).json({
            success: false,
            data: result,
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
          success: true,
          data: result,
        });
      } else {
        res.status(404).json({
          success: false,
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
