<script setup lang="ts">
import { ref } from 'vue'
import { CalendarDate } from "@internationalized/date";
const props = defineProps<{
  roomName:string,
  availableDates?:CalendarDate[]
}>();
const isExpanded = ref(true)


</script>


<template>
  <div class="room-box">
    <div class="room-header" >
      <div class="room-info">
        <h3>Room {{props.roomName}}</h3>
        <div class="room-meta">
          <span class="room-status">Available</span>
        </div>
      </div>
      
    </div>

    <div class="dates-section" :class="{ expanded: isExpanded }">
      <div class="dates-content">
        <div class="dates-header">
          <div class="dates-title">Available Dates</div>
          <div class="dates-subtitle">Select a date for booking</div>
        </div>

        <div class="dates-list">
         {{ props.availableDates }}
         
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.room-box {
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  overflow: hidden;
  transition: all 0.2s ease;
  margin-bottom: 20px;
}


.room-header {
  padding: 20px;
  background: white;
  border-bottom: 1px solid #f1f3f4;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s ease;
}


.room-info h3 {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.room-meta {
  display: flex;
  gap: 12px;
  align-items: center;
}

.room-type {
  font-size: 13px;
  color: #6c757d;
}

.room-status {
  background: #d4edda;
  color: #155724;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.expand-toggle {
  color: #6c757d;
  font-size: 18px;
  transition: transform 0.2s ease;
  user-select: none;
}

.expand-toggle.expanded {
  transform: rotate(180deg);
}

.dates-section {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.dates-section.expanded {
  max-height: 300px; /* set a fixed max height */
  overflow-y: auto;   /* enable vertical scroll when content exceeds */
}


.dates-content {
  padding: 20px;
  background: #fafbfc;
  border-top: 1px solid #f1f3f4;
}

.dates-header {
  margin-bottom: 16px;
}

.dates-title {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.dates-subtitle {
  font-size: 12px;
  color: #6c757d;
}

.dates-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.date-item {
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 6px 0;
  border-left: 3px solid transparent;
  padding-left: 12px;
}



.date-item.selected {
  color: #1976d2;
  border-left-color: #1976d2;
  background: rgba(25, 118, 210, 0.08);
  margin-left: -12px;
  padding-left: 24px;
  font-weight: 500;
}

.date-text {
  font-size: 14px;
  color: #2c3e50;
  display: block;
}



.date-item.selected .date-text {
  color: #1976d2;
}

.no-dates {
  text-align: center;
  color: #6c757d;
  font-size: 14px;
  padding: 30px 20px;
  font-style: italic;
}
</style>
