import React,{useState} from 'react'


const NewCompany = ({addCompany,companies}) => {
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

    const textAreaStyle = {
        fontSize: '16px',
        fontFamily: 'Roboto',
        borderRadius: '4px',
        borderColor: 'none',
        borderStyle: 'none',
        height: '80px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        padding: '5px',
        paddingLeft: '20px',
        marginBottom: '20px',
        width: '95%',
        marginTop: '10px'
    }

    const [formData,setFormData]=useState({
        name:''
    })

   


    function handleChange(e){
        setFormData({...formData, [e.target.name]:e.target.value})
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        alert("Added Company")
        const updatedFormData = {...formData}
        fetch("http://localhost:9292/companies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedFormData)
        })
        .then(resp => resp.json())
        .then(data => addCompany(data))
        
      }


    return (
        <div style={formContStyle}>
            <h1>Company List</h1>
                <div>{companies.map((company)=>
                    <li key={company.name}>{company.name}</li>)}
                </div>
            <br></br>
            <br></br>
           <h3>Create a Company</h3>
           <form onSubmit={handleSubmit} >
               <br></br>
               <label>Company</label><br></br>
                <input style={inputStyle} type="text" id="company" name="name" value={formData.name} onChange={handleChange}></input><br></br>
                <button style={postButton} type="submit">Post</button>
           </form>
        </div>
    )
}

export default NewCompany