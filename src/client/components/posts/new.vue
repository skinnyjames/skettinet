<template>
  <div id="new__post">
    <modal v-if="category_is_null">
      <v-card light class="category__form">
        <v-card-title>
          <h2 class="headline">Pick a Category</h2>
        </v-card-title>
        <div @click="setCategory(category.id)" class="category" v-for="(category, index) in categories" :key="index">
          <img :src="`/categories/${category.image_name}`" style="width:100px;height:100px;">
          {{ category.name }}
        </div>
      </v-card>
    </modal>
    <div id="post__form">
      <v-form>
        <v-container>
          <h1 v-if="currentCategory" class="headline post__form__headline"> 
            
            <img @click="setCategory(null)" :src="`/categories/${currentCategory.image_name}`" style="width:100px;height:100px;">
            <span>{{ currentCategory.name }}</span>
          </h1>
          <v-text-field
            v-model="title"
            label="Title"
            :error-messages="titleError"></v-text-field>
          <v-textarea 
            row-height="30px"
            auto-grow
            outlined
            v-model="body"
            :error-messages="bodyError"
            label="Body"></v-textarea>
          <v-text-field
            v-model="quote"
            label="Quote"
            :error-messages="quoteError"></v-text-field>
          <v-text-field
            v-model="quotee"
            label="Quotee"
            :error-messages="quoteeError"></v-text-field>
        </v-container>
        <v-btn ripple @click="submit">Submit</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script lang="ts">
  import modal from './../global/modal.vue'

  const fields = [
    'user_id',
    'category_id',
    'title',
    'body',
    'quote',
    'quotee'
  ]
  const compute: any = {}
  fields.map((field: string) => {
    compute[field] = {
      get() {
        return this.$store.state.post[field].value
      },
      set(value: any) {
        return this.$store.commit(`post/${field}`, value)
      }
    }
    compute[`${field}Error`] = {
      get() {
        return this.$store.state.post[field].error
      }
    }
  })
  export default {
    components: {
      modal,
    },
    computed: {
      ...compute,
      category_is_null() {
        return !this.category_id
      },
      categories() {
        return this.$store.state.categories.categories
      },
      currentCategory() {
        return this.categories.find((category: any) => {
          return category.id == this.category_id
        })
      }
    },
    async mounted() {
      this.$store.commit('app/loading', true)
      await this.$store.dispatch('categories/getAll')
      this.$store.commit('post/user_id', this.$store.state.me.id)
      this.$store.commit('app/loading', false)
    }, 
    methods: {
      setCategory(id: Number) {
        this.category_id = id
      },
      submit() {
        this.$store.dispatch('post/post')
      }
    }
  }
</script>

<style>
  .category__form {
    width: 800px;
    padding: 20px;
    min-height: 500px;
    background-color: white;
  }
  .category {
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 150px;
    height: 150px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  .category:hover {
    border: 3px solid #ccc;
  }
  .post__form__headline {
    display: flex;
    align-items: center;
    padding: 20px;
    margin-bottom: 20px;
  }
  .post__form__headline img {
    margin-right: 20px;
  }
</style>