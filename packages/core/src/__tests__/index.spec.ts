import test from 'ava'

import { bootstrap } from '../index'

test('should be able to bootstrap', (t) => {
  t.snapshot(bootstrap('typescript monorepo'))
})
