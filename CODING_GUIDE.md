# Superb Data Kraken Coding Style Guidelines

## Table of Contents

1. [Introduction](#introduction)
2. [Code Formatting](#code-formatting)  
   2.1 [Naming Conventions](#naming-conventions)  
   2.2 [Folder Structure](#folder-structure)  
   2.3 [Component And Function Structure](#component-and-function-structure)  
   2.4 [Definition of Done (DoD)](#definition-of-done)
3. [Comments](#comments)
4. [Documentation](#documentation)
5. [Testing](#testing)
6. [Version Control](#version-control)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction

In this section you will find some information regarding our formatting and coding style. It is not set in stone, but for  
a better orientation and readability, we would like to keep these patterns, to make life easier for all developers involved.  

## Code Formatting

As long as you have got Prettier installed and configured, formatting should go automatically as it is supposed to be.  
If you aren't using Prettier, please adhere to it's default settings. You can find those here: https://prettier.io/docs/en/options  
Also check our .prettierrc file in the root folder of this repository for our overrides of Prettier default settings.  

### Naming Conventions

Regarding names for components, functions and others, please name yours as meaningful as possible. We don't particularly aim for the  
longest possible names, but we prefer a name that makes it easy to understand, what a particular component or function does
over a brief name.  

### Folder Structure

```bash
.
└── src
   └── assets 
   └── components
      └── stateless-components # small, stateless components
      └── StatefulComponent_1 # larger components, used within the app, that contain state
      └── StatefulComponent_2
      └── StatefulComponent_n
   └── contexts
   └── customHooks
   └── customTypes # custom types, that are used in multiple instances
   └── notifications # contains Error- and SuccessToast, might be moved to components in the future
   └── router
   └── services
      └── api
   └── styles
   └── translations
   └── utils # utility functions
   └── views # contains components, that render a view in the frontend
      └── View_1
      └── View_2
      └── View_n
   
```

### Component And Function Structure

When building a new component, we recommend using the nx generator to create a new component as it will generate a folder,
basic component and a basic test file for you automatically.  

NOTE: If you have npx installed globally, you can skip the "npx" at the beginning of the command

To generate a component use (the --directory flag is optional, but most likely you want to place the new component in a certain folder):

```bash
npx nx g @nx/react:component NewComponentName --directory=components/stateless-components
```

Or the shorter version:

```bash
npx nx g c NewComponentName --directory=components/stateless-components
```

When importing please use the following order:  

1. Imports from functional libraries such as react, react-router-dom, react-intl etc.  
2. Imports from style libraries such as Bootstrap
3. Import icons
4. Import components, functions, types etc. from the Superb Data Kraken repository
5. Import further

We use path aliases for imports from our repository to make them more readable and concise, so they will look something like  
the following:

```javascript
import { OrgaRoleType, Organization } from '@customTypes/index';
import { getOrganization, getSpace, getSpaces } from '@services/index';
import { useGetRoles } from '@customHooks/index';
```

Every folder in our folder structure contains an index.ts to export everything within the folder centralized. If you make a new component  
or function, please make sure to add it to the corresponding index.ts. Named exports can be used like this:

```javascript
// index.ts

export * from './stateless-components/FormFields/FormFields'
```

Default exports first need to be imported to the index.ts, before they can be exported:

```javascript
// index.ts

import ApplicationAvatar from './stateless-components/ApplicationAvatar/ApplicationAvatar';
import Icon from './stateless-components/Icon/Icon';

export { ApplicationAvatatar, Icon }
```

- If you have multiple exports from a single file export them using the "export" keyword.  
Components or functions having only one export use the "export default" method.

- If you make a new component not using the nx generator, please make sure to use the "function" keyword for named components  
to keep it in the same style the nx generator would use.  

   Our ESLint configuration will remind you within your file, should you forget the aforementioned.

- When coding new components or functions, please give them descriptive names that make it easy to understand what they do.

- When styling new components, please use bootstrap classes to do so (we are using bootstrap 5.*). The "style" attribute  
should only be used, when absolutely necessary.

   We also use the "react-bootstrap" library, so before you feel the need to write a new component yourself, make sure to  
   check out https://react-bootstrap.netlify.app/docs/components/accordion to may be able to find it already there.

- When you need to declare a type or interface to use in your component or function, you can leave it within the component or  
function, if you only use it in there. Should you need to use these types or interfaces in multiple places, please make sure  
to put them in our "customTypes" folder. You can add it to an existing file, if appropriate, or make a new file for your  
types and interfaces. Please name those files in a meaningful way and end it with "Types", e.g. "myComponentTypes" and make  
sure to add them to the "index.ts" in the "customTypes" folder

### Definition of Done

tbd

## Comments

We prefer readable code over comments, however sometimes it might be useful to write a comment. If you do so, please use comments to  
explain WHY you wrote that code rather than WHAT it does. You can also use comments to help get an overview in more complex situations.

## Documentation

tbd

## Testing

tbd

## Version Control

tbd

## Contributing

For general information and steps when contributing, please read our [CONTRIBUTING](CONTRIBUTING.md) guidelines.

## License

By contributing to Superb Data Kraken Frontend, you agree to license your contributions under the [project's license](LICENSE).

---

**Note:** These coding style guidelines are subject to change. Contributors are encouraged to stay up-to-date with the latest version of  
these guidelines and make improvements as needed.

By following these coding style guidelines, we can maintain a consistent and readable codebase, making it easier for developers to  
collaborate on this open source project.

If you have any questions or suggestions regarding these guidelines, please reach out to the project maintainers.
