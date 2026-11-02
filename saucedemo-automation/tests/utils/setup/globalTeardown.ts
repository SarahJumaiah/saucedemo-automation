import * as fs from 'fs';

// delete the saved login after the tests
async function globalTeardown() {
  if (fs.existsSync('storageState.json')) {
    fs.unlinkSync('storageState.json');
  }
}

export default globalTeardown;
