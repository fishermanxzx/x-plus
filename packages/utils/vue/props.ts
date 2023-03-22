export const generateProps = <
  T extends Record<string, any>,
  Y extends Array<keyof T>
>(
  originProps: T,
  propsName: Y
): {
  [P in Y[number]]: P extends keyof T ? T[P] : never
} => {
  const props: any = {}
  propsName.forEach(prop => {
    props[prop] = originProps[prop]
  })
  return props
}
