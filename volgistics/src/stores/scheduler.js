import {defineStore} from "pinia"

export const createScheduleStore = defineStore({
    id: "Scheduler",
    state: () => ({
        id: 0,
        day: {},
        date: "2022-01-01",
        booking: [],
        name: "",
        hideInput: false
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
        execute() {
            if (this.hideInput == true){
                this.hideInput = false
            }else{
                this.hideInput = true
            }
        }
    },
    getters: {
        dateConvert(state) {
            let d = new Date(state.date);
            return d.toISOString().substring(0, 10);
        }
    }
})
