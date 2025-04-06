import { Kafka } from "kafkajs";
import config from "../../config/config.js";

const kafka = new Kafka({
    clientId: config.KAFKA.CLIENT_ID,
    brokers: config.KAFKA.BROKERS,
});

const producer = kafka.producer();

export const kafkaProducer = {
    async connect() {
        await producer.connect();
        console.log("🟢 Kafka producer connected");
    },

    async send({ topic, messages }) {
        try {
            await producer.send({
                topic,
                messages,
            });
            console.log(`📤 Message sent to Kafka topic "${topic}"`);
        } catch (error) {
            console.log(error)
            console.error(`❌ Failed to send message to Kafka: ${error.message}`);
        }
    },

    async disconnect() {
        await producer.disconnect();
        console.log("🔴 Kafka producer disconnected");
    },
};

export async function initKafkaProducer() {
    await kafkaProducer.connect();
}

