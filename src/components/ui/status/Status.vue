<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "reka-ui";
import { cn } from "@/lib/utils";
import { type ButtonVariants, statusVariants } from ".";

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "status",
});
</script>

<template>
  <Primitive
    data-slot="status"
    :as="as"
    :as-child="asChild"
    :class="cn(statusVariants({ variant }), props.class, 'h-full')"
  >{{ variant }}
    <slot />
  </Primitive>
</template>
<style scoped></style>
