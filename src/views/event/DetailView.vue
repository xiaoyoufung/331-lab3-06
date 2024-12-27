<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Passenger } from '@/types'

const props = defineProps<{
  passenger: Passenger
  id: string
}>()

const { passenger } = toRefs(props)
</script>
<template>
  <p>trips: {{ passenger.trips }}</p>
</template>
