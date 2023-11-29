import checkAppAvailability from '@utils/checkAppAvailability';

describe('test checkAppAvailability function', () => {
  test('test checkAppAvailability function with roles & capabilities', () => {
    checkAppAvailability('Overview', ['supplier'], ['STORAGE'], {
      Overview: { capabilities: ['STORAGE'], roles: ['supplier'] },
      Description: { capabilities: ['STORAGE'], roles: ['supplier'] },
      Spaces: { capabilities: ['STORAGE'], roles: ['supplier'] },
      Search: { capabilities: ['STORAGE'], roles: ['supplier'] },
      Dashboard: { capabilities: ['STORAGE'], roles: ['supplier'] },
      FileUpload: { capabilities: ['STORAGE'], roles: ['supplier'] },
    });
  });

  test('test checkAppAvailability function with no capabilities', () => {
    checkAppAvailability('Overview', ['supplier'], ['STORAGE'], {
      Overview: { roles: ['supplier'] },
      Description: { roles: ['supplier'] },
      Spaces: { roles: ['supplier'] },
      Search: { roles: ['supplier'] },
      Dashboard: { roles: ['supplier'] },
      FileUpload: { roles: ['supplier'] },
    });
  });
  test('test checkAppAvailability function with no roles', () => {
    checkAppAvailability('Overview', ['supplier'], ['STORAGE'], {
      Overview: { capabilities: ['STORAGE'] },
      Description: { capabilities: ['STORAGE'] },
      Spaces: { capabilities: ['STORAGE'] },
      Search: { capabilities: ['STORAGE'] },
      Dashboard: { capabilities: ['STORAGE'] },
      FileUpload: { capabilities: ['STORAGE'] },
    });
  });
  test('test checkAppAvailability function with no roles & no capabilities', () => {
    checkAppAvailability('Overview', ['supplier'], ['STORAGE'], {
      Overview: {},
      Description: {},
      Spaces: {},
      Search: {},
      Dashboard: {},
      FileUpload: {},
    });
  });
});
