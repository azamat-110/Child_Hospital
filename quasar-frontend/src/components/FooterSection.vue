<script setup>
import { computed, ref } from "vue";
import { useQuasar } from "quasar";
import { useAuthStore } from "stores/authStore";

const $q = useQuasar();
const email = ref("");
const isDarkMode = computed(() => $q.dark.isActive);
const authStore = useAuthStore();

const subscribeNewsletter = () => {
  console.log("Newsletter subscription for:", email.value);
  email.value = "";
};
</script>

<template>
  <footer
    class="footer q-px-xl q-pb-lg"
    :class="{ dark__secondary: isDarkMode }"
  >
    <div class="footer-content">
      <div class="footer-section">
        <h2 class="logo">Children's hospital</h2>
        <p class="tagline">
          {{$t('footer.description')}}
        </p>
      </div>
      <div class="footer-section">
        <h3>{{$t('footer.important_links')}}</h3>
        <ul>
          <li v-if="authStore.role === 1">
            <router-link to="/appointments" clickable>
              {{$t('navBar.appointments')}}
            </router-link>
          </li>
          <li>
            <router-link to="/doctors">
              {{$t('navBar.doctors')}}
            </router-link>
          </li>
          <li v-if="authStore.role === 1">
            <router-link to="/prescriptions">
              {{$t('navBar.prescriptions')}}
            </router-link>
          </li>
          <li v-if="authStore.role === 1">
            <router-link to="/medications">
              {{$t('navBar.medications')}}
            </router-link>
          </li>
        </ul>
      </div>

      <div class="footer-section">
        <h3> {{$t('footer.contact_us.title')}}</h3>
        <ul>
          <li>{{$t('footer.contact_us.call')}}: +998 (97) 770-07-07</li>
          <li>Email: info@hospital.com</li>
          <li>{{$t('footer.contact_us.address')}}: 123 Some place</li>
          <li>{{$t('footer.contact_us.country')}}: Tashkent</li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>{{$t('footer.newsletter')}}</h3>
        <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
          <input
            type="email"
            v-model="email"
            :placeholder="$t('footer.emailPlaceholder')"
            required
          />
            <q-btn
              type="submit"
              flat
              icon="send"
              size="sm"
            />
        </form>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2024 Children's hospital All Rights Reserved by PNTEC-LTD</p>
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
  position: relative;
  background: rgba(1, 148, 230, 1);
  color: white;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.7);
  z-index: 100;

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
    min-width: 300px;

    input {
      flex: 1;
      padding: 0.8rem;
      border: none;
      background: transparent;
      color: #1f2b6c;

      &::placeholder {
        color: #9fa8da;
      }
    }

    button {
      background: none;
      border: none;
      padding: 0.8rem;
      color: #1f2b6c;
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
