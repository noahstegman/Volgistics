<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCalendarStore } from '../src/stores/calendar'

const storeCalendar = useCalendarStore();


</script>

<template>
<div class="container">
  <div class="wrapper">
    <div class="inputs">
      <input type="number" v-model="storeCalendar.year"/>
      <select id="month" v-model="storeCalendar.month">
        <option value="1">January</option>
        <option value="2" selected>February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
<!--       <button @click="storeCalendar.getDays">Submit</button> -->
    </div>
    <div class="month">
      <div class="day" v-for="n in parseInt(storeCalendar.getDayNum + 1)" :key='n'>
        <div> {{ storeCalendar.getDayAbs(n - 1) }}</div>
      </div>
      <div class="day" v-for="n in parseInt(storeCalendar.totalDays)" :key="n">
        <div>{{ n }}</div>
        <div>{{ storeCalendar.getDay(n) }}</div>
      </div>
    </div>
  </div>
</div>

</template>

<style scoped>

.inputs{
  margin: 15px;
}

.wrapper{
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95vw;
  min-height: 90vh;
  background-color: rgb(201, 245, 201);
  border-radius: 25px;
}
  .month{
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  .day{
    margin: 15px;
    background-color: rgb(185, 185, 247);
    height: 150px;
    width: 225px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
  }
  .container{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
