export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT || 4000;
export const DB =
  process.env.MONGODB_URI || "mongodb://localhost:27017/project1-DB";
export const SECRET =
  process.env.SECRET || "thisisaverysecurestringtonotbeinghacked";
