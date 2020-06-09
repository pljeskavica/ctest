#!/usr/bin/env node
/**
 * Copyright (c) Tom Hogue. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const importLocal = require('import-local');

if (!importLocal(__filename)) {
  require('../index');
}
