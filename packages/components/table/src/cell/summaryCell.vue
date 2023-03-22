<template>
  <td
    :style="{ ...column?.positionInfo }"
    :class="[column?.className,ns.e('summary-cell')]"
  >
    <i
      v-if="index == 0"
      class="corner"
      @click="handleClick"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 23 23"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g
          id="页面-2"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            :class="[ns.is('sticky',sticky)]"
            transform="translate(11.014869, 11.014160) scale(-1, 1) translate(-11.014869, -11.014160) "
            fill="#999999"
            fill-rule="nonzero"
          >
            <path
              id="路径"
              d="M21.7462901,7.50292969 L14.5275401,0.284179687 C14.3371104,0.09375 14.088087,0 13.8390636,0 C13.5900401,0 13.3410167,0.09375 13.150587,0.284179687 L8.43086044,5.00683594 C8.07343856,4.96582031 7.713087,4.94824219 7.35273544,4.94824219 C5.20820419,4.94824219 3.06367294,5.65429688 1.30293075,7.06640625 C0.851758875,7.42675781 0.816602625,8.10351562 1.22382919,8.51367188 L6.54707137,13.8369141 L0.2365245,20.1416016 C0.160352625,20.2177734 0.110547937,20.3203125 0.101758875,20.4287109 L0.00214949983,21.5185547 C-0.0242176877,21.7939453 0.195508875,22.0283203 0.467969812,22.0283203 C0.48261825,22.0283203 0.497266687,22.0283203 0.511915125,22.0253906 L1.60175887,21.9257812 C1.71015731,21.9169922 1.81269637,21.8671875 1.88886825,21.7910156 L8.19941512,15.4804688 L13.5226573,20.8037109 C13.713087,20.9941406 13.9621104,21.0878906 14.2111339,21.0878906 C14.4953136,21.0878906 14.7765636,20.9648438 14.9699229,20.7246094 C16.619337,18.6650391 17.3048839,16.0869141 17.0265636,13.59375 L21.7462901,8.87402344 C22.1242198,8.49902344 22.1242198,7.88378906 21.7462901,7.50292969 Z"
            />
          </g>
        </g></svg></i>
    <slot />
  </td>
</template>
<script lang="ts">
import { useNamespace } from "@x-plus/hooks";
import { getProps } from "../table/defaults";
export default {
  props: getProps(['column','index','sticky']),
  emits:['update:sticky'],
  setup(props,{emit}) {
    const handleClick = ()=>{
        emit('update:sticky',!props.sticky)
    }
    const ns = useNamespace('table')
    return {
        handleClick,
        ns
    };
  },
};
</script>

