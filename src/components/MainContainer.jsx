import Home from './Home';
import NavBar from './NavBar';
import Job from './Job'
import NewJob from './NewJob'
import NewCompany from './NewCompany'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React,{useState,useEffect} from 'react'


const MainContainer= ()=>{

    const [jobs,setJobs]=useState([])
    const [companies,setCompanies]=useState([])
    
    

    useEffect(()=>{
        fetch("http://localhost:9292/jobsandcompanies")
        .then(res=>res.json())
        .then(data=>setJobs(data))
    },[])

    useEffect(()=>{
        fetch("http://localhost:9292/companies")
        .then(res=>res.json())
        .then(data=>setCompanies(data))
    },[])


    function deleteJob(job) {
        
        fetch(`http://localhost:9292/jobs/${job.id}`, {
          method: 'DELETE',
        })
        .then(res=>res.json())
        .then(() => setJobs(jobs.filter((currentJob) => currentJob.id !== job.id)));
    }

    function addJob(job){
        setJobs([...jobs,job])
    }

    function addCompany(company){
        setCompanies([...companies,company])
    }

    function handleInterviewRound(job) {
        const info={'interview_round': job.interview_round + 1, 'test':"test"}
        console.log(info)
        
        fetch(`http://localhost:9292/jobs/${job.id}`, {
          method: 'PATCH',
          header: {"Content-Type":"application/json"},
          body: JSON.stringify(info),
        }).then(() =>{
            console.log(job)
          setJobs(
            jobs.map((oldJob) =>
              oldJob.id !== job.id ? oldJob : { ...oldJob, interview_round: oldJob.interview_round + 1 }
            )
          )}
        );
      }


   return(
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/jobs" element={<Job jobs={jobs} companies={companies} handleDelete={deleteJob} handleUpdate={handleInterviewRound}/>}/>
        <Route path="/newjob" element={<NewJob 
        addJob={addJob} companies={companies}/>}/>
        <Route path="/newcompany" element={<NewCompany addCompany={addCompany} companies={companies}/>}/>
        </Routes>
    </Router>
        
   
   )
}

export default MainContainer;