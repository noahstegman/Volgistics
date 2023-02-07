<script setup>
import 'v-calendar/dist/style.css';
import { createScheduleStore } from '../stores/scheduler'

const StoreSchedule = createScheduleStore();


</script>

<template>

  <div class="data-selector" v-show="StoreSchedule.showInput">
    <div class="exit" @click="StoreSchedule.showInput = false">X</div>
    <div class="ds-wrap">
      <div class="ds-inputs">
        <div class="ds-form" v-bind:class="StoreSchedule.submit_error"><input type="text" placeholder="your name" v-model="StoreSchedule.name"/></div>
        <div class="ds-form"><input type="time" v-model="StoreSchedule.timein"/></div>
        <div class="ds-form">
          <select id="timeslot" v-model="StoreSchedule.timeslot">
            <option value="morning" selected>Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>
        
      </div>
      <div class="ds-inputs">
        <div class="ds-form" v-bind:class="StoreSchedule.text_error"><input type="text" placeholder="message" v-model="StoreSchedule.message"/></div>
        <div class="ds-form"><input type="time" v-model="StoreSchedule.timeout"/></div>
        <div class="ds-form"><button @click="StoreSchedule.execute()">submit</button></div>
    </div>
    </div>
    <div class="sch-wrap">
      <div class="sch-morning">
        <div class="txt-time">Morning</div>
        <div class="sch-ev-wr">
          <div class="sch-ev-cont" v-for="event in StoreSchedule.getEvents(StoreSchedule.selectedDay, StoreSchedule.getMonth, StoreSchedule.getYear, 'morning')">
            <div class="sch-name">{{ event['name'] }}</div>
            <div class="sch-msg">{{ event['message'] }}</div>
            <div class="sch-msg"><span>{{ event['timein'] }}</span> - <span>{{ event['timeout'] }}</span></div>
          </div>
        </div>
      </div>
      <div class="sch-afternoon">
        <div class="txt-time">Afternoon</div>
        <div class="sch-ev-wr">
          <div class="sch-ev-cont" v-for="event in StoreSchedule.getEvents(StoreSchedule.selectedDay, StoreSchedule.getMonth, StoreSchedule.getYear, 'afternoon')">
            <div class="sch-name">{{ event['name'] }}</div>
            <div class="sch-msg">{{ event['message'] }}</div>
          </div>
        </div>
      </div>
      <div class="sch-night">
        <div class="txt-time">Evening</div>
        <div class="sch-ev-wr">
          <div class="sch-ev-cont" v-for="event in StoreSchedule.getEvents(StoreSchedule.selectedDay, StoreSchedule.getMonth, StoreSchedule.getYear, 'evening')">
            <div class="sch-name">{{ event['name'] }}</div>
            <div class="sch-msg">{{ event['message'] }}</div>
          </div>
        </div>
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
        <div class="color-wrap">
          <div class="mcolor" v-bind:class="StoreSchedule.getEventTotal(n, StoreSchedule.getMonth, StoreSchedule.getYear, 'morning')"><div>Morning</div></div>
          <div class="mcolor" v-bind:class="StoreSchedule.getEventTotal(n, StoreSchedule.getMonth, StoreSchedule.getYear, 'afternoon')"><div>Afternoon</div></div>
          <div class="mcolor" v-bind:class="StoreSchedule.getEventTotal(n, StoreSchedule.getMonth, StoreSchedule.getYear, 'evening')"><div>Evening</div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300&family=Open+Sans:wght@300&display=swap');

.zero{
  background-color: rgba(255, 0, 0, 0.455);
}

.one{
  background-color: rgba(255, 166, 0, 0.493);
}

.two{
  background-color: rgba(246, 255, 0, 0.424);
}

.three{
  background-color: rgba(0, 128, 0, 0.438);
}

.error, .text_error{
  border: 3px solid red;
}

 .txt-time{
  width: 100%;
  text-align: center;
  padding-top: 5px;
  font-size: 25px;
  height: calc(20% - 5px);
  font-family: 'Nunito', sans-serif;
  text-transform: uppercase;
  border-bottom: 1px solid black;
}

.mcolor{
  display: flex;
  justify-content: center;
  align-items: center;
}

.sch-ev-cont{
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
}

.ds-inputs{
  display: flex;
  margin: 20px;
  flex-direction: column;
  width: 350px;
  height: 200px;
  justify-content: space-evenly;
}

.sch-ev-wr > div:nth-child(2){
  background-color: rgba(0, 0, 0, 0.2);
}

.sch-ev-wr{
  flex-direction: row;
  align-items: center;
  font-size: 30px;
  justify-content: space-evenly;
  font-family: 'Nunito', sans-serif;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  height: 80%;
  width: 100%;
}



.sch-msg{
  font-size: 18px;
}
.sch-name{
  text-transform: capitalize;
}

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
.color-wrap{
  display: flex;
  border-radius: 15px;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.color-wrap > div{
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  font-weight: 1000;
  height: calc(100% / 3);
}

.color-wrap > div:first-child{
  border-radius: 20px 20px 0 0;
}

.color-wrap > div:nth-child(3){
  border-radius: 0 0 20px 20px;
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
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  min-height: 200px;
  justify-content: center;
  margin-right: 50px;
  margin-left: 50px;
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
  position: absolute;
  top: 3px;
  left: 3px;
  z-index: 100;
  padding: 1px;
  border-radius: 100px;
  width: 25px;
  height: calc(10% - 4px);
  font-size: 18px;
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
    font-size: calc(2vw);
    text-align: center;
    font-family: 'Nunito', sans-serif;
    font-weight: 100;
    text-transform: uppercase;
    height: 40px;
    margin: .75vw;
    border-bottom: 1px solid black;
  }


  .day{
    width: 12vw;
    margin: .75vw;
    position: relative;
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
    margin: .75vw;
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
