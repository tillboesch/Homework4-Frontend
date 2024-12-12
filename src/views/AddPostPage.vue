<template>
    <div class="add-post-page">
      <h3>Add New Post</h3>
      <textarea
        v-model="newPostBody"
        placeholder="Write your post here..."
        required
      ></textarea>
      <div class="actions">
        <button @click="createPost">Submit</button>
        <button @click="cancel">Cancel</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newPostBody: "",
      };
    },
    methods: {
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
          .then(() => {
            this.$router.push("/"); // Redirect to homepage after adding the post
          })
          .catch((err) => console.error("Error adding post:", err.message));
      },
      cancel() {
        this.$router.push("/"); // Redirect to homepage when canceled
      },
    },
  };
  </script>
  
  <style scoped>
  .add-post-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  textarea {
    width: 90%;
    height: 150px;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 16px;
  }
  .actions {
    display: flex;
    gap: 10px;
  }
  button {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  