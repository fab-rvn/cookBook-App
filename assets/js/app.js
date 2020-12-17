import { saveUser, validateUsername, validatePassword } from './auth/register.js';
import { validateUserLogin, checkIfAuth } from './auth/login.js';
import { logout } from './auth/logout.js';
import { activeNavbar, showUserProfile } from './components/navbar.js';

const registerUsername = document.getElementById('register-username');
const registerPassword = document.getElementById('register-password');
const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const hamburger = document.querySelector('#hamburger');
const userProfileBtn = document.getElementById('user-profile');


window.addEventListener('load', checkIfAuth, false);
registerUsername.addEventListener('blur', validateUsername);
registerPassword.addEventListener('blur', validatePassword);
registerBtn.addEventListener('click', saveUser);
loginBtn.addEventListener('click', validateUserLogin);
logoutBtn.addEventListener('click', logout);
hamburger.addEventListener('click', activeNavbar);
userProfileBtn.addEventListener('click', showUserProfile);