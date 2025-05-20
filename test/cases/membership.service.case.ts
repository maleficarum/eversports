jest.mock('../../src/modern/services/MembershipService', () => {
  const actual = jest.requireActual('../../src/modern/services/MembershipService');

  return {
    MembershipService: jest.fn().mockImplementation(() => {
      const instance = Object.create(actual.MembershipService.prototype);
      return instance;
    }),
  };
});

import { mockMembershipRepository } from '../mocks/MembershipRepository.mock';
import { MembershipService } from '../../src/modern/services/MembershipService'
import { membershipSchema } from '../schemas/MembershipSchema';
import { loadTestJson } from './helpers/loadTestPayload.helper';

/**
 * This test case validates the listed memberships (if exists).
 */
export const membershipServiceTestCase = () => {

  let membershipService: MembershipService;
  const membershipToCreate = loadTestJson(__dirname + '/../cases', 'membershipToCreate.json');

  beforeAll(async () => {
    membershipService = new MembershipService() as jest.Mocked<MembershipService>;
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

  it('should create membership', async () => {
    const createdMembership = await membershipService.createMembership(membershipToCreate, []);
    const expectedShape = membershipSchema;
    
    expect(createdMembership).toEqual(expect.objectContaining(expectedShape));
  });  
};