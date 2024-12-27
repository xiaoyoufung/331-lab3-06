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
  <p>Trips: {{ passenger.trips }}</p>
  <p>Airline: {{ passenger.airline[0].name }}</p>
</template>
