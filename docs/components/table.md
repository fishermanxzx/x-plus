# Table 表格

## 基础用法

:::demo
table/basic
:::

## 固定列

某些重要的列信息可以选择固定列。
固定列需要使用`fixed`属性，可选择：'left' 或 'right'，表示左边固定还是右边固定。
:::demo
table/fixed
:::

## 排序

:::demo
table/sort
:::

## 自定义模板

:::demo
table/custom
:::

## 树形展开和懒加载

:::demo
table/tree
:::

## 汇总行

:::demo
table/summary
:::

## 底部

:::demo
table/bottom
:::

# API

## 属性

| 名称        | 说明               | 类型    | 默认值    |
| ----------- | ------------------ | ------- | --------- |
| columns     | 尺寸               |         | 'default' |
| data        | 类型               |         | 'default' |
| reload      | 按钮是否为禁用状态 | boolean | false     |
| stickyTop   | 是否为朴素按钮     | boolean | false     |
| showSummary | 是否为朴素按钮     | boolean | false     |
| treeProps   | 是否为朴素按钮     | boolean | false     |
| lazy        | 是否为朴素按钮     | boolean | false     |
| emptyText   | 是否为朴素按钮     | boolean | false     |
