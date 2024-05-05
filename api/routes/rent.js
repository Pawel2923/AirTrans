
const express = require("express");
const router = express.Router();
const rentalService = require("../services/rent"); 

router.get("/", async function (req, res, next) {
    try {
        const { page, limit } = req.query;

        const { data, meta, response } = await rentalService.getAllRentals(page, limit); 

        res.status(response.statusCode).json({
            data,
            meta
        });

    } catch (error) {
        console.error("Error while fetching rentals", error); 
        res.status(500).json({ message: "Internal server error" });
    }
});
router.post("/", async function (req, res, next) {
    try {
      const { data, message } = await rentalService.createRental(req.body);
      res.status(201).json({ data, message });
    } catch (err) {
      next(err);
    }
  });


  router.delete("/:id", async function (req, res, next) {
    try {
    const message=await rentalService.removeRent(req.params.id);
    res.status(204).json({message});
    } catch (err) {
    next(err);
    }
    });
  

    router.get("/:id", async function (req, res, next) {
      try {
          const rentId = req.params.id;
  
          const { data, response } = await rentalService.getById(rentId);
  
          if (!data) {
              return res.status(response.statusCode).json({
                  message: response.message,
              });
          }
  
          res.status(response.statusCode).json({
              data,
          });
  
      } catch (error) {
          console.error("Error while fetching rental", error);
          res.status(500).json({ message: "Internal server error" });
      }
  });
  

router.put("/:id", async function (req, res, next) {
  try{
    const {data, message} = await rentalService.updateRent(req.params.id, req.body);
    res.status(200).json({data, message});
  } catch(err){
    next(err);
  }
}); 
module.exports = router;