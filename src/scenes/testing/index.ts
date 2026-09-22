import type { Scene } from '@graphlearning/flow'
import { testSelect } from './test-select'
import { fourTests } from './four-tests'
import { singularTest } from './singular-test'
import { customGeneric } from './custom-generic'
import { severity } from './severity'
import { storeFailures } from './store-failures'
import { testPackages } from './test-packages'
import { unitTest } from './unit-test'
import { contracts } from './contracts'
import { buildOrder } from './build-order'

export const testingScenes: Scene[] = [
  testSelect,
  fourTests,
  singularTest,
  customGeneric,
  severity,
  storeFailures,
  testPackages,
  unitTest,
  contracts,
  buildOrder,
]
