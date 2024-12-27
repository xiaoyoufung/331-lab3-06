<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
import { type Passenger } from '@/types'
import { type Airline } from '@/types'
import PaxService from '@/services/PaxService'
import { useRouter } from 'vue-router'

const props = defineProps<{
  passenger: Passenger
  id: string
}>()

const airline = ref<Airline | null>(null)

const router = useRouter()

onMounted(() => {
  PaxService.getAirline(props.passenger.airline[0]._id)
    .then((response) => {
      airline.value = response.data
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
  <div v-if="airline">
    <h3>{{ airline.name }}</h3>
    <p>Country: {{ airline.country }}</p>
    <img :src="airline.logo" alt="airline logo" />
    <p>Slogan: {{ airline.slogan }}</p>
    <p>Head Quater: {{ airline.head_quaters }}</p>
  </div>
</template>
