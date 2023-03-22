import { withInstall } from '@x-plus/utils'
import Tooltip from './src/tooltip.vue'
const XTooltip = withInstall(Tooltip)
export default XTooltip
export { XTooltip }
export type TooltipInstance = InstanceType<typeof XTooltip>
