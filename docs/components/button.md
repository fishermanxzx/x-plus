# Button 按钮

常用的操作按钮。
[[toc]]

## 基础用法

<div>
    <x-button>Default</x-button>
    <x-button type="primary">Primary</x-button>
    <x-button type="success">Success</x-button>
    <x-button type="info">Info</x-button>
    <x-button type="warning">Warning</x-button>
    <x-button type="danger">Danger</x-button>
</div>
<div style="margin-top:16px;">
    <x-button plain>Default</x-button>
    <x-button type="primary" plain>Primary</x-button>
    <x-button type="success" plain>Success</x-button>
    <x-button type="info" plain>Info</x-button>
    <x-button type="warning" plain>Warning</x-button>
    <x-button type="danger" plain>Danger</x-button>
</div>

```vue
<template>
  <div>
    <x-button>Default</x-button>
    <x-button type="primary">Primary</x-button>
    <x-button type="success">Success</x-button>
    <x-button type="info">Info</x-button>
    <x-button type="warning">Warning</x-button>
    <x-button type="danger">Danger</x-button>
  </div>
  <div style="margin-top:16px;">
    <x-button plain>Default</x-button>
    <x-button type="primary" plain>Primary</x-button>
    <x-button type="success" plain>Success</x-button>
    <x-button type="info" plain>Info</x-button>
    <x-button type="warning" plain>Warning</x-button>
    <x-button type="danger" plain>Danger</x-button>
  </div>
</template>
```

## 禁用状态

<div>
    <x-button disabled>Default</x-button>
    <x-button type="primary" disabled>Primary</x-button>
    <x-button type="success" disabled>Success</x-button>
    <x-button type="info" disabled>Info</x-button>
    <x-button type="warning" disabled>Warning</x-button>
    <x-button type="danger" disabled>Danger</x-button>
</div>
<div style="margin-top:16px;">
    <x-button plain disabled>Default</x-button>
    <x-button type="primary" plain disabled>Primary</x-button>
    <x-button type="success" plain disabled>Success</x-button>
    <x-button type="info" plain disabled>Info</x-button>
    <x-button type="warning" plain disabled>Warning</x-button>
    <x-button type="danger" plain disabled>Danger</x-button>
</div>

```vue
<template>
  <div>
    <x-button disabled>Default</x-button>
    <x-button type="primary" disabled>Primary</x-button>
    <x-button type="success" disabled>Success</x-button>
    <x-button type="info" disabled>Info</x-button>
    <x-button type="warning" disabled>Warning</x-button>
    <x-button type="danger" disabled>Danger</x-button>
  </div>
  <div style="margin-top:16px;">
    <x-button plain disabled>Default</x-button>
    <x-button type="primary" plain disabled>Primary</x-button>
    <x-button type="success" plain disabled>Success</x-button>
    <x-button type="info" plain disabled>Info</x-button>
    <x-button type="warning" plain disabled>Warning</x-button>
    <x-button type="danger" plain disabled>Danger</x-button>
  </div>
</template>
```

## 调整尺寸

<div>
    <x-button size="small">Small</x-button>
    <x-button size="default">Default</x-button>
    <x-button size="large">Large</x-button>
</div>

```vue
<template>
  <div>
    <x-button size="small">Small</x-button>
    <x-button size="default">Default</x-button>
    <x-button size="large">Large</x-button>
  </div>
</template>
```

# API

## 属性

| 名称     | 说明               | 类型                                                          | 默认值    |
| -------- | ------------------ | ------------------------------------------------------------- | --------- |
| size     | 尺寸               | enum('default','small','large')                               | 'default' |
| type     | 类型               | enum('default','primary','success','warning','danger','info') | 'default' |
| disabled | 按钮是否为禁用状态 | boolean                                                       | false     |
| plain    | 是否为朴素按钮     | boolean                                                       | false     |
