import { IMembershipRepository } from '../../src/modern/repository/interfaces/IMembershipRepository';
import { MembershipRepository } from '../../src/modern/repository/MembershipRepository';
import { MembershipSchema } from '../../src/modern/model/schemas/db/mongo/MembershipSchema';
import { MembershipPeriodSchema } from '../../src/modern/model/schemas/db/mongo/MembershipPeriodSchema';
import { membershipSchema } from '../schemas/MembershipSchema';
import { loadTestJson } from './helpers/loadTestPayload.helper';
import { Query } from 'mongoose';

/**
 * This test case validates the listed memberships (if exists).
 */
export const membershipRepositoryTestCase = () => {

  let membershipRepository: IMembershipRepository;
  let allMemberships: Array<object>[];
  let allPeriods: Array<object>[];

  beforeAll(async () => {
    allMemberships = loadTestJson(__dirname, 'allMemberships.json');
    allPeriods = loadTestJson(__dirname, 'allMembershipsPeriods.json');
    process.env.MONGO_CONNECTION_STRING = 'dummy-url';

    membershipRepository = new MembershipRepository();
    const mockMembershipsQuery = {
      lean: jest.fn().mockResolvedValue(allMemberships),
      exec: jest.fn().mockResolvedValue(allMemberships),
      select: jest.fn().mockReturnThis()
    } as unknown as Query<typeof allMemberships, typeof allMemberships>;

    const mockMembershipsPeriodQuery = {
      lean: jest.fn().mockResolvedValue(allPeriods),
      exec: jest.fn().mockResolvedValue(allPeriods),
      select: jest.fn().mockReturnThis()
    } as unknown as Query<typeof allPeriods, typeof allPeriods>;

    jest.spyOn(MembershipSchema, 'find').mockReturnValue(mockMembershipsQuery);
    jest.spyOn(MembershipPeriodSchema, 'find').mockReturnValue(mockMembershipsPeriodQuery);

  });

  afterAll(async () => {
    jest.clearAllMocks();
  });

  it('Should get all memberships', async () => {
    const allExistingMemberships = await membershipRepository.getAllMemberships();
    const expectedShape = membershipSchema;

    allExistingMemberships.forEach(membership => {
      expect(membership).toEqual(expect.objectContaining(expectedShape));
    });

  });

};