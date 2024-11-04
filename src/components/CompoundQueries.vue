<template>
  <div>
    <!-- Form to Add Tasks -->
    <form @submit.prevent="addTask">
      <input
        style="margin-right: 20px"
        type="text"
        v-model="newTask.title"
        placeholder="Task Title"
        required
      />
      <select style="margin-right: 20px" v-model="newTask.priority" required>
        <option disabled value="">Select Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
    <button @click="fetchTasks">Get 3 High priority tasks</button>
    <div v-if="tasks.length === 0">No tasks found</div>
    <div v-else>
      <h1>High Priority Tasks</h1>
      <li v-for="task in tasks" :key="task.id">
        <strong>{{ task.title }}</strong> - Priority: {{ task.priority }}
        <br />
        Created At: {{ task.createdAt.toDate().toLocaleString() }}
      </li>
    </div>
  </div>
</template>

<script>
import { db } from "../firebaseinit";

export default {
  data() {
    return {
      tasks: [],
      newTask: {
        title: "",
        priority: "",
      },
      loading: true,
    };
  },

  methods: {
    fetchTasks() {
      db.collection("tasks")
        .where("priority", "==", "high")
        .orderBy("createdAt", "desc")
        .limit(3)
        .get()
        .then((querySnapshot) => {
          const taskList = [];
          querySnapshot.forEach((doc) => {
            taskList.push({ id: doc.id, ...doc.data() });
          });
          this.tasks = taskList;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching documents:", error);
          this.loading = false;
        });
    },
    addTask() {
      const taskData = {
        ...this.newTask,
        status: "active", // Default status for new tasks
        createdAt: new Date(),
      };

      db.collection("tasks")
        .add(taskData)
        .then(() => {
          this.fetchTasks();
          this.newTask.title = "";
          this.newTask.priority = "";
        })
        .catch((error) => {
          console.error("Error adding task:", error);
        });
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}

form {
  display: block;
  margin-right: 20px;
  align: center
}

button {
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
}

button {
  background-color: #1fa2ca;
  color: white;
  border: none;
  cursor: pointer;
}

</style>

