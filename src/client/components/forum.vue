<template>
  <div id="forum">
    <div id="forum__menu">
      <div id="forum__menu__login">
        <v-form>
          <v-container>
            <h4>
              <v-icon>mdi-anchor</v-icon>
              Welcome
            </h4>
            <v-text-field
              v-model="user"
              label="Username or Email"
              dense
              :error-messages="username.errors"></v-text-field>
            <v-text-field
              v-model="pass"
              type="password"
              :error-messages="password.errors"
              dense
              label="Password" required ></v-text-field>
            <v-btn block="true" ripple="true" color="Primary">Login</v-btn>
          </v-container>
        </v-form>
      </div>
    </div>
    <div id="forum__posts">
      <v-card min-width="100%" min-height="300px">
        <div class="post__title">
          <img class="category__image" height="50" src="https://cdn1.vectorstock.com/i/1000x1000/28/05/cartoon-hamburger-icon-vector-2862805.jpg" />
          <div class="post__title__details">
            <h3 class="headline">
              Something about the way the Birds Sound takes me back to your town
            </h3>
            <span>10/21/2019 @ 10:00 AM</span>
          </div>
        </div>
        <div class="post">
          <div class="post__body">
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
          </div>
          <div class="post__author">
            <img height="100" src="https://cdn1.vectorstock.com/i/1000x1000/28/05/cartoon-hamburger-icon-vector-2862805.jpg" />
            <span>williamtaft (50)</span>
            <em>SkettiPHILE</em>
          </div>
        </div>
        <div class="post__actions">
          <v-card-actions class="space-between">
            <div class="buttons-left">
              <v-btn ripple="true">
                3 comments
              </v-btn>
              <v-btn ripple="true">
                <v-icon>mdi-reply</v-icon> Reply
              </v-btn>
              <v-btn ripple="true">
                <v-icon>mdi-tooltip-plus-outline</v-icon> Grant XP
              </v-btn>
            </div>
            <div class="buttons-right">
              <v-btn ripple="true">
                <v-icon>mdi-square-edit-outline</v-icon> Edit
              </v-btn>
              <v-btn ripple="true">
                <v-icon>mdi-delete</v-icon> Delete
              </v-btn>
            </div>
          </v-card-actions>
        </div>
      </v-card> 
    
    </div>
  </div>
</template>

<script lang="ts">
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState('app', ['username', 'password']),
      user: {
        get() {
          return this.username.value
        },
        set(value) {
          this.$store.commit('app/username', value)
        }
      },
      pass: {
        get() {
          return this.password.value
        },
        set(value) {
          this.$store.commit('app/password', value)
        }
      }
    }
  }
</script>

<style scoped>
  #forum__menu {
    width: 300px;
    height: 100vh;
    position: fixed;
    border-right: 1px solid #ccc;
  }
  #forum__posts {
    width: calc(100% - 300px);
    margin-left: 300px;
    padding: 20px;
  }
  h4 {
    margin-bottom: 20px;
  }
  .post__title {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
  }
  .category__image {
    margin-right: 20px;
  }
  .post__title__details {
    display: flex;
    flex-direction: column;
  }
  .post {
    display: flex;
    height: 200px;
  }
  .post__body {
    width: calc(100% - 200px);
    padding: 30px;
  }
  .post__author {
    width: 200px;
    border-left: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .post__actions {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ccc;
  }
  .space-between { 
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
</style>