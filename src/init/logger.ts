import { log } from "iggs-utils"
const logLevel = log.LogLevel.TRACE;
log.setLogLevel(log.LogLevel.TRACE);
log.info("init logger log level " + logLevel);
