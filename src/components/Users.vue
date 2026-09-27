<script setup lang="ts">
/* eslint-disable vue/multi-word-component-names */
import { ref, computed } from 'vue';
import UserCard from './UserCard.vue';
import { usersData } from '@/data/users.ts';
import type { User } from '../types';

const users = ref<User[]>(usersData);

const genderFilter = ref<'all' | 'male' | 'female'>('all');
const ageFilter = ref<'all' | '18+'>('all');
const sortConfig = ref<'none' | 'nameAsc' | 'nameDesc' | 'ageAsc' | 'ageDesc'>('none');

const filteredAndSortedUsers = computed(() => {
  let result = users.value;

  if (genderFilter.value !== 'all') {
    result = result.filter(u => u.gender === genderFilter.value);
  }

  if (ageFilter.value === '18+') {
    result = result.filter(u => u.dob.age >= 18);
  }

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
        <strong>Gender</strong>
        <div class="btn-group">
          <button @click="genderFilter = 'all'" :class="{ active: genderFilter === 'all' }">All</button>
          <button @click="genderFilter = 'male'" :class="{ active: genderFilter === 'male' }">Male</button>
          <button @click="genderFilter = 'female'" :class="{ active: genderFilter === 'female' }">Female</button>
        </div>
      </div>

      <div class="filter-group">
        <strong>Age</strong>
        <div class="btn-group">
          <button @click="ageFilter = 'all'" :class="{ active: ageFilter === 'all' }">All</button>
          <button @click="ageFilter = '18+'" :class="{ active: ageFilter === '18+' }">18+</button>
        </div>
      </div>

      <div class="filter-group">
        <strong>Sort by</strong>
        <div class="btn-group">
          <button @click="sortConfig = 'nameAsc'" :class="{ active: sortConfig === 'nameAsc' }">Name ↑</button>
          <button @click="sortConfig = 'nameDesc'" :class="{ active: sortConfig === 'nameDesc' }">Name ↓</button>
          <button @click="sortConfig = 'ageAsc'" :class="{ active: sortConfig === 'ageAsc' }">Age ↑</button>
          <button @click="sortConfig = 'ageDesc'" :class="{ active: sortConfig === 'ageDesc' }">Age ↓</button>
        </div>
      </div>

      <button class="reset-btn" @click="resetAll">Clear all</button>
    </div>

    <div v-if="filteredAndSortedUsers.length === 0" class="empty-state">
      <h2>User list is empty</h2>
      <p>Change the filter parameters to see the results.</p>
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
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
  padding: 20px 24px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  color: #111827;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-group strong {
  font-size: 13px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-group {
  display: flex;
  background-color: #f3f4f6;
  border-radius: 8px;
  padding: 4px;
}

.btn-group button {
  border: none;
  background: transparent;
  padding: 6px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-group button:hover {
  color: #111827;
}

.btn-group button.active {
  background-color: #ffffff;
  color: #2563eb;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.reset-btn {
  margin-left: auto;
  background-color: #fee2e2;
  color: #ef4444;
  border: none;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

.reset-btn:hover {
  background-color: #fca5a5;
  color: #991b1b;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
  background: #ffffff;
  border-radius: 16px;
}
.empty-state h2 { margin: 0 0 8px 0; color: #111827; }
.empty-state p { margin: 0; }

.users-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (max-width: 900px) {
  .toolbar { gap: 16px; flex-direction: column; align-items: flex-start; }
  .reset-btn { margin-left: 0; width: 100%; }
  .btn-group { flex-wrap: wrap; }
}
</style>
