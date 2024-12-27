<script setup lang="ts">
import type { Passenger } from '@/types'
defineProps<{
  passenger: Passenger
}>()
</script>

<template>
  <RouterLink
    class="event-link"
    :to="{ name: 'passenger-detail-view', params: { id: passenger._id } }"
  >
    <div class="pax-card">
      <h2>{{ passenger.name }}</h2>
      <span>Trips: {{ passenger.trips }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.pax-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.pax-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  background-color: #f3f3e0;
}

.event-link {
  text-decoration: none;
  color: #2c3e50;
}
</style>
