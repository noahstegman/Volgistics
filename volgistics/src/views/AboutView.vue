<script setup>
import 'v-calendar/dist/style.css';
import { createScheduleStore } from '../stores/scheduler'

const StoreSchedule = createScheduleStore();

let lol = new Date();

console.log( new Date( lol.getTime() - lol.getTimezoneOffset() * -60000 ));

/* console.log(lol.getDay())
console.log(lol.getDate() - parseInt(lol.getDay()))
console.log(lol.getDate() + (7 - lol.getDay())) */

</script>

<template>
  <div class="data-selector" v-show="StoreSchedule.hideInput">
    <div class="exit" @click="StoreSchedule.execute">X</div>
  </div>
  <div class="wrapper">
    <div class="data-input">
      <div><input type="text" placeholder="Enter Name" v-model="StoreSchedule.name"/></div>
      <div><input type="date" v-model="StoreSchedule.date"></div>
      <div><button @click="StoreSchedule.setSchedule(StoreSchedule.date)">Submit</button></div>
    </div>
    <div class="output">
      <div class="blank" v-for="n in StoreSchedule.getDay"></div>
      <div class="day" v-for="n in StoreSchedule.getTotalDays" @click="StoreSchedule.addEntry(n, StoreSchedule.getMonth, StoreSchedule.getYear)">
        <div>{{ n }}</div>
        <div>{{ StoreSchedule.getMonth }}</div>
      </div>
      <div>{{ StoreSchedule.booking }}</div>
    </div>

  </div>
</template>

<style scoped>
.data-selector{
  position: fixed;
  min-height: 100vh;
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

  .day{
    width: 220px;
    margin: 15px;
    height: 200px;
    background-color: green;
  }

  input{
    width: 200px;
    height: 20px;
  }

  .wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
  }

  .blank{
    width: 220px;
    margin: 15px;
    height: 200px;
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
    min-height: 90vh;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: flex-start;
  }

</style>
