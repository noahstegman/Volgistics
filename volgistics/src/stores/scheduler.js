import {defineStore} from "pinia"

export const createScheduleStore = defineStore({
    id: "Scheduler",
    state: () => ({
        id: 0,
        day: {},
        date: "2023-02-15",
        booking: [],
        name: "",
        startdate: "2022-01-01",
        showInput: false,
        selectedDay: "",
        selectedMonth: "",
        selectedYear: "",
        timeslot: "morning",
        name: "",
        message: "",
        timein: "12:00",
        timeout: "13:00",
        submit_error: "",
        text_error: ""
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
            this.submit_error = ""
            this.text_error = ""
            let count = 0
            this.booking.forEach(item => {
                if(this.selectedDay !== item['day']){
                    return
                } 
                if(this.selectedMonth !== item['month']){
                    return
                }
                if(this.timeslot !== item['timeslot']){
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
            }else if(!this.name){
                this.submit_error = "error"
            }else if(!this.message){
                this.text_error = "text_error"
            }
            else{
                let entry = {day: this.selectedDay, month: this.selectedMonth, year: this.selectedYear, name: this.name, message: this.message, id: this.id, timeslot: this.timeslot, timein: this.timein, timeout: this.timeout}
                this.booking = [entry, ...this.booking]
                this.id++
                this.name = ""
                this.message = ""
                this.showInput = false
            }
        },
        getEvents(n, m, y, t){
            let this_day = []
            this.booking.forEach(item => {
                if(n !== item['day']){
                    return
                } 
                if(m !== item['month']){
                    return
                }
                if(t !== item['timeslot']){
                    return
                }
                if(y !== item['year']){
                    return
                } else{
                    this_day = [item, ...this_day]
                }
            });
            return this_day
        },
        prevMonth(){
            let m = new Date(this.date)
            m.setMonth(m.getMonth() - 1)
            this.date = m.toISOString().split('T')[0]
        },
        nextMonth(){
            let m = new Date(this.date)
            m.setMonth(m.getMonth() + 1)
            this.date = m.toISOString().split('T')[0]
        },
        getEventTotal(n, m, y, t){
            let count = 0
            this.booking.forEach(item => {
                if(n !== item['day']){
                    return
                } 
                if(m !== item['month']){
                    return
                }
                if(t !== item['timeslot']){
                    return
                }
                if(y !== item['year']){
                    return
                } else{
                    count++
                }
            });
            if(count == 0){
                return "zero"
            }
            else if(count == 1){
                return "one"
            }
            else if(count == 2){
                return "two"
            }
            else {
                return "three"
            }
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
        },
        getMonthName(state){
            let m = new Date(state.date);
            m = new Date( m.getTime() - m.getTimezoneOffset() * -60000 ).getMonth() + 1
            switch (m) {
                case 1: 
                    return "January"
                case 2:
                    return "February"
                case 3:
                    return "March"
                case 4:
                    return "April"
                case 5:
                    return "May"
                case 6:
                    return "June"
                case 7:
                    return "July"
                case 8:
                    return "August"
                case 9:
                    return "September"
                case 10:
                    return "October"
                case 11:
                    return "November"
                case 12:
                    return "December"
            }
        }
    }
})

