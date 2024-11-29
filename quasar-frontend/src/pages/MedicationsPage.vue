<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit" class="appointment-form">
      <div class="form-grid">
        <!-- Name & Gender -->
        <div class="form-field">
          <input
            v-model="form.name"
            type="text"
            placeholder="Name"
            required
          >
        </div>
        <div class="form-field">
          <select v-model="form.gender" required>
            <option value="" disabled selected>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <!-- Email & Phone -->
        <div class="form-field">
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            required
          >
        </div>
        <div class="form-field">
          <input
            v-model="form.phone"
            type="tel"
            placeholder="Phone"
            required
          >
        </div>

        <!-- Date & Time -->
        <div class="form-field">
          <input
            v-model="form.date"
            type="date"
            required
          >
        </div>
        <div class="form-field">
          <select v-model="form.time" required>
            <option value="" disabled selected>Time</option>
            <option v-for="time in timeSlots" :key="time" :value="time">
              {{ time }}
            </option>
          </select>
        </div>

        <!-- Doctor & Department -->
        <div class="form-field">
          <select v-model="form.doctor" required>
            <option value="" disabled selected>Doctor</option>
            <option v-for="doctor in doctors" :key="doctor" :value="doctor">
              {{ doctor }}
            </option>
          </select>
        </div>
        <div class="form-field">
          <select v-model="form.department" required>
            <option value="" disabled selected>Department</option>
            <option v-for="dept in departments" :key="dept" :value="dept">
              {{ dept }}
            </option>
          </select>
        </div>

        <!-- Message -->
        <div class="form-field span-2">
          <textarea
            v-model="form.message"
            placeholder="Message"
            rows="4"
          ></textarea>
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit-btn">SUBMIT</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  gender: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  doctor: '',
  department: '',
  message: ''
})

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '02:00 PM', '03:00 PM', '04:00 PM'
]

const doctors = [
  'Dr. Smith', 'Dr. Johnson', 'Dr. Williams',
  'Dr. Brown', 'Dr. Davis', 'Dr. Miller'
]

const departments = [
  'Cardiology', 'Neurology', 'Pediatrics',
  'Orthopedics', 'Dermatology', 'General Medicine'
]

const onSubmit = () => {
  console.log('Form submitted:', form.value)
  // Handle form submission here
}
</script>

<style scoped>
.form-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #1a237e;
}

.appointment-form {
  width: 100%;
  max-width: 800px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-field {
  position: relative;
}

.span-2 {
  grid-column: span 2;
}

input,
select,
textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.2em;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

input::placeholder,
textarea::placeholder,
select:invalid {
  color: rgba(255, 255, 255, 0.7);
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: #3949ab;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #303f9f;
}

/* Focus styles */
input:focus,
select:focus,
textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
}

/* Responsive design */
@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .span-2 {
    grid-column: span 1;
  }
}
</style>
