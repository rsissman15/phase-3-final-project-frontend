import React,{useState} from 'react'


const NewJob = ({addJob,companies}) => {
    const formContStyle = {
        padding: '10px',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        textAlign: 'left',
        fontFamily: 'Roboto'
    }

    const postButton = {
        backgroundColor: '#539987',
        padding: '5px',
        borderRadius: '4px',
        borderStyle: 'none',
        fontFamily: 'Roboto',
        height: '50px',
        width: '20%',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18px',
        float: 'right'
    }

    const inputStyle = {
        fontSize: '16px',
        fontFamily: 'Roboto',
        borderRadius: '4px',
        borderColor: 'none',
        borderStyle: 'none',
        height: '30px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        padding: '5px',
        paddingLeft: '20px',
        marginBottom: '20px',
        width: '95%',
        marginTop: '10px'
    }

    let optionCompanies = companies.map((company) =>
    <option value={company.id} key={company.id}>{company.name}</option> 
  );



  const initialState={
    position: '',
    description: '',
    interview_round: "",
    company_id: ""
    
}

    const [formData,setFormData]=useState(initialState)

    


    function handleChange(e){
        setFormData({...formData, [e.target.name]:e.target.value})
      }


      const handleSubmit = (e) => {
        e.preventDefault()
        alert("Added to Job Tracker")
        const updatedFormData = {...formData}
        console.log(updatedFormData)
        fetch("http://localhost:9292/jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedFormData)
        })
        .then(resp => resp.json())
        .then(data =>{
            addJob(data)
            setFormData(initialState)

        })
        
      }

   

    return (

     
        <div style={formContStyle}>
           <h2>Create a Job</h2>
           <form onSubmit={handleSubmit} >
               <br></br>
               <label>Position</label><br></br>
                <input style={inputStyle} type="text" id="position" name="position" value={formData.position} onChange={handleChange}></input><br></br>
                <label>Description</label><br></br>
                <input style={inputStyle} type="text" id="description" name="description" value={formData.description} onChange={handleChange}></input><br></br>
                <div style={{textAlign: "left"}}>
                <label>Interview Round</label>
                <input style={inputStyle} type="text" id="interview_round" name="interview_round" value={formData.interview_round} onChange={handleChange}></input><br></br>
                <label>Company</label><br></br>
                    <select name="company_id" onChange={handleChange}>
                        <option selected disabled>Select Company</option>
                        {optionCompanies}
                    </select>
                </div>
                <button style={postButton} type="submit">Post</button>
           </form>
        </div>
    )
}

export default NewJob