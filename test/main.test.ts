import { appTest } from './cases/app.case';
import { membershipControllerTestCase } from './cases/membership.controller.case';
import { membershipCreationValidatorTestCase } from './cases/membership.validator.case';
import { membershipRepositoryTestCase } from './cases/membership.repository.case';

describe('Test app startup', appTest);
describe('Test membership controller', membershipControllerTestCase);
describe('Test membership repository', membershipRepositoryTestCase);
describe('Test membership creation rules', membershipCreationValidatorTestCase);