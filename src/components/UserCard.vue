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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
</script>

<template>
  <div class="card-wrapper" :class="ageClass">
    <!-- Left Column: Photo and basic info -->
    <div class="sidebar">
      <img :src="user.picture" :alt="`${user.name.first} ${user.name.last}`" class="avatar" />
      <h2 class="name">{{ user.name.first }} {{ user.name.last }}</h2>

      <div class="meta-inline">
        <span class="gender">
          <!-- Gender Icon -->
          <svg v-if="user.gender === 'female'" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="10" r="6"></circle><line x1="12" y1="16" x2="12" y2="22"></line><line x1="9" y1="19" x2="15" y2="19"></line></svg>
          <svg v-else viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><circle cx="10" cy="14" r="6"></circle><line x1="14.24" y1="9.76" x2="20" y2="4"></line><line x1="16" y1="4" x2="20" y2="4"></line><line x1="20" y1="8" x2="20" y2="4"></line></svg>
          {{ user.gender === 'female' ? 'Female' : 'Male' }}
        </span>
        <span class="divider">|</span>
        <span class="age" v-if="user.dob.age > 18">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          {{ user.dob.age }} years
        </span>
      </div>

      <div class="contact-list">
        <div class="contact-item">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>{{ user.location.city }}, {{ user.location.state }}, {{ user.location.country }}</span>
        </div>
        <div class="contact-item">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          <span>{{ user.email }}</span>
        </div>
        <div class="contact-item">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          <span>{{ user.phone }}</span>
        </div>
        <div class="contact-item">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
          <span>{{ user.cell }}</span>
        </div>
      </div>
    </div>

    <!-- Right Column: Details -->
    <div class="main-content">

      <!-- About Me Section -->
      <div class="section-card accordion">
        <div class="accordion-header" @click="showDetails = !showDetails">
          <div class="title-with-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <h3>About me</h3>
          </div>
          <svg :style="{ transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)' }" style="transition: 0.3s" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
        <div v-show="showDetails" class="accordion-body">
          <p>{{ user.details }}</p>
        </div>
      </div>

      <!-- Personal Information Section -->
      <div class="section-card">
        <div class="title-with-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>
          <h3>Personal Information</h3>
        </div>
        <div class="info-grid">
          <div class="info-row"><span class="label">Full name</span><span class="value">{{ user.name.title }} {{ user.name.first }} {{ user.name.last }}</span></div>
          <div class="info-row"><span class="label">Gender</span><span class="value">{{ user.gender === 'female' ? 'Female' : 'Male' }}</span></div>
          <div class="info-row"><span class="label">Date of birth</span><span class="value">{{ formatDate(user.dob.date) }} (age {{ user.dob.age }})</span></div>
          <div class="info-row"><span class="label">Email</span><span class="value">{{ user.email }}</span></div>
          <div class="info-row"><span class="label">Phone</span><span class="value">{{ user.phone }}</span></div>
          <div class="info-row"><span class="label">Cell</span><span class="value">{{ user.cell }}</span></div>
        </div>
      </div>

      <!-- Location Section -->
      <div class="section-card">
        <div class="title-with-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <h3>Location</h3>
        </div>
        <div class="info-grid">
          <div class="info-row"><span class="label">Street</span><span class="value">{{ user.location.street.number }} {{ user.location.street.name }}</span></div>
          <div class="info-row"><span class="label">City</span><span class="value">{{ user.location.city }}</span></div>
          <div class="info-row"><span class="label">State</span><span class="value">{{ user.location.state }}</span></div>
          <div class="info-row"><span class="label">Country</span><span class="value">{{ user.location.country }}</span></div>
          <div class="info-row"><span class="label">Postcode</span><span class="value">{{ user.location.postcode }}</span></div>
          <div class="info-row"><span class="label">Timezone</span><span class="value">{{ user.location.timezone.offset }} ({{ user.location.timezone.description }})</span></div>
        </div>
      </div>

      <!-- Hobbies Section -->
      <div class="section-card hobbies-section">
        <div class="title-with-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <h3>Hobbies</h3>
        </div>
        <div class="hobbies-tags">
          <span v-for="(hobby, index) in user.hobbies" :key="index" class="hobby-tag">
            {{ hobby }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Global Card Wrapper */
.card-wrapper {
  display: flex;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #1f2937;
  border-left: 6px solid transparent;
}

/* Colors for ageClass (left border indicator) */
.minor { border-left-color: #9ca3af; }
.young { border-left-color: #3b82f6; }
.adult { border-left-color: #10b981; }
.senior { border-left-color: #f59e0b; }

/* Left Sidebar */
.sidebar {
  width: 280px;
  padding: 32px 24px;
  background-color: #fcfcfd;
  border-right: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
}

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 16px;
  object-fit: cover;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.name {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #111827;
}

.meta-inline {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 24px;
}
.meta-inline span { display: flex; align-items: center; gap: 6px; }
.divider { color: #d1d5db; }

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #4b5563;
}
.contact-item svg { color: #6b7280; flex-shrink: 0; }

/* Right Main Content */
.main-content {
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Section Cards */
.section-card {
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  padding: 20px;
}

.title-with-icon {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.title-with-icon h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #111827;
}
.title-with-icon svg { color: #111827; }

/* Accordion Section */
.accordion { padding: 0; }
.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  background-color: #f9fafb;
  border-radius: 12px;
}
.accordion-header .title-with-icon { margin-bottom: 0; }
.accordion-body {
  padding: 16px 20px;
  border-top: 1px solid #f3f4f6;
  font-size: 14px;
  color: #4b5563;
  line-height: 1.5;
}

/* Data Tables */
.info-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.info-row {
  display: flex;
  align-items: flex-start;
  font-size: 14px;
}
.label {
  width: 150px;
  color: #6b7280;
  flex-shrink: 0;
}
.value {
  color: #111827;
  font-weight: 500;
}

/* Hobbies */
.hobbies-section .title-with-icon { margin-bottom: 20px; }
.hobbies-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.hobby-tag {
  background-color: #eff6ff;
  color: #2563eb;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid #bfdbfe;
}

/* Responsive */
@media (max-width: 768px) {
  .card-wrapper { flex-direction: column; }
  .sidebar { width: 100%; border-right: none; border-bottom: 1px solid #f3f4f6; }
}
</style>
