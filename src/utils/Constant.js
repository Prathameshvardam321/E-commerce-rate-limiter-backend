
export const USERS_FROM_PLATFORM_SERVICES = [
    { user_id: 'e23db63eb-3cabeui-4fa5', email: "user1@example.com", password: "##########", status: "active" },
    { user_id: '56aa11f6-8939uaeu-jdg89', email: "user2@example.com", password: "##########", status: "banned" },
];

export const PRODUCTS = [
    {
        id: 101,
        name: "Wireless Mouse",
        price: 25.99,
        stock: 120,
        category: "Electronics",
        categoryId: 1,
        description: "Ergonomic wireless mouse with USB receiver.",
    },
    {
        id: 102,
        name: "Bluetooth Headphones",
        price: 59.99,
        stock: 80,
        category: "Electronics",
        categoryId: 1,
        description: "Over-ear Bluetooth headphones with noise cancellation.",
    },
    {
        id: 103,
        name: "Running Shoes",
        price: 45.00,
        stock: 60,
        category: "Footwear",
        categoryId: 2,
        description: "Lightweight running shoes with breathable mesh.",
    },
    {
        id: 104,
        name: "Coffee Mug",
        price: 12.49,
        stock: 150,
        category: "Home & Kitchen",
        categoryId: 3,
        description: "Ceramic mug with heat-resistant handle.",
    },
    {
        id: 105,
        name: "USB-C Charger",
        price: 18.99,
        stock: 90,
        category: "Accessories",
        categoryId: 4,
        description: "Fast charging USB-C wall charger (20W).",
    },
];


export const EVENT_IDS = {
    RATE_LIMIT_EXCEEDED: {
        eventId: 1001,
        message: 'User exceeded rate limit',
    },
    BLOCK_LISTED: {
        eventId: 1002,
        message: 'User blocklisted due to excessive requests',
    },
    REDIS_DOWN: {
        eventId: 1003,
        message: 'Redis unavailable, fallback in effect',
    },
};
