import { withInstall } from '@x-plus/utils'

import ConfigProvider from './src/config-provider'

const XConfigProvider = withInstall(ConfigProvider)
export default XConfigProvider
export { XConfigProvider }
