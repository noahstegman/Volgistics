<script setup>
import 'v-calendar/dist/style.css';
import { createScheduleStore } from '../stores/scheduler'

const StoreSchedule = createScheduleStore();

</script>

<template>
  <div class="data-selector" v-show="StoreSchedule.hideInput">
    <div class="exit" @click="StoreSchedule.execute">X</div>
  </div>
  <div class="wrapper">
    <div class="data-input">
      <div><input type="text" placeholder="Enter Name" v-model="StoreSchedule.name"/></div>
      <div></div>
      <div><button @click="StoreSchedule.setSchedule(StoreSchedule.date)">Submit</button></div>
    </div>
    <div class="output">
      <div>
        <v-date-picker v-model="StoreSchedule.date" @dayclick="StoreSchedule.execute()"/>
      </div>
        {{ StoreSchedule.dateConvert }}
    </div>
  </div>
</template>

<style scoped>
.data-selector{
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 200;
}

  .data-input{
    flex-direction: row;
    display: flex;
    justify-content: space-around;
  }

  .data-input > div{
    padding: 25px;
  }

  input{
    width: 200px;
    height: 20px;
  }

  .wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100vw;
  }

  .exit{
    position: absolute;
    right: 25px;
    top: 25px;
    font-size: 70px;
  }
  .exit:hover{
    cursor: pointer;
  }

  .output{
    margin-top: 30px;
    background-color: rgba(0, 0, 0, 0.2);
    width: 95vw;
    height: 90vh;
  }

</style>
