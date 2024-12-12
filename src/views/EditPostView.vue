<template>
    <div class="edit-post-container">
      <h2>Edit Post</h2>
      <textarea
        v-model="postBody"
        placeholder="Edit your post here..."
        required
      ></textarea>
      <div class="actions">
        <button @click="updatePost">Update</button>
        <button @click="deletePost" style="background-color: #dc3545;">Delete</button>
        <button @click="goBack" style="background-color: gray;">Cancel</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        postId: null,
        postBody: "",
      };
    },
    methods: {
      fetchPost() {
        fetch(`http://localhost:3000/posttable/${this.postId}`)
          .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch post");
            return response.json();
          })
          .then((post) => {
            this.postBody = post.body;
          })
          .catch((err) => console.error("Error fetching post:", err.message));
      },
      updatePost() {
        fetch(`http://localhost:3000/posttable/${this.postId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body: this.postBody }),
        })
          .then((response) => {
            if (!response.ok) throw new Error("Failed to update post");
            this.$router.push("/");
          })
          .catch((err) => console.error("Error updating post:", err.message));
      },
      deletePost() {
        fetch(`http://localhost:3000/posttable/${this.postId}`, { method: "DELETE" })
          .then((response) => {
            if (!response.ok) throw new Error("Failed to delete post");
            this.$router.push("/");
          })
          .catch((err) => console.error("Error deleting post:", err.message));
      },
      goBack() {
        this.$router.push("/");
      },
    },
    mounted() {
      this.postId = this.$route.params.id;
      this.fetchPost();
    },
  };
  </script>
  
  <style scoped>
  .edit-post-container {
    max-width: 600px;
    margin: 20px auto;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  textarea {
    width: 100%;
    height: 150px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 1rem;
  }
  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
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
  