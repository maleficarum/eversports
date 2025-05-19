import { membershipCreationValidatorTestCase } from './cases/membership.validator.case';
import { membershipRepositoryTestCase } from './cases/membership.repository.case';

describe('Test membership repository', membershipRepositoryTestCase);
describe('Test membership creation rules', membershipCreationValidatorTestCase);