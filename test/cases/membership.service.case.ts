import { mockMembershipRepository } from '../mocks/MembershipRepository.mock';
import { MembershipService } from '../../src/modern/services/MembershipService'
import { membershipSchema } from '../schemas/MembershipSchema';

/**
 * This test case validates the listed memberships (if exists).
 */
export const membershipServiceTestCase = () => {

  let membershipService: MembershipService;

  beforeAll(async () => {
    process.env.MONGO_CONNECTION_STRING = 'dummy-url';    
    membershipService = new MembershipService();
    membershipService.membershipRepository = mockMembershipRepository;
  });

  afterAll(async () => {
    jest.clearAllMocks();
  });

  it('should list all memberships', async () => {
    const allExistingMemberships = await membershipService.getAllMemberships();

    expect(allExistingMemberships.length).toBeGreaterThan(0);
  });

  it('should memberships has the correct schema', async () => {
    const allExistingMemberships = await membershipService.getAllMemberships();
    const expectedShape = membershipSchema;

    allExistingMemberships.forEach(membership => {
      expect(membership).toEqual(expect.objectContaining(expectedShape));
    });
  });
};