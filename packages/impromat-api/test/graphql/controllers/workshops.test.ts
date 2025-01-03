import { UUID4_REGEX } from 'test/test-utils/uuid4-regex';
import {
  ApiTestSession,
  initApiTestSession,
} from '../../test-utils/init-api-test-session';
import {
  addWorskshopWithEmptyNameQuery,
  createWorkshopByNameMutation,
  userWorkshopsQuery,
} from './workshop-queries';

describe('User Workshops', () => {
  let api: ApiTestSession;

  beforeAll(async () => {
    api = await initApiTestSession();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('happy', () => {
    let newWorkshopId: string;

    it('should read an empty list', async () => {
      // given
      const query = userWorkshopsQuery;
      // when
      const response = await api.graphqlRequest(query);
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data!.workshops).toEqual([]);
    });

    it('should add a new workshop', async () => {
      // given
      const testWorkshopName = 'test-workshop';
      const query = createWorkshopByNameMutation;
      // when
      const response = await api.graphqlRequest(query, {
        name: testWorkshopName,
      });
      // then
      expect(response.errors).toBeUndefined();
      const newWorkshop = response.data!.createWorkshop;
      expect(newWorkshop.name).toBe(testWorkshopName);

      // TODO extract into common function to test base fields
      const { id, version, createdAt, updatedAt, deleted } = newWorkshop;
      expect(id).toMatch(UUID4_REGEX);
      expect(version).toBe(0);
      expect(new Date(createdAt).getTime()).toBeGreaterThan(Date.now() - 10000);
      expect(new Date(updatedAt).getTime()).toBeGreaterThan(Date.now() - 10000);
      expect(deleted).toBe(false);

      newWorkshopId = newWorkshop.id;
    });

    it('should read the new workshop with sections and owner', async () => {
      // given
      const query = userWorkshopsQuery;
      // when
      const response = await api.graphqlRequest(query);
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data!.workshops).toHaveLength(1);
      expect(response.data!.workshops[0].id).toBe(newWorkshopId);
      expect(response.data!.workshops[0].sections).toBeDefined();
      expect(response.data!.workshops[0].owner.id).toBe(api.userId);
    });
  });

  describe('unhappy', () => {
    it('should not add a new workshop without a name', async () => {
      // given
      // when
      const response = await api.graphqlRequest(addWorskshopWithEmptyNameQuery);
      // then
      expect(response.errors).toHaveLength(1);
      const error = response.errors![0];
      expect(error.extensions.code).toBe('BAD_REQUEST');
    });
  });
});
