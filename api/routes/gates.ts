import  express  from "express";
const router = express.Router();
import gates from "../services/gates";


router.get("/", async (req, res,next) => {
    try{
        let {page,limit,filter,sort} = req.query;
        const parsedPage = page ? parseInt(page as string) : undefined;
        const parsedLimit = limit ? parseInt(limit as string) : undefined;
        filter = filter as string || undefined;
        sort = sort as string || undefined;

        const {data,meta,message} = await gates.get(
            parsedPage,
            parsedLimit,
            filter,
            sort
        );
        res.status(200).json({
            data,
            meta,
            message,
        });
    }catch(err){
        next(err);
    }
});

router.post("/", async function (req,res,next) {
   try{
    const message = await gates.create(req.body);
    res.status(201).json({message});
   }catch(err){
         next(err);
   }
});

router.delete("/:id", async function (req,res,next) {
    try{
        let {id} = req.params;
        const parsedId = parseInt(id) || -1;

        const message = await gates.remove(parsedId);
        res.status(200).json({message});
    }catch(err){
        next(err);
    }
});
router.put("/:id", async function (req,res,next) {
    try{
        let {id} = req.params;
        const parsedId = parseInt(id) || -1;

        const message = await gates.updateG(
            parsedId,
            req.body);
        res.status(200).json({message});
    }catch(err){
        next(err);
    }
});
router.get("/:id", async function (req,res,next) {
    try{
        let {id} = req.params;
        const parsedId = parseInt(id) || -1;

        const {data,message} = await gates.getById(parsedId);
        res.status(200).json({data,message});
    }catch(err){
        next(err);
    }
});

export default router;