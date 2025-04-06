# ⚡ E-Commerce Rate Limiter & Analytics Backend

A scalable and fault-tolerant rate-limiting microservice for e-commerce APIs, built using Node.js, Redis, Kafka, and RabbitMQ. Designed to throttle abusive requests, log analytics, and raise alerts in real-time for suspicious behavior.

---

## 🚀 Features

- 🔐 **User/IP-based Rate Limiting** using Redis
- ⚙️ **Kafka Integration** for decoupled event handling
- 📛 **Blacklist & Burst Protection** for abusive clients
- 💥 **Resilient Fallback to Local Cache** if Redis fails
- 📩 **RabbitMQ Integration** for future observability or jobs
- 🧠 **Edge-case Handling** for reliability
- 🧱 Fully Dockerized for seamless deployment

---

## 🛠️ Tech Stack

- **Node.js + Express**
- **Redis** – for rate tracking & blacklist
- **Kafka (Confluent)** – for analytics & alerts
- **RabbitMQ** – for optional async workflows
- **Docker + Docker Compose**

---

## ⚙️ Assumptions

> ⚠️ **Authentication and Traffic Flow**

- All requests to this backend **must pass through an API Gateway**.
- The API Gateway is responsible for **validating the JWT token**.
- Upon validation, the Gateway **attaches `x-user-id`** as a request header.
- **No traffic can reach this service directly** without going through the API Gateway.

This allows the backend to trust the `x-user-id` header for identifying users.

---


