import cron from 'node-cron';
import { processRecurrigTransactions } from './jobs/transaction.job';
import { processReportJob } from './jobs/report.job';


const scheduleJob = (name:string, time: string,job:Function)=>{
    console.log(`Scheduling ${name} at ${time}`);
    return cron.schedule(time,async()=>{
        try {
            await job();
            console.log(`${name} completed`)
        }
         catch (error) {
            console.log(`${name} failed`)
        }
    },

    {
        scheduled : true,
        timezone :"UTC",
    }
)
}

export const  startJobs = ()=>{
    return [
        scheduleJob("Transactions","5 * * * *",processRecurrigTransactions),
        //run 2:30am every first of the month
        //at each minutes it will get triggered
        scheduleJob("Reports","*/1 * * * *",processReportJob),
    ]
}
