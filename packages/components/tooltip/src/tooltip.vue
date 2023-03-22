<template>
  <teleport to="body">
    <Transition name="fade">
      <div
        v-if="isShow"
        v-bind="$attrs"
        ref="tooltipRef"
        :class="ns.b()"
      >
        <div
          ref="contentRef"
          :class="ns.e('content')"
        >
          <slot name="content">
            <span v-html="content" />
          </slot>
          <span
            ref="arrowRef"
            :class="ns.e('arrow')"
          />
        </div>
      </div>
    </Transition>
  </teleport>
  <Trigger
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <slot />
  </Trigger>
</template>
<script lang="ts">
import {  ref, nextTick } from "vue";
import Trigger from "./trigger.vue";
import { getPosition } from "@x-plus/utils";
import { tooltipProps } from "./tooltip";
import { useNamespace } from "@x-plus/hooks";
export default {
  name: "XTooltip",
  components: {
    Trigger,
  },
  inheritAttrs: false,
  props: tooltipProps,
  setup() {
    const ns = useNamespace('tooltip')
    const isShow = ref(false);
    const tooltipRef = ref<HTMLDivElement>();
    const contentRef = ref<HTMLDivElement>();
    const arrowRef = ref<HTMLDivElement>();
    const deviation = 8;
    let timer: null | number = null;
    const mouseenter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const { left, top } = getPosition(target);
      const {
        offsetWidth: targetOffsetWidth,
        offsetHeight: targetOffsetHeight,
      } = target;
      isShow.value = true;
      nextTick(() => {
        const container = contentRef.value;
        if (!container) return;
        container.addEventListener("mouseenter", () => {
          timer && window.clearTimeout(timer);
        });
        container.addEventListener("mouseleave", () => {
          isShow.value = false;
        });
        const { offsetHeight, offsetWidth } = container;
        let positionTop = top - offsetHeight - deviation;
        if (positionTop < 0) {
          positionTop = top + targetOffsetHeight + 8;
          arrowRef.value!.style.bottom = "0px";
          arrowRef.value!.style.top = "-5px";
          arrowRef.value!.style.transform = "translateX(-50%) rotate(225deg)";
        }
        container.style.top = positionTop + "px";
        let positionLeft = left + (targetOffsetWidth / 2 - offsetWidth / 2);
        if (positionLeft < 0) {
          positionLeft = 0;
        }
        container.style.left = positionLeft + "px";
        arrowRef.value!.style.left =
          Math.max(left + targetOffsetWidth / 2 - positionLeft, deviation) +
          "px";
      });
    };
    const mouseleave = () => {
      timer = window.setTimeout(() => {
        isShow.value = false;
      }, 50);
    };

    return {
      mouseenter,
      mouseleave,
      tooltipRef,
      isShow,
      contentRef,
      arrowRef,
      ns
    };
  },
};
</script>

