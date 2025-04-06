import { Kafka } from "kafkajs";
import config from "../../config/config.js";

const kafka = new Kafka({
    clientId: config.KAFKA.CLIENT_ID,
    brokers: config.KAFKA.BROKERS,
});


// Handler for rate-limit-exceeded
async function consumeRateLimitEvents() {
    const consumer = kafka.consumer({ groupId: `${config.KAFKA.GROUP_ID}-rate-limit` });
    await consumer.connect();
    await consumer.subscribe({ topic: config.KAFKA.TOPICS.RATE_LIMIT_EXCEEDED, fromBeginning: false });

    console.log(`🚀 Listening for rate-limit events on topic "${config.KAFKA.TOPICS.RATE_LIMIT_EXCEEDED}"`);

    await consumer.run({
        eachMessage: async ({ message }) => {
            try {
                const payload = JSON.parse(message.value.toString());
                console.log("🚨 Rate limit violation:", payload);
                const data = JSON.parse(message.value.toString());
                // await db.insertRateLimitEvent(data);
            } catch (err) {
                console.error("❌ Error handling rate-limit message:", err);
            }
        },
    });
}

// Handler for system alerts (e.g. Redis down)
async function consumeSystemAlerts() {
    const consumer = kafka.consumer({ groupId: `${config.KAFKA.GROUP_ID}-alerts` });
    await consumer.connect();
    await consumer.subscribe({ topic: config.KAFKA.TOPICS.SYSTEM_ALERTS, fromBeginning: false });

    console.log(`⚠️ Listening for system alerts on topic "${config.KAFKA.TOPICS.SYSTEM_ALERTS}"`);

    await consumer.run({
        eachMessage: async ({ message }) => {
            try {
                const payload = JSON.parse(message.value.toString());
                console.log("⚠️ System Alert Received:", payload);

                // Send Slack, Email, raise ticket, etc.
            } catch (err) {
                console.error("❌ Error handling system alert message:", err);
            }
            
        },
    });
}
// Handler for blocklisted events
async function consumeBlacklistedEvents() {
    const consumer = kafka.consumer({ groupId: `${config.KAFKA.GROUP_ID}-blacklisted` });
    await consumer.connect();
    await consumer.subscribe({ topic: config.KAFKA.TOPICS.BLACKLISTED, fromBeginning: false });

    console.log(` Listening for blacklisted events on topic ${config.KAFKA.TOPICS.BLACKLISTED}`);

    await consumer.run({
        eachMessage: async ({ message }) => {
            try {
                const payload = JSON.parse(message.value.toString());
                console.log(" Blacklisted event received:", payload);
                // For example, you might want to log this to your DB:
                // await db.insertBlacklistedEvent(payload);


                // need to integrate notification system
                // const isAuthenticated = !!payload.userId;

                // const supportDetails = {
                //     eventId: payload.eventId,
                //     message: payload.message,
                //     route: payload.route,
                //     requestCount: payload.requestCount,
                //     blockDurationSeconds: payload.blockDuration,
                //     unblockAt: new Date(payload.unblockAt).toLocaleString(),
                //     triggeredAt: new Date(payload.timestamp).toLocaleString(),
                //     ...(isAuthenticated
                //         ? { userId: payload.userId }
                //         : { ip: payload.ip })
                // };

                // await notifySupport({
                //     subject: isAuthenticated
                //         ? ` User ${payload.userId} blocklisted`
                //         : ` IP ${payload.ip} blocklisted`,
                //     details: supportDetails,
                // });
            } catch (err) {
                console.error("Error handling blacklisted event:", err);
            }
        },
    });
}

export { consumeRateLimitEvents, consumeSystemAlerts , consumeBlacklistedEvents};
