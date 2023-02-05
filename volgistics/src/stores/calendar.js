import { defineStore } from "pinia"

const d = new Date();

export const useCalendarStore = defineStore({
    id: "calendar",
    state: () => ({
        days: 0,
        year: 2023,
        month: d.getMonth() + 1
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
        }
    },
    getters: {
        totalDays(state) {
            return new Date(parseInt(state.year), parseInt(state.month), 0).getDate();
        },
        getDayNum(state) {
            return new Date(parseInt(state.year), parseInt(state.month), 0).getDay();
        },
        totalPrevDays(state) {
            let temp = state.month;
            if(temp == 1){
                temp = 12;
                return new Date(parseInt(state.year), parseInt(temp), 0).getDate();
            }else{
                temp = temp - 1;
                return new Date(parseInt(state.year), parseInt(temp), 0).getDate();
            }
        },
    }
})