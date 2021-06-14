const Job =  require('../models/Job');
const Profile = require('../models/Profile');
const JobUtils = require('../utils/JobUtils');

module.exports =  {
    
    create(req, res) {
        return res.render('Pages/job');
    },
    async save(req, res) {

        await Job.create({
            name: req.body.name,
            "daily-hours": req.body['daily-hours'],
            "total-hours": req.body['total-hours'],
            created_at: Date.now()
        });

        return res.redirect('/');
    },
    async show(req, res){
        //recebendo os parametros passados pella url
        const jobId = req.params.id;
        const jobs = await Job.get()
        const profile = await Profile.get();
        //a função find ira procurar dentro da lista, se existir aquele indice que procuro ele retorna o valor para a variavel que esta recebendo
        const job = jobs.find(job => Number(job.id) === Number(jobId));
        
        if(!job){
            return res.send('Job Not Found');
        }

        job.budget = JobUtils.calculateBudget(job, profile['value-hour']);

        return res.render('Pages/job-edit', {job});
    },
    async update(req, res){
        const jobId = req.params.id;
        
        await Job.update({
            id: jobId,
            name: req.body.name,
            "total-hours": req.body['total-hours'],
            "daily-hours": req.body['daily-hours']
        });

        res.redirect('/Editar-Trabalho/'+jobId);
    },
    async delete(req, res){
        const jobId = req.params.id;

        await Job.delete(jobId);
    
        return res.redirect('/');
    }
};