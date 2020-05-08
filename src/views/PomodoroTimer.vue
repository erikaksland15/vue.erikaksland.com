<template>
  <div class="pomodoro-timer">
    <h1>This is my Pomodoro Timer</h1>
    <PomodoroTimerBody />
  </div>
</template>

<script>
// @ is an alias to /src
import PomodoroTimerBody from "@/components/webpages/PomodoroTimerBody.vue";

export default {
  name: "PomodoroTimer",
  components: {
    PomodoroTimerBody
  }
};
</script>
