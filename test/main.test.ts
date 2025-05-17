import { appTest } from './cases/app.case';
import { membershipControllerTestCase } from './cases/membership.controller.case';
import { membershipserviceTestCase } from './cases/membership.service.case';

describe('Test app startup', appTest);
describe('Test membership controller', membershipControllerTestCase);
describe('Test membership service', membershipserviceTestCase)