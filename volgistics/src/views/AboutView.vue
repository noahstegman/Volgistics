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

  <div class="data-selector" v-show="StoreSchedule.showInput">
    <div class="exit" @click="StoreSchedule.showInput = false">X</div>
    <div>
      <input type="text" placeholder="your name" v-model="StoreSchedule.name"/>
      <input type="text" placeholder="message" v-model="StoreSchedule.message">
      <button @click="StoreSchedule.execute()">submit</button>
    </div>
  </div>
  <div class="wrapper">
    <div class="nav">
      Volgistics - Volunteer Calendar
    </div>
    <div class="data-input">
      <div class="btn" @click="StoreSchedule.prevMonth()">Previous Month</div>
      <div class="md">{{ StoreSchedule.getMonthName }}, {{ StoreSchedule.getYear }}</div>
      <div class="btn" @click="StoreSchedule.nextMonth()">Next Month</div>
    </div>
    <div class="output">
      <div class="blank" v-for="n in StoreSchedule.getDay"></div>
      <div class="day" v-for="n in StoreSchedule.getTotalDays" @click="StoreSchedule.overlay(n, StoreSchedule.getMonth, StoreSchedule.getYear)">
        <div class="date">{{ n }}</div>
        <div v-for="event in StoreSchedule.getEvents(n, StoreSchedule.getMonth, StoreSchedule.getYear)">
          <div>{{ event['name'] }}</div>
          <div>{{ event['message'] }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300&family=Open+Sans:wght@300&display=swap');


.data-selector{
  position: fixed;
  min-height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 200;
}

.date{
  padding: 5px;
  font-size: 22px;
  font-family: 'Open Sans', sans-serif;
  border-bottom: 1px solid black;
  text-align: center;
}

  .data-input{
    flex-direction: row;
    width: 100vw;
    display: flex;
    height: 10vh;
    align-items: center;
    justify-content: space-evenly;
  }

  .data-input > div{
    font-size: 50px;
    
  }

  .md{
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    text-align: center;
    min-width: 400px;
  }

  .btn{
    min-width: 150px;
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 20px !important;
    background-color: rgb(114, 159, 76);
    border-radius: 25px;
    padding: 15px;
  }

  .btn:hover{
    cursor: pointer;
    background-color: rgba(113, 159, 76, 0.778);
    transform:scale(1.1);
    transition: .1s all linear;
  }

  .nav{
    font-family: 'Nunito', sans-serif;
    border-bottom: 1px solid black;
    font-size: 50px;
    min-width: 400px;
    text-align: center;
  }


  .day{
    width: 12vw;
    margin: 15px;
    border-radius: 20px;
    height: 200px;
    background-color: rgb(103, 192, 103);
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
    width: 12vw;
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
    background-color: rgba(17, 150, 211, 0.355);
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
