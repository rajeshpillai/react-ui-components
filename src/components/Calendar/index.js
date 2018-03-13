import React from 'react';
import moment from 'moment';
import './calendar.css';
import getPosition from './utils';
//import SelectList from '../SelectList';


export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.width = props.width || "400px";
        this.style = props.style || {};
        this.style.width = this.width;
    }

    state = {
        dateContext: moment(),
        today: moment(),
        showMonthPopup: false,
        showYearPopup: false
    }

    weekdays = moment.weekdays(); //["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"]
    weekdaysShort = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    months = moment.months();

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
        let dateContext = this.state.dateContext;
        console.log("firstDayOfMonth *: ", moment(dateContext).startOf('month').format('d'));
        let firstDay = moment(dateContext).startOf('month').format('d');
        return firstDay;
        //return firstDay.weekday();

        //  console.log("firstDayOfMonth easy: ", moment(dateContext).weekday());
        //  console.log("firstDayOfMonth hard: ", firstDay.weekday());
        // return moment(dateContext).weekday();
    }




    setMonth = (month) => {
        var monthNo = this.months.indexOf(month);
        var dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set('month', monthNo);
        this.setState({
            dateContext: dateContext
        })
    }


    nextMonth = () => {
        var dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).add(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onNextMonth && this.props.onNextMonth();
    }
    prevMonth = () => {
        var dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).subtract(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onPrevMonth && this.props.onPrevMonth();
    }

    onDayClick = (e, day) => {
        console.log("selected: ", this.state.dateContext);
        console.log("today: ", this.state.today);
        this.props.onDayClick && this.props.onDayClick(e, day);
    }

    onListChange = (data) => {
        this.setMonth(data);
        this.props.onMonthChange && this.props.onMonthChange();
    }

    onSelectChange = (e, data) => {
        //this.onListChange(data);
        this.setMonth(data);
        this.props.onMonthChange && this.props.onMonthChange();
    }



    SelectList = (props) => {
        var popup = props.data.map((data) => {
            return (
                <div key={data}>
                    <a
                        onClick={(e) => { this.onSelectChange(e, data) }}
                        href="#"
                    >
                        {data}
                    </a>
                </div>
            );
        });

        return (
            <div className="month-popup">
                {popup}
            </div>
        );
    }

    changeMonth = (e, month) => {
        var mouse = getPosition(e.target);
        console.log("monthMouse: ", mouse);
        this.setState({
            showMonthPopup: !this.state.showMonthPopup,
            mouse: mouse
        });
    }

    MonthNav = () => {
        return (
            <span className="label-month"
                onClick={(e) => { this.changeMonth(e, this.month()) }}>{this.month()}
                {this.state.showMonthPopup &&
                    <this.SelectList
                        onListChange={this.onListChange}
                        data={this.months} />
                }
            </span>
        );
    }

    showYearEditor = () => {
        this.setState({
            showYearEditor: true
        }, () => {
        });
    }

    setYear = (year) => {
        var dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set('year', year);
        this.setState({
            dateContext: dateContext
        })
    }


    onKeyUpYear = (e) => {
        if (e.which === 13 || e.which === 27) {  // enter or  esc key
            this.setYear(e.target.value);
            this.setState({
                showYearEditor: false
            });
        }
    }

    onYearChange = (e) => {
        this.setYear(e.target.value);
        this.props.onYearChange && this.props.onYearChange(e, e.target.value);
    }

    YearNav = () => {
        return  (
            this.state.showYearEditor ?
            <input
                defaultValue={this.year()}
                className="editor-year"
                ref={(yearInput) => { this.yearInput = yearInput }}
                onKeyUp={(e) => { this.onKeyUpYear(e) }}
                onChange={(e) => { this.onYearChange(e) }}
                type="number" placeholder="year" />
            : <span
                className="label-year"
                onDoubleClick={(e) => { this.showYearEditor() }}>
                {this.year()}

            </span>
        );
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
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={i * 80} className="emptySlot">{""}</td>);
        }

        console.log("blanks: ", blanks);

        // Create <td> for all days in the given month
        var daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let className = (d == this.currentDay() ? "day current-day" : "day")
            daysInMonth.push(
                <td key={d} className={className} >
                    <span onClick={(e) => { this.onDayClick(e, d) }}>{d}</span>
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
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });
        var trElems = rows.map((t, i) => {
            return <tr key={i * 100}>
                {t}
            </tr>
        });

        return (
            <div className="calendar-container" style={this.style}>
                <table className="calendar" >
                    <thead>
                        <tr className="calendar-header">
                            <td colSpan="5">
                                <this.MonthNav />
                                {" "}
                                <this.YearNav/>
                            </td>
                            <td colSpan="2" className="nav-month">
                                <i className="prev fa fa-fw fa-chevron-left"
                                    onClick={(e) => { this.prevMonth() }}>
                                </i>
                                <i className="next fa fa-fw fa-chevron-right"
                                    onClick={(e) => { this.nextMonth() }}>
                                </i>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
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
