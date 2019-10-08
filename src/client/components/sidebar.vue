<template>
  <div id="forum__menu">
    <div id="forum__menu__login" v-if="!authenticated">
      <v-form>
        <v-container >
          <v-text-field
            v-model="username"
            label="Username or Email"
            dense
            :error-messages="usernameError"></v-text-field>
          <v-text-field
            v-model="password"
            type="password"
            :error-messages="passwordError"
            dense
            label="Password" required ></v-text-field>
          <v-btn @click="login" :block="true" :ripple="true" color="Primary">Login</v-btn>
          <div class="help-text">
            <a>Forgot Password?</a>
            <router-link to="/register">Register</router-link>
          </div>
        </v-container>
      </v-form>
    </div>
    <div v-else id="forum__menu__me">
      <div class="me__details">
        <v-badge>
          <template v-slot:badge>{{experience}}</template>
          <v-avatar size="50">
            <img v-if="avatar" :src="`/avatars/${avatar}`" />
            <v-icon v-else size="50">mdi-account-circle</v-icon>
          </v-avatar>
        </v-badge>
        <div class="me__details__words">
          <h4>{{ username }}</h4>
          <span>{{ title }}</span>
        </div>
        <div class="me__actions">
          <v-btn @click="newpost" :ripple="true">New Post</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { mapState } from 'vuex'
  const fields = ['username', 'password']
  const compute: any = {}
  fields.map((field: string) => {
    compute[field] = {
      get() {
        return this.$store.state.login[field].value
      },
      set(value: any) {
        return this.$store.commit(`login/${field}`, value)
      }
    }
    compute[`${field}Error`] = {
      get() {
        return this.$store.state.login[field].error
      }
    }
  })
  export default {
    
    computed: {
      ...compute,
      ...mapState('me', ['id', 'authenticated', 'admin', 'username', 'experience', 'avatar']),
      title() {
        return this.$store.getters['me/experienceTitle']
      }
    },
    methods: {
      login() {
        this.$store.dispatch('login/login')
      },
      newpost() {
        this.$store.commit('post/clearAll')
        this.$router.push('/posts/new')
      }
    },
    mounted() {
    },
  }
</script>

<style>
  #forum__menu {
    width: 300px;
    min-height: 100vh;
    border-right: 1px solid #ccc;
  }
  .help-text {
    display: flex;
    justify-content: space-between;
  }
  #forum__menu__me {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-bottom: 1px solid #ccc;
    height: 200px;

  }
  .me__details {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

  }
  .me__details__words {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .me__actions {
    margin-top: 15px;
  }
</style>