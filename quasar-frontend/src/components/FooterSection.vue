<script setup>
import { ref } from 'vue'

const email = ref('')

const subscribeNewsletter = () => {
  console.log('Newsletter subscription for:', email.value)
  email.value = ''
}
</script>

<template>
  <footer class="footer q-px-xl q-pb-lg">
    <div class="footer-content">
      <!-- Logo Section -->
      <div class="footer-section">
        <h2 class="logo">Children's hospital</h2>
        <p class="tagline">
          Leading the Way in Medical Excellence, Trusted Care.
        </p>
      </div>

      <div class="footer-section">
        <h3>Important Links</h3>
        <ul>
          <li>
            <router-link to="/appointments" clickable>Appointment</router-link>
          </li>
          <li>
            <router-link to="/doctors">Doctors</router-link>
          </li>
          <li>
            <router-link to="/prescriptions">Prescriptions</router-link>
          </li>
          <li>
            <router-link to="/medications">Medications</router-link>
          </li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Contact Us</h3>
        <ul>
          <li>Call: (237) 681-812-255</li>
          <li>Email: fildineesoe@gmail.com</li>
          <li>Address: 0123 Some place</li>
          <li>Some country</li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Newsletter</h3>
        <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
          <input
            type="email"
            v-model="email"
            placeholder="Enter your email address"
            required
          />
          <button type="submit">
            <span class="send-icon">➤</span>
          </button>
        </form>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2021 Hospital's name All Rights Reserved by PNTEC-LTD</p>
      <div class="social-links">
        <a href="#linkedin" aria-label="LinkedIn">
          <i class="social-icon">in</i>
        </a>
        <a href="#facebook" aria-label="Facebook">
          <i class="social-icon">f</i>
        </a>
        <a href="#instagram" aria-label="Instagram">
          <i class="social-icon">ig</i>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(to bottom, #1F2B6C, #3A4A9D);
  color: white;

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 12px;

  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .tagline {
    color: #e0e0e0;
    line-height: 1.5;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.8rem;


    }
  }
  a {
    color: #e0e0e0;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #90caf9;
    }
  }

  .newsletter-form {
    display: flex;
    background: #f5f7ff;
    border-radius: 4px;
    overflow: hidden;

    input {
      flex: 1;
      padding: 0.8rem;
      border: none;
      background: transparent;
      color: #1F2B6C;

      &::placeholder {
        color: #9fa8da;
      }
    }

    button {
      background: none;
      border: none;
      padding: 0.8rem;
      color: #1F2B6C;
      cursor: pointer;
      transition: opacity 0.3s ease;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .footer-bottom {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;

    .social-links {
      display: flex;
      gap: 1rem;

      .social-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        font-style: normal;
        transition: background-color 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }

  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
    }

    .footer-bottom {
      flex-direction: column;
      text-align: center;

      .social-links {
        justify-content: center;
      }
    }
  }
}

</style>
