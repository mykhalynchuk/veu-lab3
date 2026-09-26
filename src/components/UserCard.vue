<script setup lang="ts">
import { computed, ref } from 'vue';
import type { User } from '../types';

const props = defineProps<{ user: User }>();

const ageClass = computed(() => {
  const age = props.user.dob.age;
  if (age < 18) return 'minor';
  if (age <= 30) return 'young';
  if (age <= 50) return 'adult';
  return 'senior';
});

const showDetails = ref(false);
</script>

<template>
  <div class="user-card" :class="ageClass">
    <img :src="user.picture" :alt="`${user.name.first} ${user.name.last}`" class="avatar" />

    <div class="info">
      <h2>{{ user.name.title }} {{ user.name.first }} {{ user.name.last }}</h2>

      <p v-if="user.dob.age > 18" class="age">Вік: {{ user.dob.age }} років</p>

      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Локація:</strong> {{ user.location.city }}, {{ user.location.country }}</p>

      <div class="hobbies-section">
        <h3>Хобі:</h3>
        <ul>
          <li v-for="(hobby, index) in user.hobbies" :key="index">{{ hobby }}</li>
        </ul>
      </div>

      <button @click="showDetails = !showDetails">
        {{ showDetails ? 'Сховати деталі' : 'Показати деталі' }}
      </button>

      <p v-show="showDetails" class="details">{{ user.details }}</p>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
  transition: background-color 0.3s ease;
}
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
}
.minor { background-color: #f3f4f6; border-color: #d1d5db; }
.young { background-color: #dbeafe; border-color: #93c5fd; }
.adult { background-color: #dcfce7; border-color: #86efac; }
.senior { background-color: #fef08a; border-color: #fde047; }
</style>
