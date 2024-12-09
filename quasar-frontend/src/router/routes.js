const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: '/patients', component: () => import('pages/PatientsPage.vue') },
      { path: '/appointments', component: () => import('pages/AppointsPage.vue') },
      { path: '/doctors', component: () => import('pages/DoctorsPage.vue') },
      { path: '/medications', component: () => import('pages/MedicationsPage.vue') },
      { path: '/prescriptions', component: () => import('pages/PrescriptionsPage.vue') },
      { path: '/about', component: () => import('pages/AboutUs.vue') },
      { path: '/login', component: () => import('pages/LoginPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
