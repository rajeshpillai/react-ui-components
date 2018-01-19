import React from 'react';
import moment from 'moment';
import './calendar.css';
import './utils.js';

export default class Calendar extends React.Component {
    constructor() {
        super();
    }

    state  = {
        dateContext:  moment(),
        today:  moment(),
    }

    weekdays=["Sunday","Monday","Tuesday","Wednessday","Thursday","Friday","Saturday"]
    weekdaysShort=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    year = () => {
        return this.state.dateContext.format("Y");
    }
    month = () => {
        return this.state.dateContext.format("MMMM");
    }
    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }
    currentDate = () => {
        return this.state.dateContext.get("date");
    }
    currentDay = () => {
        return this.state.dateContext.format("D");
    }
    firstDayOfMonth = () => {
        var dateContext = this.state.dateContext;
        var firstDay = moment(dateContext).subtract((this.currentDate() - 1), 'days');
        return firstDay.weekday();
    }
    initialDate = () => {
        var t = this.state.dateContext;
        return t.today.get("date");
    }
    initialMonth = () => {
        var t = this.state.dateContext;
        return t.today.format("MMMM");
    }
    initialYear = () => {
        var t = this.state.dateContext;
        return t.today.format("Y");
    }

    nextMonth = () => {
        var dateContext = Object.assign({},this.state.dateContext);
        dateContext = moment(dateContext).add(1, "month");
        this.setState({
            dateContext: dateContext
        })
    }
    prevMonth = () => {
        var dateContext = Object.assign({},this.state.dateContext);
        dateContext = moment(dateContext).subtract(1,"month");
        this.setState({
            dateContext: dateContext
        })
    }

    onDayClick = (e, day) => {
        alert(day);
    }

    changeMonth = (e, month) => {
        alert(month);
    }

    changeYear = (e, year) => {
        alert(year);
    }

    render() {
        // Map the weekdays i.e Sun, Mon, Tue etc as <td>
        let weekdays = this.weekdaysShort.map((day) => {
            return (
                <td key={day} className="week-day">{day}</td>
            )
        });

        // Store the empty slot in calendar, beginning of month.
        let blanks = [];
        for(let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={i*80} className="emptySlot">{""}</td>);
        }

        // Create <td> for all days in the given month
        var daysInMonth = [];
        for(let d = 1; d <= this.daysInMonth(); d++) {
            let className = (d == this.currentDay() ? "day current-day" : "day")
            daysInMonth.push( 
                <td key ={d} className={className} >
                    <span onClick={(e)=>{this.onDayClick(e, d)}}>{d}</span>
                </td>
            );
        }

        // Merge the blank dates and the rest of days in month
        var totalSlots = [...blanks, ...daysInMonth];
        var rows = [];
        let cells = []; 
        
        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            }else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length-1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });
        var trElems = rows.map((t,i) => {
            return <tr key={i*100}>
                {t}
                </tr>
        });
        return (
            <div className="calendar-container">
                <table className="calendar">
                    <tbody>
                        <tr className="calendar-header">
                            <td colSpan="1">
                                <i className="fa fa-fw fa-chevron-left"
                                onClick = {(e)=>{this.prevMonth()}}>
                            </i>
                            </td>
                            <td colSpan="5">
                                <span onClick = {(e)=>{this.changeMonth(e,this.month())}}>{this.month()}</span>
                                {" "}
                                <span onClick = {(e)=>{this.changeYear(e,this.year())}}>{this.year()}</span>
                            </td>
                            <td colSpan="1">
                                <i className="fa fa-fw fa-chevron-right"
                                    onClick = {(e)=>{this.nextMonth()}}>
                                </i>
                            </td>
                        </tr>
                        <tr>
                            {weekdays}
                        </tr>
                        {trElems}
                    </tbody>
                </table>
            </div>
        );
    }
}