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
          <v-text-field
            v-model="title"
            label="Username"
            :error-messages="titleError"></v-text-field>
        </v-container>
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
      }
    },
    async mounted() {
      this.$store.commit('app/loading', true)
      await this.$store.dispatch('categories/getAll')
      this.$store.commit('app/loading', false)
    }, 
    methods: {
      setCategory(id: Number) {
        this.category_id = id
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
</style>