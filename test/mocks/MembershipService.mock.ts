import { MembershipService } from '../../src/modern/services/MembershipService';
import { mockMembershipRepository } from '../mocks/MembershipRepository.mock'

export const mockMembershipService: jest.Mocked<MembershipService> = {
  getAllMemberships: jest.fn().mockReturnValue({}),
  createMembership: jest.fn().mockReturnValue({}),
  membershipRepository: mockMembershipRepository
};

// Type-safe mock reset
export const resetMocks = () => {
  Object.values(mockMembershipService).forEach(mock => {
    if (jest.isMockFunction(mock)) mock.mockReset();
  });
};