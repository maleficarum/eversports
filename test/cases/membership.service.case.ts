import { mockMembershipRepository } from '../mocks/MembershipRepository.mock';
import { MembershipService } from '../../src/modern/services/MembershipService'
import { Membership } from '../../src/modern/model/Membership';
import { membershipSchema } from '../schemas/MembershipSchema';

/**
 * This test case validates the listed memberships (if exists).
 */
export const membershipserviceTestCase = () => {

  let membershipService: MembershipService;

  beforeAll(async () => {
    membershipService = new MembershipService();
    membershipService.membershipRepository = mockMembershipRepository;
  });

  afterAll(async () => {
    jest.clearAllMocks();
  });

  it('should list all memberships', async () => {
    const allExistingMemberships = await membershipService.fetchAllMemberships();
    expect(allExistingMemberships.length).toBeGreaterThan(0);
  });

  it('should memberships has the correct schema', async () => {
    const allExistingMemberships = await membershipService.fetchAllMemberships();
    const expectedShape = membershipSchema;

    allExistingMemberships.forEach((membership: Membership) => {
      expect(membership).toEqual(expect.objectContaining(expectedShape));
    });
  });
};