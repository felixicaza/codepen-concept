import type { UserConfig } from '@commitlint/types'
import { RuleConfigSeverity } from '@commitlint/types'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [RuleConfigSeverity.Error, 'always', 140]
  }
}

export default config
