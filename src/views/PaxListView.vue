<script setup lang="ts">
import PaxCard from '@/components/PaxCard.vue'

import { type Passenger } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import PaxService from '@/services/PaxService'
import { RouterLink } from 'vue-router'

const passengers = ref<Passenger[] | null>(null)
const totalPassengers = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalPassengers.value / perPage.value)
  return page.value < totalPages
})
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
})

const page = computed(() => props.page)
const perPage = computed(() => props.perPage)

onMounted(() => {
  watchEffect(() => {
    PaxService.getPassengers(perPage.value, page.value)
      .then((response) => {
        passengers.value = response.data['data']
        totalPassengers.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  })
})
</script>

<template>
  <h1>Lists of Passenger</h1>
  <!-- new element -->
  <div class="events">
    <PaxCard v-for="passenger in passengers" :key="passenger._id" :passenger="passenger" />
    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'passenger-list-view', query: { page: page - 1, perPage: perPage } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Prev Page</RouterLink
      >

      <RouterLink
        id="page-next"
        :to="{ name: 'passenger-list-view', query: { page: page + 1, perPage: perPage } }"
        rel="next"
        v-if="hasNextPage"
        >Next Page &#62;</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
