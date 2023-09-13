/*
Copyright (C) 2023 e:fs TechHub GmbH (sdk@efs-techhub.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

import { useState } from 'react';
import { Draft, current } from 'immer';
import _, { ListIteratee } from 'lodash';
import { useImmerReducer } from 'use-immer';

interface Remove<E> {
  type: 'remove';
  predicate: ListIteratee<E>;
}

type Reducer<E> = {
  type: 'add';
  element: E;
};

type Update<E> = {
  type: 'update';
  element: Draft<E>[];
};

type ElementActions<E> = Remove<E> | Reducer<E> | Update<E>;

const useAddRemoveElements = <E>(
  currentObject: Draft<E>[],
  compareAttribute: string,
) => {
  const [entryExists, setEntryExists] = useState<boolean | undefined>(
    undefined,
  );
  const reducer = useImmerReducer<Draft<E>[], ElementActions<E>>(
    (draft, action): Draft<E>[] => {
      setEntryExists(undefined);
      switch (action.type) {
        case 'remove':
          _.remove(draft as unknown as E[], action.predicate);
          return draft as Draft<E>[];
        case 'add': {
          const compareValues = current(draft).map((object) => {
            const flattenEntries = Object.entries(
              object as Record<string | number, unknown>,
            ).flat();

            return flattenEntries[flattenEntries.indexOf(compareAttribute) + 1];
          });
          const actionEntries = Object.entries(
            action.element as Record<string | number, unknown>,
          ).flat();
          const compareWith =
            actionEntries[actionEntries.indexOf(compareAttribute) + 1];

          if (!compareValues.some((value) => value === compareWith)) {
            draft.push(action.element as Draft<Draft<E>>);
            return draft as Draft<E>[];
          }
          setEntryExists(true);
          return draft as Draft<E>[];
        }

        case 'update':
          return action.element;
        default:
          return draft as Draft<E>[];
      }
    },
    currentObject,
  );
  return { reducer, entryExists };
};

export default useAddRemoveElements;
