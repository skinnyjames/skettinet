<template>
  <div style="margin: 20px 0;">
    <v-card min-width="100%" min-height="300px">
      <div class="post__title">
        <div class="post__title--left">
          <img class="category__image" height="50" src="https://cdn1.vectorstock.com/i/1000x1000/28/05/cartoon-hamburger-icon-vector-2862805.jpg" />
          <div class="post__title__details">
            <h3 class="headline">
              {{ post.title }}
            </h3>
            <span>10/21/2019 @ 10:00 AM</span>
          </div>
        </div>
        <div>
          <h1 style="width: 40px;">+5</h1>
        </div>
      </div>
      <div class="post">
        <div class="post__body">
          <p>{{ post.body }}</p>
        </div>
        <div class="post__author">
          <img height="100" src="https://cdn1.vectorstock.com/i/1000x1000/28/05/cartoon-hamburger-icon-vector-2862805.jpg" />
          <span>{{ post.author }} ({{post.author_experience}})</span>
          <em>{{ title(post.author_experience) }}</em>
        </div>
      </div>
      <div class="post__actions">
        <div class="post__mods">
          <v-icon color="white">mdi-chevron-left</v-icon>
          <span>Ziggy says: "Whoop Whoop" +5</span>
          <v-icon color="white">mdi-chevron-right</v-icon>
        </div>
        <v-card-actions class="space-between">
          <div class="buttons-left">
            <v-btn :ripple="true">
              3 comments
            </v-btn>
            <v-btn :ripple="true">
              <v-icon>mdi-reply</v-icon> Reply
            </v-btn>
            <v-btn :ripple="true">
              <v-icon>mdi-tooltip-plus-outline</v-icon> Grant XP
            </v-btn>
          </div>
          <div class="buttons-right">
            <v-btn :ripple="true">
              <v-icon>mdi-square-edit-outline</v-icon> Edit
            </v-btn>
            <v-btn :ripple="true">
              <v-icon>mdi-delete</v-icon> Delete
            </v-btn>
          </div>
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">  
 export default {
   props: ['post'],
   methods: {
     title(exp: Number) {
       this.$store.getters['me/title'](exp)
     }
   }
 }
</script>

<style>
#forum__posts {
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
    justify-content: space-between;
  }

  .post__title--left {
    display: flex;
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
    flex-direction: column;
    justify-content: space-between;
    border-top: 1px solid #ccc;
    background-color: rgba(14, 23, 107, 0.4);

  }
  .space-between { 
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .post__mods {
    width: 100%;
    height: 50px;
    background-color: rgba(0, 0, 0, .8);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>