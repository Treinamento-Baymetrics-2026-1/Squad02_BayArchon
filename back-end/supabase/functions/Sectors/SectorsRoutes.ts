import { Hono } from "hono";
import {DeleteSector, InsertSector, UpdateSector, ReadSector, ReadSectorById} from "./SectorsController.ts";

const sectorsRoutes = new Hono();


sectorsRoutes.post("/insert", InsertSector);

sectorsRoutes.post("/update", UpdateSector);

sectorsRoutes.delete("/delete/:id", async (context) => {
    const id = context.req.param("id");
    return await DeleteSector(context, parseInt(id));
});

sectorsRoutes.get("/read", async (context) => {

    const deleted = context.req.query("deleted");
    let deletedBool : boolean | null = null;
    deleted === "true" ? deletedBool = true : deleted === "false" ? deletedBool = false : deletedBool = null;

    return await ReadSector(context, deletedBool);
});

sectorsRoutes.get("/read/:id", async (context) => {
    const id = context.req.param("id");
    return await ReadSectorById(context, parseInt(id));
})

export default sectorsRoutes;