<template>
  <div id="registration" style="width:100%;background-color:white;padding:20px;" transition="fade-transition">
    <div id="registration__summary">
      <v-avatar size="62">
        <img v-if="avatar" :src="`/temp/${avatar}`" />
        <v-icon v-else size="40">mdi-account-circle</v-icon>
      </v-avatar>
      <h2 class="headline">Create an Account</h2>
    </div>
    <div id="registration__form">
      <v-form>
        <v-container>
          <v-text-field
            v-model="username"
            label="Username"
            :error-messages="usernameError"></v-text-field>
          <v-text-field
            v-model="email"
            label="Email"
            :error-messages="emailError"></v-text-field>
          <v-text-field
            v-model="password"
            type="password"
            :error-messages="passwordError"
            label="Password" required ></v-text-field>
          <v-text-field
            v-model="password_confirmation"
            type="password"
            :error-messages="password_confirmationError"
            label="Confirm your password" required ></v-text-field>
          <v-file-input
            v-model="file"
            :error-messages="fileError"
            label="Avatar"
            @change="uploadAvatar"
          ></v-file-input>
          <v-text-field
            v-model="first_name"
            :error-messages="first_nameError"
            label="First Name"></v-text-field>
          <v-text-field
            v-model="last_name"
            :error-messages="last_nameError"
            label="Last Name"></v-text-field>
          <v-text-field
            v-model="born"
            type="date"
            :error-messages="bornError"
            label="When were you born?" required ></v-text-field>
          <v-text-field
            v-model="work_title"
            :error-messages="work_titleError"
            label="What do you do?"></v-text-field>
          <v-textarea 
            v-model="bio"
            :error-messages="bioError"
            label="Tell us about yourself">
          </v-textarea>
        </v-container>
      </v-form> 
    </div>
    <v-card min-width="100%" :light="true">
      <v-card-actions>
        <v-btn @click="isRegistering=false" :ripple="true">Cancel</v-btn>
        <v-btn @click="register" :ripple="true">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
  import { mapState } from 'vuex'
  const fields = [
    'email',
    'file',
    'username', 
    'password', 
    'password_confirmation', 
    'born', 
    'first_name', 
    'last_name',
    'work_title',
    'bio',
    'email',
    'avatar'
  ]
  const compute: any = {}
  fields.map((field: string) => {
    compute[field] = {
      get() {
        return this.$store.state.register[field].value
      },
      set(value: any) {
        return this.$store.commit(`register/${field}`, value)
      }
    }
    compute[`${field}Error`] = {
      get() {
        return this.$store.state.register[field].error
      }
    }
  })
  export default { 
    computed: {
      ...mapState('app', ['registering']),
      ...compute,
      isRegistering: {
        get() {
          return this.registering
        },
        set(value) {
          this.$store.commit('app/registering', value)
        }
      }
    },

    methods: {
      async uploadAvatar() {
        await this.$store.dispatch('register/uploadAvatar')
      },
      async register() {
        await this.$store.dispatch('register/register')
      }
    }
  }
</script>

<style scoped>
  #registration {
    width: 800px;
    min-height: 500px;
  }
  #registration__summary {
    display :flex;
    align-items: center;
  }
</style>