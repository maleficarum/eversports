import { membershipCreationValidatorTestCase } from './cases/membership.validator.case';
import { membershipRepositoryTestCase } from './cases/membership.repository.case';
import { membershipServiceTestCase } from './cases/membership.service.case';
import { membershipControllerTestCase } from './cases/membership.controller.case';

describe('Test membership service', membershipServiceTestCase);
describe('Test membership repository', membershipRepositoryTestCase);
describe('Test membership creation rules', membershipCreationValidatorTestCase);
describe('Test membership controller', membershipControllerTestCase);