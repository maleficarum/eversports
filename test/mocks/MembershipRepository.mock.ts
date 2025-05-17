const allMembership = [
  {
    membership: {
      id: 1,
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      name: "Platinum Plan",
      userId: 2000,
      recurringPrice: 150,
      validFrom: "2023-01-01T00:00:00.000Z",
      validUntil: "2023-12-31T00:00:00.000Z",
      state: "active",
      assignedBy: "Admin",
      paymentMethod: "credit card",
      billingInterval: "monthly",
      billingPeriods: 12
    },
    periods: [
      {
        id: 1,
        uuid: "123e4567-e89b-12d3-a456-426614174000",
        membership: 1,
        start: "2023-01-01T00:00:00.000Z",
        end: "2023-01-31T00:00:00.000Z",
        state: "issued"
      }
    ]
  },
  {
    membership: {
      id: 2,
      uuid: "123e4567-e89b-12d3-a456-426614174001",
      name: "Gold Plan",
      userId: 2000,
      recurringPrice: 100,
      validFrom: "2023-02-01T00:00:00.000Z",
      validUntil: "2023-12-31T00:00:00.000Z",
      state: "active",
      assignedBy: "Admin",
      paymentMethod: "cash",
      billingInterval: "monthly",
      billingPeriods: 2
    },
    periods: [
      {
        id: 2,
        uuid: "123e4567-e89b-12d3-a456-426614174001",
        membership: 2,
        start: "2023-02-01T00:00:00.000Z",
        end: "2023-02-28T00:00:00.000Z",
        state: "issued"
      }
    ]
  },
  {
    membership: {
      id: 3,
      uuid: "123e4567-e89b-12d3-a456-426614174002",
      name: "Gold Plan",
      userId: 2000,
      recurringPrice: 100,
      validFrom: "2023-02-01T00:00:00.000Z",
      validUntil: "2023-12-31T00:00:00.000Z",
      state: "active",
      assignedBy: "Admin",
      paymentMethod: null,
      billingInterval: "monthly",
      billingPeriods: 6
    },
    periods: [
      {
        id: 3,
        uuid: "123e4567-e89b-12d3-a456-426614174002",
        membership: 3,
        start: "2023-03-01T00:00:00.000Z",
        end: "2023-03-31T00:00:00.000Z",
        state: "issued"
      }
    ]
  }
];


export const mockMembershipRepository = {
  fetchAllMemberships: jest.fn().mockReturnValue(allMembership),
  connect: jest.fn(),
  create: jest.fn()
  // Add other repository methods as needed
};

export const resetMocks = () => {
  mockMembershipRepository.fetchAllMemberships.mockReset();
  // Reset other mocked methods here
};