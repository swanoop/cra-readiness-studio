import {defineConfig} from '@playwright/test';
export default defineConfig({
  testDir:'./tests/browser',
  timeout:30000,
  expect:{timeout:8000},
  reporter:process.env.CI?'github':'list',
  use:{baseURL:'http://127.0.0.1:8765',headless:true,trace:'retain-on-failure'},
  webServer:{
    command:'python3 -m http.server 8765 --bind 127.0.0.1',
    url:'http://127.0.0.1:8765',
    reuseExistingServer:!process.env.CI,
    timeout:15000
  },
  projects:[
    {name:'chromium',use:{browserName:'chromium'}},
    {name:'firefox',use:{browserName:'firefox'}},
    {name:'webkit',use:{browserName:'webkit'}}
  ]
});
