// Basic: Need to change.
import { Response } from "express";

const success = (res: Response, data = {}, status = 200) =>
  res.status(status).json({ success: true, data });

const error = (res: Response, message = "Server Error", status = 500) =>
  res.status(status).json({ success: false, message });
module.exports = { success, error };
