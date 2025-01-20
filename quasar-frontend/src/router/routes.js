import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Public/HomePage.vue') },
      { path: '/doctors', component: () => import('pages/Dashboard/DoctorsPage.vue') },
      { path: '/about', component: () => import('pages/Public/AboutUs.vue') },
      { path: '/login', component: () => import('pages/Public/LoginPage.vue') },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children:[
      { path: '/dashboard/main', component: () => import('pages/Dashboard/MainDashboard.vue') },
      { path: '/dashboard/patients', component: () => import('pages/Dashboard/PatientsPage.vue') },
      { path: '/dashboard/doctors', component: () => import('pages/Dashboard/DoctorsPage.vue') },
      { path: '/dashboard/medications', component: () => import('pages/Dashboard/MedicationsPage.vue') },
      { path: '/dashboard/prescriptions', component: () => import('pages/Dashboard/PrescriptionsPage.vue') },
      { path: '/dashboard/appointments', component: () => import('pages/Dashboard/AppointsPage.vue') },
      { path: '/dashboard/settings', component: ()=> import('pages/Dashboard/SettingsPage.vue')},
      { path: '/dashboard/feedback', component: ()=> import('pages/Dashboard/SendFeedback.vue')},
      { path: '/dashboard/help', component: ()=> import('pages/Dashboard/HelpPage.vue')}
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Public/ErrorNotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,  // Обратите внимание, что routes - это массив

});

export default routes;
