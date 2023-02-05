import { defineStore } from "pinia"

const d = new Date();

export const useCalendarStore = defineStore({
    id: "calendar",
    state: () => ({
        days: 0,
        year: 2023,
        month: d.getMonth() + 1,
        prevMonth: 0,
        prevDays: 0
    }),
    actions: {
        getDay(d) {
            const dow = new Date(parseInt(this.year), parseInt(this.month), parseInt(d)).getDay();
            switch (dow) {
                case 0:
                    return "Sunday";
                case 1:
                    return "Monday";
                case 2:
                    return "Tuesday";
                case 3:
                    return "Wednesday";
                case 4:
                    return "Thursday";
                case 5:
                    return "Friday";
                case 6:
                    return "Saturday";
            }
        },
        getDayAbs(d) {
            switch (d) {
                case 0:
                    return "Sunday";
                case 1:
                    return "Monday";
                case 2:
                    return "Tuesday";
                case 3:
                    return "Wednesday";
                case 4:
                    return "Thursday";
                case 5:
                    return "Friday";
                case 6:
                    return "Saturday";
            }
        },
        backwardsDays(d) {
            let x = new Date(parseInt(this.year), parseInt(this.month), d).getDay();
            if(this.month == 1){
                this.prevMonth = 12
            }else{
                this.prevMonth = this.month - 1
            }
            this.prevDays = new Date(parseInt(this.year), parseInt(this.prevMonth), 0).getDate();
            return this.prevDays - x;
        }
    },
    getters: {
        totalDays(state) {
            return new Date(parseInt(state.year), parseInt(state.month), 0).getDate();
        },
        getDayNum(state) {
            return new Date(parseInt(state.year), parseInt(state.month), 0).getDay();
        }
    },
})