import { loadTestJson } from "../cases/helpers/loadTestPayload.helper";

const allMembershipsWithPeriods = loadTestJson(__dirname + '/../cases', 'allMembershipsWithPeriods.json');
export const mockMembershipRepository = {
  getAllMemberships: jest.fn().mockReturnValue(allMembershipsWithPeriods),
  connect: jest.fn(),
  createMembership: jest.fn()
};

export const resetMocks = () => {
  mockMembershipRepository.connect.mockReset();
  mockMembershipRepository.createMembership.mockReset();
  mockMembershipRepository.getAllMemberships.mockReset();
};