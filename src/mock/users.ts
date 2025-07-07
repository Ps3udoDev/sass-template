export const mockUsers = [
    {
        email: "user1@example.com",
        password: "pass123@",
        tenant: "shrimp-wave",
        ownedModules: ["shrimp", "laying-hens"],
        ownedServices: ["genetics", "laboratory"],
        ownedPackages: [],
        subscription: {
            plan: "professional",
            nextBilling: "2024-02-15",
            amount: 449,
            currency: "USD"
        }
    },
    {
        email: "user2@example.com",
        password: "pass123@",
        tenant: "ganaderia-feliz",
        ownedModules: ["cattle"],
        ownedServices: [],
        ownedPackages: ["livestock-starter"],
        subscription: {
            plan: "starter",
            nextBilling: "2024-02-10",
            amount: 199,
            currency: "USD"
        }
    }
];
