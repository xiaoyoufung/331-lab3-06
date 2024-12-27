<script setup lang="ts">
import { toRefs, defineProps, onMounted } from 'vue'
import { type Passenger } from '@/types'
import PaxService from '@/services/PaxService'
import { useRouter } from 'vue-router'

const props = defineProps<{
  passenger: Passenger
  id: string
}>()

const { passenger } = toRefs(props)

const router = useRouter()

onMounted(() => {
  PaxService.getPassenger(props.id)
    .then((response) => {
      passenger.value = response.data
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        router.push({ name: '404-resource-view', params: { resource: 'event' } })
      } else {
        router.push({ name: 'network-error-view' })
      }
    })
})
</script>
<template>
  <p>trips: {{ passenger.trips }}</p>
</template>
