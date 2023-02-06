import {defineStore} from "pinia"

export const createScheduleStore = defineStore({
    id: "Scheduler",
    state: () => ({
        id: 0,
        day: {},
        date: "2023-02-05",
        booking: [],
        name: "",
        startdate: "2022-01-01",
        showInput: false,
        selectedDay: "",
        selectedMonth: "",
        selectedYear: "",
        name: "",
        message: ""
    }),
    actions: {
        totalBookings(d) {
            let count = 0
            this.booking.forEach((b) => {
                if(b['date'] == d){
                    count++
                }
            })
            console.log(count)
        },
        overlay(n, m, y){
            this.selectedDay = n
            this.selectedMonth = m
            this.selectedYear = y
            this.showInput = true
        },
        execute(){
            let count = 0
            this.booking.forEach(item => {
                if(this.selectedDay !== item['day']){
                    return
                } 
                if(this.selectedMonth !== item['month']){
                    return
                }
                if(this.selectedYear !== item['year']){
                    return
                } else{
                    count++
                }
            });
            if(count > 2){
                alert("3 Volunteers max!")
                this.showInput = false
            } else{
                let entry = {day: this.selectedDay, month: this.selectedMonth, year: this.selectedYear, name: this.name, message: this.message, id: this.id}
                this.booking = [entry, ...this.booking]
                this.id++
                this.showInput = false
            }
        },
        getEvents(n, m, y){
            let this_day = []
            this.booking.forEach(item => {
                if(n !== item['day']){
                    return
                } 
                if(m !== item['month']){
                    return
                }
                if(y !== item['year']){
                    return
                } else{
                    this_day = [item, ...this_day]
                }
            });
            return this_day
        }
    },
    getters: {
        getTotalDays(state){
            let m = new Date(state.date).getMonth() + 1
            let y = new Date(state.date).getFullYear()
            return new Date(y, m, 0).getDate()
        },
        getMonth(state){
            let m = new Date(state.date);
            return new Date( m.getTime() - m.getTimezoneOffset() * -60000 ).getMonth() + 1

        },
        getYear(state){
            let m = new Date(state.date);
            return new Date( m.getTime() - m.getTimezoneOffset() * -60000 ).getFullYear()
        },
        getDay(state){
            let m = new Date(state.date).getMonth()
            let y = new Date(state.date).getFullYear()
            return new Date(y, m, 1).getDay()
        }
    }
})

