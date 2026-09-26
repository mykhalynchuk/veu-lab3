<script setup lang="ts">
import { ref, computed } from 'vue';
import UserCard from './UserCard.vue';
import { usersData } from '../data/users'; // Твій масив з 10 юзерів
import type { User } from '../types';

const users = ref<User[]>(usersData);

// Стани фільтрів та сортування
const genderFilter = ref<'all' | 'male' | 'female'>('all');
const ageFilter = ref<'all' | '18+'>('all');
const sortConfig = ref<'none' | 'nameAsc' | 'nameDesc' | 'ageAsc' | 'ageDesc'>('none');

const filteredAndSortedUsers = computed(() => {
  let result = users.value;

  // Фільтрація за статтю
  if (genderFilter.value !== 'all') {
    result = result.filter(u => u.gender === genderFilter.value);
  }

  // Фільтрація за віком
  if (ageFilter.value === '18+') {
    result = result.filter(u => u.dob.age >= 18);
  }

  // Сортування (копіюємо масив через slice(), щоб не мутувати оригінал)
  if (sortConfig.value !== 'none') {
    result = result.slice().sort((a, b) => {
      if (sortConfig.value === 'nameAsc') return a.name.first.localeCompare(b.name.first);
      if (sortConfig.value === 'nameDesc') return b.name.first.localeCompare(a.name.first);
      if (sortConfig.value === 'ageAsc') return a.dob.age - b.dob.age;
      if (sortConfig.value === 'ageDesc') return b.dob.age - a.dob.age;
      return 0;
    });
  }

  return result;
});

const resetAll = () => {
  genderFilter.value = 'all';
  ageFilter.value = 'all';
  sortConfig.value = 'none';
};
</script>

<template>
  <div class="users-container">
    <div class="toolbar">
      <div class="filter-group">
        <strong>Стать:</strong>
        <button @click="genderFilter = 'all'" :class="{ active: genderFilter === 'all' }">Всі</button>
        <button @click="genderFilter = 'male'" :class="{ active: genderFilter === 'male' }">Чоловіки</button>
        <button @click="genderFilter = 'female'" :class="{ active: genderFilter === 'female' }">Жінки</button>
      </div>

      <div class="filter-group">
        <strong>Вік:</strong>
        <button @click="ageFilter = 'all'" :class="{ active: ageFilter === 'all' }">Всі</button>
        <button @click="ageFilter = '18+'" :class="{ active: ageFilter === '18+' }">18+</button>
      </div>

      <div class="filter-group">
        <strong>Сортування:</strong>
        <button @click="sortConfig = 'nameAsc'">Ім'я ↑</button>
        <button @click="sortConfig = 'nameDesc'">Ім'я ↓</button>
        <button @click="sortConfig = 'ageAsc'">Вік ↑</button>
        <button @click="sortConfig = 'ageDesc'">Вік ↓</button>
      </div>

      <button class="reset-btn" @click="resetAll">Очистити все</button>
    </div>

    <!-- Перевірка на пустий список -->
    <div v-if="filteredAndSortedUsers.length === 0" class="empty-state">
      <h2>Список юзерів пустий</h2>
    </div>

    <div v-else class="users-list">
      <UserCard
        v-for="user in filteredAndSortedUsers"
        :key="user.id"
        :user="user"
      />
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}
.filter-group button {
  margin-left: 8px;
  padding: 4px 12px;
  cursor: pointer;
}
.filter-group button.active {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}
.reset-btn {
  background-color: #ef4444;
  color: white;
  font-weight: bold;
}
.empty-state {
  text-align: center;
  color: #6b7280;
  padding: 40px;
}
</style>
