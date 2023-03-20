import { ExtractPropTypes, PropType } from 'vue'
const buttonProps = {
  size: {
    type: String as PropType<'small' | 'large'>
  },
  plain: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String as PropType<
      'primary' | 'success' | 'info' | 'warning' | 'danger'
    >
  }
}
type ButtonProps = ExtractPropTypes<typeof buttonProps>
export { buttonProps }
export type { ButtonProps }
