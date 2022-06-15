import express, { response } from "express"
import cors from "cors"

const server = express()
const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "3/1/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
  ];
const today = new Date().toLocaleDateString()

let msg = "Não, hoje não é feriado"
for(let i = 0 ;i < holidays.length; i++){
    if(holidays[i].date === today){
        msg = `Sim, hoje é ${holidays[i].name}`   
        break;
    }
}

server.use(cors())

server.get('/holidays', (req, res) => {
    res.send(holidays)
})

server.get('/is-today-holiday', (req, res) => {
    res.send(msg)
})

server.get('/holidays/:month', (req, res) => {
    let id = req.params.month;
    id = parseInt(id)

    let todays = holidays.filter(object => Number(object.date.split("/")[0]) === id);

    if(id < 1 || id > 12){
        res.send("Você enviou uma requisição para um mês inválido")
    }
    else if(todays.length === 0 ){
        res.send("O mês solicitado não possui nenhum feriado, yupi!")
    }else{
        res.send(todays)
    }
        
    

    

})

server.listen(5000)