import { ExtractPropTypes, PropType } from 'vue'
const buttonProps = {
  size: {
    type: String as PropType<'default' | 'small' | 'large'>,
    default: 'default'
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
      'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
    >,
    default: 'default'
  }
}
type ButtonProps = ExtractPropTypes<typeof buttonProps>
export { buttonProps }
export type { ButtonProps }
