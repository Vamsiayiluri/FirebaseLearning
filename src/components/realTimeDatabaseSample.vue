<template>
  <div class="form-container">
    <h1>Realtime Database Sample</h1>

    <label>
      <input type="checkbox" v-model="checkedItem" value="Option 1" />
      Query Data
    </label>
    <div v-if="!checkedItem">
      <h2>Enter Match Details</h2>
      <form @submit.prevent="submitMatchData" class="form-style">
        <div class="paddingText">
          <label style="margin-left: 58px" for="team1">Team 1:</label>
          <input type="text" v-model="team1" required />
        </div>
        <div class="paddingText">
          <label style="margin-left: 58px" for="team2">Team 2:</label>
          <input type="text" v-model="team2" required />
        </div>
        <div class="paddingText">
          <label for="score1">Score (Team 1):</label>
          <input type="number" v-model="score1" required />
        </div>
        <div class="paddingText">
          <label for="score2">Score (Team 2):</label>
          <input type="number" v-model="score2" required />
        </div>
        <div class="paddingText">
          <label style="margin-right: 48px" for="status">Status:</label>
          <select v-model="status" required>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit">Submit Match</button>
      </form>
    </div>
    <div v-else class="matchQueries">
      <!-- <h2>Previous Match Details</h2> -->
      <label>
        <input type="checkbox" v-model="updateCheckedItem" value="Option 1" />
        Update Data
      </label>
      <label>
        <input type="checkbox" v-model="deleteCheckedItem" value="Option 1" />
        Delete Data
      </label>
      <div v-if="!updateCheckedItem && !deleteCheckedItem" class="matchQueries">
        <button class="marginText" @click="getLastMatchData()">
          Get previous Match data
        </button>
        <div v-if="matchData">
          <h2>Match Details</h2>
          <div class="match">
            <strong>{{ matchData.team1 }}</strong>
            <p style="padding: 8px">VS</p>
            <strong> {{ matchData.team2 }}</strong>
          </div>
          <p><strong>Status:</strong> {{ matchData.status }}</p>

          <h3>Score</h3>
          <p>
            <strong>{{ matchData.team1 }}:</strong>
            {{ matchData.score[matchData.team1] }}
          </p>
          <p>
            <strong>{{ matchData.team2 }}:</strong>
            {{ matchData.score[matchData.team2] }}
          </p>
        </div>
        <button class="marginText" @click="getIndiaMatchData()">
          Get India Match data
        </button>
        <button class="marginText" @click="getMatchDatausingOnValue()">
          Get Match data .On()
        </button>
        <button class="marginText" @click="getMatchDataOnce()">
          Get Match data once
        </button>
        <button class="marginText" @click="getMatchDataLimit()">
          Get Match data Limit
        </button>
        <button class="marginText" @click="getIndiaMatchData()">
          Get India Match data
        </button>
      </div>
      <div
        v-else-if="updateCheckedItem && !deleteCheckedItem"
        class="matchQueries"
      >
        <button class="marginText" @click="updateSingleField()">
          Update Status
        </button>
        <button class="marginText" @click="updateMultipleFields()">
          Update Match data
        </button>
        <button class="marginText" @click="updateNestedFields()">
          Update Nested fields
        </button>
        <button class="marginText" @click="updateNewFields()">
          Add venue to match data
        </button>
        <button class="marginText" @click="updateMultipleMatches()">
          Update multiple matches
        </button>
        <button class="marginText" @click="updateBankTransactions()">
          Update Bank Transactions
        </button>
      </div>
      <div v-else class="matchQueries">
        <button class="marginText" @click="deleteMatchByID()">
          Delete match by ID
        </button>
        <button class="marginText" @click="deleteFieldsInMatch()">
          Delete fields in Match data
        </button>
        <button class="marginText" @click="deleteAllUsers()">
          Delete all users
        </button>
        <button class="marginText" @click="deleteMatchConditionally()">
          Delete match data conditionally
        </button>
        <button class="marginText" @click="deleteMultipleMatches()">
          Delete multiple matches
        </button>
        <button class="marginText" @click="deleteOnCondition()">
          Delete match on condition
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { database, analytics, perf } from "../firebaseinit";
export default {
  data() {
    return {
      team1: "",
      team2: "",
      score1: null,
      score2: null,
      status: "",
      matchData: null,
      checkedItem: false,
      updateCheckedItem: false,
      deleteCheckedItem: false,
    };
  },
  methods: {
    async submitMatchData() {
      try {
        // Construct the data from form fields
        const matchData = {
          team1: this.team1,
          team2: this.team2,
          score: {
            [this.team1]: this.score1,
            [this.team2]: this.score2,
          },
          status: this.status,
        };

        const dbRef = database.ref(`matches/${this.team1}VS${this.team2}`);
        dbRef.set(matchData);

        // Insert data into Firebase Realtime Database using push()
        // await database.ref("matches").push(matchData);

        alert("Match data submitted successfully!");

        // Clear form fields after submission
        this.team1 = "";
        this.team2 = "";
        this.score1 = null;
        this.score2 = null;
        this.status = "";
      } catch (error) {
        console.error("Error submitting match data:", error);
      }
    },
    getMatchDatausingOnValue() {
      //   const matchId = "-O79Src5DuW8avC-1axY";
      const trace = perf.trace("getData");
      trace.start();
      const dbRef = database.ref("matches");
      dbRef.on("value", (snapshot) => {
        const data = snapshot.val();
        trace.stop();
        console.log("Real-time data: ", data);
      });
    },
    getMatchDataOnce() {
      const dbRef = database.ref("matches");

      dbRef.once("value").then((snapshot) => {
        const data = snapshot.val();
        console.log("Fetched data: ", data);
      });
    },
    getMatchDataLimit() {
      const dbRef = database.ref("matches");

      dbRef
        .limitToLast(3)
        .get()
        .then((snapshot) => {
          console.log(snapshot.val());
        });
    },
    async getIndiaMatchData() {
      const dbRef = database.ref("matches");
      const trace = perf.trace("getDataWithQuery");
      trace.start();
      dbRef
        .orderByChild("team1")
        .equalTo("Ind")
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
          } else {
            console.log("No data found");
          }
          trace.stop();
        })
        .catch((error) => {
          console.error("Error fetching match data: ", error);
        });
    },
    async getLastMatchData() {
      analytics.logEvent("select_content", {
        content_type: "image",
        content_id: "P12453",
        items: [{ name: "Kittens" }],
      });
      console.log("analytics submitted");
      const dbRef = database.ref();

      dbRef
        .child("matches")
        .orderByKey()
        .limitToLast(1)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
              this.matchData = childSnapshot.val(); // Get match data
            });
          } else {
            console.log("No data available for this match.");
          }
        })
        .catch((error) => {
          console.error("Error fetching match data: ", error);
        });
    },
    async getMatchData() {
      const dbRef = database.ref();

      //   const matchId = "-O79Src5DuW8avC-1axY";

      dbRef
        .child("matches")
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            let allMatches = snapshot.val();
            Object.keys(allMatches).forEach((matchId) => {
              const matchData = allMatches[matchId];
              console.log(matchData);
            });
          } else {
            console.log("No data available for this match.");
          }
        })
        .catch((error) => {
          console.error("Error fetching match data: ", error);
        });
    },
    async getSpecificMatchData() {
      const dbRef = database.ref();

      const matchId = "-O79Src5DuW8avC-1axY";

      dbRef
        .child("matches")
        .child(matchId)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.matchData = snapshot.val();
            console.log("Match data: ", snapshot.val());
          } else {
            console.log("No match data available.");
          }
        })
        .catch((error) => {
          console.error("Error fetching match data: ", error);
        });
    },
    async updateSingleField() {
      const matchId = "IND VS PAK"; // Example match ID
      const dbRef = database.ref(`matches/${matchId}`);

      dbRef
        .update({
          status: "ongoing",
        })
        .then(() => {
          alert("Match status updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating match status: ", error);
        });
    },
    async updateMultipleFields() {
      const matchId = "IND VS PAK";
      const dbRef = database.ref(`matches/${matchId}`);

      dbRef
        .update({
          status: "completed",
          score: {
            India: "180",
            Pakistan: "170",
          },
        })
        .then(() => {
          alert("Match data updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating match status: ", error);
        });
    },

    async updateNestedFields() {
      const matchId = "IND VS PAK";
      const dbRef = database.ref(`matches/${matchId}`);

      dbRef
        .update({
          "score/India": "190",
        })
        .then(() => {
          alert("Nested field score updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating match status: ", error);
        });
    },
    async updateNewFields() {
      const matchId = "IND VS PAK";
      const dbRef = database.ref(`matches/${matchId}`);

      dbRef
        .update({
          venue: "Eden Gardens",
        })
        .then(() => {
          alert("Venue data added successfully.");
        })
        .catch((error) => {
          console.error("Error updating match status: ", error);
        });
    },

    async updateMultipleMatches() {
      let updates = {};
      updates["matches/-O7D-RICH_QkqGOrnF4e/status"] = "ongoing";
      updates["matches/IND VS PAK/status"] = "ongoing";

      database
        .ref()
        .update(updates)
        .then(() => {
          alert("Both matches updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating match status: ", error);
        });
    },

    async updateBankTransactions() {
      const dbRefA = database.ref(`accounts/accountA`);
      dbRefA.set({ balance: 3000 });
      const dbRefB = database.ref(`accounts/accountB`);
      dbRefB.set({ balance: 2000 });
      const accountARef = database.ref("accounts/accountA/balance");
      const accountBRef = database.ref("accounts/accountB/balance");

      accountARef
        .transaction((balanceA) => {
          if (balanceA >= 100) {
            return balanceA - 100; // Deduct from account A if sufficient funds
          } else {
            alert("Insufficient funds.");
            return; // Abort transaction
          }
        })
        .then(() => {
          // Now increment balance for account B
          return accountBRef.transaction((balanceB) => {
            return (balanceB || 0) + 100; // Add to account B
          });
        })
        .then(() => {
          alert("Money transferred successfully.");
        })
        .catch((error) => {
          console.error("Error transferring money: ", error);
        });
    },
    async deleteMatchByID() {
      const matchId = "-O7D-RICH_QkqGOrnF4e"; // Example match ID
      const dbRef = database.ref(`matches/${matchId}`);

      dbRef
        .remove()
        .then(() => {
          alert("Match deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting match: ", error);
        });
    },
    async deleteFieldsInMatch() {
      const matchId = "-O7DiQ1z-rdQIskIVQxz";
      const dbRef = database.ref(`matches/${matchId}`);

      dbRef
        .update({
          status: null, // Setting a field to null will remove it
          "score/Pakistan": null,
        })
        .then(() => {
          alert("Score field removed from the match.");
        })
        .catch((error) => {
          console.error("Error removing score field: ", error);
        });
    },

    async deleteAllUsers() {
      const dbRef = database.ref("users");

      dbRef
        .remove()
        .then(() => {
          alert("All users deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting all matches: ", error);
        });
    },
    async deleteMatchConditionally() {
      const id = "accountA"; // Example match ID
      const dbRef = database.ref(`accounts/${id}`);

      dbRef
        .transaction((accountData) => {
          if (accountData && accountData.status === "completed") {
            return null; // Returning null in a transaction will delete the data
          }
          return accountData; // Abort the transaction if the status is not "completed"
        })
        .then(() => {
          alert("Match deleted as it was completed.");
        })
        .catch((error) => {
          console.error("Error deleting match: ", error);
        });
    },

    async deleteMultipleMatches() {
      const updates = {};
      updates["matches/IND VS IRE"] = null;
      updates["matches/IND VS BAN"] = null;
      database
        .ref()
        .update(updates)
        .then(() => {
          console.log("Multiple matches deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting matches: ", error);
        });
    },

    async deleteOnCondition() {
      const dbRef = database.ref("matches");

      dbRef
        .orderByChild("status")
        .equalTo("pending")
        .once("value", (snapshot) => {
          snapshot.forEach((matchSnapshot) => {
            matchSnapshot.ref
              .remove()
              .then(() => {
                alert("Match with status as pending deleted.");
              })
              .catch((error) => {
                console.error("Error deleting match: ", error);
              });
          });
        });
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Form row styles */
.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

/* Label and input alignment */
label {
  flex: 1;
  margin-right: 15px;
}

/* Input and select styling */
input,
select {
  flex: 2;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

/* Button styling */
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
.form-style {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.paddingText {
  padding: 10px;
}
.marginText {
  margin: 10px;
}
.match {
  display: flex;
  align-items: center;
  justify-content: center;
}
.matchQueries {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}
</style>
