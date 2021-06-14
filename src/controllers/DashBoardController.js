const Job = require('../models/Job');
const Profile = require('../models/Profile');
const JobUtils = require('../utils/JobUtils');


module.exports = {
    async index(req, res) {
        const jobs = await Job.get();
        const profile = await Profile.get();

        let statusCount = {
            progress: 0,
            done:0, 
            total: jobs.length
        }
        //horas por dia dos trabalhos em progresso
        let jobTotalHours = 0;

        const updateJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0 ? 'done' : 'progress';
            
            //atribuindo a chave status que ira depender do projeto e somar mais um
            //a cada status ele vai alterar somando mais um
            statusCount[status] +=1;

            //horas por dia dos trabalhos em progresso
            jobTotalHours = status == 'progress'? jobTotalHours + Number(job['daily-hours']):jobTotalHours;

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile['value-hour'])
            };
        })

        let freeHours = profile['hours-per-day'] - jobTotalHours;

        res.render('Pages/index', { jobs: updateJobs, profile: profile, statusCount: statusCount, freeHours: freeHours });
    },
}