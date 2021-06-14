const Profile = require('../models/Profile')

module.exports = {
    async index(req, res){
        return res.render('Pages/profile', { profile: await Profile.get()});
    },
    async update(req, res){
        const profile = await Profile.get();
        //recebo os dados que estão para serem atualizados
        const data = req.body;
        //defino quantas semanas tem em 01 ano
        const weeksPerYears = 52;
        //subtrair o total de semanas do ano da quantidade de semanas que quero tirar ferias, para pegar quantas semanas tem em 1 mês
        const weeksPerMoth = (weeksPerYears - data['vacation-per-year']) / 12;
        //total de horas trabalhadas na semana
        const weekTotalHours = data['hours-per-day'] * data['days-per-week']
        //horas trabalhada no mês
        const monthlyTotalHours = weekTotalHours * weeksPerMoth;
        //calculo para saber qual sera o valor da minha hora
        
        const valueHour = data['monthly-budget'] / monthlyTotalHours;
        await Profile.update({
            //espalho os dados que ja tinha
            ...profile,
            //substiuo espalhando os dados novos
            ...req.body,
            //atribou o valor da hora
            "value-hour": valueHour 
        })

        return res.redirect('/perfil');
    }   
}
