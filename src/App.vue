<template>
  <div id="app">
    <div class="container">
      <nav>
        <ul class="nav">
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{ name: 'home' }"
              >Trading Desk</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'blockchain' }"
              >Blockchain
            </router-link>
          </li>
        </ul>
      </nav>
      <router-view />
    </div>
  </div>
</template>
