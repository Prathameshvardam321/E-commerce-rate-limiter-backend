import config from "./config/config.js"; // don't remove, alwas first to load
import app from "./app.js";
import { initQueueProducer } from "./queues/consumer.js";
import { consumeRateLimitEvents, consumeSystemAlerts,consumeBlacklistedEvents } from "./queues/transports/kafka.js";

let server;

const initApp = async () => {
    console.log("Waiting for DB connections");
    await initConfigurations();
    try {
        server = app.listen(config.PORT, (req, res) => {
            console.info(`Main Server Started ON: `, config.PORT);
        });
        await consumeRateLimitEvents()
        config.ALERTS.ENABLED && await consumeSystemAlerts()
        config.RATE_LIMIT.BLACK_LIST.ENABLED && await consumeBlacklistedEvents()
        
        process.on("uncaughtException", unexpectedErrorHandler);
        process.on("unhandledRejection", unexpectedErrorHandler);
        process.on("SIGTERM", () => {
            console.info("SIGTERM received");
            terminateServers();
        });
    } catch (error) {
        console.info("Error on while starting node servers");
        console.error(error);
        terminateServers();
    }
};

const initConfigurations = async () => {
    try {
       await initQueueProducer()
    } catch (error) {
        console.info("Error on initConfigurations:");
        console.error(error);
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
        console.error(error)
        server.close(() => {
            console.info("Server closed");
            process.exit(1);
        });
};

const terminateServers = () => {
    if (server) {
        server.close();
    }
   
};

 initApp();
