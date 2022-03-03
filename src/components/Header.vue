<template>
  <header class="header">
      <span class="site-name">Awesome News</span>
      <nav class="menu">
        <router-link class="menu-item" to="/">World news</router-link>
        <router-link class="menu-item" to="/SportsNews">Sports news</router-link>
        <router-link class="menu-item" to="/EntertainmentNews">Entertainment news</router-link>
      </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
    display: flex;
    width: 100%;
    height: 50px;
    background: #ccc;
    color: #222;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 0 10px;
    .menu {
        .menu-item {
            text-decoration: none;
            color: #222;
            &:hover {
                color: #555;
            }
            & + .menu-item {
                margin-left: 20px;
            }
        }
    }
}
</style>
