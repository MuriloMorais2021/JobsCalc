module.exports = {
    //função para calcular os dias restantes do projeto
    remainingDays(job) {
        // primeiro faço o calculo de dias a trabalhar no projeto
        const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed();
        // depois na função date passo a data que foi criado o projeto para pegar o dia
        const createdDate = new Date(job.created_at)
        // depois faço a soma dos dias para entregar o projeto data de vencimento
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDateInMs = createdDate.setDate(dueDay);
        //calculo para a diferença de dias em MS
        const timeDiffInMs = dueDateInMs - Date.now();
        //transformo um dia em MS
        const dayInMs = 1000 * 60 * 60 * 24;
        // agora eu tenho os dias restantes
        const daysDiff = Math.floor(timeDiffInMs / dayInMs)

        return daysDiff;
    },
    calculateBudget: (job, valueHour)=> valueHour * job['total-hours']
}