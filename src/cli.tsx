#!/usr/bin/env node
import { join } from 'node:path'
import { config } from 'dotenv'
import React from 'react'
import { render } from 'ink'
import App from './app.js'

config({
  // make sure to load the env from the root directory
  path: join(import.meta.dirname, '..', '.env'),
  quiet: true,
})

render(<App />)
