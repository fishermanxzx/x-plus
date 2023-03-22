import { ExtractPropTypes } from 'vue'
const tooltipProps = {
  content: {
    type: String,
    default: ''
  }
}
type TooltipProps = ExtractPropTypes<typeof tooltipProps>
export { tooltipProps }
export type { TooltipProps }
