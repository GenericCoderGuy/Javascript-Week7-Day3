function apiCall(year,round) {
    fetch(`https://ergast.com/api/f1/${year}/${round}/driverStandings.json`)
        .then((res) => res.json())
        .then((data) => getData(data))
}

function getData(data) {
    console.log(data)

    for (var i of data.MRData.StandingsTable.StandingsLists[0].DriverStandings) {

        let position = i.position
        let name = i.Driver.givenName + (' ') + i.Driver.familyName
        let nationality = i.Driver.nationality
        let sponser = i.Constructors[0].name
        let points = i.points

        let clone = myTemplate.content.cloneNode(true); 
        let td = clone.querySelectorAll('td') 

        td[0].textContent = position
        td[1].textContent = name
        td[2].textContent = nationality
        td[3].textContent = sponser
        td[4].textContent = points

        tableBody.appendChild(clone);
    }
}

const myForm = document.getElementById('form')

myForm.addEventListener('submit', (event)=> {
    event.preventDefault()
    tableBody.innerHTML = ''
    const myForm = document.getElementById('form')
    formData = new FormData(myForm)
    var year = formData.get("year")
    var round = formData.get("round")
    apiCall(year,round)
})