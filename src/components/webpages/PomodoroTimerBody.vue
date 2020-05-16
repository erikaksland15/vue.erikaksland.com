<template>
  <div id="pomodoro-container" class="pomodoro-timer-body">
    <div id="pomodoro-clock">
      <div id="pomodoro-timer">
        <span id="minutes">{{ minutes }}</span>
        <span id="middle">:</span>
        <span id="seconds">{{ seconds }}</span>
      </div>
      <div id="pomodoro-timer-input">
        <input
          type="text"
          id="task-description"
          minlength="4"
          maxlength="255"
          placeholder="Enter your work task..."
        />
      </div>
      <div id="pomodoro-timer-actions">
        <button
          id="timer-start"
          class="button-action"
          v-if="!timer"
          @click="startTimer"
        >
          <i class="fas fa-play"></i>
        </button>
        <button
          id="timer-pause"
          class="button-action"
          v-if="timer"
          @click="pauseTimer"
        >
          <i class="fas fa-pause"></i>
        </button>
        <button
          id="timer-reset"
          class="button-action"
          v-if="resetButton"
          @click="resetTimer"
        >
          <i class="fas fa-redo-alt"></i>
        </button>
      </div>
    </div>
    <div id="task-history">
      <h3>Task History</h3>
      <ul id="task-history-list">
        <li v-for="task in tasks" :key="task.id">
          {{ task.task_description }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PomodoroTimerBody",
  data() {
    return {
      workTimeDefault: 25 * 60,
      breakTimeDefault: 5 * 60,
      totalTime: 25 * 60,
      //workTimeDefault: 1 * 10,
      //breakTimeDefault: 1 * 2,
      //totalTime: 1 * 10,
      timer: null,
      resetButton: false,
      isBreak: false,
      taskIdCounter: 1,
      tasks: []
    };
  },
  // ========================
  methods: {
    startTimer: function() {
      var shouldStartTimer = this.checkTaskInput();
      if (shouldStartTimer === true) {
        document.getElementById("task-description").disabled = true;
        this.timer = setInterval(() => this.countdown(), 1000);
        this.resetButton = true;
      }
    },
    startBreak: function() {
      this.pauseTimer();
      this.totalTime = this.breakTimeDefault;
      alert("Good Work! Time to take a break.");
      this.startTimer();
      this.isBreak = true;
    },
    pauseTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
    },
    resetTimer: function() {
      if (this.isBreak == true) {
        if (this.totalTime > 0) {
          alert("Sure, you can cut your break short I guess... Back to work!");
        } else {
          alert("Break time's up! Back to work.");
        }
        this.isBreak = false;
      }
      this.recordTaskAndReset();
      // Reset Timer defaults
      this.totalTime = this.workTimeDefault;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
    },
    padTime: function(time) {
      return (time < 10 ? "0" : "") + time;
    },
    countdown: function() {
      if (this.totalTime > 0) {
        this.totalTime--;
      } else if (this.totalTime == 0 && this.isBreak == false) {
        this.startBreak();
      } else {
        this.resetTimer();
      }
    },
    checkTaskInput: function() {
      var isValid = false;
      var taskDescription = document.getElementById("task-description").value;

      // Check for valid description length
      // Throw alert if setting to a default or to indicate invalid input
      if (taskDescription.length >= 4) {
        isValid = true;
      } else {
        if (taskDescription == null || taskDescription == "") {
          alert(
            "No Task Description provided. We'll set it to a default description for ya."
          );
          document.getElementById("task-description").value = "Work";
          isValid = true;
        } else {
          alert(
            "Please enter a valid Task Description (Between 4 and 255 characters.)"
          );
        }
      }

      return isValid;
    },
    recordTaskAndReset: function() {
      // Create task and add Task to list
      var taskToAdd = {
        id: this.taskIdCounter,
        task_description: document.getElementById("task-description").value
      };
      this.tasks.splice(0, 0, taskToAdd);
      // Reset Input fields and increment ID Counter by 1
      document.getElementById("task-description").disabled = false;
      document.getElementById("task-description").value = "";
      this.taskIdCounter++;
    }
  },
  // ========================
  computed: {
    minutes: function() {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds: function() {
      const mintuesToSeconds = this.minutes * 60;
      const seconds = this.totalTime - mintuesToSeconds;
      return this.padTime(seconds);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#pomodoro-timer {
  font-size: 180px;
  line-height: 1;
  margin-bottom: 36px;
}
#pomodoro-timer-input {
  margin-bottom: 18px;
}
#task-description {
  display: inline-block;
  width: 360px;
  padding: 6px 12px;
  border: 1px solid #d3d3d3;
  border-radius: 6px;
}
.button-action {
  font-size: 18px;
  line-height: 1;
  color: #363636;
  padding: 12px 24px;
  margin: 0px 9px 12px;
  background-color: #ffffff;
  border-color: transparent;
  border-radius: 6px;
}
#task-history-list {
  list-style: none;
  padding-left: 0;
}
</style>
