<template>
  <div class="header">
    <div class="container">
      <button v-if="authResult" @click="Logout" class="center">Logout</button>
    </div>
    <div class="post-list" v-for="post in posts" :key="post.index">
      <div class="post">
        <h3>Date: {{ post.date }}</h3>
        <p><b>Body:</b> {{ post.body }}</p>
      </div>
    </div>

    <!-- Add Post Button -->
    <button class="add-post-button" @click="showModal = true">Add Post</button>

    <!-- Modal for Adding Post -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>Add New Post</h3>
        <textarea
          v-model="newPostBody"
          placeholder="Write your post here..."
          required
        ></textarea>
        <div class="modal-actions">
          <button @click="createPost">Submit</button>
          <button @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import auth from "../auth";

export default {
  name: "HomeView",
  data: function () {
    return {
      posts: [],
      newPostBody: "", 
      authResult: auth.authenticated(),
      showModal: false, 
    };
  },
  methods: {
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then(() => {
          console.log("jwt removed");
          this.$router.push("/login");
        })
        .catch((e) => console.error("Error logout:", e));
    },
    createPost() {
      if (!this.newPostBody.trim()) return;

      fetch("http://localhost:3000/posttable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: this.newPostBody }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to add post");
          return response.json();
        })
        .then((newPost) => {
          this.posts.unshift(newPost); 
          this.newPostBody = ""; 
          this.closeModal(); 
        })
        .catch((err) => console.error("Error adding post:", err.message));
    },
    closeModal() {
      this.newPostBody = ""; 
      this.showModal = false; 
    },
  },
  mounted() {
    fetch("http://localhost:3000/posttable")
      .then((response) => response.json())
      .then((data) => (this.posts = data))
      .catch((err) => console.error(err.message));
  },
};
</script>

<style scoped>
body{
  margin: 20px 40px;
  font-size: 1.2rem;
  letter-spacing: 1px;
  background: #fafafa;
  position: relative;
}

h3{
    margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
  color: #444;
  background: lightgray;
}
p{
  background: white;
}
h1, h2, h3, h4, ul, li, a, input, label, button, div, footer{
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
  color: #444;
}
nav{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 80px;
}
input{
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1em;
  width: 100%;
}
label{
  display: block;
  margin: 20px 0 10px;
}
button{
  background-color: #007BFF;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
nav{
  display: flex;
  align-items: center;
}
.post {
  background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
    overflow: hidden;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}
.center {
  margin: auto;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  margin: 10px auto;
  width: 30%; 
}
.container {
  display: flex;
  justify-content: center;
}

.footer {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  max-width: 600px;
  margin: 20px auto 0;
}

.add-post-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  border-radius: 10px;
  padding: 20px;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.modal-content h3 {
  margin-bottom: 20px;
}

.modal-content textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1em;
  margin-bottom: 10px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.modal-actions button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-actions button:nth-child(2) {
  background-color: #dc3545; /* Cancel button in red */
}
</style>