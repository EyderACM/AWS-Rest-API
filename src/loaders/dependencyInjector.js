import Container from "typedi";
import LoggerInstance from "./logger";

export default () => {
  try {
    Container.set("logger", LoggerInstance);
  } catch (error) {
    LoggerInstance.error("🔥 Error on dependency injector loader: %o", e);
    throw e;
  }
};
