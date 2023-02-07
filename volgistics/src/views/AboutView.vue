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
    <div class="ds-wrap">
      <div class="ds-form"><input type="text" placeholder="your name" v-model="StoreSchedule.name"/></div>
      <div class="ds-form"><input type="text" placeholder="message" v-model="StoreSchedule.message"/></div>
      <div class="ds-form">
        <select id="timeslot" v-model="StoreSchedule.timeslot">
          <option value="morning">Morning</option>
          <option value="afternoon" selected>Afternoon</option>
          <option value="evening">Evening</option>
        </select>
      </div>
      <div class="ds-form"><button @click="StoreSchedule.execute()">submit</button></div>
    </div>
    <div class="sch-wrap">
      <div class="sch-morning">
        <div>Morning</div>
      </div>
      <div class="sch-afternoon">
        <div>Afternoon</div>
      </div>
      <div class="sch-night">
        <div>Evening</div>
      </div>
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
      <div class="weekday">Sunday</div>
      <div class="weekday">Monday</div>
      <div class="weekday">Tuesday</div>
      <div class="weekday">Wednesday</div>
      <div class="weekday">Thursday</div>
      <div class="weekday">Friday</div>
      <div class="weekday">Saturday</div>
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

.sch-wrap > div{
  height: 25vh;
  width: 60%;
  margin: 1vh;
}
.sch-morning{
  background-color: cadetblue;
}
.sch-afternoon{
  background-color: darksalmon;
}
.sch-night{
  background-color: mediumpurple;
}
.sch-wrap{
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.ds-wrap{
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 200px;
  justify-content: space-evenly;
}

.ds-form > input, button, select{
  text-align: center;
  height: 40px;
  box-sizing: border-box;
  font-family: 'Nunito', sans-serif;
  text-transform: uppercase;
  font-weight: 400;
  width:  100%;
  margin: 0;
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
  color: #222;
  font-size: 25px;
  padding: 0;
  transition: .05s all linear;
}

.ds-form > button:hover{
  background-color: rgb(200, 200, 200);
  cursor: pointer;
  transition: .05s all linear;
  transform: scale(1.01);
}

.data-selector{
  display: flex;
  position: fixed;
  min-height: 100vh;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 200;
}

.date{
  margin: 3px;
  padding: 1px;
  border-radius: 100px;
  width: 25px;
  height: 25px;
  font-size: 22px;
  font-family: 'Open Sans', sans-serif;
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

  .weekday{
    width: 12vw;
    font-size: 30px;
    text-align: center;
    font-family: 'Nunito', sans-serif;
    font-weight: 100;
    text-transform: uppercase;
    height: 40px;
    margin: 15px;
    border-bottom: 1px solid black;
  }


  .day{
    width: 12vw;
    margin: 15px;
    border-radius: 20px;
    height: 200px;
    transition: all .1s linear;
    background-color: rgba(145, 170, 170, 0.787);
  }

  .day:hover{
    transform: scale(1.2);
    cursor: pointer;
    background-color: rgba(98, 120, 120, 0.875);
    transition: all .1s linear;
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
    right: 100px;
    font-family: 'Nunito', sans-serif;
    font-weight: 100;
    top: 40px;
    width: 70px;
    text-align: center;
    line-height: 70px;
    border: 3px solid black;
    border-radius: 70px;
    height: 70px;
    background-color: white;
    padding: 20px;
    transition: all .05s linear;
    font-size: 70px;
  }

  .exit:hover{
    background-color: #9f9f99;
    transition: all .05s linear;
  }
  .exit:hover{
    cursor: pointer;
  }

  .output{
    width: 95vw;
    border: 1px solid black;
    border-radius: 10px;
    min-height: 90vh;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: flex-start;
  }

</style>
