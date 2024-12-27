<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Passenger } from '@/types'
import PaxService from '@/services/PaxService'
import { useRouter } from 'vue-router'

const passenger = ref<Passenger | null>(null)
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const router = useRouter()

onMounted(() => {
  PaxService.getPassenger(props.id)
    .then((response) => {
      passenger.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
      if (error.response && error.response.status === 404) {
        router.push({ name: '404-resource-view', params: { resource: 'passenger' } })
      } else {
        router.push({ name: 'network-error-view' })
      }
    })
})
</script>
<template>
  <div v-if="passenger">
    <h1>{{ passenger.name }}</h1>
    <nav>
      <router-link :to="{ name: 'passenger-detail-view' }">Details</router-link> |
      <router-link :to="{ name: 'passenger-airline-view' }">Airline</router-link>
    </nav>
    <RouterView :passenger="passenger" />
  </div>
</template>
