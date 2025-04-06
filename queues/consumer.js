import config from "../config/config.js";
import { kafkaProducer, initKafkaProducer } from "./transports/kafkaProducer.js";

export async function sendToQueue(topic, payload) {
    console.log({topic, payload})
    const provider = config.QUEUES.PROVIDER;
    switch (provider) {
        case "kafka":
            await kafkaProducer.send({
                topic,
                messages: [{ value: JSON.stringify(payload) }],
            });
            break;

        // case "rabbitmq":
        //     await sendRabbitMessage(topic, payload);
        //     break;

        default:
            console.warn(` Unsupported QUEUE_PROVIDER: ${provider}`);
            break;
    }
}


export async function initQueueProducer() {
    switch (config.QUEUES.PROVIDER) {
        case "kafka":
            await initKafkaProducer();
            break;
        // case "rabbitmq":
        //     await initRabbitProducer(); 
        //     break;
        default:
            console.warn(` Unsupported QUEUE_PROVIDER: ${config.QUEUES.PROVIDER}`);
    }
}