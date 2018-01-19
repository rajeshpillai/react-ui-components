import React from 'react';
import moment from 'moment';
import './calendar.css';

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

    addMonth = () => {
        var dateContext = Object.assign({},this.state.dateContext);
        dateContext = moment(dateContext).add(1, "month");
        this.setState({
            dateContext: dateContext
        })
    }
    subtractMonth = () => {
        var dateContext = Object.assign({},this.state.dateContext);
        dateContext = moment(dateContext).subtract(1,"month");
        this.setState({
            dateContext: dateContext
        })
    }


    render() {
        let weekdays = this.weekdaysShort.map((day) => {
            return (
                <td>{day}</td>
            )
        });
        console.log("fdom: ", this.firstDayOfMonth());

        let blanks = [];
        for(let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td className="emptySlot">{":)"}</td>);
        }

        var daysInMonth = [];
        for(let d = 0; d < this.daysInMonth(); d++) {
            daysInMonth.push( 
                <td className="day">
                    {d+1}
                </td>
            );
        }

        // Merge the blank dates and the rest
        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        var trs = [];
        let t = []; 
        
        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                t.push(row);
            }else {
                let insertRow = t.slice();
                trs.push(insertRow);
                t = [];
                t.push(row);
            }
            if (i === totalSlots.length-1) {
                let insertRow = t.slice();
                trs.push(insertRow);
            }
        });
        var trElems = trs.map((t) => {
            return <tr>
                {t}
                </tr>
        });
        return (
            <div>
                <div className="calendar-header">
                    <i className="fa fa-fw fa-chevron-left"
                    onClick = {(e)=>{this.subtractMonth()}}>
                    </i>
                    <h4>{this.month()} {" "} {this.year()}</h4>
                    <i className="fa fa-fw fa-chevron-right"
                    onClick = {(e)=>{this.addMonth()}}>
                    </i>
                </div>
                <table className="calendar">
                    <tr className="weekdays">
                        {weekdays}
                    </tr>
                    {trElems}
                </table>
                <pre>
                    {totalSlots}
                </pre>
            </div>
        );
    }
}