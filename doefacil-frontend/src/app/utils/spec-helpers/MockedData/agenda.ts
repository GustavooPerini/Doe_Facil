import PADAgenda from "src/app/models/PADAgenda";
import PADAgendaDate from "src/app/models/PADAgendaDate";
import PADAgendaHour from "src/app/models/PADAgendaHour";

type Hour = {hour:string, amount:number};
type Date = {date: string, hours: Hour[]};


function createHour(hour: string, availableNumber: number, href: string ){
    return new PADAgendaHour({hour, availableNumber, href})
}

function createDate(date: string, href: string, ...hours : Hour[]){
    return {
        dateRes: new PADAgendaDate({date, href, hrefHours: `${href}/hours`}),
        hours: hours.map((h, i) => createHour(h.hour, h.amount, `${href}/hours/${i}`))
    }
}

function createCity(place: string, href: string, ...dates: Date[]){
    return {
        cityRes: new PADAgenda({place, href, hrefDates: `${href}/dates/`}),
        dates: dates.map((d1, i) => createDate(d1.date, `${href}/dates/${i}`, ...d1.hours))
    }
}


export const fakeUrl = "url.com/api"
export const agenda = {
    cityA: createCity("CITY_A", `${fakeUrl}/A`, 
            {
                date: "01/01/01", 
                hours: [
                    {hour: "16:00", amount: 0},
                    {hour: "18:00", amount: 10},
                    {hour: "17:00", amount: 20}
                ]},
            {
                date: "02/01/01", 
                hours: [
                    {hour: "16:00", amount: 0},
                    {hour: "18:00", amount: 0},
                    {hour: "17:00", amount: 0}
                ]}
    ),

    cityB: createCity("CITY_B", `${fakeUrl}/B`, 
        {
            date: "06/06/06", 
            hours: [
                {hour: "16:00", amount: 10},
                {hour: "12:00", amount: 10},
                {hour: "11:00", amount: 20}
            ]},
        {
            date: "07/07/07", 
            hours: [
                {hour: "12:00", amount: 0},
                {hour: "13:00", amount: 0},
                {hour: "14:00", amount: 0}
            ]}
    )
}

export function getCityFromUrl(url: string){
    let matches = url.match(`${fakeUrl}/[^/]+`);

    if(matches == null) 
        return undefined
    
    let cityHref = matches[0]

    let city = Object.values(agenda).find((city) => {
        return city.cityRes.href == cityHref
    })
    
    return city;
}

export function getDateFromUrl(url: string) {
    
    let city = getCityFromUrl(url)
    if(city == undefined) return undefined

    let matches = url.match(`${city.cityRes.hrefDates}[^/]+`)
    if(matches == null) return undefined;

    let dateHref = matches[0]
    let date = Object.values(city.dates).find((dateInfo) => {
        return dateInfo.dateRes.href == dateHref
    })

    return date;
}

export function getHourFromUrl(url: string){
    let dateInfo = getDateFromUrl(url)
    if(dateInfo == undefined) return undefined

    let matches = url.match(`${dateInfo.dateRes.hrefHours}/[^/]+`)
    if(matches == null) return undefined;
    
    let hourHref = matches[0]

    let hour = Object.values(dateInfo.hours).find((hour) => {
        return hour.href == hourHref
    })

    return hour;
}
