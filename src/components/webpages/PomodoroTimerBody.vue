<template>
  <div id="pomodoro-container" class="pomodoro-timer-body">
    <div id="pomodoro-clock">
      <div id="pomodoro-timer">
        <span id="minutes">{{ minutes }}</span>
        <span id="middle">:</span>
        <span id="seconds">{{ seconds }}</span>
      </div>
      <div id="clock-actions">
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
  </div>
</template>

<script>
export default {
  name: "PomodoroTimerBody",
  data() {
    return {
      timer: null,
      totalTime: 1 * 60,
      resetButton: false
    };
  },
  // ========================
  methods: {
    startTimer: function() {
      this.timer = setInterval(() => this.countdown(), 1000);
      this.resetButton = true;
    },
    pauseTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
    },
    resetTimer: function() {
      this.totalTime = 25 * 60;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
    },
    padTime: function(time) {
      return (time < 10 ? "0" : "") + time;
    },
    countdown: function() {
      if (this.totalTime >= 1) {
        this.totalTime--;
      } else {
        this.totalTime = 0;
        this.resetTimer();
      }
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
  margin-bottom: 24px;
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
</style>
