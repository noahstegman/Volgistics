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
        hideInput: false,
    }),
    actions: {
        setSchedule(d) {
            let count = 0
            this.booking.forEach((b) => {
                if(b['date'] == d){
                    count++
                }
            })
            if(count > 2){
                alert("3 Volunteers max!")
            } else{
                this.day = {name: this.name, date: this.date, id: this.id}
                this.booking = [this.day, ...this.booking]
                this.id++
            } 
        },
        totalBookings(d) {
            let count = 0
            this.booking.forEach((b) => {
                if(b['date'] == d){
                    count++
                }
            })
            console.log(count)
        },
        addEntry(n, m, y){
            let entry = {day: n, month: m, year: y, name: "Noah", id: this.id}
            this.booking = [entry, ...this.booking]
            this.id++
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
            m = new Date( m.getTime() - m.getTimezoneOffset() * -60000 ).getMonth()
            switch (m){
                case 0:
                    return "January";
                case 1:
                    return "February";
                case 2:
                    return "March";
                case 3:
                    return "April";
                case 4:
                    return "May";
                case 5:
                    return "June";
                case 6:
                    return "July";
                case 7:
                    return "August";
                case 8:
                    return "September";
                case 9:
                    return "October";
                case 10:
                    return "November";
                case 11:
                    return "December";
            }
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

